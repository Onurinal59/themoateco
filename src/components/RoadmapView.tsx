import React from "react";
import { MODULES_DATA } from "../data/modulesData";
import { LearningModule, UserLearningState } from "../types";
import { NavTab } from "./Navbar";
import {
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Trophy,
  Zap,
  Shield,
  Layers,
  TrendingUp,
  Award,
  Search,
  Target,
  Swords,
  Compass,
} from "lucide-react";

interface RoadmapViewProps {
  userState: UserLearningState;
  onSelectModule: (module: LearningModule) => void;
  onOpenGlossary: () => void;
  onOpenAICoach: () => void;
  onOpenGuide?: () => void;
  onNavigateTab?: (tab: NavTab) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  userState,
  onSelectModule,
  onOpenGlossary,
  onOpenAICoach,
  onOpenGuide,
  onNavigateTab,
}) => {
  const completedCount = userState.completedModules.length;
  const progressPercent = Math.round((completedCount / MODULES_DATA.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12" id="roadmap-view">
      {/* Hero Welcome & Learning Promise */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden shadow-xs">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              <Sparkles className="w-3.5 h-3.5" />
              Sıfırdan Başlayanlar İçin Bilimsel Öğrenme Rehberi
            </div>

            {onOpenGuide && (
              <button
                onClick={onOpenGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 cursor-pointer transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Nereden Başlamalıyım? Yol Haritası Kılavuzu</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Michael Mauboussin: Ekonomik Hendekleri Ölçmek (Measuring the Moat)
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Finans veya strateji geçmişiniz olmasa bile; mahalle fırını, limonata tezgahı ve iPhone gibi somut analojilerle şirketlerin nasıl milyarlarca liralık kalıcı rekabet avantajı (Moat) kurduğunu adım adım öğrenin.
          </p>

          {/* Quick Learning Features & Practice Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            <button
              onClick={() => onNavigateTab ? onNavigateTab("footnote-detective") : undefined}
              className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 text-left transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  10-K Dipnot Dedektifi
                  <ArrowRight className="w-3 h-3 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">Bilanço & ROIC Düzeltmesi</div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab ? onNavigateTab("reverse-dcf") : undefined}
              className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/60 text-left transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Target className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  Tersine DCF & CAP
                  <ArrowRight className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">Zımni Hendek Yılı</div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab ? onNavigateTab("moat-duel") : undefined}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/60 text-left transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Swords className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  Hendek Düellosu
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">DuPont & Spread Kıyaslama</div>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab ? onNavigateTab("spaced-repetition") : undefined}
              className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800/60 text-left transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  Aralıklı Tekrar (SM-2)
                  <ArrowRight className="w-3 h-3 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">Hafıza Pekiştirme</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar & Roadmap Overview */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="w-full sm:w-auto">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Genel İlerleme Durumunuz</div>
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {completedCount} / {MODULES_DATA.length} Modül Tamamlandı (%{progressPercent})
          </div>
        </div>

        <div className="w-full sm:w-72">
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Modules List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Müfredat Modülleri</h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">Toplam ~115 Dakika</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MODULES_DATA.map((module) => {
            const isCompleted = userState.completedModules.includes(module.id);
            const quizScore = userState.quizScores[module.id];

            return (
              <div
                key={module.id}
                onClick={() => onSelectModule(module)}
                className={`group p-6 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isCompleted
                    ? "bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-700/60 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xs"
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Step Number Badge */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-base shrink-0 border transition-transform group-hover:scale-105 ${
                      isCompleted
                        ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : `0${module.id}`}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                        {module.subtitle}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3" /> {module.estimatedMinutes} Dk
                      </span>
                      {quizScore !== undefined && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                          Test Skoru: %{quizScore}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {module.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {module.description}
                    </p>

                    {/* Everyday Analogy Teaser */}
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 font-medium pt-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{module.zeroKnowledgeSummary}</span>
                    </div>
                  </div>
                </div>

                {/* Right CTA Button */}
                <div className="shrink-0 flex items-center gap-3">
                  <button
                    className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isCompleted
                        ? "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                    }`}
                  >
                    <span>{isCompleted ? "Tekrar İncele" : "Derse Başla"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
