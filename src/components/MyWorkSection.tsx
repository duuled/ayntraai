/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/aiayntra';
const GUMROAD_URL = 'https://captainay7.gumroad.com/';
const HEALTH_URL = 'https://www.thishealthiswealth.com';
const FOOD_URL = 'https://theflavorcrave.com';

export const MyWorkSection: React.FC = () => {
  const playbooks = [
    'DeepSeek for Business',
    'Open-Source UGC Autopilot',
    'Your First Local Agent',
    'The Creator Funnel',
  ];

  return (
    <section id="work" className="py-20 sm:py-24 border-t border-purple-300/[0.09]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2.5 mb-12">
          <div className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
            02 · My Work
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Builds, playbooks, and brands I actually run.
          </h2>
          <p className="text-[#b7add4] text-sm sm:text-base leading-relaxed">
            Real agents, build guides, and live projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* 1. Ayntra agents for business */}
          <div className="lg:col-span-7 rounded-lg bg-[#10091e]/60 border border-purple-300/[0.12] p-6 sm:p-8 flex flex-col justify-between gap-6 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-sky-300 block">
                  FOR LOCAL BUSINESSES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Ayntra agents for business
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#d4cbe9] leading-relaxed">
                An AI receptionist and cold-calling agent for local businesses.
              </p>

              <div className="p-5 rounded-md bg-[#091E2C]/45 border border-sky-300/20 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-sky-300">
                  FREE DEMO OFFER
                </div>
                <p className="text-lg sm:text-2xl font-bold text-white leading-snug">
                  "I'll have my AI call 10 of your dead leads this week, free."
                </p>
                <p className="text-xs sm:text-sm text-[#d4cbe9] font-mono pt-1">
                  Setups from $250 after the demo.
                </p>
              </div>
            </div>

            <div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-purple-200 hover:bg-white text-[#080510] font-mono font-bold text-xs sm:text-sm transition-colors"
              >
                <span>DM me for the free demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Playbooks */}
          <div className="lg:col-span-5 rounded-lg bg-[#10091e]/60 border border-purple-300/[0.12] p-6 sm:p-8 flex flex-col justify-between gap-6 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 block">
                  STEP-BY-STEP BUILDS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Playbooks</h3>
              </div>

              <p className="text-sm sm:text-base text-[#d4cbe9] leading-relaxed">
                $17 playbooks that teach the exact builds. Also $9.99 ebook editions on Google Play.
              </p>

              <ol className="divide-y divide-purple-300/[0.08] border-y border-purple-300/[0.08]">
                {playbooks.map((title, idx) => (
                  <li
                    key={title}
                    className="flex items-center gap-3 py-3 text-sm text-white font-medium"
                  >
                    <span className="font-mono text-xs text-purple-300">
                      0{idx + 1}
                    </span>
                    <span>{title}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#130D1E]/85 hover:bg-[#1c132c] border border-purple-300/20 hover:border-sky-300/45 text-purple-100 font-mono font-semibold text-xs sm:text-sm transition-colors"
              >
                <span>Get the $17 playbooks on Gumroad</span>
                <ArrowUpRight className="w-4 h-4 text-sky-300" />
              </a>
            </div>
          </div>

          {/* 3. cramtools */}
          <div className="lg:col-span-4 rounded-lg bg-[#10091e]/55 border border-purple-300/[0.11] p-6 flex flex-col justify-between gap-5 backdrop-blur-sm">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">cramtools</h3>
              <p className="text-sm sm:text-base text-[#d4cbe9] leading-relaxed">
                Helps students with their majors.
              </p>
            </div>
            <div className="pt-3 border-t border-purple-300/[0.08] text-xs font-mono text-[#8f83b3]">
              App link coming soon.
            </div>
          </div>

          {/* 4. thishealthiswealth.com */}
          <div className="lg:col-span-4 rounded-lg bg-[#10091e]/55 border border-purple-300/[0.11] hover:border-sky-300/40 p-6 flex flex-col justify-between gap-5 backdrop-blur-sm transition-colors">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">thishealthiswealth.com</h3>
              <p className="text-sm sm:text-base text-[#d4cbe9] leading-relaxed">
                My health brand.
              </p>
            </div>
            <div className="pt-3 border-t border-purple-300/[0.08]">
              <a
                href={HEALTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-semibold text-sky-200 hover:text-white transition-colors"
              >
                <span>Visit thishealthiswealth.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 5. theflavorcrave.com */}
          <div className="lg:col-span-4 rounded-lg bg-[#10091e]/55 border border-purple-300/[0.11] hover:border-sky-300/40 p-6 flex flex-col justify-between gap-5 backdrop-blur-sm transition-colors">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">theflavorcrave.com</h3>
              <p className="text-sm sm:text-base text-[#d4cbe9] leading-relaxed">
                My food and recipe site.
              </p>
            </div>
            <div className="pt-3 border-t border-purple-300/[0.08]">
              <a
                href={FOOD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-semibold text-sky-200 hover:text-white transition-colors"
              >
                <span>Visit theflavorcrave.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
