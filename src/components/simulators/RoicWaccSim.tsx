import React, { useState } from "react";
import {
  Shield,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  Percent,
  Layers,
  ArrowRight,
  HelpCircle,
  Clock,
  Award
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface PresetCompany {
  nameTr: string;
  nameEn: string;
  badgeTr: string;
  badgeEn: string;
  capital: number; // Milyon $
  nopat: number; // Milyon $
  wacc: number; // %
  moatType: "wide" | "narrow" | "none" | "destroyer";
  descTr: string;
  descEn: string;
}

const PRESET_COMPANIES: PresetCompany[] = [
  {
    nameTr: "🏰 Geniş Hendekli Kale (Coca-Cola / Apple)",
    nameEn: "🏰 Wide-Moat Fortress (Coca-Cola / Apple)",
    badgeTr: "Geniş Hendek",
    badgeEn: "Wide Moat",
    capital: 50000,
    nopat: 12500, // ROIC = 25%
    wacc: 8.0,
    moatType: "wide",
    descTr: "Güçlü marka ve fiyatlama gücü sayesinde sermaye maliyetinin (%8) tam 3 katı getiri (%25 ROIC) üretiyor.",
    descEn: "Generates 25% ROIC—over 3x its 8% cost of capital—driven by unmatched pricing power and brand equity.",
  },
  {
    nameTr: "🍋 Limonata Tezgahı (Sıfırdan Başlangıç)",
    nameEn: "🍋 Lemonade Stand (Zero-to-One Starter)",
    badgeTr: "Öğrenme Örneği",
    badgeEn: "Intro Example",
    capital: 1000,
    nopat: 180, // ROIC = 18%
    wacc: 10.0,
    moatType: "narrow",
    descTr: "Aileden %10 faizle 1.000 $ borç aldınız. Yaz sonunda 180 $ kazandınız (%18 ROIC). Borcu ödedikten sonra +80 $ net refah ürettiniz.",
    descEn: "Borrowed $1,000 at 10% interest. Earned $180 net operating profit (18% ROIC). After paying capital cost ($100), you created +$80 in net economic value.",
  },
  {
    nameTr: "🛒 Orta Hendekli Perakendeci (Costco / Walmart)",
    nameEn: "🛒 Narrow-Moat Retail Compounder (Costco / Walmart)",
    badgeTr: "Dar Hendek",
    badgeEn: "Narrow Moat",
    capital: 30000,
    nopat: 4200, // ROIC = 14%
    wacc: 9.0,
    moatType: "narrow",
    descTr: "Hızlı stok devri ve düşük operasyonel giderle sermaye maliyetinin 5 puan üzerinde (%14 ROIC) refah yaratıyor.",
    descEn: "Creates economic value 5 percentage points above WACC (14% ROIC) via inventory velocity and lean overhead.",
  },
  {
    nameTr: "⚠️ Ciro Rekorcusu Ama Değer Yok Eden (Zombi Şirket)",
    nameEn: "⚠️ Revenue Giant but Value Destroyer (Zombie Firm)",
    badgeTr: "Değer Yok Edici",
    badgeEn: "Value Destroyer",
    capital: 80000,
    nopat: 4000, // ROIC = 5%
    wacc: 10.5,
    moatType: "destroyer",
    descTr: "Çok satış yapıyor ve 4 milyar $ kâr açıklıyor; ancak %10.5 faiz/sermaye maliyeti varken sadece %5 getiri ürettiği için her yıl hissedarın -4.4 milyar $ servetini eritiyor!",
    descEn: "Boasts high sales and reports $4B in accounting profit; but with only a 5% ROIC against a 10.5% WACC, it destroys -$4.4B of shareholder wealth every single year!",
  },
];

export const RoicWaccSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const [investedCapital, setInvestedCapital] = useState<number>(50000); // Milyon $
  const [nopat, setNopat] = useState<number>(10000); // Milyon $ Net Operating Profit
  const [wacc, setWacc] = useState<number>(8.5); // Cost of capital %
  const [regressionYears, setRegressionYears] = useState<number>(1); // 1 to 10 years

  // Calculations
  const roic = investedCapital > 0 ? (nopat / investedCapital) * 100 : 0;
  const spread = roic - wacc;
  const economicProfit = (investedCapital * spread) / 100; // Milyon $ Yıllık Gerçek Katma Değer

  // Regression to mean projection (over 10 years)
  const projectedRoicAtYear = Math.max(
    wacc,
    roic - (roic - wacc) * (0.12 * (regressionYears - 1))
  );
  const projectedSpread = projectedRoicAtYear - wacc;
  const projectedProfit = (investedCapital * projectedSpread) / 100;

  const handleApplyPreset = (p: PresetCompany) => {
    setInvestedCapital(p.capital);
    setNopat(p.nopat);
    setWacc(p.wacc);
    setRegressionYears(1);
  };

  const isValueCreating = spread > 0;
  const isHighMoat = spread >= 8;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="roic-wacc-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 1: Fundamental Moat Lab" : "Modül 1 Temel Laboratuvarı"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Economic Spread & Value Creation" : "Ekonomik Yayılım & Değer Yaratma"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "ROIC vs WACC: Economic Moat & Value Creation Simulator" : "ROIC vs WACC: Şato Hendeği & Gerçek Değer Yaratma Simülatörü"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "Accounting profit is not enough. Return on Invested Capital (ROIC) must exceed the Cost of Capital (WACC) to create true economic wealth."
              : "Bir şirketin muhasebe kârı açıklaması yetmez. Bağlanan sermayenin getirisi (ROIC), sermayenin maliyetinden (WACC) büyük olmalıdır."}
          </p>
        </div>

        <button
          onClick={() => {
            setInvestedCapital(50000);
            setNopat(10000);
            setWacc(8.5);
            setRegressionYears(1);
          }}
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
        {PRESET_COMPANIES.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleApplyPreset(p)}
            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {isEnglish ? p.nameEn : p.nameTr}
          </button>
        ))}
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Invested Capital */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isEnglish ? "1. Invested Capital ($M):" : "1. Yatırılan Sermaye ($M):"}
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
              ${investedCapital.toLocaleString()}M
            </span>
          </div>
          <input
            type="range"
            min={500}
            max={150000}
            step={500}
            value={investedCapital}
            onChange={(e) => setInvestedCapital(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isEnglish ? "Net Working Capital + Net Fixed Assets." : "Net İşletme Sermayesi + Net Duran Varlıklar."}
          </p>
        </div>

        {/* NOPAT */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isEnglish ? "2. Annual NOPAT ($M):" : "2. Yıllık NOPAT ($M):"}
            </span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              ${nopat.toLocaleString()}M
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={35000}
            step={50}
            value={nopat}
            onChange={(e) => setNopat(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isEnglish ? "EBIT × (1 - Tax Rate)." : "Vergi Sonrası Net Faaliyet Kârı."}
          </p>
        </div>

        {/* WACC */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isEnglish ? "3. Cost of Capital (WACC %):" : "3. Sermaye Maliyeti (WACC %):"}
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
              %{wacc}
            </span>
          </div>
          <input
            type="range"
            min={4.0}
            max={20.0}
            step={0.5}
            value={wacc}
            onChange={(e) => setWacc(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isEnglish ? "Blended cost of equity and debt." : "Özsermaye ve borç maliyetinin ağırlıklı ortalaması."}
          </p>
        </div>
      </div>

      {/* Hero Outcome Card */}
      <div
        className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-5 ${
          isValueCreating
            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
            : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
        }`}
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black text-xl shrink-0 ${
              isValueCreating ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            }`}
          >
            %{roic.toFixed(1)}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider opacity-80">
              {isEnglish ? "Economic Spread (ROIC - WACC)" : "Ekonomik Yayılım (ROIC - WACC)"}
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold">
              {isValueCreating
                ? isEnglish
                  ? `+${spread.toFixed(1)}% Value Spread (Annual +$${Math.round(economicProfit).toLocaleString()}M Wealth)`
                  : `+${spread.toFixed(1)} Puan Yayılım (Yılda +${Math.round(economicProfit).toLocaleString()}M $ Refah)`
                : isEnglish
                ? `${spread.toFixed(1)}% Value Destruction (Annual -$${Math.abs(Math.round(economicProfit)).toLocaleString()}M Loss)`
                : `${spread.toFixed(1)} Puan Değer Yok Edici (Yılda -${Math.abs(Math.round(economicProfit)).toLocaleString()}M $ Servet Kaybı)`}
            </h3>
          </div>
        </div>

        <div className="text-xs max-w-md text-center sm:text-right leading-relaxed font-medium">
          {isValueCreating
            ? isEnglish
              ? `🏰 For every $100 of capital deployed, the firm generates $${roic.toFixed(1)} while paying $${wacc} for financing, delivering $${spread.toFixed(1)} of pure economic profit.`
              : `🏰 Şirket bağladığı her 100 $ için 100 × %${roic.toFixed(1)} = ${roic.toFixed(1)} $ getiri üretirken, sermaye maliyeti ${wacc} $ olduğu için aradaki ${spread.toFixed(1)} $ net refah hissedara kalır.`
            : isEnglish
            ? `⚠️ Capital Drain: The company earns less than its funding cost. Despite reporting positive NOPAT, it is destroying shareholder wealth.`
            : `⚠️ Sermaye Tüketimi: Şirket kâr açıklasa bile sermaye maliyetinin altında getiri ürettiği için hissedarın servetini eritmektedir.`}
        </div>
      </div>
    </div>
  );
};
