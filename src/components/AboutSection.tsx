/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 border-t border-purple-300/[0.09]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
          06 · About
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Cody Tyler, Marina del Rey.
        </h2>
        <p className="text-base sm:text-lg text-[#d4cbe9] leading-relaxed">
          I build AI agents and I write books. Everything on this page is something I actually built or use.
        </p>
      </div>
    </section>
  );
};
