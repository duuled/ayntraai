/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface EbooksPageProps {
  onBack: () => void;
}

interface EbookItem {
  title: string;
  price: string;
  url: string;
}

const EBOOKS: EbookItem[] = [
  {
    title: 'Sunset Vendetta',
    price: '$3',
    url: 'https://play.google.com/store/books/details?id=th0OEgAAQBAJ',
  },
  {
    title: 'THE REPLACEMENT',
    price: '$3',
    url: 'https://play.google.com/store/books/details?id=1UMZEgAAQBAJ',
  },
  {
    title: 'HER LAST LIE',
    price: '$3',
    url: 'https://play.google.com/store/books/details?id=3DcZEgAAQBAJ',
  },
  {
    title: 'BROKE AT 17',
    price: '$3',
    url: 'https://play.google.com/store/books/details?id=JDcZEgAAQBAJ',
  },
  {
    title: "I'VE BEEN HERE BEFORE",
    price: '$3',
    url: 'https://play.google.com/store/books/details?id=Vx0hEgAAQBAJ',
  },
  {
    title: 'Halloween coloring book',
    price: '$3',
    url: 'https://play.google.com/store/books/details?id=txohEgAAQBAJ',
  },
];

export const EbooksPage: React.FC<EbooksPageProps> = ({ onBack }) => {
  return (
    <section className="pt-28 pb-24 min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#130D1E]/80 hover:bg-[#1b122b] border border-purple-300/20 hover:border-sky-300/40 text-xs font-mono font-semibold text-purple-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-300" />
            <span>Back to Ayntra Hub</span>
          </button>
        </div>

        <div className="space-y-3 border-b border-purple-300/[0.1] pb-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
            GOOGLE PLAY BOOKS
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            My Ebooks
          </h1>
          <p className="text-base sm:text-lg text-[#d4cbe9]">
            Thrillers, money guides, and coloring books — $3 each on Google Play.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EBOOKS.map((book) => (
            <div
              key={book.url}
              className="rounded-lg bg-[#10091e]/60 border border-purple-300/[0.11] hover:border-sky-300/40 p-6 flex flex-col justify-between gap-6 backdrop-blur-sm transition-colors"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs text-sky-200 block">
                  {book.price} · Google Play
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {book.title}
                </h2>
              </div>

              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-purple-200 hover:bg-white text-[#080510] font-mono font-bold text-xs transition-colors"
              >
                <span>View on Google Play</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
