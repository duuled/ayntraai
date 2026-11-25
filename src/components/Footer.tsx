/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/aiayntra';
const HEALTH_URL = 'https://www.thishealthiswealth.com';
const FOOD_URL = 'https://theflavorcrave.com';
const GUMROAD_URL = 'https://captainay7.gumroad.com/';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-purple-300/[0.09] py-10 bg-[#080510]/70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="font-mono text-lg font-bold tracking-tight text-white">
            ayntra
          </div>
          <div className="text-xs font-mono text-[#a597c7]">
            Instagram:{' '}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-200 hover:text-white transition-colors"
            >
              @aiayntra
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#d4cbe9]">
          <a
            href={HEALTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>thishealthiswealth.com</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8f83b3]" />
          </a>
          <a
            href={FOOD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>theflavorcrave.com</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8f83b3]" />
          </a>
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>Gumroad</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8f83b3]" />
          </a>
        </div>
      </div>
    </footer>
  );
};
