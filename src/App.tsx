/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QuantumBackground } from './components/QuantumBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DirectorySection } from './components/DirectorySection';
import { MyWorkSection } from './components/MyWorkSection';
import { MyEbooksSection } from './components/MyEbooksSection';
import { StartHereSection } from './components/StartHereSection';
import { ForBusinessesSection } from './components/ForBusinessesSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { EbooksPage } from './components/EbooksPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'hub' | 'ebooks'>('hub');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHub = (sectionId?: string) => {
    setCurrentPage('hub');
    if (sectionId) {
      setTimeout(() => scrollToSection(sectionId), 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateEbooks = () => {
    setCurrentPage('ebooks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-[#e6e0f5] font-sans selection:bg-purple-300 selection:text-[#080510]">
      <QuantumBackground />

      <div className="relative z-10">
        <Navbar
          currentPage={currentPage}
          onNavigateHub={handleNavigateHub}
          onNavigateEbooks={handleNavigateEbooks}
        />

        {currentPage === 'ebooks' ? (
          <main>
            <EbooksPage onBack={() => handleNavigateHub()} />
          </main>
        ) : (
          <main>
            {/* 1. HERO */}
            <Hero onBrowseTools={() => scrollToSection('directory')} />

            {/* 2. THE DIRECTORY */}
            <DirectorySection />

            {/* 3. MY WORK */}
            <MyWorkSection />

            {/* 4. MY EBOOKS */}
            <MyEbooksSection onOpenEbooksPage={handleNavigateEbooks} />

            {/* 5. START HERE */}
            <StartHereSection />

            {/* 6. FOR BUSINESSES */}
            <ForBusinessesSection />

            {/* 7. ABOUT */}
            <AboutSection />
          </main>
        )}

        {/* 8. FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
