import React from "react";
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
  Search,
  Target,
} from "lucide-react";
import { UserLearningState } from "../types";

export type NavTab =
  | "roadmap"
  | "company-audit"
  | "footnote-detective"
  | "reverse-dcf"
  | "moat-duel"
  | "simulators"
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
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0 shrink"
            onClick={() => setActiveTab("roadmap")}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-tight text-slate-900 dark:text-slate-100 truncate">
                  Ekonomik Hendek
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 whitespace-nowrap">
                  Measuring the Moat
                </span>
              </div>
              <p className="hidden xl:block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Michael Mauboussin & Morgan Stanley Öğrenme Rehberi
              </p>
            </div>
          </div>

          {/* Desktop Nav Tabs (Hidden on small tablets/phones, visible on lg+) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "roadmap"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Yol Haritası
            </button>

            <button
              onClick={() => setActiveTab("footnote-detective")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "footnote-detective"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Search className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Dipnot Dedektifi (10-K)
            </button>

            <button
              onClick={() => setActiveTab("reverse-dcf")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "reverse-dcf"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-500" />
              Tersine DCF & CAP
            </button>

            <button
              onClick={() => setActiveTab("company-audit")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "company-audit"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Analiz
            </button>

            <button
              onClick={() => setActiveTab("moat-duel")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "moat-duel"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              Düello
            </button>

            <button
              onClick={() => setActiveTab("simulators")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "simulators"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Laboratuvar
            </button>

            <button
              onClick={() => setActiveTab("spaced-repetition")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "spaced-repetition"
                  ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              Tekrarlama
            </button>
          </nav>

          {/* Right Controls: Streak, Dark Mode Toggle, Glossary & AI Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Daily Streak */}
            <div
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-bold"
              title="Aktif Öğrenme Serisi"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span className="hidden sm:inline">{userState.currentStreak} Gün</span>
              <span className="sm:hidden">{userState.currentStreak}g</span>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title={isDarkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
              <span className="hidden md:inline">{isDarkMode ? "Aydınlık" : "Karanlık"}</span>
            </button>

            {/* Guide / Onboarding Button */}
            {onOpenGuide && (
              <button
                onClick={onOpenGuide}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-colors cursor-pointer"
                title="Nasıl Başlarım? Öğrenme Yolculuğu Rehberi"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="hidden sm:inline">Rehber</span>
              </button>
            )}

            {/* Glossary Button */}
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Terimler Sözlüğü"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="hidden sm:inline">Sözlük</span>
            </button>

            {/* AI Coach Button */}
            <button
              onClick={onOpenAICoach}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
              title="Sokratik AI Koçu"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">AI Koçu</span>
              <span className="sm:hidden">Koç</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Nav Tabs Bar */}
        <div className="lg:hidden flex items-center justify-around gap-1 py-1.5 border-t border-slate-200 dark:border-slate-800 text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex-1 min-w-[60px] flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              activeTab === "roadmap"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Yol</span>
          </button>

          <button
            onClick={() => setActiveTab("footnote-detective")}
            className={`flex-1 min-w-[70px] flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              activeTab === "footnote-detective"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Dipnot</span>
          </button>

          <button
            onClick={() => setActiveTab("reverse-dcf")}
            className={`flex-1 min-w-[70px] flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              activeTab === "reverse-dcf"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Target className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Tersine DCF</span>
          </button>

          <button
            onClick={() => setActiveTab("company-audit")}
            className={`flex-1 min-w-[60px] flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              activeTab === "company-audit"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Analiz</span>
          </button>

          <button
            onClick={() => setActiveTab("moat-duel")}
            className={`flex-1 min-w-[60px] flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              activeTab === "moat-duel"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Swords className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Düello</span>
          </button>

          <button
            onClick={() => setActiveTab("simulators")}
            className={`flex-1 min-w-[60px] flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              activeTab === "simulators"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Lab</span>
          </button>

          <button
            onClick={() => setActiveTab("spaced-repetition")}
            className={`flex-1 min-w-[60px] flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              activeTab === "spaced-repetition"
                ? "bg-indigo-600 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Repeat className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Tekrar</span>
          </button>
        </div>
      </div>
    </header>
  );
};

