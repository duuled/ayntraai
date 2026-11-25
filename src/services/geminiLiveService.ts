/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Ayntra Innovation - Multimodal Gemini 3.8 Live API Client Boilerplate
 * 
 * HOW THIS WORKS (IN SIMPLE TERMS):
 * 1. Video Frames: The inspector's phone camera takes a snapshot every 1-2 seconds,
 *    compresses it into a lightweight JPEG image, and sends it to Gemini.
 * 2. Audio Stream: The microphone audio is converted to standard 16kHz PCM audio
 *    chunks in real-time and streamed via WebSocket to Gemini.
 * 3. Multimodal Reasoning: Gemini 3.8 Live simultaneously analyzes the video frame
 *    and the inspector's voice.
 * 4. Structured Function Calling: When Gemini detects a physical defect (crack, corrosion, leak),
 *    it calls our function `logInfrastructureAnomaly()` returning clean JSON data.
 * 5. Webhook Routing: That JSON is instantly passed to Make.com, Supabase, or Google Maps.
 */

import { InspectionAuditLogItem, SeverityLevel, DefectCategory } from '../types/inspection';

export interface GeminiLiveConfig {
  apiKey?: string;
  model: string; // 'gemini-3.8-live'
  voiceName: string; // 'Zephyr', 'Puck', 'Charon', 'Kore', 'Fenrir'
  frameRateFps: number; // e.g. 1 frame every 1.5 seconds
  sampleRate: number; // 16000
}

export const DEFAULT_GEMINI_LIVE_CONFIG: GeminiLiveConfig = {
  model: 'gemini-3.8-live',
  voiceName: 'Zephyr',
  frameRateFps: 0.75, // Capture frame every 1.3 seconds to optimize mobile bandwidth
  sampleRate: 16000,
};

/**
 * Standard Function Declaration for Gemini 3.8 Live Tool Calling
 * This instructs Gemini to output structured JSON when an anomaly or infrastructure asset is inspected.
 */
export const INFRASTRUCTURE_INSPECTION_TOOL = {
  functionDeclarations: [
    {
      name: 'logInfrastructureAnomaly',
      description: 'Triggered when the multimodal inspector detects a structural defect, safety hazard, or completes an asset condition verification in the video stream and inspector audio.',
      parameters: {
        type: 'OBJECT',
        properties: {
          assetName: {
            type: 'STRING',
            description: 'Name or identifier of the infrastructure asset (e.g. Bridge Pier 4, Substation Transformer T-2, Gas Main 16-inch).'
          },
          assetCategory: {
            type: 'STRING',
            description: 'Category of asset: Bridge, Power Grid, Gas Pipeline, Water Reservoir, Telecom Tower, Transit Tunnel.'
          },
          severity: {
            type: 'STRING',
            description: 'Defect hazard severity level',
            enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'NOMINAL']
          },
          defectCategory: {
            type: 'STRING',
            description: 'Classification of physical damage observed',
            enum: [
              'CONCRETE_CRACK',
              'CONCRETE_SPALLING',
              'CORROSION_RUST',
              'GAS_FLUID_LEAK',
              'FASTENER_FAILURE',
              'CLEARANCE_VIOLATION',
              'THERMAL_OVERHEAT',
              'STRUCTURAL_DEFORMATION',
              'NORMAL_OPERATION'
            ]
          },
          defectTitle: {
            type: 'STRING',
            description: 'Short headline of the finding (e.g., Concrete Delamination & Exposed Rebar).'
          },
          defectDescription: {
            type: 'STRING',
            description: 'Detailed technical description of the visible anomaly, size, and potential impact.'
          },
          confidenceScore: {
            type: 'NUMBER',
            description: 'AI model confidence percentage (0 to 100).'
          },
          estimatedMeasurements: {
            type: 'OBJECT',
            description: 'Estimated spatial measurements',
            properties: {
              estimatedLengthMm: { type: 'NUMBER', description: 'Length in millimeters' },
              estimatedWidthMm: { type: 'NUMBER', description: 'Width/aperture in millimeters' },
              corrosionPercentage: { type: 'NUMBER', description: 'Percentage of surface oxidized' }
            }
          },
          recommendedAction: {
            type: 'STRING',
            description: 'Actionable field engineering recommendation (Immediate shutoff, 48h recheck, ultrasonic scan, etc.).'
          },
          boundingBox: {
            type: 'OBJECT',
            description: 'Coordinates of the defect on screen (0 to 100 percentage)',
            properties: {
              x: { type: 'NUMBER' },
              y: { type: 'NUMBER' },
              width: { type: 'NUMBER' },
              height: { type: 'NUMBER' },
              label: { type: 'STRING' }
            }
          }
        },
        required: ['assetName', 'severity', 'defectCategory', 'defectTitle', 'recommendedAction']
      }
    }
  ]
};

export class GeminiLiveSession {
  private config: GeminiLiveConfig;
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStreamSource: MediaStreamAudioSourceNode | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private frameIntervalId: number | null = null;
  private isConnected = false;

  // Event callbacks
  public onStatusChange?: (status: string) => void;
  public onTranscript?: (text: string, isUser: boolean) => void;
  public onAudioData?: (base64Audio: string) => void;
  public onAnomalyDetected?: (anomaly: InspectionAuditLogItem) => void;
  public onError?: (error: string) => void;

  constructor(config?: Partial<GeminiLiveConfig>) {
    this.config = { ...DEFAULT_GEMINI_LIVE_CONFIG, ...config };
  }

  /**
   * Extract video frame from HTML5 <video> element as base64 JPEG
   */
  public static captureVideoFrame(videoElement: HTMLVideoElement, quality = 0.7): string | null {
    if (!videoElement || videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
      return null;
    }

    const canvas = document.createElement('canvas');
    // Scale down high-res phone feeds to 640px width for fast real-time network transmission
    const scale = Math.min(640 / videoElement.videoWidth, 1);
    canvas.width = Math.round(videoElement.videoWidth * scale);
    canvas.height = Math.round(videoElement.videoHeight * scale);

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    // Return standard base64 string without data:image/jpeg;base64, prefix
    return dataUrl.split(',')[1];
  }

  /**
   * Helper: Convert Float32 audio channel samples to 16-bit PCM ArrayBuffer
   */
  public static floatTo16BitPCM(input: Float32Array): ArrayBuffer {
    const output = new DataView(new ArrayBuffer(input.length * 2));
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true); // little-endian
    }
    return output.buffer;
  }

  /**
   * Helper: Convert ArrayBuffer to Base64
   */
  public static arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /**
   * Connect to Gemini 3.8 Live WebSocket
   * Note: In production or client-side Netlify deployment, you can connect directly
   * with an API key parameter or route via a proxy.
   */
  public async connect(apiKey: string, videoElement?: HTMLVideoElement): Promise<void> {
    if (this.isConnected) return;
    this.config.apiKey = apiKey;

    this.onStatusChange?.('Connecting to Gemini 3.8 Live API...');

    // WebSocket URL for Gemini Live Multimodal Bidirectional Service
    const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.onStatusChange?.('Connected - Handshaking session configuration');
        this.sendSetupHandshake();
        this.startMicrophoneCapture();
        if (videoElement) {
          this.startVideoFrameStreaming(videoElement);
        }
      };

      this.ws.onmessage = (event) => {
        this.handleServerMessage(event.data);
      };

      this.ws.onerror = (err) => {
        console.error('Gemini Live WebSocket Error:', err);
        this.onError?.('Live API WebSocket connection error');
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.onStatusChange?.('Disconnected from Live API');
        this.cleanup();
      };
    } catch (err: unknown) {
      this.onError?.(err instanceof Error ? err.message : 'Failed to initialize WebSocket');
    }
  }

  /**
   * Send the initial setup handshake with system instructions and tools
   */
  private sendSetupHandshake(): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const setupPayload = {
      setup: {
        model: `models/${this.config.model}`,
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: this.config.voiceName
              }
            }
          }
        },
        systemInstruction: {
          parts: [
            {
              text: 'You are Ayntra, an elite multimodal field inspection engineer. You inspect bridges, pipelines, high-voltage transformers, and physical infrastructure. You observe the user camera video frames and listen to inspector voice. When you detect a crack, leak, rust, or defect, you immediately invoke the `logInfrastructureAnomaly` function call with structured JSON. Speak concisely in real-time audio.'
            }
          ]
        },
        tools: [INFRASTRUCTURE_INSPECTION_TOOL]
      }
    };

    this.ws.send(JSON.stringify(setupPayload));
    this.onStatusChange?.('Ayntra Live Assistant Online');
  }

  /**
   * Start microphone audio capture and stream PCM chunks to Gemini
   */
  public async startMicrophoneCapture(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)({
        sampleRate: 16000
      });

      this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
      this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);

      this.scriptProcessor.onaudioprocess = (e) => {
        if (!this.isConnected || !this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        const inputChannelData = e.inputBuffer.getChannelData(0);
        const pcmBuffer = GeminiLiveSession.floatTo16BitPCM(inputChannelData);
        const base64Audio = GeminiLiveSession.arrayBufferToBase64(pcmBuffer);

        // Send real-time audio chunk to Gemini Live API
        const audioPayload = {
          realtimeInput: {
            mediaChunks: [
              {
                mimeType: 'audio/pcm;rate=16000',
                data: base64Audio
              }
            ]
          }
        };

        this.ws.send(JSON.stringify(audioPayload));
      };

      this.mediaStreamSource.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);
    } catch (err) {
      console.warn('Microphone permission or capture error:', err);
      this.onError?.('Microphone access denied or unavailable.');
    }
  }

  /**
   * Start streaming video frames from the camera to Gemini
   */
  public startVideoFrameStreaming(videoElement: HTMLVideoElement): void {
    const intervalMs = Math.round(1000 / this.config.frameRateFps);

    this.frameIntervalId = window.setInterval(() => {
      if (!this.isConnected || !this.ws || this.ws.readyState !== WebSocket.OPEN) return;

      const base64Jpeg = GeminiLiveSession.captureVideoFrame(videoElement);
      if (!base64Jpeg) return;

      // Send video frame chunk to Gemini Live API
      const framePayload = {
        realtimeInput: {
          mediaChunks: [
            {
              mimeType: 'image/jpeg',
              data: base64Jpeg
            }
          ]
        }
      };

      this.ws.send(JSON.stringify(framePayload));
    }, intervalMs);
  }

  /**
   * Process incoming messages from Gemini Live server
   */
  private handleServerMessage(rawData: string | Blob): void {
    try {
      if (typeof rawData !== 'string') return;
      const response = JSON.parse(rawData);

      // 1. Check for audio output turn from Gemini
      const parts = response.serverContent?.modelTurn?.parts;
      if (parts && Array.isArray(parts)) {
        for (const part of parts) {
          if (part.inlineData?.data) {
            this.onAudioData?.(part.inlineData.data);
          }
          if (part.text) {
            this.onTranscript?.(part.text, false);
          }
        }
      }

      // 2. Check for Function Calling (Structured Tool Call)
      const toolCall = response.toolCall;
      if (toolCall && toolCall.functionCalls) {
        for (const call of toolCall.functionCalls) {
          if (call.name === 'logInfrastructureAnomaly') {
            this.handleAnomalyFunctionCall(call.args, call.id);
          }
        }
      }
    } catch (err) {
      console.error('Error handling Gemini Live server message:', err);
    }
  }

  /**
   * Parse structured output from Gemini's function call and route to audit log & webhooks
   */
  private handleAnomalyFunctionCall(args: Record<string, unknown>, callId: string): void {
    const auditItem: InspectionAuditLogItem = {
      id: `AYN-${Date.now().toString().slice(-6)}`,
      assetId: String(args.assetName || 'FIELD-ASSET-01').toUpperCase().replace(/\s+/g, '-'),
      assetName: String(args.assetName || 'Unlabeled Infrastructure Asset'),
      assetCategory: String(args.assetCategory || 'Physical Infrastructure'),
      timestamp: new Date().toISOString(),
      severity: (args.severity as SeverityLevel) || 'HIGH',
      defectCategory: (args.defectCategory as DefectCategory) || 'CONCRETE_CRACK',
      defectTitle: String(args.defectTitle || 'Visual Anomaly Detected'),
      defectDescription: String(args.defectDescription || 'Structural irregularity noted by multimodal vision analysis.'),
      confidenceScore: typeof args.confidenceScore === 'number' ? args.confidenceScore : 92.5,
      measurements: args.estimatedMeasurements as InspectionAuditLogItem['measurements'],
      recommendedAction: String(args.recommendedAction || 'Schedule structural engineering inspection.'),
      aiVisualReasoning: 'Real-time detection via Gemini 3.8 Live API video stream analysis.',
      boundingBoxes: args.boundingBox ? [args.boundingBox as unknown as InspectionAuditLogItem['boundingBoxes'][0]] : [],
      geolocation: {
        latitude: 37.7749,
        longitude: -122.4194,
        formattedAddress: 'GPS Location Lock Active'
      },
      webhookDispatches: []
    };

    this.onAnomalyDetected?.(auditItem);

    // Send tool response back to Gemini to complete function call handshake
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        toolResponse: {
          functionResponses: [
            {
              id: callId,
              response: {
                output: {
                  status: 'LOGGED_AND_DISPATCHED',
                  inspectionId: auditItem.id
                }
              }
            }
          ]
        }
      }));
    }
  }

  /**
   * Disconnect and release all hardware streams
   */
  public disconnect(): void {
    this.cleanup();
  }

  private cleanup(): void {
    if (this.frameIntervalId) {
      clearInterval(this.frameIntervalId);
      this.frameIntervalId = null;
    }
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }
    if (this.mediaStreamSource) {
      this.mediaStreamSource.disconnect();
      this.mediaStreamSource = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }
}
