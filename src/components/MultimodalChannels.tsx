/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  Globe, 
  Smartphone, 
  Layers, 
  ArrowRight, 
  Check, 
  Sparkles,
  Database,
  RefreshCw
} from 'lucide-react';

export const MultimodalChannels: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'voice' | 'sms' | 'web' | 'whatsapp'>('voice');

  const channels = [
    {
      id: 'voice',
      name: 'Voice Calls',
      badge: 'PHONE & SIP',
      headline: 'Full-duplex phone calls with human-grade prosody',
      description:
        'Inbound & outbound telecommunication over standard cellular and landline networks. Powered by sub-second streaming audio, natural backchanneling ("mhm", "got it"), and real-time interruption handling.',
      capabilities: [
        'Automatic local area code dialing',
        'Gatekeeper & voicemail detection algorithms',
        'Live sentiment and compliance monitoring'
      ],
      sampleOutput: 'Caller: "What is your pricing?" → Agent: "Our commercial service starts at $1,200 with zero long-term contract. Would you like a breakdown sent over SMS?"',
      latency: '540ms round-trip',
      icon: PhoneCall
    },
    {
      id: 'sms',
      name: 'SMS Messaging',
      badge: 'A2P 10DLC CERTIFIED',
      headline: 'Two-way conversational texting with instant calendar booking',
      description:
        'High-deliverability SMS sequences that feel like texting a real human SDR. Prospects can ask questions, verify quotes, and confirm meeting appointments with 1-tap links.',
      capabilities: [
        'Automated 10DLC carrier compliance & spam filtering',
        'Smart delay timing so responses feel authentic',
        'Instant link generation for Cal.com or Google Meet'
      ],
      sampleOutput: 'SMS: "Hey Marcus, saw you requested a roof assessment. Does Thursday 10 AM or Friday 2 PM work best for our inspector to swing by?"',
      latency: '<1.2s delivery',
      icon: MessageSquare
    },
    {
      id: 'web',
      name: 'Web Chat Widget',
      badge: 'EMBEDDABLE JS',
      headline: 'Lightweight high-converting site visitor assistant',
      description:
        'Drop a 2-line JavaScript snippet onto your website. Answers visitor FAQs instantly from your docs, qualifies their budget, and routes high-intent buyers into phone calls on the spot.',
      capabilities: [
        'Semantic search across all uploaded company documentation',
        'Instant click-to-call escalation widget',
        'Zero impact on website Core Web Vitals or page speed'
      ],
      sampleOutput: 'Web: Visitor asks for SOC2 compliance report → Agent validates enterprise email and provides PDF link instantly.',
      latency: '380ms streaming',
      icon: Globe
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      badge: 'META CLOUD API',
      headline: 'Global customer communication on the world’s leading messenger',
      description:
        'Engage international prospects and VIP clients over WhatsApp with rich media messages, automated quotation PDFs, and verified business badges.',
      capabilities: [
        'Official WhatsApp Cloud API infrastructure',
        'Rich interactive buttons and catalog browsing',
        'Multi-lingual real-time translation across 40+ languages'
      ],
      sampleOutput: 'WhatsApp: Sends interactive appointment buttons [Confirm 2 PM] [Reschedule] with location map pinpoint.',
      latency: 'Instant sync',
      icon: Smartphone
    }
  ];

  const current = channels.find((c) => c.id === activeChannel) || channels[0];

  return (
    <section className="py-24 relative overflow-hidden bg-[#07080c] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            OMNICHANNEL SYNCHRONICITY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            One platform. Every channel.
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Your agents share one brain. Start on a cold voice call, continue over SMS, confirm on web chat, and follow up on WhatsApp with uninterrupted conversation memory.
          </p>
        </div>

        {/* Channel Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {channels.map((chan) => {
            const Icon = chan.icon;
            const isSelected = activeChannel === chan.id;

            return (
              <button
                key={chan.id}
                onClick={() => setActiveChannel(chan.id as typeof activeChannel)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#121624] border border-cyan-400/60 text-white shadow-lg shadow-cyan-950/40'
                    : 'bg-[#0b0c12] hover:bg-[#0f111a] border border-white/[0.08] text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-neutral-500'}`} />
                <span>{chan.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Channel Showcase Card */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0b0d14] border border-white/[0.1] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase">{current.badge}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-neutral-400">LATENCY: {current.latency}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {current.headline}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2 pt-2">
                {current.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Live Interaction Mockup */}
            <div className="md:col-span-5">
              <div className="rounded-xl bg-[#07080d] border border-white/[0.08] p-4 sm:p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 border-b border-white/[0.06]">
                  <span className="text-cyan-400 font-bold uppercase">{current.name} DEMO</span>
                  <span className="text-emerald-400">STATE: SYNCED</span>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900/90 border border-white/[0.05] text-neutral-200 text-xs leading-relaxed">
                  {current.sampleOutput}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>CRM Memory: Unified</span>
                  <span className="text-cyan-400">HubSpot Updated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
