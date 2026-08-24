import React, { useState } from "react";
import {
  Target,
  TrendingUp,
  HelpCircle,
  Sparkles,
  Calculator,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  Award,
  DollarSign,
  Clock,
  Percent,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface ReverseDCFSimProps {
  onAskAICoach?: (prompt: string) => void;
}

export const ReverseDCFSim: React.FC<ReverseDCFSimProps> = ({ onAskAICoach }) => {
  const { isEnglish, t } = useLanguage();

  // Inputs
  const [marketCap, setMarketCap] = useState<number>(50000); // Current Market Cap / EV (Milyon $)
  const [currentFCF, setCurrentFCF] = useState<number>(2000); // Current NOPAT / FCF (Milyon $)
  const [nearTermGrowth, setNearTermGrowth] = useState<number>(12); // Near-term growth rate (%)
  const [wacc, setWacc] = useState<number>(9.0); // Cost of capital (%)
  const [terminalGrowth, setTerminalGrowth] = useState<number>(2.5); // Terminal GDP growth rate (%)

  // Preset scenarios
  const handleApplyPreset = (name: "wide-tech" | "retail" | "cyclical") => {
    if (name === "wide-tech") {
      setMarketCap(120000);
      setCurrentFCF(4000);
      setNearTermGrowth(15);
      setWacc(8.5);
      setTerminalGrowth(3.0);
    } else if (name === "retail") {
      setMarketCap(45000);
      setCurrentFCF(1800);
      setNearTermGrowth(8);
      setWacc(8.0);
      setTerminalGrowth(2.5);
    } else if (name === "cyclical") {
      setMarketCap(15000);
      setCurrentFCF(1500);
      setNearTermGrowth(4);
      setWacc(11.0);
      setTerminalGrowth(2.0);
    }
  };

  // Reverse DCF Calculation: Solve for Implied CAP (Years of value creation)
  const discountRate = wacc / 100;
  const growthRate = nearTermGrowth / 100;
  const termGrowth = terminalGrowth / 100;

  // Let's iterate years 1..50 to find the CAP where discounted cash flows + terminal value match marketCap
  let impliedCapYears = 0;
  let runningPv = 0;
  let fcf = currentFCF;

  for (let year = 1; year <= 40; year++) {
    fcf = fcf * (1 + growthRate);
    const pvOfFcf = fcf / Math.pow(1 + discountRate, year);
    runningPv += pvOfFcf;

    // Terminal value at end of year N assuming ROIC fades to WACC (value creation stops)
    const terminalValue = (fcf * (1 + termGrowth)) / (discountRate - termGrowth);
    const pvTerminal = terminalValue / Math.pow(1 + discountRate, year);

    const totalEnterpriseValue = runningPv + pvTerminal;

    if (totalEnterpriseValue >= marketCap) {
      impliedCapYears = year;
      break;
    }
    if (year === 40) {
      impliedCapYears = 40; // Max cap ceiling
    }
  }

  // Steady state value (Zero-growth perpetuity: NOPAT / WACC)
  const steadyStateValue = Math.round(currentFCF / (wacc / 100));
  const steadyStatePercentage = Math.min(100, Math.max(0, Math.round((steadyStateValue / marketCap) * 100)));
  const futureValuePercentage = 100 - steadyStatePercentage;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="reverse-dcf-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 8: Reverse DCF & Valuation" : "Modül 8: Tersine DCF & Değerleme"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Expectations Investing & CAP Solving" : "Beklenti Yatırımcılığı & CAP Çözümü"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Reverse DCF & Implied Moat Horizon (CAP)" : "Tersine DCF & Piyasanın Fiyatladığı Hendek Süresi (CAP)"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "Do not forecast future stock price directly. Instead, solve backwards to reveal how many years of extraordinary moat (CAP) the market price already demands."
              : "Geleceği tahmin etmeye çalışmak yerine; mevcut hisse fiyatının şirketten kaç yıllık olağanüstü hendek koruması (CAP) beklediğini geriye doğru çözün."}
          </p>
        </div>

        <button
          onClick={() => handleApplyPreset("wide-tech")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset" : "Sıfırla"}
        </button>
      </div>

      {/* Preset Profiles */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {isEnglish ? "Benchmark Presets:" : "Örnek Senaryolar:"}
        </span>
        <button
          onClick={() => handleApplyPreset("wide-tech")}
          className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold transition-colors cursor-pointer"
        >
          {isEnglish ? "🏰 Wide-Moat Tech Giant" : "🏰 Geniş Hendekli Mega-Teknoloji"}
        </button>
        <button
          onClick={() => handleApplyPreset("retail")}
          className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold transition-colors cursor-pointer"
        >
          {isEnglish ? "🛒 Mature Low-Cost Retailer" : "🛒 Olgun Maliyet Lideri Perakendeci"}
        </button>
        <button
          onClick={() => handleApplyPreset("cyclical")}
          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          {isEnglish ? "⚙️ Cyclical Commodity Manufacturer" : "⚙️ Döngüsel Sanayi & Emtia"}
        </button>
      </div>

      {/* Main Grid: Inputs vs Implied Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {isEnglish ? "Market Valuation & Cash Flow Parameters" : "Piyasa Değerleme & Nakit Akış Parametreleri"}
          </h3>

          {/* Market Cap Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Current Market Cap / Enterprise Value ($M):" : "Mevcut Piyasa Değeri / Şirket Değeri ($M):"}
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                ${marketCap.toLocaleString()}M
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={300000}
              step={2500}
              value={marketCap}
              onChange={(e) => setMarketCap(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Current NOPAT / FCF Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Current Normalized NOPAT / FCF ($M/year):" : "Mevcut Yıllık Normalize NOPAT / FCF ($M/yıl):"}
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                ${currentFCF.toLocaleString()}M
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={15000}
              step={100}
              value={currentFCF}
              onChange={(e) => setCurrentFCF(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Near-term Growth Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Expected Near-Term Growth Rate (g%):" : "Piyasanın Beklediği Yakın Dönem Büyüme Oranı (g%):"}
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{nearTermGrowth}%</span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={0.5}
              value={nearTermGrowth}
              onChange={(e) => setNearTermGrowth(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* WACC Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {isEnglish ? "Cost of Capital (WACC %):" : "Sermaye Maliyeti (WACC %):"}
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{wacc}%</span>
            </div>
            <input
              type="range"
              min={5.0}
              max={15.0}
              step={0.25}
              value={wacc}
              onChange={(e) => setWacc(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Right Output: Implied CAP Result (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              {isEnglish ? "Market-Implied Moat Duration" : "Piyasanın Fiyatladığı Hendek Süresi"}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-indigo-700 dark:text-indigo-300 font-mono">
                {impliedCapYears >= 40 ? "40+ " : `${impliedCapYears} `}
              </span>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                {isEnglish ? "Years of Moat (CAP)" : "Yıl (İma Edilen CAP)"}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {isEnglish
                ? `To justify the $${marketCap.toLocaleString()}M valuation, the company must sustain superior ${nearTermGrowth}% growth and ROIC > WACC for at least ${impliedCapYears} consecutive years without mean reversion.`
                : `Bu $${marketCap.toLocaleString()}M piyasa değerinin haklı çıkabilmesi için, şirketin %${nearTermGrowth} büyüme ve ROIC > WACC avantajını tam ${impliedCapYears} yıl boyunca rakiplere kaptırmadan koruması şarttır.`}
            </p>
          </div>

          {/* Mauboussin Two-Part Price Decomposition */}
          <div className="pt-3 border-t border-indigo-200 dark:border-indigo-900/60 space-y-2">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex justify-between">
              <span>{isEnglish ? "Mauboussin Stock Price Decomposition:" : "Mauboussin 2 Parçalı Fiyat Ayrıştırması:"}</span>
            </div>

            {/* Split Bar */}
            <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex font-mono text-[10px] font-bold text-white shadow-inner">
              <div
                style={{ width: `${steadyStatePercentage}%` }}
                className="bg-indigo-600 flex items-center justify-center transition-all duration-300"
                title={isEnglish ? "Steady-State Value" : "Mevcut Durum Değeri"}
              >
                {steadyStatePercentage >= 20 && `${steadyStatePercentage}%`}
              </div>
              <div
                style={{ width: `${futureValuePercentage}%` }}
                className="bg-amber-500 flex items-center justify-center transition-all duration-300"
                title={isEnglish ? "Future Value Creation Expectations" : "Gelecek Değer Yaratma Beklentisi"}
              >
                {futureValuePercentage >= 20 && `${futureValuePercentage}%`}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                {isEnglish ? `Current State: ${steadyStatePercentage}%` : `Mevcut Durum: %${steadyStatePercentage}`}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {isEnglish ? `Future Growth: ${futureValuePercentage}%` : `Gelecek Büyüme: %${futureValuePercentage}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Guidance Card */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{isEnglish ? "Investor Decision Rule (Expectations Gap):" : "Yatırımcı Karar Kuralı (Beklenti Boşluğu):"}</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {impliedCapYears <= 7
            ? isEnglish
              ? "🟢 Conservative Valuation: The market prices in only 5-7 years of moat. If the company possesses a true 15+ year durable moat, this stock presents an attractive margin of safety."
              : "🟢 Muhafazakar Fiyatlama: Piyasa yalnızca 5-7 yıllık hendek fiyatlamış. Eğer şirket gerçekten 15+ yıllık bir hendeğe sahipse hissede güçlü bir güvenlik marjı (Margin of Safety) vardır."
            : impliedCapYears <= 15
            ? isEnglish
              ? "🟡 Fairly Priced: 10-15 years of moat expectations aligns closely with top-tier established compounders (e.g. Costco, Nike)."
              : "🟡 Dengeli Fiyatlama: 10-15 yıllık hendek beklentisi kaliteli lider şirketlerin tarihi ortalamalarına uygundur."
            : isEnglish
            ? "🔴 Extreme Optimism / High Risk: The market demands 20+ years of uninterrupted hyper-growth without a single execution stumble or technological disruption."
            : "🔴 Aşırı İyimserlik / Yüksek Risk: Piyasa 20+ yıl boyunca hiç tökezlemeden olağanüstü büyüme bekliyor. En ufak bir büyüme yavaşlamasında hissede sert düzeltme riski yüksektir."}
        </p>
      </div>
    </div>
  );
};
