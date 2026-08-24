import React, { useState } from "react";
import { TrendingUp, AlertTriangle, CheckCircle, RotateCcw, CheckCircle2, HelpCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface CompanyBenchmark {
  name: string;
  strategyTr: "Farklılaşma (Yüksek Marj)" | "Maliyet Liderliği (Yüksek Devir)" | "Süperstar (Her İkisi)" | "Kırılgan / Değer Yok Eden";
  strategyEn: "Differentiation (High Margin)" | "Cost Leadership (High Turnover)" | "Superstar (Both Engines)" | "Vulnerable / Value Destroyer";
  margin: number;
  turnover: number;
  roic: number;
  descTr: string;
  descEn: string;
}

const BENCHMARKS: CompanyBenchmark[] = [
  {
    name: "Coca-Cola Company",
    strategyTr: "Farklılaşma (Yüksek Marj)",
    strategyEn: "Differentiation (High Margin)",
    margin: 26,
    turnover: 0.6,
    roic: 16,
    descTr: "Güçlü marka ve gizli formül ile %26 NOPAT marjı üretir.",
    descEn: "Generates a 26% NOPAT margin via pricing power and brand equity.",
  },
  {
    name: "Costco Wholesale",
    strategyTr: "Maliyet Liderliği (Yüksek Devir)",
    strategyEn: "Cost Leadership (High Turnover)",
    margin: 4,
    turnover: 4.3,
    roic: 16,
    descTr: "Yalnızca %4 ince kâr marjıyla çalışır ama depodaki malları 4.3 kat hızla döndürür.",
    descEn: "Operates with a lean 4% operating margin but turns over invested capital 4.3x annually.",
  },
  {
    name: "Apple Inc.",
    strategyTr: "Süperstar (Her İkisi)",
    strategyEn: "Superstar (Both Engines)",
    margin: 28,
    turnover: 1.6,
    roic: 45,
    descTr: "Hem %28'lik devasa bir lüks marjına hem de 1.6x yüksek sermaye dönüşüm hızına sahiptir.",
    descEn: "Commands both luxury 28% NOPAT margins and a high 1.6x capital velocity.",
  },
  {
    name: "Marathon Petroleum",
    strategyTr: "Maliyet Liderliği (Yüksek Devir)",
    strategyEn: "Cost Leadership (High Turnover)",
    margin: 8,
    turnover: 2.3,
    roic: 18,
    descTr: "Rafineri ölçeği ve yüksek varlık verimliliği ile 2.3x devir hızına ulaşır.",
    descEn: "Reaches 2.3x asset velocity driven by refinery scale and operational throughput.",
  },
  {
    name: "Devon Energy",
    strategyTr: "Farklılaşma (Yüksek Marj)",
    strategyEn: "Differentiation (High Margin)",
    margin: 26,
    turnover: 0.7,
    roic: 18,
    descTr: "Düşük maliyetli kaya petrolü sahaları sayesinde yüksek marj üretir.",
    descEn: "Captures high margins enabled by prime low-cost shale reserves.",
  },
];

export const DuPontSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const [nopatMargin, setNopatMargin] = useState<number>(26);
  const [capitalTurnover, setCapitalTurnover] = useState<number>(0.6);

  const calculatedRoic = Math.round(nopatMargin * capitalTurnover * 10) / 10;

  const handleSelectBenchmark = (b: CompanyBenchmark) => {
    setNopatMargin(b.margin);
    setCapitalTurnover(b.turnover);
  };

  const getStrategicArchetype = () => {
    if (nopatMargin >= 20 && capitalTurnover >= 1.5) {
      return {
        titleTr: "👑 Süperstar Şirket (Çifte Motor)",
        titleEn: "👑 Superstar Compounder (Twin Engines)",
        color: "text-purple-600 dark:text-purple-400",
        badge: "bg-purple-100 dark:bg-purple-950/60 border-purple-300 text-purple-800 dark:text-purple-300",
        descTr: "Hem lüks marjı hem de yüksek sermaye devriyle dünyadaki en yüksek ROIC oranlarını üretir (Örn: Apple).",
        descEn: "Combines luxury pricing margins with blistering capital velocity (e.g. Apple).",
      };
    }
    if (nopatMargin >= 18) {
      return {
        titleTr: "💎 Farklılaşma Lideri (Yüksek Marj)",
        titleEn: "💎 Differentiation Leader (High Margin)",
        color: "text-indigo-600 dark:text-indigo-400",
        badge: "bg-indigo-100 dark:bg-indigo-950/60 border-indigo-300 text-indigo-800 dark:text-indigo-300",
        descTr: "Marka, patent veya tekel avantajıyla her satıştan devasa kâr marjı keser (Örn: Coca-Cola, Tiffany).",
        descEn: "Commands massive operating margins via brand prestige or proprietary IP (e.g. Coca-Cola, Tiffany).",
      };
    }
    if (capitalTurnover >= 2.5) {
      return {
        titleTr: "⚡ Maliyet Lideri (Yüksek Devir Hızı)",
        titleEn: "⚡ Cost & Velocity Leader (High Turnover)",
        color: "text-emerald-600 dark:text-emerald-400",
        badge: "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 text-emerald-800 dark:text-emerald-300",
        descTr: "Düşük kâr marjıyla çalışır ama sermayeyi yılda defalarca döndürerek aynı yüksek ROIC'e ulaşır (Örn: Costco, Walmart).",
        descEn: "Operates with slim margins but achieves identical superior ROIC through rapid capital velocity (e.g. Costco).",
      };
    }
    return {
      titleTr: "⚠️ Ortada Sıkışmış (Stuck in the Middle)",
      titleEn: "⚠️ Stuck in the Middle (Commodity Trap)",
      color: "text-rose-600 dark:text-rose-400",
      badge: "bg-rose-100 dark:bg-rose-950/60 border-rose-300 text-rose-800 dark:text-rose-300",
      descTr: "Ne yüksek fiyat koyabiliyor ne de mallarını hızlı döndürebiliyor; sermaye maliyetinin altında ezilme riski taşır.",
      descEn: "Neither commands pricing power nor achieves asset velocity; high risk of destroying capital value.",
    };
  };

  const archetype = getStrategicArchetype();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="dupont-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 7: DuPont ROIC Decomposition" : "Modül 7: DuPont ROIC Ayrıştırması"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "ROIC = NOPAT Margin × Capital Turnover" : "ROIC = NOPAT Marjı × Sermaye Devir Hızı"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "DuPont Strategic Vector Decomposition" : "DuPont Stratejik İkiz Motor Röntgeni"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "Two distinct companies can earn identical 16% ROIC via completely different paths: Coca-Cola (High Margin) vs Costco (High Velocity)."
              : "İki farklı şirket aynı %16 ROIC'e bambaşka yollardan ulaşabilir: Biri yüksek marjla (Coca-Cola), diğeri yüksek sermaye devir hızıyla (Costco)."}
          </p>
        </div>

        <button
          onClick={() => {
            setNopatMargin(26);
            setCapitalTurnover(0.6);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset" : "Sıfırla"}
        </button>
      </div>

      {/* Preset Profiles */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {isEnglish ? "Mauboussin Case Studies:" : "Mauboussin Vaka Örnekleri:"}
        </span>
        {BENCHMARKS.map((b, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectBenchmark(b)}
            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NOPAT Margin */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-900 dark:text-indigo-300">
              {isEnglish ? "1. NOPAT Operating Margin (%):" : "1. NOPAT Faaliyet Marjı (%):"}
            </span>
            <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 text-base">
              %{nopatMargin}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={50}
            step={0.5}
            value={nopatMargin}
            onChange={(e) => setNopatMargin(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 dark:bg-indigo-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            {isEnglish
              ? "NOPAT / Sales: Pricing power, branding, and operational cost control."
              : "NOPAT / Ciro: Fiyatlama gücü, marka sadakati ve maliyet disiplini."}
          </p>
        </div>

        {/* Capital Turnover */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-900 dark:text-emerald-300">
              {isEnglish ? "2. Capital Turnover Velocity (x):" : "2. Sermaye Devir Hızı (x):"}
            </span>
            <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-base">
              {capitalTurnover}x
            </span>
          </div>
          <input
            type="range"
            min={0.2}
            max={6.0}
            step={0.1}
            value={capitalTurnover}
            onChange={(e) => setCapitalTurnover(Number(e.target.value))}
            className="w-full h-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            {isEnglish
              ? "Sales / Invested Capital: Working capital velocity and asset efficiency."
              : "Ciro / Yatırılan Sermaye: Varlıkların ve stokların yılda kaç kez döndürüldüğü."}
          </p>
        </div>
      </div>

      {/* Result Hero Card */}
      <div className={`p-6 rounded-3xl border ${archetype.badge} flex flex-col sm:flex-row items-center justify-between gap-5`}>
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center font-mono font-black text-xl text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
            %{calculatedRoic}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider opacity-80">
              {isEnglish ? "Calculated Return on Invested Capital" : "Hesaplanan Yatırılan Sermaye Getirisi (ROIC)"}
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {isEnglish ? archetype.titleEn : archetype.titleTr}
            </h3>
          </div>
        </div>

        <div className="text-xs max-w-md text-center sm:text-right font-medium text-slate-700 dark:text-slate-300">
          {isEnglish ? archetype.descEn : archetype.descTr}
        </div>
      </div>
    </div>
  );
};
