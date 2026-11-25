/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  Sparkles, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  Building,
  Mail,
  User
} from 'lucide-react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedAgent?: string;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({
  isOpen,
  onClose,
  preselectedAgent = 'Cold-Calling Agent'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    leadVolume: '100-500',
    selectedAgent: preselectedAgent,
    preferredTime: 'Tomorrow at 2:00 PM EST'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0e1018] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#090a10]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-bold text-sm sm:text-base text-white">
              Schedule a Live 1-on-1 Agent Demo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">You are booked on the calendar!</h4>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  We just dispatched a calendar invite to <strong className="text-cyan-400">{formData.email}</strong> and an SMS reminder to <strong className="text-cyan-400">{formData.phone}</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-white/[0.08] text-xs font-mono text-neutral-300 text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">APPOINTMENT:</span>
                  <span className="text-emerald-400 font-bold">15-Minute Live Voice Demo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">TIME:</span>
                  <span className="text-white">{formData.preferredTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">PREVIEW AGENT:</span>
                  <span className="text-cyan-400">{formData.selectedAgent}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-xs shadow-lg transition"
              >
                Close & Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <p className="text-neutral-400 text-xs">
                Pick a time to hear an AI cold caller or receptionist customized with your company’s actual knowledge base.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">YOUR FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/[0.08] text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">WORK EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/[0.08] text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">CELL PHONE (FOR SMS CONFIRM)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/[0.08] text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">COMPANY NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Apex Services Inc."
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/[0.08] text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">MONTHLY LEAD VOLUME</label>
                  <select
                    value={formData.leadVolume}
                    onChange={(e) => setFormData({ ...formData, leadVolume: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/[0.08] text-white focus:outline-none focus:border-cyan-400 text-xs"
                  >
                    <option value="under-100">Under 100 leads / mo</option>
                    <option value="100-500">100 - 500 leads / mo</option>
                    <option value="500-2000">500 - 2,000 leads / mo</option>
                    <option value="2000+">2,000+ leads / mo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">PRIMARY AGENT OF INTEREST</label>
                  <select
                    value={formData.selectedAgent}
                    onChange={(e) => setFormData({ ...formData, selectedAgent: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/[0.08] text-white focus:outline-none focus:border-cyan-400 text-xs"
                  >
                    <option value="Cold-Calling Agent">Flagship Cold-Calling Agent</option>
                    <option value="AI Receptionist">24/7 AI Receptionist</option>
                    <option value="Follow-Up Agent">Two-Way SMS Follow-Up</option>
                    <option value="Full Suite">Entire 5-Agent Suite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">PREFERRED DEMO SLOT</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {['Tomorrow at 2:00 PM EST', 'Tomorrow at 4:30 PM EST', 'Thursday at 11:00 AM EST', 'Friday at 1:00 PM EST'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTime: slot })}
                      className={`p-2 rounded-lg border text-left transition ${
                        formData.preferredTime === slot
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                          : 'bg-neutral-900 border-white/[0.06] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-violet-600 hover:to-violet-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 active:scale-[0.98] transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Confirming Calendar Slot...</span>
                  ) : (
                    <>
                      <span>Confirm 15-Minute Live Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-center text-neutral-500 font-mono">
                No credit card required · 100% TCPA compliant · Instant calendar invite
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
