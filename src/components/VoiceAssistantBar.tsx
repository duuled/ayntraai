/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Activity, 
  Radio, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { AssistantState } from '../types/inspection';

interface VoiceAssistantBarProps {
  assistantState: AssistantState;
  transcript: string;
  aiReply: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onTriggerInspectionPrompt?: () => void;
}

export const VoiceAssistantBar: React.FC<VoiceAssistantBarProps> = ({
  assistantState,
  transcript,
  aiReply,
  isMuted,
  onToggleMute,
  onTriggerInspectionPrompt
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([12, 18, 24, 14, 28, 20, 10, 22]);

  // Animate waveform bars when actively listening or speaking
  useEffect(() => {
    if (assistantState === 'LISTENING' || assistantState === 'SPEAKING' || assistantState === 'SIMULATING') {
      const interval = setInterval(() => {
        setWaveHeights(
          Array.from({ length: 8 }, () => Math.floor(Math.random() * 26) + 8)
        );
      }, 120);
      return () => clearInterval(interval);
    } else {
      setWaveHeights([8, 8, 8, 8, 8, 8, 8, 8]);
    }
  }, [assistantState]);

  const getStateBadge = () => {
    switch (assistantState) {
      case 'CONNECTING':
        return { label: 'CONNECTING LIVE API', color: 'bg-amber-950/80 border-amber-600/60 text-amber-300' };
      case 'LISTENING':
        return { label: 'LISTENING (16kHz PCM)', color: 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300' };
      case 'ANALYZING':
        return { label: 'MULTIMODAL REASONING', color: 'bg-purple-950/80 border-purple-500/60 text-purple-300' };
      case 'SPEAKING':
        return { label: 'AYNTRA SPEAKING', color: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300' };
      case 'SIMULATING':
        return { label: 'SIMULATED LIVE AUDIO', color: 'bg-blue-950/80 border-blue-500/60 text-blue-300' };
      case 'ERROR':
        return { label: 'CONNECTION OFFLINE', color: 'bg-rose-950/80 border-rose-600/60 text-rose-300' };
      default:
        return { label: 'STANDBY / READY', color: 'bg-slate-900 border-slate-700 text-slate-400' };
    }
  };

  const badge = getStateBadge();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-lg transition-all duration-300">
      <div className="relative rounded-2xl bg-slate-950/95 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-950/50 p-2.5 sm:p-3">
        {/* Glow Border Effect */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-emerald-500/20 blur opacity-60 pointer-events-none" />

        <div className="relative flex items-center justify-between gap-3">
          {/* Mic Button & Waveform */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleMute}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                isMuted
                  ? 'bg-rose-950/70 border border-rose-800 text-rose-400'
                  : 'bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 shadow-sm'
              }`}
              title={isMuted ? 'Unmute Field Mic' : 'Mute Field Mic'}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 animate-pulse" />}
            </button>

            {/* Audio Wave Visualizer Bars */}
            <div className="flex items-center gap-1 h-7 px-1">
              {waveHeights.map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-100 ${
                    isMuted
                      ? 'bg-slate-700 h-2'
                      : assistantState === 'SPEAKING'
                      ? 'bg-emerald-400'
                      : assistantState === 'SIMULATING'
                      ? 'bg-blue-400'
                      : 'bg-cyan-400'
                  }`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>

          {/* Status Label & Active Live Indicator */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${badge.color}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                {badge.label}
              </span>
            </div>

            {/* Snippet preview */}
            <p className="text-[11px] text-slate-300 font-medium truncate mt-0.5">
              {transcript ? (
                <span className="text-cyan-300 italic">"{transcript}"</span>
              ) : aiReply ? (
                <span className="text-emerald-300">"{aiReply}"</span>
              ) : (
                <span className="text-slate-500">Multimodal voice & frame inspection active...</span>
              )}
            </p>
          </div>

          {/* Toggle Expand / Conversation Bubble */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            title="Expand Voice Transcript Log"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Transcript Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs font-mono space-y-2 max-h-40 overflow-y-auto pr-1">
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-0.5 text-[10px] uppercase">Inspector Audio Feed:</span>
              <p className="text-slate-200">{transcript || 'No active speech input recorded yet.'}</p>
            </div>
            {aiReply && (
              <div className="p-2 rounded bg-cyan-950/40 border border-cyan-800/50">
                <span className="text-emerald-400 font-bold block mb-0.5 text-[10px] uppercase">Ayntra Voice Assistant:</span>
                <p className="text-slate-200">{aiReply}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
