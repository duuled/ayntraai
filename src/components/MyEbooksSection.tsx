/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MyEbooksSectionProps {
  onOpenEbooksPage: () => void;
}

export const MyEbooksSection: React.FC<MyEbooksSectionProps> = ({ onOpenEbooksPage }) => {
  return (
    <section id="ebooks" className="py-16 sm:py-20 border-t border-purple-300/[0.09]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-[#10091e]/60 border border-purple-300/[0.12] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-sm">
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
              03 · Digital Library
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              My Ebooks
            </h2>
            <p className="text-sm sm:text-base text-[#d4cbe9] leading-relaxed">
              Thrillers, money guides, and coloring books — $3 each on Google Play.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenEbooksPage}
            className="px-6 py-3.5 rounded-md bg-purple-200 hover:bg-white text-[#080510] font-mono font-bold text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Open My Ebooks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
