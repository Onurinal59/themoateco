import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  ChevronDown,
  Calculator,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { UserLearningState } from "../types";

export type NavTab =
  | "roadmap"
  | "formulas"
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
  onOpenFormulas?: () => void;
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
  onOpenFormulas,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NAV_ITEMS: {
    id: NavTab;
    label: string;
    shortLabel: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "roadmap",
      label: "Akademi",
      shortLabel: "Akademi",
      icon: Compass,
    },
    {
      id: "formulas",
      label: "Formüller",
      shortLabel: "Formül",
      icon: Calculator,
    },
    {
      id: "simulators",
      label: "Laboratuvar",
      shortLabel: "Lab",
      icon: FlaskConical,
    },
    {
      id: "company-audit",
      label: "Şirket Röntgeni",
      shortLabel: "Analiz",
      icon: Building2,
    },
    {
      id: "moat-duel",
      label: "Hendek Düellosu",
      shortLabel: "Düello",
      icon: Swords,
    },
    {
      id: "spaced-repetition",
      label: "Aralıklı Tekrar",
      shortLabel: "Tekrar",
      icon: Repeat,
    },
  ];

  const handleTabClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setIsMobileDrawerOpen(false);
    setIsResourcesOpen(false);
  };

  return (
    <>
      {/* Apple-style Translucent Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            
            {/* Left: Brand Identity */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none shrink-0"
              onClick={() => handleTabClick("roadmap")}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 ring-1 ring-white/20">
                <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-tight text-slate-900 dark:text-slate-100 font-display">
                    Ekonomik Hendek
                  </span>
                  <span className="hidden xl:inline-flex px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/70">
                    Mauboussin
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block -mt-0.5 font-medium truncate max-w-[180px] lg:max-w-none">
                  Measuring the Moat & ROIC
                </span>
              </div>
            </motion.div>

            {/* Center: Apple-inspired Segmented Navigation Bar (Desktop lg+) */}
            <nav className="hidden lg:flex items-center bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-2xs backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    whileHover={{ scale: isActive ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer select-none z-10 ${
                      isActive
                        ? "text-indigo-950 dark:text-white font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-200/90 dark:border-slate-700/80 -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Right Action Hub: Unified & Non-Overflowing */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Daily Learning Streak Capsule */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-black shadow-2xs select-none"
                title={`${userState.currentStreak} günlük aktif öğrenme serisi`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0 animate-pulse" />
                <span>{userState.currentStreak}</span>
                <span className="hidden md:inline font-medium text-[11px] opacity-80">gün</span>
              </motion.div>

              {/* Grouped Resources & Tools Dropdown (Desktop & Tablet) */}
              <div className="relative hidden md:block" ref={resourcesRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isResourcesOpen
                      ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800 shadow-2xs"
                      : "bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Kaynaklar</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isResourcesOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                    }`}
                  />
                </motion.button>

                {/* Dropdown Menu Panel */}
                <AnimatePresence>
                  {isResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-72 p-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 space-y-1"
                    >
                      {/* Terimler Sözlüğü Item */}
                      <button
                        onClick={() => {
                          setIsResourcesOpen(false);
                          onOpenGlossary();
                        }}
                        className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                            Finans & Strateji Sözlüğü
                          </span>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            Kritik hendek ve değerleme kavramlarının açıklamaları
                          </p>
                        </div>
                      </button>

                      {/* Yolculuk Rehberi Item */}
                      {onOpenGuide && (
                        <button
                          onClick={() => {
                            setIsResourcesOpen(false);
                            onOpenGuide();
                          }}
                          className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                              Öğrenme Rehberi
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                              Platformun 7 duraklı ustalık metodolojisi
                            </p>
                          </div>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark / Light Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleDarkMode}
                className="p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                title={isDarkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
                aria-label="Tema Değiştir"
              >
                {isDarkMode ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                )}
              </motion.button>

              {/* Socratic AI Coach Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenAICoach}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-sm shadow-indigo-500/25 transition-all cursor-pointer ring-1 ring-white/20"
                title="Sokratik AI Koçuna Soru Sor"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-spin-slow" />
                <span className="hidden sm:inline">AI Koçu</span>
                <span className="sm:hidden">Koç</span>
              </motion.button>

              {/* Mobile Menu Drawer Toggle (Visible on < lg) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                aria-label="Menüyü Aç"
              >
                {isMobileDrawerOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Full Drawer Navigation */}
        <AnimatePresence>
          {isMobileDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3 shadow-2xl"
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                Sayfalar & Modüller
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? "text-white/80" : "text-slate-400"}`} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 mb-2">
                  Yardımcı & Başvuru Araçları
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    onClick={() => {
                      setIsMobileDrawerOpen(false);
                      onOpenGlossary();
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-800 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Finans & Strateji Terimleri Sözlüğü</span>
                  </button>

                  {onOpenGuide && (
                    <button
                      onClick={() => {
                        setIsMobileDrawerOpen(false);
                        onOpenGuide();
                      }}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-800 cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                      <span>Öğrenme Yolculuğu Rehberi</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
