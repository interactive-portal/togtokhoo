/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, PageTab } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ItineraryPage } from './pages/ItineraryPage';
import { TeamsPage } from './pages/TeamsPage';
import { GiftsPage } from './pages/GiftsPage';
import { ShoppingPage } from './pages/ShoppingPage';
import { DeclarationPage } from './pages/DeclarationPage';
import { TransitPage } from './pages/TransitPage';
import { LanguagePage } from './pages/LanguagePage';
import { AttendancePage } from './pages/AttendancePage';
import { GalleryPage } from './pages/GalleryPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { HandoutModal } from './components/HandoutModal';
import { EventDetailModal } from './components/EventDetailModal';
import { ItineraryItem } from './data/itinerary';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('nuur');
  const [isHandoutOpen, setIsHandoutOpen] = useState(false);
  const [handoutTitle, setHandoutTitle] = useState('Orientation_Handout.pdf');
  const [selectedEvent, setSelectedEvent] = useState<ItineraryItem | null>(null);

  // Sync hash if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageTab;
      const validTabs: PageTab[] = [
        'nuur',
        'khotolbor',
        'bagiin-burtgel',
        'beleg',
        'shopping',
        'deklarats',
        'teever',
        'khel',
        'surgaltyn-irts',
        'zurgiin-san',
        'kholboo-barikh'
      ];
      if (validTabs.includes(hash)) {
        setCurrentTab(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: PageTab) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHandout = (title: string) => {
    setHandoutTitle(title);
    setIsHandoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleTabChange}
      />

      {/* Main Content View with top offset for fixed header */}
      <main className="flex-1 pt-28 sm:pt-32 flex flex-col">
        {currentTab === 'nuur' && (
          <HomePage
            onNavigate={handleTabChange}
            onOpenHandout={handleOpenHandout}
          />
        )}

        {currentTab === 'khotolbor' && (
          <ItineraryPage
            onOpenHandout={handleOpenHandout}
            onOpenDetail={(item) => setSelectedEvent(item)}
          />
        )}

        {currentTab === 'bagiin-burtgel' && (
          <TeamsPage />
        )}

        {currentTab === 'beleg' && (
          <GiftsPage />
        )}

        {currentTab === 'shopping' && (
          <ShoppingPage />
        )}

        {currentTab === 'deklarats' && (
          <DeclarationPage />
        )}

        {currentTab === 'teever' && (
          <TransitPage />
        )}

        {currentTab === 'khel' && (
          <LanguagePage />
        )}

        {currentTab === 'surgaltyn-irts' && (
          <AttendancePage />
        )}

        {currentTab === 'zurgiin-san' && (
          <GalleryPage />
        )}

        {currentTab === 'kholboo-barikh' && (
          <DirectoryPage />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleTabChange} />

      {/* Handout PDF Viewer & Download Modal */}
      <HandoutModal
        isOpen={isHandoutOpen}
        onClose={() => setIsHandoutOpen(false)}
        documentTitle={handoutTitle}
      />

      {/* Itinerary Item Detail Modal */}
      <EventDetailModal
        item={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenHandout={handleOpenHandout}
      />
    </div>
  );
}
