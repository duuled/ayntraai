/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/aiayntra';

export const StartHereSection: React.FC = () => {
  return (
    <section id="start-here" className="py-16 sm:py-20 border-t border-purple-300/[0.09]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-[#10091e]/60 border border-purple-300/[0.12] p-7 sm:p-10 text-center space-y-5 backdrop-blur-sm">
          <div className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
            04 · Start Here (Free)
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            The $0 Agent Starter Checklist — free.
          </h2>

          <div className="pt-1">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-purple-200 hover:bg-white text-[#080510] font-mono font-bold text-sm active:scale-[0.98] transition-all"
            >
              <span>Get the free checklist</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
