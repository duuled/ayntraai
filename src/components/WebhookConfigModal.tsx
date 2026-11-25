/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Database, 
  MapPin, 
  Check, 
  Save, 
  Send, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { WebhookConfig } from '../types/inspection';
import { globalWebhookDispatcher } from '../services/webhookDispatcher';
import { SIMULATION_SCENARIOS } from '../services/simulationData';

interface WebhookConfigModalProps {
  onClose: () => void;
}

export const WebhookConfigModal: React.FC<WebhookConfigModalProps> = ({ onClose }) => {
  const [config, setConfig] = useState<WebhookConfig>(() => globalWebhookDispatcher.getConfig());
  const [testResult, setTestResult] = useState<{ message: string; isError?: boolean } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    globalWebhookDispatcher.updateConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleTestMake = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const mockItem = SIMULATION_SCENARIOS[0].auditItem;
      const res = await globalWebhookDispatcher.dispatchMakeWebhook(mockItem, false);
      if (res.status === 'SUCCESS' || res.status === 'MOCK_SUCCESS') {
        setTestResult({ message: `Make.com Ping OK! Status: ${res.statusCode || 200}` });
      } else {
        setTestResult({ message: `Make.com Error: ${res.error || 'Failed to connect'}`, isError: true });
      }
    } catch (err: unknown) {
      setTestResult({ message: `Make.com error: ${err instanceof Error ? err.message : String(err)}`, isError: true });
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestSupabase = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const mockItem = SIMULATION_SCENARIOS[1].auditItem;
      const res = await globalWebhookDispatcher.dispatchSupabaseWebhook(mockItem, false);
      if (res.status === 'SUCCESS' || res.status === 'MOCK_SUCCESS') {
        setTestResult({ message: `Supabase Table Ping OK! Status: ${res.statusCode || 201}` });
      } else {
        setTestResult({ message: `Supabase Error: ${res.error || 'Failed to connect'}`, isError: true });
      }
    } catch (err: unknown) {
      setTestResult({ message: `Supabase error: ${err instanceof Error ? err.message : String(err)}`, isError: true });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm sm:text-base text-white">
              WEBHOOK ROUTING & INTEGRATIONS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs sm:text-sm">
          <p className="text-slate-400 text-xs">
            Ayntra automatically converts live camera and audio observations into structured JSON function calls. Configure destination webhook endpoints below:
          </p>

          {/* Test Status Banner */}
          {testResult && (
            <div className={`p-3 rounded-xl border flex items-center gap-2 ${
              testResult.isError
                ? 'bg-rose-950/80 border-rose-700 text-rose-300'
                : 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
            }`}>
              {testResult.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
              <span className="font-mono text-xs">{testResult.message}</span>
            </div>
          )}

          {/* 1. Make.com Integration */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h4 className="font-bold text-white text-xs uppercase font-mono">1. Make.com (Integromat) Webhook</h4>
              </div>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-slate-400">
                <input
                  type="checkbox"
                  checked={config.makeEnabled}
                  onChange={(e) => setConfig({ ...config, makeEnabled: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Enabled</span>
              </label>
            </div>
            <p className="text-[11px] text-slate-400">
              Receives full structured JSON to trigger SMS alerts, create maintenance Jira tickets, or notify Slack channels.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={config.makeWebhookUrl}
                onChange={(e) => setConfig({ ...config, makeWebhookUrl: e.target.value })}
                placeholder="https://hook.us1.make.com/your-scenario-id"
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleTestMake}
                disabled={isTesting || !config.makeWebhookUrl}
                className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 text-xs font-semibold shrink-0 transition"
              >
                Test Ping
              </button>
            </div>
          </div>

          {/* 2. Supabase Integration */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="font-bold text-white text-xs uppercase font-mono">2. Supabase PostgreSQL REST Table</h4>
              </div>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-slate-400">
                <input
                  type="checkbox"
                  checked={config.supabaseEnabled}
                  onChange={(e) => setConfig({ ...config, supabaseEnabled: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Enabled</span>
              </label>
            </div>
            <p className="text-[11px] text-slate-400">
              Directly saves inspection audit rows into your Supabase database table via standard REST API.
            </p>
            <div className="space-y-2">
              <input
                type="text"
                value={config.supabaseUrl}
                onChange={(e) => setConfig({ ...config, supabaseUrl: e.target.value })}
                placeholder="https://xyzproject.supabase.co"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="password"
                  value={config.supabaseAnonKey}
                  onChange={(e) => setConfig({ ...config, supabaseAnonKey: e.target.value })}
                  placeholder="Supabase Anon Key"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={config.supabaseTable}
                    onChange={(e) => setConfig({ ...config, supabaseTable: e.target.value })}
                    placeholder="Table (field_inspections)"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleTestSupabase}
                    disabled={isTesting}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-xs font-semibold shrink-0 transition"
                  >
                    Test Ping
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Google Maps Geocoding */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <h4 className="font-bold text-white text-xs uppercase font-mono">3. Google Maps API Reverse Geocoding</h4>
              </div>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-slate-400">
                <input
                  type="checkbox"
                  checked={config.googleMapsEnabled}
                  onChange={(e) => setConfig({ ...config, googleMapsEnabled: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
                />
                <span>Enabled</span>
              </label>
            </div>
            <p className="text-[11px] text-slate-400">
              Converts device GPS latitude/longitude into human-readable physical addresses and landmark names.
            </p>
            <input
              type="password"
              value={config.googleMapsApiKey}
              onChange={(e) => setConfig({ ...config, googleMapsApiKey: e.target.value })}
              placeholder="Google Maps Geocoding API Key (optional)"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-emerald-400 font-medium">
            {savedSuccess ? 'Configuration saved successfully!' : ''}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
