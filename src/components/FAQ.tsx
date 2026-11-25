/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does it sound robotic?',
      a: 'Not at all. ayntra runs on advanced sub-second streaming voice models with human-grade prosody, natural breathing pauses, and dynamic emotional tone. It incorporates conversational backchanneling ("mhm", "I understand", "got it") and responds within 500–600ms, making it virtually indistinguishable from a seasoned human sales rep.'
    },
    {
      q: 'What happens when it can’t answer a question?',
      a: 'Your agents are strictly guardrailed by your knowledge base to never guess or hallucinate. If a prospect asks an obscure question outside its training data (e.g., custom enterprise SLA terms), the agent handles it gracefully: "That is a great technical question for our senior engineering lead—I can have them answer that directly on our brief call this Thursday, or I can email you the spec sheet right now."'
    },
    {
      q: 'Is my data private and secure?',
      a: 'Yes. Your business documents, customer lists, and call audio recordings are encrypted at rest (AES-256) and in transit (TLS 1.3). We never use your proprietary business data or customer phone conversations to train foundational public models. Full SOC2 Type II compliance controls and GDPR-compliant data isolation are enforced.'
    },
    {
      q: 'How fast can I go live?',
      a: 'Most businesses launch their first live agent in under 15 minutes. All you need to do is upload your website or service documentation, connect your Cal.com or Google Calendar, and choose a phone number. We provide pre-built objection matrices for B2B SaaS, home services, real estate, and professional agencies so you can start dialing or answering immediately.'
    },
    {
      q: 'Is cold calling with AI legal?',
      a: 'Yes, provided you adhere to state and federal telemarketing laws. In the United States, outbound telemarketing is governed by the Telephone Consumer Protection Act (TCPA) and the FTC Telemarketing Sales Rule. B2B cold calling to corporate business numbers is standard practice. For B2C calls, ayntra enforces strict automated compliance: screening against the National Do Not Call (DNC) Registry, respecting local calling hours (8 AM - 9 PM local time), identifying the caller within seconds, and immediately honoring verbal opt-outs ("Please remove me from your list") by blacklisting the number across your entire CRM.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#07080d] border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            COMMON QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Everything you need to know about deploying autonomous voice and messaging agents for your business.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0f111a] border-cyan-500/40 shadow-lg shadow-black/40'
                    : 'bg-[#0a0b12] hover:bg-[#0c0d16] border-white/[0.06]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base font-bold transition-colors ${isOpen ? 'text-cyan-300' : 'text-white'}`}>
                    {faq.q}
                  </span>
                  <div className={`p-1 rounded-lg text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.04] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
