import React, { useState } from "react";
import {
  Compass,
  Repeat,
  FlaskConical,
  BookOpen,
  Sparkles,
  Flame,
  Moon,
  Sun,
  Building2,
  Swords,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  Target,
  Search,
  Sliders,
  PieChart,
  DollarSign,
  Grid
} from "lucide-react";
import { UserLearningState } from "../types";

export type NavTab =
  | "roadmap"
  | "simulators"
  | "company-audit"
  | "moat-duel"
  | "spaced-repetition";

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userState: UserLearningState;
  onOpenAICoach: () => void;
  onOpenGlossary: () => void;
  onOpenGuide?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userState,
  onOpenAICoach,
  onOpenGlossary,
  onOpenGuide,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const NAV_ITEMS: {
    id: NavTab;
    label: string;
    shortLabel: string;
    description: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    {
      id: "roadmap",
      label: "Yol Haritası",
      shortLabel: "Akademi",
      description: "8 Adımlı Temel Eğitim & Analojiler",
      icon: Compass,
      badge: "8 Modül",
    },
    {
      id: "simulators",
      label: "Laboratuvar",
      shortLabel: "Laboratuvar",
      description: "Tersine DCF, 10-K Dipnot, Değer Çubuğu & DuPont",
      icon: FlaskConical,
      badge: "7 Deney",
    },
    {
      id: "company-audit",
      label: "Şirket Analizi",
      shortLabel: "Analiz",
      description: "BIST & Global Şirket Dosyası & Komite",
      icon: Building2,
    },
    {
      id: "moat-duel",
      label: "Hendek Düellosu",
      shortLabel: "Düello",
      description: "İki Şirketin ROIC ve Hendek Karşılaştırması",
      icon: Swords,
    },
    {
      id: "spaced-repetition",
      label: "Aralıklı Tekrar",
      shortLabel: "Tekrar",
      description: "SuperMemo SM-2 Bilimsel Flashcard Alıştırması",
      icon: Repeat,
      badge: "SM-2",
    },
  ];

  const handleTabClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  return (
    <>
      {/* Top Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Left: Brand Logo & Title */}
            <div
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer min-w-0 shrink-0 select-none group"
              onClick={() => handleTabClick("roadmap")}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-black text-sm sm:text-base tracking-tight text-slate-900 dark:text-slate-100 truncate">
                    Ekonomik Hendek
                  </span>
                  <span className="hidden lg:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                    Measuring the Moat
                  </span>
                </div>
                <p className="hidden xl:block text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  Michael Mauboussin Metodolojisi & Bilanço Atölyesi
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs (Visible on lg+) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-inner">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                      isActive
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-sm border border-slate-200/60 dark:border-slate-700/60"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Tools */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Daily Learning Streak */}
              <div
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-300 text-xs font-black shadow-xs select-none"
                title="Aktif Günlük Öğrenme Serisi"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 shrink-0 animate-pulse" />
                <span className="hidden sm:inline font-bold">
                  {userState.currentStreak} Gün
                </span>
                <span className="sm:hidden font-bold">
                  {userState.currentStreak}g
                </span>
              </div>

              {/* Guide Button (Tablet & Desktop) */}
              {onOpenGuide && (
                <button
                  onClick={onOpenGuide}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-all cursor-pointer shadow-xs hover:scale-102"
                  title="Nasıl Başlarım? Öğrenme Yolculuğu Rehberi"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="hidden md:inline">Rehber</span>
                </button>
              )}

              {/* Glossary Button */}
              <button
                onClick={onOpenGlossary}
                className="hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
                title="Finans & Strateji Terimleri Sözlüğü"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Sözlük</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                title={isDarkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {/* Socratic AI Coach Button */}
              <button
                onClick={onOpenAICoach}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-500/20 transition-all cursor-pointer hover:scale-102 shrink-0"
                title="Sokratik AI Koçuna Soru Sor"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">AI Koçu</span>
                <span className="sm:hidden">Koç</span>
              </button>

              {/* Mobile Drawer Trigger (Visible on < lg) */}
              <button
                onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                aria-label="Menüyü Aç"
              >
                {isMobileDrawerOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Horizontal Menu Bar (Visible on < lg for quick one-tap tab switching) */}
        <div className="lg:hidden flex items-center gap-1.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 px-3 py-1.5 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? "text-white" : "text-slate-500"
                  }`}
                />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Mobile Drawer / Side Sheet for tablet & phone (< lg) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xs h-full border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl p-5 overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                    Ekonomik Hendek
                  </h3>
                  <p className="text-[10px] text-slate-400">Akademi & Laboratuvar</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation List */}
            <div className="py-4 space-y-2 flex-1">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1">
                Sayfalar & Araçlar
              </div>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-xl ${
                          isActive
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs">{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[160px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Quick Actions in Drawer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              {onOpenGuide && (
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onOpenGuide();
                  }}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold"
                >
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Öğrenme Yolculuğu Rehberi</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  onOpenGlossary();
                }}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Terimler Sözlüğü</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
