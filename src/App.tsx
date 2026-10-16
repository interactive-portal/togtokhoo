/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageTab } from './components/Header';
import { TopHeader } from './components/TopHeader';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileMenuSheet } from './components/MobileMenuSheet';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
  };

  const handleOpenHandout = (title: string) => {
    setHandoutTitle(title);
    setIsHandoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Top Header */}
      <TopHeader
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Body with Left Sidebar + Content Area */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar Navigation (Desktop) */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={handleTabChange}
          isMobileOpen={false}
        />

        {/* Main Content Container - with pb-24 on mobile for bottom nav */}
        <main className="flex-1 min-w-0 flex flex-col bg-[#f8faff] pb-20 lg:pb-0">
          {/* Breadcrumb banner when not on Home */}
          {currentTab !== 'nuur' && (
            <div className="bg-white border-b border-[#e5eeff] px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-[53px] lg:top-0 z-30 shadow-xs">
              <button
                onClick={() => handleTabChange('nuur')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1967d2] hover:underline cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Нүүр хуудас</span>
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <span className="hidden sm:inline">JAPAN TRIP 2026</span>
                <span className="hidden sm:inline">/</span>
                <span className="text-[#002045] font-extrabold capitalize">
                  {currentTab.replace('-', ' ')}
                </span>
              </div>
            </div>
          )}

          {/* Active Page View */}
          <div className="flex-1">
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
          </div>

          {/* Footer (hidden on small mobile screens to keep the native app clean, visible on tablet & desktop) */}
          <div className="hidden sm:block">
            <Footer onSelectTab={handleTabChange} />
          </div>
        </main>
      </div>

      {/* Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        isMenuOpen={isMobileMenuOpen}
      />

      {/* Native Mobile Menu Drawer / Sheet */}
      <MobileMenuSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenHandout={handleOpenHandout}
      />

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
