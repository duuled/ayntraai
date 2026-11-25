/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  currentPage: 'hub' | 'ebooks';
  onNavigateHub: (sectionId?: string) => void;
  onNavigateEbooks: () => void;
}

const INSTAGRAM_URL = 'https://www.instagram.com/aiayntra';

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigateHub,
  onNavigateEbooks,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Directory', sectionId: 'directory' },
    { label: 'My Work', sectionId: 'work' },
    { label: 'Ebooks', isEbooks: true },
    { label: 'For Businesses', sectionId: 'for-businesses' },
    { label: 'About', sectionId: 'about' },
  ];

  const handleLinkClick = (link: { label: string; sectionId?: string; isEbooks?: boolean }) => {
    setMobileMenuOpen(false);
    if (link.isEbooks) {
      onNavigateEbooks();
    } else if (link.sectionId) {
      onNavigateHub(link.sectionId);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#080510]/85 backdrop-blur-md border-b border-purple-300/[0.1] py-3.5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => onNavigateHub()}
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-purple-200 transition-colors cursor-pointer font-mono"
          >
            <span>ayntra</span>
          </button>

          {currentPage === 'hub' ? (
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wide text-[#a597c7]">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-[#d0c6ea]">
              <button
                type="button"
                onClick={() => onNavigateHub()}
                className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-purple-300" />
                <span>Back to Ayntra Hub</span>
              </button>
            </nav>
          )}

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-mono font-semibold text-purple-100 bg-[#130D1E]/85 hover:bg-[#1b122b] border border-purple-300/25 hover:border-purple-300/50 rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Book a free demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-sky-300" />
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {currentPage === 'ebooks' && (
              <button
                type="button"
                onClick={() => onNavigateHub()}
                className="px-3 py-1.5 text-xs font-mono text-purple-200 bg-[#130D1E]/80 border border-purple-300/25 rounded-md flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Hub</span>
              </button>
            )}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-mono font-semibold text-purple-100 bg-[#130D1E]/85 border border-purple-300/25 rounded-md whitespace-nowrap"
            >
              Free demo
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#a597c7] hover:text-white transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-300/[0.1] bg-[#080510]/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2.5 font-mono text-sm">
            {currentPage === 'ebooks' && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHub();
                }}
                className="flex items-center gap-2 text-purple-200 py-1.5 text-left"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Ayntra Hub</span>
              </button>
            )}
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleLinkClick(link)}
                className="text-[#c5b9e3] hover:text-white py-1.5 transition text-left"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
