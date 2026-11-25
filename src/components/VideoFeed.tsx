/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Camera, 
  FlipHorizontal, 
  Zap, 
  ZapOff, 
  Crosshair, 
  Maximize2, 
  ShieldAlert, 
  Compass, 
  Layers, 
  VideoOff,
  Sparkles,
  CameraOff
} from 'lucide-react';
import { BoundingBox, SeverityLevel } from '../types/inspection';

interface VideoFeedProps {
  onCaptureFrame?: (base64Jpeg: string) => void;
  activeBoundingBoxes: BoundingBox[];
  latestDefectTitle?: string;
  latestSeverity?: SeverityLevel;
  isInspecting: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({
  onCaptureFrame,
  activeBoundingBoxes,
  latestDefectTitle,
  latestSeverity,
  isInspecting,
  videoRef
}) => {
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState(false);
  const [hasTorchSupport, setHasTorchSupport] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [videoResolution, setVideoResolution] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [heading, setHeading] = useState<number>(312);
  const [isFlashing, setIsFlashing] = useState(false);

  // Compass orientation listener if mobile device has sensors
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setHeading(Math.round(e.alpha));
      }
    };
    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, []);

  // Initialize Camera Stream
  const initCamera = useCallback(async (facing: 'environment' | 'user') => {
    try {
      setCameraError(null);

      // Stop existing tracks first
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.error);
        setCameraActive(true);

        // Check torch capabilities
        const track = stream.getVideoTracks()[0];
        if (track) {
          const capabilities = track.getCapabilities ? (track.getCapabilities() as unknown as { torch?: boolean }) : {};
          setHasTorchSupport(Boolean(capabilities?.torch));
        }
      }
    } catch (err: unknown) {
      console.warn('Could not access camera:', err);
      setCameraError('Camera access unavailable or permission denied. Multimodal simulation is fully active.');
      setCameraActive(false);
    }
  }, [videoRef]);

  useEffect(() => {
    initCamera(facingMode);
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode, initCamera, videoRef]);

  // Flip Camera
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Toggle Torch
  const toggleTorch = async () => {
    if (!videoRef.current?.srcObject) return;
    const stream = videoRef.current.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];
    if (track) {
      try {
        const nextState = !torchOn;
        await track.applyConstraints({
          advanced: [{ torch: nextState } as unknown as MediaTrackConstraintSet]
        });
        setTorchOn(nextState);
      } catch (err) {
        console.warn('Torch constraint error:', err);
      }
    }
  };

  // Snapshot flash trigger
  const handleShutterClick = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    if (videoRef.current && onCaptureFrame) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        onCaptureFrame(canvas.toDataURL('image/jpeg', 0.8));
      }
    }
  };

  const getSeverityColor = (sev?: SeverityLevel) => {
    switch (sev) {
      case 'CRITICAL':
        return 'border-rose-500 text-rose-400 bg-rose-950/40 shadow-rose-500/30';
      case 'HIGH':
        return 'border-amber-500 text-amber-400 bg-amber-950/40 shadow-amber-500/30';
      case 'MEDIUM':
        return 'border-yellow-500 text-yellow-400 bg-yellow-950/40 shadow-yellow-500/30';
      case 'NOMINAL':
        return 'border-emerald-500 text-emerald-400 bg-emerald-950/40 shadow-emerald-500/30';
      default:
        return 'border-cyan-500 text-cyan-400 bg-cyan-950/40 shadow-cyan-500/30';
    }
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] bg-slate-950 overflow-hidden border-b border-slate-800 select-none">
      {/* Visual Camera Flash Animation */}
      {isFlashing && (
        <div className="absolute inset-0 bg-white z-40 pointer-events-none transition-opacity duration-200" />
      )}

      {/* Actual HTML5 Video Stream */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setVideoResolution({
              width: videoRef.current.videoWidth,
              height: videoRef.current.videoHeight,
            });
          }
        }}
        className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
      />

      {/* Fallback Display if camera not active or permissions blocked */}
      {!cameraActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-center px-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400 mb-3 shadow-inner">
            <CameraOff className="w-7 h-7" />
          </div>
          <p className="text-slate-200 font-semibold text-sm max-w-sm mb-1">
            Simulated Camera Active
          </p>
          <p className="text-slate-400 text-xs max-w-xs mb-3 font-mono">
            {cameraError || 'Click button below to enable physical mobile lens or test with simulated infrastructure assets.'}
          </p>
          <button
            onClick={() => initCamera(facingMode)}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow flex items-center gap-1.5 transition"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Request Camera Access</span>
          </button>
        </div>
      )}

      {/* AR HUD: Grid & Crosshairs */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Optical Scanning Line (if inspecting) */}
        {isInspecting && (
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-[scan_2.5s_ease-in-out_infinite]" />
        )}

        {/* Reticle / Center Target */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-32 h-32 border border-cyan-400/50 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
          </div>
          <div className="absolute w-44 h-0.5 bg-cyan-400/30" />
          <div className="absolute h-44 w-0.5 bg-cyan-400/30" />
        </div>

        {/* Corner HUD Markers */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/70" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/70" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/70" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70" />
      </div>

      {/* Dynamic AI Defect Bounding Boxes */}
      {activeBoundingBoxes.map((box, idx) => (
        <div
          key={idx}
          className={`absolute z-20 border-2 rounded-sm transition-all duration-300 pointer-events-none shadow-lg ${getSeverityColor(latestSeverity)}`}
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
          }}
        >
          {/* Label tag above bounding box */}
          <div className="absolute -top-6 left-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950/90 border border-current text-[10px] font-mono font-bold tracking-tight whitespace-nowrap shadow-md">
            <ShieldAlert className="w-2.5 h-2.5" />
            <span>{box.label}</span>
            <span className="opacity-75">({Math.round(box.confidence * 100)}%)</span>
          </div>

          {/* Corner highlights */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-current" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-current" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-current" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-current" />
        </div>
      ))}

      {/* Top HUD Telemetry Strip */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-cyan-300 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-200 font-semibold">FEED LIVE</span>
          <span className="text-slate-500">|</span>
          <span>{videoResolution.width ? `${videoResolution.width}x${videoResolution.height}` : '720p HD'}</span>
          <span className="text-slate-500">|</span>
          <span>30 FPS</span>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>{heading}° NW</span>
          <span className="text-slate-500">|</span>
          <span>FOV 68°</span>
        </div>
      </div>

      {/* Bottom Live Defect Notice (if recently detected) */}
      {latestDefectTitle && (
        <div className="absolute bottom-16 inset-x-4 sm:inset-x-8 z-20 flex justify-center pointer-events-none">
          <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md flex items-center gap-2 shadow-xl animate-bounce ${getSeverityColor(latestSeverity)}`}>
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <div className="text-xs font-semibold truncate">
              <span>{latestSeverity}: {latestDefectTitle}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Camera Control Bar */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-20">
        {/* Facing Mode Switcher */}
        <button
          onClick={toggleFacingMode}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-200 hover:text-white backdrop-blur-md flex items-center gap-1.5 text-xs font-medium transition active:scale-95"
          title="Switch front/back camera"
        >
          <FlipHorizontal className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline font-mono">
            {facingMode === 'environment' ? 'BACK LENS' : 'FRONT LENS'}
          </span>
        </button>

        {/* Center Snapshot Shutter Button */}
        <button
          onClick={handleShutterClick}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 active:scale-90 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 border-2 border-white transition-transform"
          title="Capture high-res frame for AI inspection"
        >
          <Camera className="w-5 h-5 fill-current" />
        </button>

        {/* Torch / Flashlight Toggle */}
        <button
          onClick={toggleTorch}
          disabled={!hasTorchSupport}
          className={`p-2 sm:px-3 sm:py-2 rounded-xl border backdrop-blur-md flex items-center gap-1.5 text-xs font-medium transition active:scale-95 ${
            torchOn
              ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
              : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-300'
          } ${!hasTorchSupport ? 'opacity-40 cursor-not-allowed' : ''}`}
          title={hasTorchSupport ? 'Toggle inspector LED torch' : 'Torch not supported on this device lens'}
        >
          {torchOn ? <Zap className="w-4 h-4 fill-amber-400 text-amber-400" /> : <ZapOff className="w-4 h-4" />}
          <span className="hidden sm:inline font-mono">TORCH</span>
        </button>
      </div>
    </div>
  );
};
