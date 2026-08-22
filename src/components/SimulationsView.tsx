import React, { useState } from "react";
import { ValueStickSim } from "./simulators/ValueStickSim";
import { DuPontSim } from "./simulators/DuPontSim";
import { ReverseDCFSim } from "./simulators/ReverseDCFSim";
import { FootnoteDetectiveLab } from "./simulators/FootnoteDetectiveLab";
import { ProfitPoolSim } from "./simulators/ProfitPoolSim";
import { PrisonersDilemmaSim } from "./simulators/PrisonersDilemmaSim";
import { ColonelBlottoSim } from "./simulators/ColonelBlottoSim";
import { CashConversionSim } from "./simulators/CashConversionSim";
import { MoatChecklistSim } from "./simulators/MoatChecklistSim";
import {
  FlaskConical,
  TrendingUp,
  DollarSign,
  Swords,
  Shield,
  Clock,
  CheckSquare,
  Target,
  Search
} from "lucide-react";

type SimTab =
  | "reverse-dcf"
  | "footnote-detective"
  | "value-stick"
  | "dupont"
  | "profit-pool"
  | "game-theory"
  | "blotto"
  | "ccc"
  | "checklist";

export const SimulationsView: React.FC = () => {
  const [activeSim, setActiveSim] = useState<SimTab>("reverse-dcf");

  const SIMS = [
    { id: "reverse-dcf", label: "Tersine DCF & Zımni CAP", icon: Target, badge: "Expectations Investing" },
    { id: "footnote-detective", label: "10-K Dipnot Dedektifi", icon: Search, badge: "ROIC Düzeltmeleri" },
    { id: "value-stick", label: "Değer Çubuğu (WTP-WTS)", icon: DollarSign, badge: "Exhibit 32" },
    { id: "dupont", label: "DuPont ROIC Röntgeni", icon: TrendingUp, badge: "Exhibit 34" },
    { id: "profit-pool", label: "Havacılık Kâr Havuzu", icon: FlaskConical, badge: "Exhibit 10" },
    { id: "game-theory", label: "Mahkumlar İkilemi", icon: Swords, badge: "Exhibit 36" },
    { id: "blotto", label: "Albay Blotto Dağıtımı", icon: Shield, badge: "Exhibit 37" },
    { id: "ccc", label: "Nakit Dönüşüm (CCC)", icon: Clock, badge: "Amazon vs B&N" },
    { id: "checklist", label: "60 Maddelik Kontrol Listesi", icon: CheckSquare, badge: "Morgan Stanley" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16" id="simulations-view">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
            Görselleştirme & Mikroekonomi Laboratuvarı
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Stratejik Simülatörler & İnteraktif Deney Alanı
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Michael Mauboussin'in makalesinde sunduğu tüm matematiksel ve stratejik modelleri gerçek veriler ve parametrelerle test edin.
        </p>
      </div>

      {/* Simulator Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-thin">
        {SIMS.map((s) => {
          const Icon = s.icon;
          const isActive = activeSim === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSim(s.id as SimTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{s.label}</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? "bg-indigo-700 text-indigo-100" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {s.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Simulator Component */}
      <div>
        {activeSim === "reverse-dcf" && <ReverseDCFSim />}
        {activeSim === "footnote-detective" && <FootnoteDetectiveLab />}
        {activeSim === "value-stick" && <ValueStickSim />}
        {activeSim === "dupont" && <DuPontSim />}
        {activeSim === "profit-pool" && <ProfitPoolSim />}
        {activeSim === "game-theory" && <PrisonersDilemmaSim />}
        {activeSim === "blotto" && <ColonelBlottoSim />}
        {activeSim === "ccc" && <CashConversionSim />}
        {activeSim === "checklist" && <MoatChecklistSim />}
      </div>
    </div>
  );
};

