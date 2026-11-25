/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Play, 
  Settings, 
  UploadCloud, 
  Share2, 
  Radio, 
  MapPin, 
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

interface HeaderProps {
  onSimulate: () => void;
  isSimulating: boolean;
  onOpenSettings: () => void;
  onOpenWebhooks: () => void;
  onOpenNetlifyGuide: () => void;
  totalLogsCount: number;
  criticalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSimulate,
  isSimulating,
  onOpenSettings,
  onOpenWebhooks,
  onOpenNetlifyGuide,
  totalLogsCount,
  criticalCount
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3 py-2.5 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Brand & System Status */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-white font-black text-sm tracking-tighter">
            <span>AY</span>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                AYNTRA INNOVATION
              </h1>
              <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                FIELD AI
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>MULTIMODAL LIVE</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>GPS LOCK (37.77° N, -122.41° W)</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{timeStr}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Critical Badge */}
          {criticalCount > 0 && (
            <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-semibold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>{criticalCount} CRITICAL</span>
            </div>
          )}

          {/* Simulate Live Inspection Button */}
          <button
            onClick={onSimulate}
            disabled={isSimulating}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md ${
              isSimulating
                ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 cursor-wait'
                : 'bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-blue-600 hover:to-blue-500 text-white shadow-cyan-500/25 active:scale-95'
            }`}
            title="Test dashboard without live API key"
          >
            {isSimulating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span className="font-mono">Analyzing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Live Inspection</span>
              </>
            )}
          </button>

          {/* Webhooks Setup */}
          <button
            onClick={onOpenWebhooks}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition"
            title="Configure Make.com & Supabase Webhooks"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Webhooks</span>
          </button>

          {/* Netlify Guide */}
          <button
            onClick={onOpenNetlifyGuide}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 hover:text-emerald-200 border border-emerald-800/60 text-xs font-medium flex items-center gap-1.5 transition"
            title="Instructions to deploy directly on Netlify"
          >
            <UploadCloud className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Netlify Deploy</span>
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
            title="API Keys & Audio Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
