/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export const StatsStrip: React.FC = () => {
  const stats = [
    {
      value: '24/7',
      metric: 'availability',
      description: 'Zero missed inbound calls, zero unworked leads, active nights & weekends.',
      detail: '100% call capture rate',
    },
    {
      value: '<2s',
      metric: 'response time',
      description: 'Instant lead dialing within 90 seconds of web inquiry, sub-second speech latency.',
      detail: '540ms audio round-trip',
    },
    {
      value: '+40%',
      metric: 'more appointments booked',
      description: 'Systematic objection handling and direct calendar sync across outbound calls.',
      detail: 'Verified in 12,000+ live calls',
    },
  ];

  return (
    <section className="relative py-12 border-y border-white/[0.08] bg-[#07080c]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col space-y-2 ${idx !== 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}
            >
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-mono tabular-nums bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                  {stat.metric}
                </span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {stat.description}
              </p>
              <div className="pt-1 text-xs text-neutral-500 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
