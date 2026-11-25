/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Layers, 
  PhoneCall, 
  ShieldCheck, 
  GitFork, 
  Database, 
  Terminal, 
  ExternalLink,
  CheckCircle2,
  Code2
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'stack' | '2030' | 'code'>('stack');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0c0e17] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#08090f]">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-sm sm:text-base text-white font-mono">
              AYNTRA SYSTEM ARCHITECTURE & 2030-PROOF STACK
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/[0.08] bg-[#07080d] px-4 text-xs font-mono font-semibold">
          <button
            onClick={() => setActiveTab('stack')}
            className={`py-2.5 px-3 border-b-2 transition ${
              activeTab === 'stack'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            1. Production Stack
          </button>
          <button
            onClick={() => setActiveTab('2030')}
            className={`py-2.5 px-3 border-b-2 transition ${
              activeTab === '2030'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            2. 2030-Proofing Bets
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`py-2.5 px-3 border-b-2 transition ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            3. Bland / MCP Blueprint
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {activeTab === 'stack' && (
            <div className="space-y-4">
              <p className="text-neutral-400 text-xs">
                To build a world-class cold-calling platform, we don’t reinvent low-level telecom piping. We build on industry-standard specialized layers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Voice Engine */}
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-cyan-400 font-bold uppercase">VOICE ENGINE</span>
                    <span className="text-neutral-500">PSTN & SIP</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Bland AI / Vapi.ai + Twilio</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Voice agents, call pathways, web widgets, and MCP servers. Twilio handles phone numbers, 10DLC registration, and carrier telephony underneath.
                  </p>
                </div>

                {/* Brains */}
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-violet-400 font-bold uppercase">MULTIMODAL BRAIN</span>
                    <span className="text-neutral-500">MODEL-AGNOSTIC</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Gemini Multimodal + OpenRouter</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Native multimodal reasoning across audio, speech, and document vision. OpenRouter / LiteLLM layer allows hot-swapping any LLM without rewriting logic.
                  </p>
                </div>

                {/* Orchestration */}
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-emerald-400 font-bold uppercase">ORCHESTRATION</span>
                    <span className="text-neutral-500">STANDARDS</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">LangGraph + MCP (Model Context)</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Stateful multi-step agent graphs and Anthropic Model Context Protocol. Tools built as MCP servers plug into any agent seamlessly.
                  </p>
                </div>

                {/* Plumbing */}
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-amber-400 font-bold uppercase">PRODUCT PLUMBING</span>
                    <span className="text-neutral-500">APIS & DB</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Supabase, Cal.com & HubSpot</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Postgres auth & call logging on Supabase, Cal.com API for calendar booking, HubSpot / GoHighLevel APIs for CRM contact records, Stripe for subscriptions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === '2030' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#10131f] border border-cyan-500/30 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>The Four Strategic Bets for 2030 Longevity</span>
                </h4>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  How ayntra avoids becoming obsolete as models evolve every 6 months:
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/[0.06] flex gap-3">
                  <div className="font-mono text-cyan-400 font-bold text-xs shrink-0">01.</div>
                  <div>
                    <h5 className="font-bold text-white">Model-Agnostic Core</h5>
                    <p className="text-neutral-400 mt-0.5 leading-relaxed">
                      Never hardcode one specific LLM. Models shift rapidly; by decoupling prompt logic through an abstraction gateway, ayntra adopts whichever model is fastest and smartest each month.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/[0.06] flex gap-3">
                  <div className="font-mono text-violet-400 font-bold text-xs shrink-0">02.</div>
                  <div>
                    <h5 className="font-bold text-white">MCP-Native Tool Servers</h5>
                    <p className="text-neutral-400 mt-0.5 leading-relaxed">
                      Build calendar booking, CRM lookups, and knowledge retrieval as Model Context Protocol (MCP) servers. Open standards outlive individual startups.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/[0.06] flex gap-3">
                  <div className="font-mono text-emerald-400 font-bold text-xs shrink-0">03.</div>
                  <div>
                    <h5 className="font-bold text-white">API-First Architecture</h5>
                    <p className="text-neutral-400 mt-0.5 leading-relaxed">
                      Every agent action (initiate call, update stage, send SMS) is an exposed REST/WebSocket API call. The website and mobile UI are just one client of many.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/[0.06] flex gap-3">
                  <div className="font-mono text-amber-400 font-bold text-xs shrink-0">04.</div>
                  <div>
                    <h5 className="font-bold text-white">TCPA & Regulatory Compliance Baked In</h5>
                    <p className="text-neutral-400 mt-0.5 leading-relaxed">
                      AI cold calling is heavily regulated. DNC registry checks, automated opt-out blacklisting, and local calling hour restrictions are built directly into the dialing pipeline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>SAMPLE OUTBOUND AGENT DISPATCH (BLAND AI / MCP)</span>
                <span className="text-cyan-400">TypeScript</span>
              </div>
              <pre className="p-3.5 rounded-xl bg-neutral-950 border border-white/[0.08] font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed">
{`// Dispatching a live cold-calling agent via Bland AI & Cal.com MCP tool
import { BlandWebClient } from 'bland-ai';

export async function initiateAyntraCall({
  phoneNumber,
  prospectName,
  companyName
}) {
  const response = await fetch('https://api.bland.ai/v1/calls', {
    method: 'POST',
    headers: {
      'authorization': process.env.BLAND_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
      task: \`You are Ryan from ayntra. Call \${prospectName} at \${companyName}.
Qualify their lead volume, handle the 'already have vendor' objection,
and book a 15-minute demo on Cal.com.\`,
      voice: 'Ryan - Professional Closer',
      temperature: 0.4,
      interruption_threshold: 120, // Sub-second natural backchanneling
      tools: [
        {
          name: 'bookMeetingOnCalendar',
          description: 'Books slot on sales rep calendar via Cal.com API',
          input_schema: {
            properties: {
              slot_time: { type: 'string' },
              prospect_email: { type: 'string' }
            }
          }
        }
      ]
    })
  });
  return await response.json();
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/[0.08] bg-[#090a10] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
