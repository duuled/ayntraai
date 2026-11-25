/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Volume2 } from 'lucide-react';

interface HeroProps {
  onBrowseTools: () => void;
}

const INSTAGRAM_URL = 'https://www.instagram.com/aiayntra';

export const Hero: React.FC<HeroProps> = ({ onBrowseTools }) => {
  const [waveAmplitudes, setWaveAmplitudes] = useState<number[]>([
    24, 42, 68, 30, 85, 55, 95, 70, 48, 88, 62, 38, 76, 52, 34, 60
  ]);
  const [activeCallTime, setActiveCallTime] = useState(24);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWaveAmplitudes(
        Array.from({ length: 16 }, () => Math.floor(Math.random() * 70) + 18)
      );
    }, 160);

    const callTimer = setInterval(() => {
      setActiveCallTime((prev) => (prev >= 98 ? 14 : prev + 1));
    }, 1000);

    return () => {
      clearInterval(waveInterval);
      clearInterval(callTimer);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-[#a597c7] tracking-widest uppercase">
            <span className="text-purple-200">AYNTRA — OPEN-SOURCE DIRECTORY FOR BUILDING AI AGENTS</span>
            <span aria-hidden="true" className="text-purple-400/40">/</span>
            <span>VOICE · SMS · CHAT · WEB</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
            AI agents that cold-call, follow up, and book appointments while you sleep.
          </h1>

          <p className="text-base sm:text-xl text-[#d4cbe9]/90 max-w-3xl mx-auto leading-relaxed font-normal">
            One platform across voice, SMS, chat, and web. Deploy a dedicated outbound sales caller, 24/7 receptionist, and automated follow-up engine that convert cold leads into booked calendar meetings.
          </p>

          <p className="text-xs sm:text-sm font-mono text-sky-200/85 tracking-wide">
            Free tools. Real builds. No subscription needed to start.
          </p>

          {/* Minimalist Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={onBrowseTools}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-mono font-semibold text-[#080510] bg-purple-200 hover:bg-white rounded-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Browse the free tools</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-mono font-medium text-purple-100 hover:text-white bg-[#130D1E]/70 hover:bg-[#1a1129] border border-purple-300/20 hover:border-sky-300/45 rounded-md transition-all flex items-center justify-center gap-2"
            >
              <span>Get the free checklist</span>
              <ArrowUpRight className="w-4 h-4 text-sky-300" />
            </a>
          </div>
        </div>

        {/* Minimalist Digitalized Flagship Cold-Calling Agent Console */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-xl bg-[#10091e]/65 border border-purple-300/[0.12] backdrop-blur-md overflow-hidden">
            {/* Top terminal hairline */}
            <div className="px-4 py-3 bg-[#0a0614]/80 border-b border-purple-300/[0.09] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#a597c7]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
                <span className="text-purple-100 font-semibold">FLAGSHIP COLD-CALLING AGENT</span>
                <span className="text-purple-400/40">/</span>
                <span className="text-sky-300">CALL ID #AYN-9842</span>
              </div>
              <div className="flex items-center gap-3">
                <span>LATENCY: <strong className="text-sky-200">540ms</strong></span>
                <span className="text-purple-400/40">·</span>
                <span>PSTN LIVE 00:{activeCallTime < 10 ? `0${activeCallTime}` : activeCallTime}</span>
              </div>
            </div>

            {/* Minimalist Transcript + Waveform */}
            <div className="p-5 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 max-w-xl">
                  <div className="w-7 h-7 rounded border border-sky-300/30 bg-[#091E2C]/65 text-sky-200 flex items-center justify-center text-[11px] font-mono font-bold shrink-0">
                    AI
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#091E2C]/50 border border-purple-300/[0.09] text-xs sm:text-sm text-[#e6e0f5] leading-relaxed">
                    <span className="text-sky-300 font-mono text-[11px] block mb-1">ayntra Voice Agent:</span>
                    "Hey Alex, saw your team added 4 new technicians last month. Most commercial HVAC operators we work with lose 25% of inbound calls during peak heat waves—are you answering 100% of emergency leads after 6 PM?"
                  </div>
                </div>

                <div className="flex items-start gap-3 max-w-md ml-auto">
                  <div className="p-3.5 rounded-lg bg-[#130D1E]/85 border border-purple-300/[0.12] text-xs sm:text-sm text-[#e6e0f5] leading-relaxed text-right">
                    <span className="text-purple-300 font-mono text-[11px] block mb-1">Prospect (Alex M.):</span>
                    "Honestly, we miss quite a few on weekends. But we already looked at answering services, they're terrible."
                  </div>
                  <div className="w-7 h-7 rounded border border-purple-300/30 bg-[#19102a] text-purple-200 flex items-center justify-center text-[11px] font-mono font-bold shrink-0">
                    PRO
                  </div>
                </div>
              </div>

              {/* Digitalized Audio Waveform Strip */}
              <div className="pt-5 border-t border-purple-300/[0.09] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-purple-300/25 bg-[#130D1E]/80 text-sky-300 flex items-center justify-center">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-white">Full-Duplex Conversational Audio</div>
                    <div className="text-[11px] font-mono text-[#a597c7]">Natural voice cadence, zero awkward pauses, human interruptions</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 h-9 px-3 py-1 rounded border border-purple-300/[0.1] bg-[#080510]/80">
                  {waveAmplitudes.map((amp, idx) => (
                    <div
                      key={idx}
                      className="w-0.5 rounded-full bg-gradient-to-t from-purple-300/80 to-sky-300/90 transition-all duration-150"
                      style={{ height: `${Math.max(8, Math.min(30, amp * 0.35))}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
