/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Copy, 
  Check, 
  FileCode, 
  Folder, 
  ExternalLink, 
  Smartphone, 
  Globe, 
  Layers, 
  Code
} from 'lucide-react';

interface NetlifyExportGuideModalProps {
  onClose: () => void;
}

export const NetlifyExportGuideModal: React.FC<NetlifyExportGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FILES' | 'DEPLOY_STEPS'>('OVERVIEW');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const copyToClipboard = (text: string, filename: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const REDIRECTS_CODE = `/*    /index.html   200`;

  const NETLIFY_TOML_CODE = `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base text-white">
              NETLIFY ZERO-BACKEND DEPLOYMENT GUIDE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-4 text-xs font-mono font-semibold">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`py-2.5 px-3 border-b-2 transition ${
              activeTab === 'OVERVIEW'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Plain English Architecture
          </button>
          <button
            onClick={() => setActiveTab('FILES')}
            className={`py-2.5 px-3 border-b-2 transition ${
              activeTab === 'FILES'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Required Netlify Files
          </button>
          <button
            onClick={() => setActiveTab('DEPLOY_STEPS')}
            className={`py-2.5 px-3 border-b-2 transition ${
              activeTab === 'DEPLOY_STEPS'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Deploy in 3 Steps
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-base text-emerald-400 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <span>How "Ayntra Innovation" Works in Simple Terms</span>
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  You do <strong>not</strong> need to set up or pay for a complex cloud server to run this app. Everything runs right in your field inspector's mobile browser (Chrome on Android or Safari on iPhone) using 100% client-side technology:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 block">
                    STEP 1: LENS & MIC CAPTURE
                  </span>
                  <h5 className="font-bold text-white">Live Camera & Audio Stream</h5>
                  <p className="text-slate-400 leading-relaxed">
                    The HTML5 video container accesses the phone camera lens. It captures a frame every 1.5 seconds and simultaneously captures microphone audio chunks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-purple-400 block">
                    STEP 2: GEMINI 3.8 LIVE REASONING
                  </span>
                  <h5 className="font-bold text-white">Multimodal Correlation</h5>
                  <p className="text-slate-400 leading-relaxed">
                    Gemini 3.8 Live analyzes what the camera sees (cracks, rust, fluid leaks) together with what the inspector says into the microphone in real-time.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-400 block">
                    STEP 3: STRUCTURED JSON OUTPUT
                  </span>
                  <h5 className="font-bold text-white">Function Calling Protocol</h5>
                  <p className="text-slate-400 leading-relaxed">
                    Instead of messy chat text, Gemini calls our pre-defined function <code className="text-cyan-300">logInfrastructureAnomaly()</code> which outputs structured JSON with severity, measurements, and coordinates.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 block">
                    STEP 4: ZERO-SERVER WEBHOOKS
                  </span>
                  <h5 className="font-bold text-white">Direct Webhook Forwarding</h5>
                  <p className="text-slate-400 leading-relaxed">
                    The browser uses standard JavaScript <code className="text-cyan-300">fetch()</code> to send that JSON directly to Make.com, Supabase, or Google Maps without needing a custom Node.js server.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'FILES' && (
            <div className="space-y-4">
              <p className="text-slate-300 text-xs">
                To host this completely client-side on Netlify, the project already includes the exact configuration files needed. Here is what they look like:
              </p>

              {/* netlify.toml */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono font-bold text-xs text-white">netlify.toml</span>
                    <span className="text-[10px] text-slate-500 font-mono">(Tells Netlify how to build)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(NETLIFY_TOML_CODE, 'netlify.toml')}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1 transition"
                  >
                    {copiedFile === 'netlify.toml' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFile === 'netlify.toml' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-300">
                  {NETLIFY_TOML_CODE}
                </pre>
              </div>

              {/* _redirects */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono font-bold text-xs text-white">public/_redirects</span>
                    <span className="text-[10px] text-slate-500 font-mono">(Prevents 404 page errors on mobile refresh)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(REDIRECTS_CODE, '_redirects')}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1 transition"
                  >
                    {copiedFile === '_redirects' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFile === '_redirects' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300">
                  {REDIRECTS_CODE}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'DEPLOY_STEPS' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Build the Application Bundle</h5>
                    <p className="text-slate-400 text-xs mt-1">
                      Run <code className="text-cyan-300 font-mono bg-slate-900 px-1 py-0.5 rounded">npm run build</code> in your terminal. This generates a production-ready folder called <code className="text-emerald-300 font-mono">dist/</code> containing pure static HTML, CSS, and client-side JavaScript.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Deploy to Netlify (Drag & Drop or GitHub)</h5>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      Go to <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-medium">app.netlify.com</a>. Drag and drop the <code className="text-emerald-300 font-mono">dist/</code> folder into the Netlify Drop area. Alternatively, connect your GitHub repository; Netlify will read <code className="text-cyan-300 font-mono">netlify.toml</code> and build it automatically!
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Open in Mobile Browser on the Field</h5>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      Netlify provides a free HTTPS domain (e.g. <code className="text-slate-300 font-mono">ayntra-inspector.netlify.app</code>). Because it is served over secure HTTPS, mobile browsers will grant camera, mic, and GPS access automatically with a single tap.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
          >
            Got It! Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
