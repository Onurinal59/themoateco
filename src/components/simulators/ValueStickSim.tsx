import React, { useState } from "react";
import { Sparkles, HelpCircle, ArrowUpRight, CheckCircle2, RotateCcw } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface Scenario {
  nameTr: string;
  nameEn: string;
  descTr: string;
  descEn: string;
  wtp: number;
  price: number;
  cost: number;
  wts: number;
}

const PRESET_SCENARIOS: Scenario[] = [
  {
    nameTr: "Lüks & Farklılaşma (Apple iPhone)",
    nameEn: "Luxury & Differentiation (Apple iPhone)",
    descTr: "Yüksek WTP sayesinde devasa fiyatlama gücü ve yüksek tüketici rantı.",
    descEn: "Elevated WTP unlocks massive pricing power and robust consumer surplus.",
    wtp: 1200,
    price: 999,
    cost: 450,
    wts: 350,
  },
  {
    nameTr: "Maliyet Liderliği (Costco Toptan)",
    nameEn: "Cost Leadership (Costco Wholesale)",
    descTr: "Düşük WTS ve düşük maliyet ile yüksek sermaye devir hızı ve devasa tüketici rantı.",
    descEn: "Depressed WTS and lean operating costs maximize consumer surplus and inventory velocity.",
    wtp: 100,
    price: 75,
    cost: 70,
    wts: 50,
  },
  {
    nameTr: "Standart Havayolu (Yoğun Rekabet)",
    nameEn: "Commodity Airline (Severe Competition)",
    descTr: "WTP düşük, tedarikçi ve havalimanı maliyetleri yüksek; şirket kârı çok ince.",
    descEn: "Low WTP, high supplier airport fees; company captures paper-thin margins.",
    wtp: 200,
    price: 180,
    cost: 175,
    wts: 160,
  },
  {
    nameTr: "Tiffany & Co (Statü Markası)",
    nameEn: "Tiffany & Co (Prestige Brand)",
    descTr: "Mavi kutu ve marka prestiji ile müşterinin ödeme isteği (WTP) tavan yapmıştır.",
    descEn: "Iconic blue box and prestige status skyrocket customer willingness-to-pay.",
    wtp: 16600,
    price: 15000,
    cost: 5000,
    wts: 4000,
  },
];

export const ValueStickSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const [wtp, setWtp] = useState<number>(1000);
  const [price, setPrice] = useState<number>(750);
  const [cost, setCost] = useState<number>(400);
  const [wts, setWts] = useState<number>(300);

  // Economic calculations
  const totalValueCreated = Math.max(0, wtp - wts);
  const customerDelight = Math.max(0, wtp - price); // Consumer surplus
  const firmProfit = Math.max(0, price - cost); // Economic margin
  const supplierSurplus = Math.max(0, cost - wts); // Supplier surplus

  const handleApplyPreset = (sc: Scenario) => {
    setWtp(sc.wtp);
    setPrice(sc.price);
    setCost(sc.cost);
    setWts(sc.wts);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="valuestick-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 3: Strategic Value Creation" : "Modül 3: Stratejik Değer Yaratma"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Harvard / Oberholzer-Gee Value Stick" : "Harvard / Oberholzer-Gee Değer Çubuğu"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Interactive Value Stick (WTP, Price, Cost, WTS)" : "Etkileşimli Değer Çubuğu (Value Stick) Simülatörü"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "Total Value Created = (WTP - WTS). Discover how elite compounders capture value without squeezing customers."
              : "Toplam Yaratılan Değer = (WTP - WTS). Dört noktayı hareket ettirerek şirketin, müşterinin ve tedarikçinin payını canlı izleyin."}
          </p>
        </div>

        <button
          onClick={() => {
            setWtp(1000);
            setPrice(750);
            setCost(400);
            setWts(300);
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
        {PRESET_SCENARIOS.map((sc, idx) => (
          <button
            key={idx}
            onClick={() => handleApplyPreset(sc)}
            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {isEnglish ? sc.nameEn : sc.nameTr}
          </button>
        ))}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          {/* WTP */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                {isEnglish ? "1. Willingness-to-Pay (WTP - Max Customer Value):" : "1. Ödemeye İsteklilik (WTP - Müşterinin Tavanı):"}
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">${wtp}</span>
            </div>
            <input
              type="range"
              min={price}
              max={wtp * 1.5 + 200}
              value={wtp}
              onChange={(e) => setWtp(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Price */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {isEnglish ? "2. Actual Retail Price (P):" : "2. Satış Fiyatı (Price):"}
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">${price}</span>
            </div>
            <input
              type="range"
              min={cost}
              max={wtp}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Cost */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-amber-700 dark:text-amber-400">
                {isEnglish ? "3. Firm Unit Cost (C):" : "3. Şirketin Katlandığı Maliyet (Cost):"}
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">${cost}</span>
            </div>
            <input
              type="range"
              min={wts}
              max={price}
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* WTS */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-purple-700 dark:text-purple-400">
                {isEnglish ? "4. Willingness-to-Sell (WTS - Supplier Floor):" : "4. Satmaya İsteklilik (WTS - Tedarikçi Tabanı):"}
              </span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">${wts}</span>
            </div>
            <input
              type="range"
              min={0}
              max={cost}
              value={wts}
              onChange={(e) => setWts(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>

        {/* Visual Stick Diagram (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex flex-col justify-between space-y-4">
          <div className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
            {isEnglish ? "Economic Surplus Distribution" : "Ekonomik Artık Dağılımı"}
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Customer Delight */}
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 flex justify-between items-center">
              <span>{isEnglish ? "Customer Surplus (WTP - Price):" : "Müşteri Rantı (WTP - Fiyat):"}</span>
              <strong className="text-sm font-black">${customerDelight}</strong>
            </div>

            {/* Firm Profit */}
            <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 flex justify-between items-center shadow-xs">
              <span className="font-bold">{isEnglish ? "⭐️ Company Profit (Price - Cost):" : "⭐️ Şirket Kâr Payı (Fiyat - Maliyet):"}</span>
              <strong className="text-base font-black text-emerald-700 dark:text-emerald-300">${firmProfit}</strong>
            </div>

            {/* Supplier Surplus */}
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/60 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 flex justify-between items-center">
              <span>{isEnglish ? "Supplier Surplus (Cost - WTS):" : "Tedarikçi Artığı (Maliyet - WTS):"}</span>
              <strong className="text-sm font-black">${supplierSurplus}</strong>
            </div>
          </div>

          <div className="pt-3 border-t border-indigo-200 dark:border-indigo-900/60 flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
            <span>{isEnglish ? "Total Economic Pie (WTP - WTS):" : "Toplam Yaratılan Değer Pastası:"}</span>
            <span className="font-mono text-sm text-indigo-600 dark:text-indigo-400 font-black">${totalValueCreated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
