import React, { useState } from "react";
import { Clock, CheckCircle2, AlertCircle, RotateCcw, Zap, HelpCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface CCCPreset {
  nameTr: string;
  nameEn: string;
  dio: number; // days inventory
  dso: number; // days sales
  dpo: number; // days payables
  descTr: string;
  descEn: string;
}

const PRESETS: CCCPreset[] = [
  {
    nameTr: "1999 Amazon.com (Yıkıcı E-Ticaret)",
    nameEn: "1999 Amazon.com (Disruptive E-Commerce)",
    dio: 29,
    dso: 2,
    dpo: 60,
    descTr: "Müşteriden 2 günde parayı aldı, yayıncıya 60 günde ödedi. 58 gün boyunca müşterinin parasıyla büyüdü!",
    descEn: "Collected cash in 2 days from customers, paid book suppliers in 60 days. Grew entirely on supplier float for 58 days!",
  },
  {
    nameTr: "1999 Barnes & Noble (Geleneksel Kitapçı)",
    nameEn: "1999 Barnes & Noble (Traditional Bookseller)",
    dio: 149,
    dso: 6,
    dpo: 75,
    descTr: "Kitap 149 gün rafta tozlandı. Parası 80 gün boyunca kilitli kaldı ve devasa kredi faizi ödedi.",
    descEn: "Books sat on shelves for 149 days. Working capital trapped for 80 days, incurring massive debt interest.",
  },
  {
    nameTr: "Costco Wholesale",
    nameEn: "Costco Wholesale",
    dio: 30,
    dso: 3,
    dpo: 35,
    descTr: "Paletleri hemen satar, üyelerden nakit alır, tedarikçiyi 35 günde öder.",
    descEn: "Rapid pallet inventory turnover, collects instant cash/membership, pays vendors in 35 days.",
  },
  {
    nameTr: "Ağır Makine Üreticisi",
    nameEn: "Heavy Machinery Manufacturer",
    dio: 90,
    dso: 60,
    dpo: 30,
    descTr: "Hammadde ve üretim aylarca sürer, müşteriler 60 günde öder. Nakit döngüsü +120 gündür!",
    descEn: "Long manufacturing cycle, customers pay on 60-day terms. Cash cycle is +120 days of trapped liquidity!",
  },
];

export const CashConversionSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const [dio, setDio] = useState<number>(29);
  const [dso, setDso] = useState<number>(2);
  const [dpo, setDpo] = useState<number>(60);

  const ccc = dio + dso - dpo;
  const isNegative = ccc < 0;

  const handleApplyPreset = (p: CCCPreset) => {
    setDio(p.dio);
    setDso(p.dso);
    setDpo(p.dpo);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="ccc-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 7: Working Capital & Liquidity" : "Modül 7: İşletme Sermayesi & Likidite"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Cash Conversion Cycle (CCC)" : "Nakit Dönüşüm Süresi (CCC)"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Negative Working Capital & Cash Conversion Cycle" : "Negatif İşletme Sermayesi & Nakit Dönüşüm Simülatörü"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "CCC = DIO (Days Inventory) + DSO (Days Sales) - DPO (Days Payables). Discover how negative CCC creates a self-funding growth moat."
              : "CCC = Stok Bekleme (DIO) + Alacak Tahsil (DSO) - Borç Ödeme Süresi (DPO). Şirketin tedarikçi parasıyla bedava nasıl büyüdüğünü canlı test edin."}
          </p>
        </div>

        <button
          onClick={() => {
            setDio(29);
            setDso(2);
            setDpo(60);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset" : "Sıfırla"}
        </button>
      </div>

      {/* Preset Profiles */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {isEnglish ? "Real Benchmark Profiles:" : "Gerçek Şirket Örnekleri:"}
        </span>
        {PRESETS.map((p, idx) => (
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
        {/* DIO */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isEnglish ? "DIO (Days Inventory)" : "DIO (Stokta Kalma Süresi)"}
            </span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {dio} {isEnglish ? "days" : "gün"}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={180}
            value={dio}
            onChange={(e) => setDio(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isEnglish
              ? "Average days products sit in warehouse before sale."
              : "Ürünün depoda/rafta satılmayı beklediği ortalama gün sayısı."}
          </p>
        </div>

        {/* DSO */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isEnglish ? "DSO (Days Sales Outstanding)" : "DSO (Alacak Tahsil Süresi)"}
            </span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {dso} {isEnglish ? "days" : "gün"}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={120}
            value={dso}
            onChange={(e) => setDso(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isEnglish
              ? "Days required to collect cash from customers after sale."
              : "Müşteriye satış yapıldıktan sonra paranın tahsil edilme süresi."}
          </p>
        </div>

        {/* DPO */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isEnglish ? "DPO (Days Payables Outstanding)" : "DPO (Borç Ödeme Vadesi)"}
            </span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {dpo} {isEnglish ? "days" : "gün"}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={180}
            value={dpo}
            onChange={(e) => setDpo(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isEnglish
              ? "Days company delays paying its suppliers."
              : "Tedarikçilere hammadde/ürün faturasının kaç günde ödendiği."}
          </p>
        </div>
      </div>

      {/* Result Hero Card */}
      <div
        className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-5 ${
          isNegative
            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
            : "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200"
        }`}
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-2xl shrink-0 ${
              isNegative ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
            }`}
          >
            {ccc > 0 ? `+${ccc}` : ccc}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider opacity-80">
              {isEnglish ? "Cash Conversion Cycle (CCC)" : "Net Nakit Dönüşüm Süresi (CCC)"}
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold">
              {isNegative
                ? isEnglish ? "Negative CCC: Self-Financing Float Superpower!" : "Negatif CCC: Tedarikçi Finansmanlı Büyüme Süper Gücü!"
                : isEnglish ? "Positive CCC: Trapped Capital & Interest Drain" : "Pozitif CCC: Sermaye Stokta Kilitli"}
            </h3>
          </div>
        </div>

        <div className="text-xs max-w-md text-center sm:text-right leading-relaxed font-medium">
          {isNegative
            ? isEnglish
              ? `🔥 Amazon Effect: You collect cash ${Math.abs(ccc)} days before paying your suppliers. Every $1 of growth injects free cash instead of requiring bank loans!`
              : `🔥 Amazon Etkisi: Müşteriden parayı tedarikçiye ödemeden tam ${Math.abs(ccc)} gün önce kasaya koyuyorsunuz. Şirket banka kredisi çekmeden, tedarikçinin parasıyla bedava büyüyor!`
            : isEnglish
            ? `⚠️ Capital Trap: Your cash remains locked in inventory and receivables for ${ccc} days, draining returns and forcing external financing.`
            : `⚠️ Sermaye Kilidi: Paranız ${ccc} gün boyunca depolardaki stoklarda kilitli kalıyor ve şirketi banka faizi ödemeye mecbur bırakıyor.`}
        </div>
      </div>
    </div>
  );
};
