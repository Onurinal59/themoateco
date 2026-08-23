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

interface PresetCompany {
  name: string;
  badge: string;
  capital: number; // Milyon TL
  nopat: number; // Milyon TL
  wacc: number; // %
  moatType: "wide" | "narrow" | "none" | "destroyer";
  desc: string;
}

const PRESET_COMPANIES: PresetCompany[] = [
  {
    name: "🏰 Geniş Hendekli Kale (Coca-Cola / Apple)",
    badge: "Wide Moat",
    capital: 50000,
    nopat: 12500, // ROIC = 25%
    wacc: 8.0,
    moatType: "wide",
    desc: "Güçlü marka ve fiyatlama gücü sayesinde sermaye maliyetinin (%8) tam 3 katı getiri (%25 ROIC) üretiyor.",
  },
  {
    name: "🍋 Limonata Tezgahı (Sıfırdan Başlangıç)",
    badge: "Öğrenme Örneği",
    capital: 1000,
    nopat: 180, // ROIC = 18%
    wacc: 10.0,
    moatType: "narrow",
    desc: "Aileden %10 faizle 1.000 TL borç aldınız. Yaz sonunda 180 TL kazandınız (%18 ROIC). Borcu ödedikten sonra +80 TL net refah ürettiniz.",
  },
  {
    name: "🛒 Orta Hendekli Perakendeci (BİM / Costco)",
    badge: "Narrow Moat",
    capital: 30000,
    nopat: 4200, // ROIC = 14%
    wacc: 9.0,
    moatType: "narrow",
    desc: "Hızlı stok devri ve düşük operasyonel giderle sermaye maliyetinin 5 puan üzerinde (%14 ROIC) refah yaratıyor.",
  },
  {
    name: "⚠️ Ciro Rekorcusu Ama Değer Yok Eden (Zombi Şirket)",
    badge: "Değer Yok Edici",
    capital: 80000,
    nopat: 4000, // ROIC = 5%
    wacc: 10.5,
    moatType: "destroyer",
    desc: "Çok satış yapıyor ve 4 milyar TL kâr açıklıyor; ancak %10.5 faiz/sermaye maliyeti varken sadece %5 getiri ürettiği için her yıl hissedarın -4.4 milyar TL servetini eritiyor!",
  },
];

export const RoicWaccSim: React.FC = () => {
  const [investedCapital, setInvestedCapital] = useState<number>(50000); // Milyon TL
  const [nopat, setNopat] = useState<number>(10000); // Milyon TL Net Faaliyet Kârı
  const [wacc, setWacc] = useState<number>(8.5); // Sermaye Maliyeti %
  const [regressionYears, setRegressionYears] = useState<number>(1); // 1 to 10 years

  // Calculations
  const roic = investedCapital > 0 ? (nopat / investedCapital) * 100 : 0;
  const spread = roic - wacc;
  const economicProfit = (investedCapital * spread) / 100; // Milyon TL Yıllık Gerçek Katma Değer

  // Regression to mean projection (over 10 years)
  // High ROIC fades toward WACC over time unless moat is exceptional
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              Modül 1 Temel Laboratuvarı
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              0'dan Başlangıç Seviyesi
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            ROIC vs WACC: Şato Hendeği & Gerçek Değer Yaratma Simülatörü
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Bir şirketin muhasebe kârı açıklaması yetmez. Bağlanan sermayenin getirisi (ROIC), sermayenin maliyetinden (WACC) büyük olmalıdır.
          </p>
        </div>

        <button
          onClick={() => {
            setInvestedCapital(50000);
            setNopat(10000);
            setWacc(8.5);
            setRegressionYears(1);
          }}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
        </button>
      </div>

      {/* Preset Company Scenarios */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Gerçek Hayat Senaryoları İle Başla (Tıkla ve İncele):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_COMPANIES.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all text-xs cursor-pointer group"
            >
              <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {p.name}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                {p.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left: Adjustable Inputs (6 cols) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" /> Şirketin Sermaye ve Kâr Ayarları
          </h3>

          {/* Invested Capital */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                1. Yatırılan Sermaye (Invested Capital)
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                {investedCapital.toLocaleString()} Milyon TL
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Fabrikalar, mağazalar, makineler, patentler ve stoklara bağlanan toplam para.
            </p>
            <input
              type="range"
              min={1000}
              max={150000}
              step={1000}
              value={investedCapital}
              onChange={(e) => setInvestedCapital(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* NOPAT */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                2. Yıllık Net Faaliyet Kârı (NOPAT)
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                {nopat.toLocaleString()} Milyon TL
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Şirketin ana işinden vergi düşüldükten sonra ürettiği yıllık net faaliyet kârı.
            </p>
            <input
              type="range"
              min={100}
              max={30000}
              step={100}
              value={nopat}
              onChange={(e) => setNopat(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* WACC */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                3. Sermaye Maliyeti (WACC)
              </span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                %{wacc.toFixed(1)}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Bu sermayeyi bulmanın (banka kredi faizi + hissedarın beklediği getiri) yıllık fırsat maliyeti.
            </p>
            <input
              type="range"
              min={4.0}
              max={20.0}
              step={0.5}
              value={wacc}
              onChange={(e) => setWacc(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>

          {/* Regression to mean simulation */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Ortalamaya Dönüş (Rekabet Baskısı Yılı):
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm">
                {regressionYears}. Yıl
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={regressionYears}
              onChange={(e) => setRegressionYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[10px] text-slate-500 block">
              Kaydırın: Güçlü bir hendek yoksa rakipler kârı görerek sektöre girer ve ROIC zamanla WACC'a (%{wacc.toFixed(1)}) doğru geriler.
            </span>
          </div>
        </div>

        {/* Right: Real-time Moat Castle & Value Results (6 cols) */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* Main Visual Castle Card */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              isValueCreating
                ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
                : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100"
            }`}
          >
            {/* Moat status banner */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-current/10">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="font-bold text-sm sm:text-base">
                  {isHighMoat
                    ? "🏰 Geniş Timsahlı Hendek (Wide Moat)"
                    : isValueCreating
                    ? "🛡️ Dar Hendek (Narrow Moat)"
                    : "⚠️ Hendek Yok: Değer Yok Ediliyor!"}
                </span>
              </div>
              <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/30 border border-current/20">
                {spread >= 0 ? `+${spread.toFixed(1)}%` : `${spread.toFixed(1)}%`} Yayılım
              </span>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4 text-center">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/10">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  ROIC (Getiri)
                </span>
                <span className="text-lg sm:text-xl font-black font-mono block text-indigo-600 dark:text-indigo-400">
                  %{roic.toFixed(1)}
                </span>
                <span className="text-[9px] text-slate-400">NOPAT / Sermaye</span>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/10">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  WACC (Maliyet)
                </span>
                <span className="text-lg sm:text-xl font-black font-mono block text-rose-600 dark:text-rose-400">
                  %{wacc.toFixed(1)}
                </span>
                <span className="text-[9px] text-slate-400">Fırsat Maliyeti</span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/10">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  Yıllık Net Refah
                </span>
                <span
                  className={`text-lg sm:text-xl font-black font-mono block ${
                    economicProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {economicProfit >= 0 ? `+${Math.round(economicProfit).toLocaleString()}` : Math.round(economicProfit).toLocaleString()} M ₺
                </span>
                <span className="text-[9px] text-slate-400">Sermaye × Spread</span>
              </div>
            </div>

            {/* Visual Castle Moat Depth Representation */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span>Hendeğin Genişliği (Economic Moat Depth)</span>
                <span>{spread > 0 ? `Genişlik: +${spread.toFixed(1)} Puan` : "Hendek Kurumuş (0)"}</span>
              </div>
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  style={{ width: `${Math.min(100, Math.max(5, (roic / (wacc * 2.5)) * 100))}%` }}
                  className={`h-full rounded-full transition-all duration-300 ${
                    isValueCreating ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
              </div>
            </div>

            {/* Plain explanation */}
            <p className="text-xs mt-3.5 leading-relaxed opacity-95">
              {isValueCreating ? (
                <>
                  ✅ Şirket bağladığı her 100 TL ile <strong>{roic.toFixed(1)} TL</strong> kazanırken, sermaye maliyeti sadece <strong>{wacc.toFixed(1)} TL</strong>. Aradaki <strong>+{spread.toFixed(1)} TL</strong> hissedarlar için gerçek ekonomik refah üretir!
                </>
              ) : (
                <>
                  ❌ Şirket kâr açıklasa bile her 100 TL sermaye için <strong>{wacc.toFixed(1)} TL</strong> maliyete katlanıp sadece <strong>{roic.toFixed(1)} TL</strong> kazanıyor. Aradaki <strong>{spread.toFixed(1)} TL</strong> farkla gizlice hissedar serveti yok ediliyor!
                </>
              )}
            </p>
          </div>

          {/* Regression over time projection box */}
          {regressionYears > 1 && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
              <span className="font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                {regressionYears}. Yıl Tahmini (Ortalamaya Dönüş Etkisi):
              </span>
              <p className="text-[11px] leading-relaxed">
                Rakiplerin pazara girmesiyle ROIC <strong>%{roic.toFixed(1)}</strong> seviyesinden <strong>%{projectedRoicAtYear.toFixed(1)}</strong> seviyesine gerileyecek. Yıllık yaratılan refah ise <strong>{Math.round(projectedProfit).toLocaleString()} Milyon TL</strong> olacaktır.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Standardized Pedagogical Lesson Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <strong className="font-bold text-indigo-900 dark:text-indigo-300 block">Michael Mauboussin Değer Yaratma İlkesi:</strong>
          Yatırım dünyasındaki en büyük yanılgı, cirosu ve muhasebe kârı büyüyen her şirketin değer yarattığını sanmaktır. <strong>ROIC &gt; WACC</strong> (Ekonomik Yayılım) pozitif olmadıkça sermaye büyümesi hissedar değerini artırmaz, aksine değer yıkımını hızlandırır.
        </div>
      </div>
    </div>
  );
};
