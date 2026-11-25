/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onSelectTier: (tierName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectTier }) => {
  const [annualBilling, setAnnualBilling] = useState(false);

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      badge: 'FOR BOUTIQUE OPERATIONS',
      monthlyPrice: 497,
      annualPrice: 397,
      description: 'Ideal for local businesses and solo operators looking to automate inbound calls or launch small outbound campaigns.',
      features: [
        '1 Active AI Agent (Cold Caller OR Receptionist)',
        '500 monthly voice calling minutes included',
        'Unlimited 2-way SMS follow-up sequences',
        '1 Calendar connection (Cal.com / Google)',
        'Standard knowledge base (Up to 5 documents)',
        'Standard voice latency (~850ms)',
        'Email support with 24-hour turnaround'
      ],
      isPopular: false,
      ctaText: 'Deploy Starter'
    },
    {
      id: 'growth',
      name: 'Growth',
      badge: 'MOST POPULAR FOR SCALING TEAMS',
      monthlyPrice: 1297,
      annualPrice: 1037,
      description: 'Built for sales teams and growing service businesses that need a multi-agent floor booking meetings around the clock.',
      features: [
        'Up to 3 Active AI Agents (Cold Caller + Receptionist + Follow-Up)',
        '2,000 monthly voice calling minutes included',
        'Bi-directional CRM sync (GoHighLevel, HubSpot, Salesforce)',
        'Ultra-low voice latency (~540ms conversational round-trip)',
        'Custom objection-handling decision trees',
        'Dedicated local caller ID phone numbers (10DLC verified)',
        'Automated call recording & sentiment scoring',
        'Priority Slack & phone support with technical onboarding'
      ],
      isPopular: true,
      ctaText: 'Start with Growth'
    },
    {
      id: 'scale',
      name: 'Scale',
      badge: 'FOR HIGH-VOLUME ENTERPRISES',
      monthlyPrice: 2997,
      annualPrice: 2397,
      description: 'Full omnichannel automation with all 5 specialized agents, custom voice cloning, and direct developer API access.',
      features: [
        'All 5 AI Agents fully deployed and coordinated',
        '6,000 monthly voice calling minutes included',
        'Custom voice cloning of your top sales representative',
        'Unlimited knowledge base documents & web sync',
        'MCP (Model Context Protocol) server integration',
        'Dedicated phone number rotation pool to prevent spam flags',
        'Custom webhook pipelines to internal backends',
        'Dedicated Customer Success Architect & 99.9% uptime SLA'
      ],
      isPopular: false,
      ctaText: 'Schedule Scale Consultation'
    }
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#08090f] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            TRANSPARENT PRICING
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Replace a $120k sales development team for a fraction of the cost.
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            No per-seat fees. No long-term lock-ins. Scale minutes up or down as your pipeline expands.
          </p>

          {/* Billing Toggle (Monthly / Annual) */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-mono">
            <span className={!annualBilling ? 'text-white font-bold' : 'text-neutral-400'}>
              MONTHLY BILLING
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative w-12 h-6 rounded-full bg-neutral-800 p-0.5 transition-colors focus:outline-none"
              aria-label="Toggle annual billing discount"
            >
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-md transform transition-transform ${
                  annualBilling ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={annualBilling ? 'text-white font-bold' : 'text-neutral-400'}>
              ANNUAL BILLING <span className="text-cyan-400 font-bold">(SAVE 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = annualBilling ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  tier.isPopular
                    ? 'bg-[#101422] border-2 border-cyan-400/80 shadow-2xl shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                    : 'bg-[#0b0c13] border border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                {/* Popular Ribbon */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-lg">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    {!tier.isPopular && (
                      <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                        {tier.badge}
                      </span>
                    )}
                    <h3 className="text-2xl font-black text-white">{tier.name}</h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1.5 pb-6 border-b border-white/[0.08]">
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      / month
                    </span>
                    {annualBilling && (
                      <span className="text-[10px] text-cyan-400 font-mono ml-auto">
                        Billed annually
                      </span>
                    )}
                  </div>

                  {/* Features list */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                      INCLUDED IN PLAN:
                    </span>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => onSelectTier(tier.name)}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-violet-600 hover:to-violet-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-white/[0.1] active:scale-[0.98]'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-[11px] text-center text-neutral-500 font-mono mt-2.5">
                    14-day risk-free pilot · Cancel anytime
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
