/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Ayntra Innovation - Multimodal Inspection Types
 */

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NOMINAL';

export type DefectCategory =
  | 'CONCRETE_CRACK'
  | 'CONCRETE_SPALLING'
  | 'CORROSION_RUST'
  | 'GAS_FLUID_LEAK'
  | 'FASTENER_FAILURE'
  | 'CLEARANCE_VIOLATION'
  | 'THERMAL_OVERHEAT'
  | 'STRUCTURAL_DEFORMATION'
  | 'NORMAL_OPERATION';

export interface BoundingBox {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  width: number; // percentage 0 - 100
  height: number; // percentage 0 - 100
  label: string;
  confidence: number;
}

export interface GeoLocationData {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
  formattedAddress?: string;
}

export interface WebhookDispatchResult {
  destination: 'MAKE_COM' | 'SUPABASE' | 'GOOGLE_MAPS' | 'CUSTOM';
  endpoint: string;
  timestamp: string;
  status: 'SUCCESS' | 'MOCK_SUCCESS' | 'FAILED' | 'PENDING';
  statusCode?: number;
  responsePayload?: unknown;
  error?: string;
}

export interface InspectionAuditLogItem {
  id: string;
  assetId: string;
  assetName: string;
  assetCategory: string;
  timestamp: string;
  severity: SeverityLevel;
  defectCategory: DefectCategory;
  defectTitle: string;
  defectDescription: string;
  confidenceScore: number; // 0 - 100%
  measurements?: {
    estimatedLengthMm?: number;
    estimatedWidthMm?: number;
    depthMm?: number;
    corrosionPercentage?: number;
  };
  recommendedAction: string;
  inspectorVoicePrompt?: string;
  aiVisualReasoning?: string;
  snapshotUrl?: string; // Data URL or Image placeholder
  boundingBoxes: BoundingBox[];
  geolocation: GeoLocationData;
  webhookDispatches: WebhookDispatchResult[];
}

export interface WebhookConfig {
  makeWebhookUrl: string;
  makeEnabled: boolean;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseTable: string;
  supabaseEnabled: boolean;
  googleMapsApiKey: string;
  googleMapsEnabled: boolean;
  customWebhookUrl: string;
  customEnabled: boolean;
  autoDispatchOnCritical: boolean;
}

export type AssistantState =
  | 'IDLE'
  | 'CONNECTING'
  | 'LISTENING'
  | 'ANALYZING'
  | 'SPEAKING'
  | 'SIMULATING'
  | 'ERROR';

export interface AssistantTelemetry {
  state: AssistantState;
  transcript: string;
  modelResponse: string;
  audioInputLevel: number; // 0 - 100
  fps: number;
  framesSent: number;
  lastAnalysisDurationMs: number;
}
