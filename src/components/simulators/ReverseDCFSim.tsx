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
  CheckCircle2
} from "lucide-react";

interface ReverseDCFSimProps {
  onAskAICoach?: (prompt: string) => void;
}

export const ReverseDCFSim: React.FC<ReverseDCFSimProps> = ({ onAskAICoach }) => {
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
  // Value = PV of cash flows during CAP + Terminal Value (where ROIC fades to WACC, so zero incremental NPV)
  const discountRate = wacc / 100;
  const growthRate = nearTermGrowth / 100;
  const termGrowth = terminalGrowth / 100;

  // Let's iterate years 1..50 to find the CAP where discounted cash flows + terminal value match marketCap
  let impliedCapYears = 0;
  let cumulativePV = 0;
  let cashFlow = currentFCF;
  const annualCashFlows: { year: number; fcf: number; pv: number; totalVal: number }[] = [];

  for (let year = 1; year <= 40; year++) {
    cashFlow = cashFlow * (1 + growthRate);
    const pv = cashFlow / Math.pow(1 + discountRate, year);
    cumulativePV += pv;

    // Terminal Value at year 'year' assuming terminal growth
    const terminalValue = (cashFlow * (1 + termGrowth)) / Math.max(0.01, discountRate - termGrowth);
    const pvTerminal = terminalValue / Math.pow(1 + discountRate, year);
    const totalEnterpriseValue = cumulativePV + pvTerminal;

    annualCashFlows.push({
      year,
      fcf: Math.round(cashFlow),
      pv: Math.round(pv),
      totalVal: Math.round(totalEnterpriseValue),
    });

    if (totalEnterpriseValue >= marketCap && impliedCapYears === 0) {
      impliedCapYears = year;
    }
  }

  if (impliedCapYears === 0) {
    impliedCapYears = cumulativePV > marketCap ? 1 : 40; // Clamped
  }

  // Market sentiment interpretation
  let sentimentBadge = {
    title: "Dengeli & Makul Beklenti (10-18 Yıl CAP)",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50",
    description: "Piyasa şirketin 10-18 yıl boyunca sermaye maliyetinin üzerinde getiri üretmeye devam edeceğini fiyatlıyor. Güçlü ve geniş hendekli şirketler için sürdürülebilir bir seviyedir.",
  };

  if (impliedCapYears > 22) {
    sentimentBadge = {
      title: "Aşırı İyimser / Kusursuzluk Fiyatlaması (22+ Yıl CAP)",
      color: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/50",
      description: "Piyasa şirketin 20 yıldan uzun süre sıfır rekabet baskısıyla yüksek kâr üreteceğini varsayıyor! En ufak bir büyüme yavaşlamasında hissede sert düşüş riski vardır.",
    };
  } else if (impliedCapYears < 8) {
    sentimentBadge = {
      title: "Kötümser / Fırsat Fiyatlaması (<8 Yıl CAP)",
      color: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50",
      description: "Piyasa şirketin hendeğinin çok yakında tükeneceğini veya kârlılığın hızla ortalamaya döneceğini varsayıyor. Şirket hendeğini korursa hissede ciddi prim potansiyeli doğar.",
    };
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs animate-in fade-in duration-200" id="reverse-dcf-sim">
      {/* Header & Concept */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50">
              Modül 8 Laboratuvarı
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <Target className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              Expectations Investing (Beklenti Yatırımcılığı)
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Michael J. Mauboussin Metodolojisi
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleApplyPreset("retail")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1">
          <span className="text-slate-400 font-semibold shrink-0">Örnek Vakalar:</span>
          <button
            onClick={() => handleApplyPreset("wide-tech")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer text-[11px] transition-colors whitespace-nowrap"
          >
            🍎 Teknoloji Lideri
          </button>
          <button
            onClick={() => handleApplyPreset("retail")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer text-[11px] transition-colors whitespace-nowrap"
          >
            🛒 BİM / Costco
          </button>
          <button
            onClick={() => handleApplyPreset("cyclical")}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer text-[11px] transition-colors whitespace-nowrap"
          >
            🏭 Döngüsel Sanayi
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Tersine DCF: Piyasa Bu Hisseye Kaç Yıllık Hendek (CAP) Fiyatlıyor?
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Geleneksel değerlemede analistler 10 yıl sonrasını tahmin etmeye çalışır ve genellikle yanılır. Mauboussin'in <strong>Tersine DCF</strong> yaklaşımında ise mevcut hisse fiyatından yola çıkarak piyasanın şirketten <strong>kaç yıl boyunca rekabetçi avantajını (ROIC &gt; WACC)</strong> korumasını beklediği hesaplanır.
        </p>
      </div>

      {/* Interactive Controls & Live Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Sliders (6 cols) */}
        <div className="lg:col-span-6 space-y-6 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Piyasa & Finansal Girdiler
          </h3>

          {/* Market Cap Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Mevcut Piyasa Değeri (Market Cap / EV)
              </span>
              <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">
                ${marketCap.toLocaleString()} M
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={250000}
              step={2500}
              value={marketCap}
              onChange={(e) => setMarketCap(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Current FCF / NOPAT */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Mevcut Yıllık Serbest Nakit Akımı (FCF / NOPAT)
              </span>
              <span className="font-mono font-extrabold text-slate-800 dark:text-slate-200 text-sm">
                ${currentFCF.toLocaleString()} M
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={15000}
              step={100}
              value={currentFCF}
              onChange={(e) => setCurrentFCF(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-[11px] text-slate-400 block">
              F/FCF Çarpanı: <strong>{(marketCap / currentFCF).toFixed(1)}x</strong>
            </span>
          </div>

          {/* Near-term Growth Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Yakın Dönem Yıllık Büyüme Beklentisi
              </span>
              <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                %{nearTermGrowth}
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={0.5}
              value={nearTermGrowth}
              onChange={(e) => setNearTermGrowth(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* WACC (Cost of Capital) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Ağırlıklı Ortalama Sermaye Maliyeti (WACC)
              </span>
              <span className="font-mono font-extrabold text-rose-600 dark:text-rose-400 text-sm">
                %{wacc.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={6.0}
              max={16.0}
              step={0.25}
              value={wacc}
              onChange={(e) => setWacc(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>

          {/* Terminal Growth */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Uzun Vadeli Enflasyon/GSYİH Büyümesi
              </span>
              <span className="font-mono font-bold text-slate-600 dark:text-slate-400 text-sm">
                %{terminalGrowth.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={1.5}
              max={4.0}
              step={0.25}
              value={terminalGrowth}
              onChange={(e) => setTerminalGrowth(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-600"
            />
          </div>
        </div>

        {/* Right: Implied CAP Result Card (6 cols) */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-md relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
                Zımni Rekabetçi Avantaj Dönemi (Implied CAP)
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-5xl sm:text-6xl font-black text-amber-400 tracking-tight">
                  {impliedCapYears}
                </span>
                <span className="text-xl font-extrabold text-white">YIL</span>
              </div>
              <p className="text-xs text-indigo-200/80 mt-1">
                Piyasa fiyatı, bu şirketin <strong>{impliedCapYears} yıl</strong> boyunca sermaye maliyetinin üzerinde getiri üreteceğini varsayıyor.
              </p>
            </div>

            {/* Sentiment diagnosis */}
            <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${sentimentBadge.color}`}>
              <h4 className="font-bold flex items-center gap-1.5 text-sm">
                <Award className="w-4 h-4" /> {sentimentBadge.title}
              </h4>
              <p className="text-[11px] sm:text-xs leading-relaxed opacity-90">
                {sentimentBadge.description}
              </p>
            </div>

            {/* Quick Sensitivity Insight */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Hisse %20 Düşerse CAP
                </span>
                <span className="text-base font-extrabold text-emerald-400">
                  ~{Math.max(1, Math.round(impliedCapYears * 0.72))} Yıl
                </span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Hisse %20 Yükselirse CAP
                </span>
                <span className="text-base font-extrabold text-rose-400">
                  ~{Math.round(impliedCapYears * 1.35)} Yıl
                </span>
              </div>
            </div>
          </div>

          {/* Mauboussin Principle Box */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 rounded-2xl text-xs space-y-1 text-amber-900 dark:text-amber-200">
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Mauboussin Altın Kuralı:
            </span>
            <p className="text-[11px] sm:text-xs leading-relaxed">
              "Yatırım başarısı, şirketin harika olup olmamasından değil; <strong>şirketin gerçek performansının piyasanın fiyatladığı beklentiyi (CAP) aşıp aşamayacağından</strong> kaynaklanır."
            </p>
          </div>
        </div>
      </div>

      {/* Sensitivity Table of Expected Value vs CAP Years */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Farklı CAP Sürelerine Göre Şirket Değerleme Tablosu
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
          {[5, 10, 15, 20, 25, 30].map((yr) => {
            const row = annualCashFlows[yr - 1];
            const isClosest = Math.abs(yr - impliedCapYears) <= 2;
            return (
              <div
                key={yr}
                className={`p-3 rounded-2xl border transition-all ${
                  isClosest
                    ? "bg-indigo-50 dark:bg-indigo-950 border-indigo-400 text-indigo-900 dark:text-indigo-100 ring-2 ring-indigo-500/20"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {yr} Yıllık CAP
                </span>
                <span className="text-sm font-extrabold block mt-0.5 font-mono">
                  ${row ? (row.totalVal / 1000).toFixed(1) : 0}B
                </span>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  {isClosest ? "🎯 Mevcut Fiyat" : yr < impliedCapYears ? "İskontolu" : "Primli"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standardized Pedagogical Lesson Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <strong className="font-bold text-indigo-900 dark:text-indigo-300 block">Michael Mauboussin Beklenti Yatırımcılığı İlkesi:</strong>
          Yatırım başarısı, şirketin harika olup olmamasından değil; <strong>şirketin gelecekteki gerçek performansının piyasa fiyatının içerdiği beklentiyi (CAP) aşıp aşamayacağından</strong> kaynaklanır.
        </div>
      </div>
    </div>
  );
};
