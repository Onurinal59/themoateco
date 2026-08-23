import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RoicWaccSim } from "./simulators/RoicWaccSim";
import { DickinsonLifecycleSim } from "./simulators/DickinsonLifecycleSim";
import { ValueStickSim } from "./simulators/ValueStickSim";
import { ProfitPoolSim } from "./simulators/ProfitPoolSim";
import { FootnoteDetectiveLab } from "./simulators/FootnoteDetectiveLab";
import { PrisonersDilemmaSim } from "./simulators/PrisonersDilemmaSim";
import { ColonelBlottoSim } from "./simulators/ColonelBlottoSim";
import { DuPontSim } from "./simulators/DuPontSim";
import { CashConversionSim } from "./simulators/CashConversionSim";
import { ReverseDCFSim } from "./simulators/ReverseDCFSim";
import { MoatChecklistSim } from "./simulators/MoatChecklistSim";
import {
  Shield,
  Activity,
  DollarSign,
  FlaskConical,
  Search,
  Swords,
  TrendingUp,
  Clock,
  Target,
  CheckSquare,
  Sparkles,
} from "lucide-react";

export type SimTab =
  | "roic-wacc"
  | "dickinson"
  | "value-stick"
  | "profit-pool"
  | "footnote-detective"
  | "game-theory"
  | "blotto"
  | "dupont"
  | "ccc"
  | "reverse-dcf"
  | "checklist";

interface SimulationsViewProps {
  activeSim?: SimTab;
  onSelectSim?: (sim: SimTab) => void;
  onOpenAICoachWithPrompt?: (prompt: string) => void;
}

export const SimulationsView: React.FC<SimulationsViewProps> = ({
  activeSim: controlledActiveSim,
  onSelectSim,
  onOpenAICoachWithPrompt,
}) => {
  const [internalSim, setInternalSim] = useState<SimTab>("roic-wacc");
  const activeSim = controlledActiveSim || internalSim;

  const handleSelectSim = (sim: SimTab) => {
    setInternalSim(sim);
    if (onSelectSim) {
      onSelectSim(sim);
    }
  };

  const SIMS = [
    { id: "roic-wacc", label: "1. ROIC vs WACC (Şato)", icon: Shield, badge: "Sermaye", step: "Adım 1" },
    { id: "dickinson", label: "2. Yaşam Döngüsü Röntgeni", icon: Activity, badge: "Nakit Tablosu", step: "Adım 2" },
    { id: "value-stick", label: "3. Değer Çubuğu (WTP)", icon: DollarSign, badge: "Mikroekonomi", step: "Adım 3" },
    { id: "profit-pool", label: "4. Havacılık Kâr Havuzu", icon: FlaskConical, badge: "Sektör Haritası", step: "Adım 4" },
    { id: "footnote-detective", label: "5. 10-K Dipnot Dedektifi", icon: Search, badge: "Bilanço Düzeltmesi", step: "Adım 5" },
    { id: "game-theory", label: "6. Mahkumlar İkilemi", icon: Swords, badge: "Fiyat Savaşları", step: "Adım 6" },
    { id: "blotto", label: "Albay Blotto Dağıtımı", icon: Shield, badge: "Niş Strateji", step: "Adım 6+" },
    { id: "dupont", label: "7. DuPont ROIC Röntgeni", icon: TrendingUp, badge: "Marj vs Hız", step: "Adım 7" },
    { id: "ccc", label: "Nakit Dönüşüm (CCC)", icon: Clock, badge: "Amazon vs B&N", step: "Adım 7+" },
    { id: "reverse-dcf", label: "8. Tersine DCF & CAP", icon: Target, badge: "İleri Değerleme", step: "Adım 8" },
    { id: "checklist", label: "60 Maddelik Hendek Listesi", icon: CheckSquare, badge: "Morgan Stanley", step: "Final" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-16 px-1 sm:px-0"
      id="simulations-view"
    >
      {/* Header */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Adım Adım İnteraktif Laboratuvarlar
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Müfredat Adımlarına Göre Entegre
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Stratejik Simülatörler & Bilanço Deney Alanı
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          1. Adımdaki ROIC & Şato Hendeği hesaplamasından 8. Adımdaki Tersine DCF (Zımni CAP süresi) ve 60 Maddelik Morgan Stanley Hendek Denetimine kadar tüm modelleri dinamik parametrelerle deneyimleyin.
        </p>
      </div>

      {/* Simulator Selector Tabs (Horizontally scrollable and responsive) */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-thin">
        {SIMS.map((s) => {
          const Icon = s.icon;
          const isActive = activeSim === s.id;
          return (
            <motion.button
              key={s.id}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectSim(s.id as SimTab)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{s.label}</span>
              <span
                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isActive ? "bg-indigo-700 text-indigo-100" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {s.badge}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Simulator Component with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSim}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full"
        >
          {activeSim === "roic-wacc" && <RoicWaccSim />}
          {activeSim === "dickinson" && <DickinsonLifecycleSim />}
          {activeSim === "value-stick" && <ValueStickSim />}
          {activeSim === "profit-pool" && <ProfitPoolSim />}
          {activeSim === "footnote-detective" && <FootnoteDetectiveLab />}
          {activeSim === "game-theory" && <PrisonersDilemmaSim />}
          {activeSim === "blotto" && <ColonelBlottoSim />}
          {activeSim === "dupont" && <DuPontSim />}
          {activeSim === "ccc" && <CashConversionSim />}
          {activeSim === "reverse-dcf" && (
            <ReverseDCFSim
              onAskAICoach={(prompt) => {
                if (onOpenAICoachWithPrompt) onOpenAICoachWithPrompt(prompt);
              }}
            />
          )}
          {activeSim === "checklist" && <MoatChecklistSim />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
