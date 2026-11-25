/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/aiayntra';

export const ForBusinessesSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      text: 'I build your demo agent.',
    },
    {
      num: '02',
      text: 'It calls 10 of your dead leads, free.',
    },
    {
      num: '03',
      text: 'If it books appointments, you keep it.',
    },
  ];

  return (
    <section id="for-businesses" className="py-20 border-t border-purple-300/[0.09]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2.5">
          <div className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
            05 · For Businesses
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            How the free AI demo works.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-lg bg-[#10091e]/55 border border-purple-300/[0.11] p-6 space-y-3 backdrop-blur-sm"
            >
              <span className="text-sm font-mono font-bold text-sky-200 block">
                {step.num}
              </span>
              <p className="text-base sm:text-lg font-semibold text-white leading-snug">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-purple-200 hover:bg-white text-[#080510] font-mono font-bold text-sm active:scale-[0.98] transition-all"
          >
            <span>Book a free demo</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
