/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  Activity, 
  FileJson, 
  ExternalLink,
  RefreshCw,
  Cpu,
  Mic
} from 'lucide-react';
import { InspectionAuditLogItem } from '../types/inspection';

interface InspectionDetailModalProps {
  item: InspectionAuditLogItem | null;
  onClose: () => void;
  onDispatchWebhooks: (item: InspectionAuditLogItem) => Promise<void>;
}

export const InspectionDetailModal: React.FC<InspectionDetailModalProps> = ({
  item,
  onClose,
  onDispatchWebhooks
}) => {
  const [copied, setCopied] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);

  if (!item) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(item, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerDispatch = async () => {
    setIsDispatching(true);
    await onDispatchWebhooks(item);
    setIsDispatching(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="font-bold text-sm sm:text-base text-white font-mono">
              INSPECTION RECORD: {item.id}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs sm:text-sm">
          {/* Main Title & Severity Banner */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {item.assetCategory}
                </span>
                <span className="text-slate-400 font-mono text-xs">
                  {item.assetId}
                </span>
              </div>
              <h4 className="font-extrabold text-base text-white">
                {item.defectTitle}
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                {item.assetName}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-3 py-1 rounded-lg font-mono font-bold text-xs bg-rose-950/80 border border-rose-700 text-rose-300">
                {item.severity} SEVERITY
              </span>
              <span className="px-2.5 py-1 rounded-lg font-mono text-xs bg-slate-800 text-slate-300 border border-slate-700">
                {Math.round(item.confidenceScore)}% ACCURACY
              </span>
            </div>
          </div>

          {/* Description & Action Plan */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-1">
                Visual Inspection Findings:
              </label>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200 leading-relaxed">
                {item.defectDescription}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                Recommended Action Protocol:
              </label>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/60 text-cyan-200 font-medium">
                {item.recommendedAction}
              </div>
            </div>
          </div>

          {/* Multimodal Telemetry: Voice Prompt & AI Reasoning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-bold text-[11px] mb-1">
                <Mic className="w-3.5 h-3.5" />
                <span>INSPECTOR AUDIO PROMPT</span>
              </div>
              <p className="text-slate-300 italic">
                "{item.inspectorVoicePrompt || 'Direct live vision trigger'}"
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-purple-400 font-mono font-bold text-[11px] mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>GEMINI 3.8 REASONING</span>
              </div>
              <p className="text-slate-300">
                {item.aiVisualReasoning || 'Multimodal spatial recognition pattern matched'}
              </p>
            </div>
          </div>

          {/* Spatial Measurements & GPS */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">EST. LENGTH</span>
              <span className="font-bold text-cyan-300">
                {item.measurements?.estimatedLengthMm ? `${item.measurements.estimatedLengthMm} mm` : 'N/A'}
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">EST. WIDTH</span>
              <span className="font-bold text-cyan-300">
                {item.measurements?.estimatedWidthMm ? `${item.measurements.estimatedWidthMm} mm` : 'N/A'}
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">OXIDATION</span>
              <span className="font-bold text-amber-300">
                {item.measurements?.corrosionPercentage !== undefined ? `${item.measurements.corrosionPercentage}%` : '0%'}
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">LAT / LNG</span>
              <span className="font-bold text-slate-300 text-[11px]">
                {item.geolocation.latitude.toFixed(3)}, {item.geolocation.longitude.toFixed(3)}
              </span>
            </div>
          </div>

          {/* Webhook Dispatch History */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono uppercase text-slate-400 font-bold">
                External Webhook Dispatches:
              </label>
              <button
                onClick={handleTriggerDispatch}
                disabled={isDispatching}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-mono flex items-center gap-1 transition"
              >
                {isDispatching ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                <span>Re-send All Webhooks</span>
              </button>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              {item.webhookDispatches.map((wh, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {wh.destination}
                    </span>
                    <span className="text-slate-400 truncate text-[11px]">
                      {wh.endpoint}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    wh.status === 'SUCCESS' || wh.status === 'MOCK_SUCCESS'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {wh.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Structured JSON Output Viewer */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
                <FileJson className="w-3.5 h-3.5 text-cyan-400" />
                <span>Raw Structured Function Calling JSON:</span>
              </label>
              <button
                onClick={handleCopyJson}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono flex items-center gap-1 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto max-h-48 leading-relaxed">
              {JSON.stringify(item, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
