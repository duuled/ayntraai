/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  Send, 
  Download, 
  Trash2, 
  Search, 
  Filter, 
  Code,
  MapPin,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { InspectionAuditLogItem, SeverityLevel } from '../types/inspection';

interface AuditLogCardProps {
  logs: InspectionAuditLogItem[];
  onSelectLog: (log: InspectionAuditLogItem) => void;
  onDispatchWebhooks: (log: InspectionAuditLogItem) => void;
  onClearLogs: () => void;
}

export const AuditLogCard: React.FC<AuditLogCardProps> = ({
  logs,
  onSelectLog,
  onDispatchWebhooks,
  onClearLogs
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | 'ALL'>('ALL');
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);

  // Filter logs by search query and severity
  const filteredLogs = logs.filter((item) => {
    const matchesSearch =
      item.defectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.defectDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      selectedSeverity === 'ALL' || item.severity === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case 'CRITICAL':
        return {
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          classes: 'bg-rose-950/80 border-rose-600/80 text-rose-300 font-bold',
          dot: 'bg-rose-500 animate-pulse'
        };
      case 'HIGH':
        return {
          icon: <ShieldAlert className="w-3.5 h-3.5" />,
          classes: 'bg-amber-950/80 border-amber-600/80 text-amber-300 font-bold',
          dot: 'bg-amber-500'
        };
      case 'MEDIUM':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          classes: 'bg-yellow-950/80 border-yellow-600/80 text-yellow-300',
          dot: 'bg-yellow-400'
        };
      case 'NOMINAL':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          classes: 'bg-emerald-950/80 border-emerald-600/80 text-emerald-300',
          dot: 'bg-emerald-400'
        };
      default:
        return {
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          classes: 'bg-slate-900 border-slate-700 text-slate-300',
          dot: 'bg-slate-400'
        };
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ayntra_audit_logs_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    if (logs.length === 0) return;
    const headers = ['ID', 'Asset_ID', 'Asset_Name', 'Severity', 'Defect_Category', 'Title', 'Timestamp', 'Recommended_Action', 'Latitude', 'Longitude'];
    const rows = logs.map((l) => [
      l.id,
      `"${l.assetId}"`,
      `"${l.assetName}"`,
      l.severity,
      l.defectCategory,
      `"${l.defectTitle.replace(/"/g, '""')}"`,
      l.timestamp,
      `"${l.recommendedAction.replace(/"/g, '""')}"`,
      l.geolocation.latitude,
      l.geolocation.longitude
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `ayntra_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDispatch = async (e: React.MouseEvent, log: InspectionAuditLogItem) => {
    e.stopPropagation();
    setDispatchingId(log.id);
    await onDispatchWebhooks(log);
    setDispatchingId(null);
  };

  return (
    <div className="w-full bg-slate-950 p-3 sm:p-4 pb-28">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Card Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>REAL-TIME AUDIT LOG</span>
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-800 text-cyan-300">
                {logs.length} RECORDS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Multimodal detections structured into JSON and routed via webhook stubs.
            </p>
          </div>

          {/* Export & Clear Actions */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={handleExportJSON}
              disabled={logs.length === 0}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1 transition disabled:opacity-40"
              title="Download entire audit stream as JSON"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>JSON</span>
            </button>

            <button
              onClick={handleExportCSV}
              disabled={logs.length === 0}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1 transition disabled:opacity-40"
              title="Download spreadsheet CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV</span>
            </button>

            {logs.length > 0 && (
              <button
                onClick={onClearLogs}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-800 text-xs transition"
                title="Clear current session log list"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by asset name, crack, leak, or ID..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Severity Pills Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-[11px] font-mono">
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'NOMINAL'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 rounded-md transition font-semibold whitespace-nowrap ${
                  selectedSeverity === sev
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Items List */}
        <div className="space-y-2.5">
          {filteredLogs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center bg-slate-900/20">
              <Sparkles className="w-8 h-8 text-cyan-400/60 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-slate-300">No Inspection Records Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Tap the <strong className="text-cyan-400">"Simulate Live Inspection"</strong> button above or point your camera and speak into the microphone to log physical infrastructure.
              </p>
            </div>
          ) : (
            filteredLogs.map((item) => {
              const badge = getSeverityBadge(item.severity);
              const formattedTime = new Date(item.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectLog(item)}
                  className="group relative rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 p-3 transition-all duration-200 cursor-pointer shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    {/* Main Finding Info */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Severity Badge */}
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] border font-mono ${badge.classes}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          <span>{item.severity}</span>
                        </span>

                        {/* Defect Category Tag */}
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {item.defectCategory.replace(/_/g, ' ')}
                        </span>

                        {/* Asset ID Tag */}
                        <span className="text-[11px] font-mono font-semibold text-slate-400">
                          #{item.assetId}
                        </span>

                        <span className="text-[10px] text-slate-500 flex items-center gap-1 ml-auto sm:ml-0">
                          <Clock className="w-3 h-3" />
                          <span>{formattedTime}</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {item.defectTitle}
                      </h4>

                      <p className="text-xs text-slate-400 line-clamp-2">
                        {item.defectDescription}
                      </p>

                      {/* Measurements & Inspector Prompt */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-slate-400 pt-1">
                        {item.measurements?.estimatedLengthMm && (
                          <span className="text-cyan-400">
                            Length: {item.measurements.estimatedLengthMm}mm
                          </span>
                        )}
                        {item.measurements?.corrosionPercentage !== undefined && (
                          <span className="text-amber-400">
                            Oxidation: {item.measurements.corrosionPercentage}%
                          </span>
                        )}
                        <span className="text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{item.geolocation.formattedAddress || 'Field GPS Locked'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Webhook Status & Action Buttons */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                      {/* Webhook Chips */}
                      <div className="flex items-center gap-1">
                        {item.webhookDispatches.map((wh, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight border ${
                              wh.status === 'SUCCESS' || wh.status === 'MOCK_SUCCESS'
                                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60'
                                : 'bg-rose-950/70 text-rose-300 border-rose-800/60'
                            }`}
                            title={`Status: ${wh.status} at ${wh.endpoint}`}
                          >
                            {wh.destination.replace(/_/g, '.')}
                          </span>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => handleDispatch(e, item)}
                          disabled={dispatchingId === item.id}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 border border-slate-700 transition"
                          title="Re-trigger Webhook Dispatch to Make.com & Supabase"
                        >
                          {dispatchingId === item.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                          ) : (
                            <Send className="w-3 h-3 text-cyan-400" />
                          )}
                          <span className="hidden xs:inline">Dispatch</span>
                        </button>

                        <button
                          onClick={() => onSelectLog(item)}
                          className="px-2 py-1 rounded bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800/60 text-xs font-semibold flex items-center gap-1 transition"
                        >
                          <Code className="w-3 h-3" />
                          <span>JSON</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
