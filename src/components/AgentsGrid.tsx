/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  PhoneOutgoing, 
  PhoneIncoming, 
  MessageSquare, 
  CalendarCheck, 
  HelpCircle, 
  Sparkles, 
  ArrowUpRight, 
  Volume2, 
  Radio, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

interface AgentsGridProps {
  onSelectAgent: (agentName: string) => void;
  onPlayDemo: (scenarioId: string) => void;
}

export const AgentsGrid: React.FC<AgentsGridProps> = ({ onSelectAgent, onPlayDemo }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'voice' | 'messaging'>('all');

  const agents = [
    {
      id: 'cold-caller',
      isFlagship: true,
      title: 'Cold-Calling Agent',
      badge: 'FLAGSHIP OUTBOUND AGENT',
      role: 'Outbound Sales Engine',
      description:
        'Dials outbound lead lists within seconds of capture. Qualifies prospects with dynamic conversation trees, handles price and competitor objections empathetically, and secures booked meetings directly on your sales reps’ calendars.',
      capabilities: [
        'Navigates gatekeepers & reaches decision-makers',
        'Handles complex objections with sub-600ms latency',
        'Logs CRM notes, call audio, and sentiment analysis',
        'Built-in TCPA compliance, DNC checking & opt-out management'
      ],
      channels: ['Outbound Voice (PSTN / SIP)', 'Twilio / Bland Plumbing', 'Automated Instant Callback'],
      primaryMetric: '4.2x more connect-to-meeting conversions',
      demoScenarioId: 'b2b-saas',
      icon: PhoneOutgoing,
      accentColor: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'receptionist',
      isFlagship: false,
      title: 'AI Receptionist',
      badge: 'INBOUND VOICE',
      role: '24/7 Front-Desk Intelligence',
      description:
        'Picks up every inbound telephone call on the first ring. Triages emergency service requests, answers business inquiries, screens spam, and routes high-priority VIP calls to human staff.',
      capabilities: [
        'Zero ring-delay, 24/7/365 coverage',
        'Smart call forwarding based on caller intent',
        'Emergency dispatch paging & SMS notifications'
      ],
      channels: ['Inbound Phone Lines', 'Interactive IVR', 'Voicemail Transcriptions'],
      primaryMetric: '100% call answered rate with 0 dropped leads',
      demoScenarioId: 'home-services',
      icon: PhoneIncoming,
      accentColor: 'from-violet-500 to-purple-600',
    },
    {
      id: 'follow-up',
      isFlagship: false,
      title: 'Follow-Up Agent',
      badge: 'TWO-WAY MESSAGING',
      role: 'Lead Reactivation Engine',
      description:
        'Revives dead, cold, or unresponsive pipeline leads with personalized SMS and email sequences. When a prospect replies, it engages conversationally and coordinates a call.',
      capabilities: [
        'Multi-touch SMS & email drip orchestration',
        'Natural 2-way texting that feels human',
        'Re-engages leads uncontacted for 30–90+ days'
      ],
      channels: ['Two-Way SMS', 'Email Drip Sequences', 'WhatsApp Business'],
      primaryMetric: '18% reactivation of dead CRM contacts',
      demoScenarioId: 'real-estate',
      icon: MessageSquare,
      accentColor: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'booking',
      isFlagship: false,
      title: 'Booking Agent',
      badge: 'CALENDAR COORDINATION',
      role: 'Autonomous Meeting Scheduler',
      description:
        'Coordinates availability across multiple team calendars, reconciles time zones, sends automated SMS confirmations, and handles rescheduling requests without phone tag.',
      capabilities: [
        'Bi-directional Cal.com & Google Calendar sync',
        'Automated SMS & calendar invite dispatch',
        'No-show reduction with 24h & 1h confirmation nudges'
      ],
      channels: ['Cal.com / Google Calendar / Outlook', 'SMS Alerts', 'Email Invitations'],
      primaryMetric: '65% reduction in meeting no-show rates',
      demoScenarioId: 'b2b-saas',
      icon: CalendarCheck,
      accentColor: 'from-amber-500 to-orange-600',
    },
    {
      id: 'support',
      isFlagship: false,
      title: 'Support Agent',
      badge: 'KNOWLEDGE BASE SEARCH',
      role: 'Instant Customer Resolution',
      description:
        'Resolves customer inquiries, product questions, and policy checks instantly using your uploaded knowledge base. Escalates unresolved tickets to your team with full context.',
      capabilities: [
        'Semantic retrieval over PDFs, URLs, and FAQs',
        'Hallucination-free factual policy responses',
        'Seamless human handoff ticket generation'
      ],
      channels: ['Embeddable Web Chat', 'Voice Support Line', 'SMS & WhatsApp'],
      primaryMetric: '82% first-contact resolution on routine FAQs',
      demoScenarioId: 'home-services',
      icon: HelpCircle,
      accentColor: 'from-cyan-400 to-teal-500',
    },
  ];

  return (
    <section id="agents" className="py-24 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              THE AGENTIC ROSTER
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              An autonomous team of AI specialists. Led by your cold-calling closer.
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Every agent shares one unified knowledge base and CRM memory. Deploy them individually or let them collaborate as a single coordinated revenue team.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 self-start md:self-end">
            <span className="text-white font-bold">5 SPECIALIZED AGENTS</span>
            <span aria-hidden="true" className="mx-2 text-neutral-700">·</span>
            <span className="text-cyan-400">PSTN & OMNICHANNEL</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flagship Agent Card (Col span 2 on large screens) */}
          <div className="lg:col-span-2 relative rounded-2xl bg-gradient-to-b from-[#10131d] to-[#0c0d13] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-950/20 flex flex-col justify-between group overflow-hidden">
            {/* Top decorative gradient sheen */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <PhoneOutgoing className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-extrabold block">
                      FLAGSHIP AI AGENT
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Cold-Calling Agent
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => onPlayDemo('b2b-saas')}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition active:scale-95 shadow-sm"
                >
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span>Hear Cold-Call Sample</span>
                </button>
              </div>

              <p className="text-neutral-300 text-base leading-relaxed max-w-2xl">
                The flagship engine that turns static lead lists into confirmed meetings. Dials prospects, sounds completely natural with adaptive pacing, maneuvers past gatekeepers, counters objections with company-specific proof, and schedules meetings into Cal.com or HubSpot.
              </p>

              {/* Capabilities checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {agents[0].capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channels & Outcome footer */}
            <div className="pt-8 mt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-semibold block">CHANNELS SUPPORTED</span>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300 font-mono">
                  <span>Outbound Voice (PSTN)</span>
                  <span className="text-neutral-700">·</span>
                  <span>Twilio / Bland AI</span>
                  <span className="text-neutral-700">·</span>
                  <span>Instant Lead Dialing</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-semibold block">IMPACT</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {agents[0].primaryMetric}
                </span>
              </div>
            </div>
          </div>

          {/* AI Receptionist Card */}
          <div className="rounded-2xl bg-[#0d0e14] border border-white/[0.08] hover:border-violet-500/40 p-6 sm:p-7 shadow-xl transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-400/30 text-violet-400 flex items-center justify-center">
                <PhoneIncoming className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold block mb-1">
                  INBOUND VOICE
                </span>
                <h3 className="text-xl font-bold text-white">AI Receptionist</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Answers every incoming customer call on ring one. Qualifies inquiries, answers FAQs, schedules callbacks, and forwards priority VIPs with full transcribed context.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 pt-1">
                {agents[1].capabilities.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-neutral-400">Phone / SIP / IVR</span>
              <span className="font-mono font-bold text-emerald-400">100% Answer Rate</span>
            </div>
          </div>

          {/* Follow-Up Agent Card */}
          <div className="rounded-2xl bg-[#0d0e14] border border-white/[0.08] hover:border-emerald-500/40 p-6 sm:p-7 shadow-xl transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                  MESSAGING
                </span>
                <h3 className="text-xl font-bold text-white">Follow-Up Agent</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Nurtures and reactivates unclosed leads via conversational two-way SMS and email sequences. When a prospect replies, it negotiates meeting times naturally.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 pt-1">
                {agents[2].capabilities.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-neutral-400">SMS / Email / WhatsApp</span>
              <span className="font-mono font-bold text-emerald-400">+18% Pipeline Lift</span>
            </div>
          </div>

          {/* Booking Agent Card */}
          <div className="rounded-2xl bg-[#0d0e14] border border-white/[0.08] hover:border-amber-500/40 p-6 sm:p-7 shadow-xl transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  CALENDAR OPS
                </span>
                <h3 className="text-xl font-bold text-white">Booking Agent</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Coordinates availability across team calendars, eliminates time-zone confusion, sends calendar invites, and triggers smart reminder nudges to eliminate no-shows.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 pt-1">
                {agents[3].capabilities.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-neutral-400">Cal.com / Google / Outlook</span>
              <span className="font-mono font-bold text-emerald-400">-65% No-Show Rate</span>
            </div>
          </div>

          {/* Support Agent Card */}
          <div className="rounded-2xl bg-[#0d0e14] border border-white/[0.08] hover:border-cyan-500/40 p-6 sm:p-7 shadow-xl transition-all duration-200 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  KNOWLEDGE BASE
                </span>
                <h3 className="text-xl font-bold text-white">Support Agent</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Grounds answers in your business documentation, pricing guides, and technical manuals. Answers FAQs over voice, web chat, or SMS with zero hallucination.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 pt-1">
                {agents[4].capabilities.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-neutral-400">Web Chat / Voice / SMS</span>
              <span className="font-mono font-bold text-emerald-400">82% First-Call Solved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
