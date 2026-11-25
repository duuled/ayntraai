/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Upload, 
  Settings2, 
  Rocket, 
  FileText, 
  Check, 
  ArrowRight, 
  Database, 
  Calendar, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: '01',
      title: 'Upload your business info to the knowledge base',
      subtitle: 'Teach your agents in 3 minutes',
      description:
        'Drop your website link, pricing sheet, service PDFs, and objection scripts. Our embedding pipeline indexes your business rules, tone of voice, qualification criteria, and compliance boundaries into vector storage.',
      bullets: [
        'Automatic website scraper & PDF document parser',
        'Define exact objection-handling guardrails',
        'Set custom business hours, qualifying criteria & pricing ranges'
      ],
      previewType: 'knowledge_base'
    },
    {
      num: '02',
      title: 'Pick agents and connect your tools',
      subtitle: 'One-click integrations',
      description:
        'Select which agents you want on duty. Connect your calendar (Cal.com, Google Calendar, Outlook) and your CRM (GoHighLevel, HubSpot, Salesforce). Provision dedicated local phone numbers or bring your existing Twilio SIP trunk.',
      bullets: [
        'Real-time bi-directional calendar slot booking',
        'Automatic lead status updating & call recording sync',
        'Local area code phone number provisioning'
      ],
      previewType: 'integrations'
    },
    {
      num: '03',
      title: 'Go live in minutes',
      subtitle: 'Autonomous execution',
      description:
        'Upload your lead list or forward your business phone line. Your agents start dialing, qualifying, answering inbound calls, and booking revenue appointments while you focus on closing clients.',
      bullets: [
        'Live dashboard with real-time call audio and transcripts',
        'Instant SMS alerts when hot appointments get booked',
        'TCPA-compliant automated Do-Not-Call list handling'
      ],
      previewType: 'live_dialing'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 border-t border-white/[0.08] relative bg-[#08090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            RAPID ONBOARDING
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            From zero to an active AI sales floor in 3 simple steps.
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            No complex prompt engineering or developer setup required. Connect your tools, upload your knowledge, and let your agents do the work.
          </p>
        </div>

        {/* 3 Step Interactive Row / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const stepIndex = idx + 1;
              const isSelected = activeStep === stepIndex;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(stepIndex)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#10131d] border-cyan-500/50 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-500/30'
                      : 'bg-[#0b0c12]/60 hover:bg-[#0e1017] border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className={`text-sm font-black font-mono ${isSelected ? 'text-cyan-400' : 'text-neutral-500'}`}>
                      {step.num}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-8">
                    {step.description}
                  </p>

                  {isSelected && (
                    <div className="pl-8 pt-4 space-y-2 border-t border-white/[0.06] mt-4">
                      {step.bullets.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Step Preview Console (Right 7 cols) */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="rounded-2xl bg-[#0c0e16] border border-white/[0.1] shadow-2xl shadow-black/80 overflow-hidden">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#08090d] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-neutral-200 font-semibold uppercase">
                    STEP {activeStep} WORKFLOW PREVIEW
                  </span>
                </div>
                <div className="text-[11px] text-cyan-400">
                  {activeStep === 1 && 'EMBEDDING ENGINE: ACTIVE'}
                  {activeStep === 2 && 'CRM WEBHOOK: READY'}
                  {activeStep === 3 && 'CAMPAIGN DIALER: LIVE'}
                </div>
              </div>

              {/* Console Preview Body */}
              <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-center">
                {activeStep === 1 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/[0.08] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-neutral-400">UPLOADED DOCUMENTS</span>
                        <span className="text-emerald-400 font-mono font-bold">4 / 4 EMBEDDED</span>
                      </div>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-white/[0.05]">
                          <span className="text-neutral-200 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Pricing_Guide_Commercial_2026.pdf</span>
                          </span>
                          <span className="text-cyan-400">142 Chunks</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-white/[0.05]">
                          <span className="text-neutral-200 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-violet-400" />
                            <span>Objection_Handling_Matrix_SaaS.pdf</span>
                          </span>
                          <span className="text-cyan-400">88 Chunks</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-white/[0.05]">
                          <span className="text-neutral-200 flex items-center gap-2">
                            <Database className="w-3.5 h-3.5 text-emerald-400" />
                            <span>https://yourcompany.com/faq-and-services</span>
                          </span>
                          <span className="text-cyan-400">Synced</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-neutral-300 space-y-1">
                      <span className="font-mono font-bold text-cyan-400 block text-[11px]">GUARDRAIL SETTINGS:</span>
                      <p>
                        "If a lead asks for custom enterprise billing beyond standard tiers, agent will offer a 15-minute briefing with the Solutions Architect rather than guessing."
                      </p>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-emerald-500/40 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Cal.com Calendar</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <p className="text-neutral-400 text-[11px]">Round-robin SDR booking linked</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-emerald-500/40 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">HubSpot / GoHighLevel</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <p className="text-neutral-400 text-[11px]">Two-way contact & stage sync</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-emerald-500/40 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Twilio Outbound SIP</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <p className="text-neutral-400 text-[11px]">Local phone pool registered</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-emerald-500/40 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">TCPA & DNC Registry</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <p className="text-neutral-400 text-[11px]">Automated opt-out filtering</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-950 border border-white/[0.08] text-xs font-mono text-neutral-300">
                      <div className="text-neutral-500 mb-1">// Webhook Payload Stub</div>
                      <div className="text-cyan-400">POST /api/v1/crm/lead-qualified</div>
                      <div className="text-neutral-400">Status: 200 OK · Slot Booked: Tomorrow at 2:30 PM EST</div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/[0.08] space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-cyan-400 font-bold">LIVE OUTBOUND QUEUE</span>
                        <span className="text-emerald-400">DIALING ACTIVE (3 AGENTS)</span>
                      </div>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="p-2.5 rounded bg-neutral-950 border border-cyan-500/30 flex items-center justify-between">
                          <div>
                            <div className="text-white font-bold">Call #1042 — Apex Technologies (CTO)</div>
                            <div className="text-neutral-400 text-[11px]">Agent: Cold-Calling Engine · Duration: 01:42</div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                            MEETING BOOKED
                          </span>
                        </div>
                        <div className="p-2.5 rounded bg-neutral-950 border border-white/[0.05] flex items-center justify-between">
                          <div>
                            <div className="text-white font-bold">Call #1043 — Summit Roofing & Solar</div>
                            <div className="text-neutral-400 text-[11px]">Agent: Receptionist · Duration: 00:38</div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-bold border border-cyan-800">
                            QUALIFIED
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-neutral-300 flex items-center justify-between">
                      <span className="font-mono text-emerald-400 font-semibold">Calendar invites dispatched today:</span>
                      <span className="font-mono text-white font-bold text-sm">18 Appointments</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
