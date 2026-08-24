import React from "react";
import { motion } from "motion/react";
import { LearningModule, UserLearningState } from "../types";
import { NavTab } from "./Navbar";
import { SimTab } from "./SimulationsView";
import { useLanguage } from "../context/LanguageContext";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Search,
  Target,
  Swords,
  Compass,
  Milestone,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface RoadmapViewProps {
  userState: UserLearningState;
  onSelectModule: (module: LearningModule) => void;
  onOpenGlossary: () => void;
  onOpenAICoach: () => void;
  onOpenGuide?: () => void;
  onNavigateTab?: (tab: NavTab, sim?: SimTab) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  userState,
  onSelectModule,
  onOpenGuide,
  onNavigateTab,
}) => {
  const { isEnglish, getModules, t } = useLanguage();
  const modules = getModules();
  const completedCount = userState.completedModules.length;
  const progressPercent = Math.round((completedCount / (modules.length || 1)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-6 sm:space-y-8 pb-12"
      id="roadmap-view"
    >
      {/* Hero Welcome & Institutional Mastery Mission */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 overflow-hidden shadow-xs">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              {isEnglish ? "From Scratch to Institutional Mastery: 8-Step Curriculum" : "Sıfırdan Profesyonel Ustalığa: 8 Adımlı Müfredat"}
            </div>

            {onOpenGuide && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 cursor-pointer transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{isEnglish ? "Mastery Roadmap Guide" : "Ustalık Yol Haritası Kılavuzu"}</span>
              </motion.button>
            )}
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {isEnglish
              ? "Michael Mauboussin: Measuring Economic Moats & Forensic Accounting"
              : "Michael Mauboussin: Ekonomik Hendekleri Ölçmek & Bilanço Cerrahisi"}
          </h1>

          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEnglish
              ? "Our goal is not just memorizing formulas, but developing the intuitive capability to analyze competitive moats, ROIC > WACC capital spreads, and 10-K financial statement forensics just like Morgan Stanley and Berkshire Hathaway analysts."
              : "Hedefimiz sadece kavramları ezberlemek değil; Warren Buffett ve Morgan Stanley analistleri gibi ekonomik kaleleri (Moat), ROIC > WACC sermaye getirisini ve 10-K bilanço röntgenini kurumsal düzeyde analiz edebilecek yetkinliğe ve sezgiye ulaşmanızdır."}
          </p>

          {/* 4-Stage Mastery Architecture */}
          <div className="mt-5 p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/70 text-indigo-950 dark:text-indigo-200">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-2.5">
              <Milestone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{isEnglish ? "4-Stage Mastery Architecture:" : "4 Aşamalı Ustalık & İnceleme Mimarisi:"}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px] sm:text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900/50 shadow-2xs">
                <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">
                  {isEnglish ? "1. Core Capital (1-2)" : "1. Temel Sermaye (1-2)"}
                </strong>
                {isEnglish ? "ROIC vs WACC & Dickinson Cash Flow Life Cycles" : "ROIC vs WACC & Dickinson Nakit Akış Evreleri"}
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900/50 shadow-2xs">
                <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">
                  {isEnglish ? "2. Micro & Industry (3-4)" : "2. Mikro & Sektör (3-4)"}
                </strong>
                {isEnglish ? "Value Stick (WTP) & Profit Pool Distortion" : "Değer Çubuğu (WTP) & Kâr Havuzu Çarpıklığı"}
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900/50 shadow-2xs">
                <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">
                  {isEnglish ? "3. Barriers & Risk (5-6)" : "3. Bariyer & Risk (5-6)"}
                </strong>
                {isEnglish ? "7 Entry Barriers & Disruptive Defense" : "7 Giriş Engeli & Yıkıcı İnovasyon Savunması"}
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-indigo-100 dark:border-indigo-900/50 shadow-2xs">
                <strong className="text-indigo-600 dark:text-indigo-400 block font-bold">
                  {isEnglish ? "4. Audit & Tests (7-8)" : "4. Bilanço & Test (7-8)"}
                </strong>
                {isEnglish ? "DuPont Forensic Analysis & 60-Point Checklist" : "DuPont ROIC Röntgeni & 60 Maddelik Komite"}
              </div>
            </div>
          </div>

          {/* Quick Learning Features & Practice Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigateTab ? onNavigateTab("simulators", "footnote-detective") : undefined}
              className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 border border-indigo-200 dark:border-indigo-800/70 text-left transition-all cursor-pointer group shadow-2xs"
            >
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  {isEnglish ? "10-K Footnote Detective" : "10-K Dipnot Dedektifi"}
                  <ArrowRight className="w-3 h-3 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                  {isEnglish ? "Operating Lease & R&D Capitalization" : "Faaliyet Kira & Ar-Ge Düzeltmesi"}
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigateTab ? onNavigateTab("simulators", "reverse-dcf") : undefined}
              className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/90 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/70 border border-amber-200 dark:border-amber-800/70 text-left transition-all cursor-pointer group shadow-2xs"
            >
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Target className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  {isEnglish ? "Reverse DCF & CAP" : "Tersine DCF & CAP"}
                  <ArrowRight className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                  {isEnglish ? "Market-Implied Moat Period" : "Zımni Hendek Yılı (Mauboussin)"}
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigateTab ? onNavigateTab("moat-duel") : undefined}
              className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 text-left transition-all cursor-pointer group shadow-2xs"
            >
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Swords className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  {isEnglish ? "Moat Duel" : "Hendek Düellosu"}
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                  {isEnglish ? "Head-to-head DuPont & Spread" : "DuPont & Spread Kıyaslama"}
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigateTab ? onNavigateTab("spaced-repetition") : undefined}
              className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50/90 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/70 border border-purple-200 dark:border-purple-800/70 text-left transition-all cursor-pointer group shadow-2xs"
            >
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  {isEnglish ? "Spaced Repetition (SM-2)" : "Aralıklı Tekrar (SM-2)"}
                  <ArrowRight className="w-3 h-3 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                  {isEnglish ? "Cognitive Recall Flashcards" : "Bilişsel Hafıza Pekiştirme"}
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Progress Bar & Roadmap Overview */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="w-full sm:w-auto">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {isEnglish ? "Your Curriculum Progress" : "Genel İlerleme Durumunuz"}
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {isEnglish
              ? `${completedCount} / ${modules.length} Steps Completed (${progressPercent}%)`
              : `${completedCount} / ${modules.length} Adım Tamamlandı (%${progressPercent})`}
          </div>
        </div>

        <div className="w-full sm:w-72">
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {isEnglish ? "8-Step Mastery Curriculum" : "8 Adımlı Ustalık Müfredatı"}
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isEnglish ? "Total ~115 Minutes" : "Toplam ~115 Dakika"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {modules.map((module, idx) => {
            const isCompleted = userState.completedModules.includes(module.id);
            const quizScore = userState.quizScores[module.id];

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                whileHover={{ y: -2, scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                onClick={() => onSelectModule(module)}
                className={`group p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 ${
                  isCompleted
                    ? "bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-700/60 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xs"
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                  {/* Step Number Badge */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-sm sm:text-base shrink-0 border transition-transform group-hover:scale-105 ${
                      isCompleted
                        ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : `0${module.id}`}
                  </div>

                  <div className="space-y-1 sm:space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                        {module.subtitle}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3" /> {module.estimatedMinutes} {isEnglish ? "Min" : "Dk"}
                      </span>
                      {quizScore !== undefined && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                          {isEnglish ? `Mastery Test: ${quizScore}%` : `Ustalık Testi: %${quizScore}`}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {module.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {module.description}
                    </p>

                    {/* Everyday Analogy Teaser */}
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 font-medium pt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{module.zeroKnowledgeSummary}</span>
                    </div>
                  </div>
                </div>

                {/* Right CTA Button */}
                <div className="shrink-0 flex items-center gap-3 pt-2 md:pt-0">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`w-full md:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isCompleted
                        ? "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                    }`}
                  >
                    <span>
                      {isCompleted
                        ? isEnglish ? "Review Step" : "Modülü İncele"
                        : isEnglish ? "Start Step" : "Adıma Başla"}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

