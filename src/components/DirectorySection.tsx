/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

export type CostType = 'FREE' | 'OPEN SOURCE' | 'PAID';

export interface DirectoryTool {
  name: string;
  description: string;
  cost: string;
  label: CostType;
  category:
    | 'Build agents'
    | 'Run models free'
    | 'Voice agents'
    | 'Make content'
    | 'Talking-face models';
}

const DIRECTORY_TOOLS: DirectoryTool[] = [
  // Build agents
  {
    name: 'n8n',
    description: 'Free self-hosted workflow automation to connect APIs and agent steps.',
    cost: 'Free self-hosted automation',
    label: 'FREE',
    category: 'Build agents',
  },
  {
    name: 'OpenClaw',
    description: 'Open-source personal AI agent.',
    cost: 'Open source',
    label: 'OPEN SOURCE',
    category: 'Build agents',
  },
  {
    name: 'CrewAI',
    description: 'Build multi-agent systems that collaborate across tasks.',
    cost: 'Open source',
    label: 'OPEN SOURCE',
    category: 'Build agents',
  },
  {
    name: 'LangGraph',
    description: 'Build multi-agent systems with stateful workflows.',
    cost: 'Open source',
    label: 'OPEN SOURCE',
    category: 'Build agents',
  },
  {
    name: 'Browser Use',
    description: 'AI that drives the browser to navigate pages and complete tasks.',
    cost: 'Open source',
    label: 'OPEN SOURCE',
    category: 'Build agents',
  },
  {
    name: 'OpenCode',
    description: 'Terminal coding agent for writing and editing code.',
    cost: 'Open source',
    label: 'OPEN SOURCE',
    category: 'Build agents',
  },

  // Run models free
  {
    name: 'LM Studio',
    description: 'Run AI models on your own PC locally.',
    cost: 'Free',
    label: 'FREE',
    category: 'Run models free',
  },
  {
    name: 'Ollama',
    description: 'Run open-weight AI models locally from your computer.',
    cost: 'Free',
    label: 'FREE',
    category: 'Run models free',
  },

  // Voice agents
  {
    name: 'Bland AI',
    description: 'Voice agents that make inbound and outbound phone calls.',
    cost: 'Paid',
    label: 'PAID',
    category: 'Voice agents',
  },
  {
    name: 'Vapi',
    description: 'Voice agents that make calls with programmable voice pipelines.',
    cost: 'Paid',
    label: 'PAID',
    category: 'Voice agents',
  },

  // Make content
  {
    name: 'OpenShorts',
    description: 'AI short videos built with an open-source pipeline.',
    cost: 'Open source',
    label: 'OPEN SOURCE',
    category: 'Make content',
  },
  {
    name: 'Upload-Post',
    description: 'Free posting to Instagram and YouTube.',
    cost: '10 uploads a month free',
    label: 'FREE',
    category: 'Make content',
  },
  {
    name: 'Substack Gateway',
    description: 'Publish to Substack directly from your own agent.',
    cost: 'Open source',
    label: 'OPEN SOURCE',
    category: 'Make content',
  },

  // Talking-face models
  {
    name: 'SadTalker',
    description: 'Talking-face video model that animates portraits from audio (needs a real GPU).',
    cost: 'Free (needs a real GPU)',
    label: 'FREE',
    category: 'Talking-face models',
  },
  {
    name: 'MuseTalk',
    description: 'Real-time talking-face generation model (needs a real GPU).',
    cost: 'Free (needs a real GPU)',
    label: 'FREE',
    category: 'Talking-face models',
  },
];

const CATEGORIES: Array<DirectoryTool['category']> = [
  'Build agents',
  'Run models free',
  'Voice agents',
  'Make content',
  'Talking-face models',
];

export const DirectorySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | DirectoryTool['category']>('ALL');
  const [selectedCost, setSelectedCost] = useState<'ALL' | CostType>('ALL');

  const filteredTools = useMemo(() => {
    return DIRECTORY_TOOLS.filter((tool) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.cost.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);
      const matchesCat = selectedCategory === 'ALL' || tool.category === selectedCategory;
      const matchesCost = selectedCost === 'ALL' || tool.label === selectedCost;
      return matchesQuery && matchesCat && matchesCost;
    });
  }, [searchQuery, selectedCategory, selectedCost]);

  const getLabelColor = (label: CostType) => {
    switch (label) {
      case 'FREE':
        return 'text-sky-200 border-sky-300/25 bg-[#091E2C]/65';
      case 'OPEN SOURCE':
        return 'text-purple-200 border-purple-300/25 bg-[#130D1E]/80';
      case 'PAID':
        return 'text-[#b7add4] border-purple-300/[0.15] bg-[#160e28]/60';
    }
  };

  const visibleCategories = CATEGORIES.filter(
    (cat) => selectedCategory === 'ALL' || cat === selectedCategory
  );

  return (
    <section id="directory" className="py-20 sm:py-24 border-t border-purple-300/[0.09]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2.5 mb-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
            01 · The Directory
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Free & open-source tools to build your own AI agents.
          </h2>
          <p className="text-[#b7add4] text-sm sm:text-base leading-relaxed">
            Browse by category or search below. Every tool is labeled as free, open source, or paid.
          </p>
        </div>

        {/* Minimalist Nostalgia Purple Obsidian Search & Filter Bar */}
        <div className="rounded-lg bg-[#10091e]/65 border border-purple-300/[0.11] p-3.5 sm:p-4 mb-10 space-y-3 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8f83b3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (n8n, Ollama, Bland AI, SadTalker)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-md bg-[#080510]/85 border border-purple-300/[0.12] text-sm text-white placeholder-[#8f83b3] focus:outline-none focus:border-purple-300/50 transition-colors font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8f83b3] hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 p-1 rounded-md bg-[#080510]/85 border border-purple-300/[0.12] overflow-x-auto">
              {(['ALL', 'FREE', 'OPEN SOURCE', 'PAID'] as const).map((costType) => (
                <button
                  key={costType}
                  type="button"
                  onClick={() => setSelectedCost(costType)}
                  className={`px-3 py-1.5 rounded text-[11px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCost === costType
                      ? 'bg-purple-200 text-[#080510] font-bold'
                      : 'text-[#a597c7] hover:text-white'
                  }`}
                >
                  {costType}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-purple-300/20 text-white border border-purple-300/35'
                  : 'text-[#a597c7] hover:text-white border border-transparent'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#091E2C]/80 text-sky-200 border border-sky-300/35'
                    : 'text-[#a597c7] hover:text-white border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Directory Results */}
        {filteredTools.length === 0 ? (
          <div className="rounded-lg border border-dashed border-purple-300/20 p-10 text-center">
            <p className="text-sm text-[#d4cbe9] font-mono mb-3">No matching tools found.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedCost('ALL');
              }}
              className="px-4 py-2 rounded-md bg-purple-200 text-[#080510] text-xs font-mono font-bold cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {visibleCategories.map((categoryName) => {
              const toolsInCategory = filteredTools.filter((t) => t.category === categoryName);
              if (toolsInCategory.length === 0) return null;

              return (
                <div key={categoryName} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-300/[0.09]">
                    <h3 className="text-base sm:text-lg font-mono font-semibold text-white tracking-tight">
                      {categoryName}
                    </h3>
                    <span className="text-[11px] font-mono text-[#8f83b3]">
                      {toolsInCategory.length} tools
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {toolsInCategory.map((tool) => (
                      <div
                        key={tool.name}
                        className="rounded-lg bg-[#10091e]/55 border border-purple-300/[0.11] hover:border-sky-300/40 p-5 flex flex-col justify-between gap-4 backdrop-blur-sm transition-colors"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="text-base sm:text-lg font-bold text-white">
                              {tool.name}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded border text-[10px] font-mono font-semibold tracking-wider shrink-0 ${getLabelColor(
                                tool.label
                              )}`}
                            >
                              {tool.label}
                            </span>
                          </div>

                          <p className="text-sm text-[#cfc6e8] leading-relaxed">
                            {tool.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-purple-300/[0.08] flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#8f83b3] uppercase">Cost</span>
                          <span className="text-sky-200">{tool.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
