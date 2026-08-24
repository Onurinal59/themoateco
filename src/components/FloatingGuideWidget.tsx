import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, X, ChevronRight, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FloatingGuideWidgetProps {
  onOpenGuide: () => void;
  isAllCompleted?: boolean;
}

export const FloatingGuideWidget: React.FC<FloatingGuideWidgetProps> = ({
  onOpenGuide,
  isAllCompleted = false,
}) => {
  const { isEnglish } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);

  // If all learning modules are completed, hide the onboarding widget completely as requested
  if (isAllCompleted) {
    return null;
  }

  // Check if previously dismissed in local storage
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("moat_floating_guide_dismissed");
      if (dismissed) {
        setIsMinimized(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    try {
      localStorage.setItem("moat_floating_guide_dismissed", "true");
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-[calc(100vw-2.5rem)] sm:max-w-sm pointer-events-none select-none opacity-60 hover:opacity-100 transition-opacity duration-300">
      <AnimatePresence mode="wait">
        {!isMinimized ? (
          /* Full Speech Bubble with Animated Guide Avatar */
          <motion.div
            key="guide-expanded"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-indigo-200 dark:border-indigo-800/80 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-indigo-950/15 dark:shadow-black/50 relative overflow-hidden group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top Row: Character Avatar & Close Button */}
            <div className="flex items-start justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3">
                {/* Animated Character Avatar */}
                <div className="relative">
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                      rotate: [0, -2, 2, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5,
                      ease: "easeInOut"
                    }}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/40"
                  >
                    <Compass className="w-5 h-5 text-white" />
                  </motion.div>
                  {/* Status Indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                      {isEnglish ? "Moat Mentor" : "Hendek Rehberi"}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3" />
                      {isEnglish ? "Start Here" : "Buradan Başla"}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                    {isEnglish ? "New to the platform?" : "Platforma yeni mi katıldın?"}
                  </h4>
                </div>
              </div>

              {/* Close / Minimize */}
              <button
                onClick={handleClose}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isEnglish ? "Minimize" : "Küçült"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Speech Bubble Body */}
            <div className="mt-3 relative z-10">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEnglish
                  ? "Don't know where to start? Check out our 7-step mastery guide to learn valuation formulas, Porter analysis, and real 10-K company audits!"
                  : "Nereden başlayacağını bilmiyor musun? 7 duraklı ustalık rehberine göz atarak formül atölyesini, Porter analizini ve canlı bilanço röntgenini keşfet!"}
              </p>

              {/* CTA Button */}
              <div className="mt-3.5 flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onOpenGuide();
                  }}
                  className="flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isEnglish ? "Explore Learning Guide" : "Öğrenme Rehberine Göz At"}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                </motion.button>

                <button
                  onClick={handleClose}
                  className="py-2 px-3 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {isEnglish ? "Later" : "Daha Sonra"}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized Discreet Floating Action Pill */
          <motion.div
            key="guide-minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-xl shadow-indigo-950/15 hover:shadow-indigo-500/20 transition-all cursor-pointer group"
              title={isEnglish ? "Open Learning Guide" : "Öğrenme Rehberini Aç"}
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xs">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span>{isEnglish ? "Learning Guide" : "Öğrenme Rehberi"}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
