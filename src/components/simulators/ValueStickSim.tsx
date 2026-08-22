import React, { useState } from "react";
import { Sparkles, HelpCircle, ArrowUpRight, CheckCircle2, RotateCcw } from "lucide-react";

interface Scenario {
  name: string;
  desc: string;
  wtp: number;
  price: number;
  cost: number;
  wts: number;
}

const PRESET_SCENARIOS: Scenario[] = [
  {
    name: "Lüks & Farklılaşma (Apple iPhone)",
    desc: "Yüksek WTP sayesinde devasa fiyatlama gücü ve yüksek tüketici rantı.",
    wtp: 1200,
    price: 999,
    cost: 450,
    wts: 350,
  },
  {
    name: "Maliyet Liderliği (Costco Toptan)",
    desc: "Düşük WTS ve düşük maliyet ile yüksek sermaye devir hızı ve devasa tüketici rantı.",
    wtp: 100,
    price: 75,
    cost: 70,
    wts: 50,
  },
  {
    name: "Standart Havayolu (Yoğun Rekabet)",
    desc: "WTP düşük, tedarikçi ve havalimanı maliyetleri yüksek; şirket kârı çok ince.",
    wtp: 200,
    price: 180,
    cost: 175,
    wts: 160,
  },
  {
    name: "Tiffany & Co (Statü Markası)",
    desc: "Mavi kutu ve marka prestiji ile müşterinin ödeme isteği (WTP) tavan yapmıştır.",
    wtp: 16600,
    price: 15000,
    cost: 5000,
    wts: 4000,
  },
];

export const ValueStickSim: React.FC = () => {
  const [wtp, setWtp] = useState<number>(1000);
  const [price, setPrice] = useState<number>(750);
  const [cost, setCost] = useState<number>(400);
  const [wts, setWts] = useState<number>(250);

  // Safe constraints
  const handleWtpChange = (val: number) => {
    setWtp(val);
    if (val < price) setPrice(val);
  };
  const handlePriceChange = (val: number) => {
    const safeVal = Math.min(Math.max(val, cost), wtp);
    setPrice(safeVal);
  };
  const handleCostChange = (val: number) => {
    const safeVal = Math.min(Math.max(val, wts), price);
    setCost(safeVal);
  };
  const handleWtsChange = (val: number) => {
    setWts(val);
    if (val > cost) setCost(val);
  };

  const consumerSurplus = wtp - price;
  const firmProfit = price - cost;
  const supplierSurplus = cost - wts;
  const totalValue = wtp - wts;

  const loadScenario = (s: Scenario) => {
    setWtp(s.wtp);
    setPrice(s.price);
    setCost(s.cost);
    setWts(s.wts);
  };

  // Percent heights for visualization relative to total span
  const span = Math.max(wtp - wts, 1);
  const csPercent = Math.max(5, (consumerSurplus / span) * 100);
  const fpPercent = Math.max(5, (firmProfit / span) * 100);
  const ssPercent = Math.max(5, (supplierSurplus / span) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-slate-100 shadow-xs" id="value-stick-sim">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              İnteraktif Laboratuvar
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Değer Çubuğu (The Value Stick) Simülatörü</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Felix Oberholzer-Gee ve Brandenburger'ın değer paylaşım cetvelini test edin.
          </p>
        </div>

        <button
          onClick={() => {
            setWtp(1000);
            setPrice(750);
            setCost(400);
            setWts(250);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
        </button>
      </div>

      {/* Preset Scenarios */}
      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Gerçek Dünya Senaryoları:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_SCENARIOS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => loadScenario(s)}
              className="text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all text-xs cursor-pointer"
            >
              <div className="font-semibold text-slate-800 dark:text-slate-200">{s.name}</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 line-clamp-2">{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-7 space-y-4">
          {/* WTP Slider */}
          <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span>
                WTP (Müşterinin Ödemeye İstekliliği)
              </span>
              <span className="text-sm font-mono font-bold text-sky-900 dark:text-sky-200">{wtp.toLocaleString()} ₺</span>
            </div>
            <input
              type="range"
              min={price}
              max={20000}
              step={10}
              value={wtp}
              onChange={(e) => handleWtpChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Müşterinin zihnindeki maksimum değer tavanı.</p>
          </div>

          {/* Price Slider */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
                Fiyat (Satış Fiyatı)
              </span>
              <span className="text-sm font-mono font-bold text-indigo-900 dark:text-indigo-200">{price.toLocaleString()} ₺</span>
            </div>
            <input
              type="range"
              min={cost}
              max={wtp}
              step={10}
              value={price}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Şirketin kasada tahsil ettiği fiili tutar.</p>
          </div>

          {/* Cost Slider */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                Maliyet (Üretim & Hizmet Gideri)
              </span>
              <span className="text-sm font-mono font-bold text-amber-900 dark:text-amber-200">{cost.toLocaleString()} ₺</span>
            </div>
            <input
              type="range"
              min={wts}
              max={price}
              step={10}
              value={cost}
              onChange={(e) => handleCostChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Şirketin girdi ve tedarik için harcadığı para.</p>
          </div>

          {/* WTS Slider */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                WTS (Tedarikçi/Çalışan Asgari Tabanı)
              </span>
              <span className="text-sm font-mono font-bold text-emerald-900 dark:text-emerald-200">{wts.toLocaleString()} ₺</span>
            </div>
            <input
              type="range"
              min={10}
              max={cost}
              step={10}
              value={wts}
              onChange={(e) => handleWtsChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Tedarikçi veya çalışanın kabul edeceği dip taban bedel.</p>
          </div>
        </div>

        {/* Visual Value Stick & Rants */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Değer Bölüşüm Çubuğu
          </div>

          <div className="w-full max-w-[260px] flex flex-col gap-1.5 py-2">
            {/* Top Label WTP */}
            <div className="text-right text-xs font-mono text-sky-700 dark:text-sky-300 font-bold pr-2">
              ▲ WTP: {wtp.toLocaleString()} ₺
            </div>

            {/* Consumer Surplus Box */}
            <div
              style={{ minHeight: "45px" }}
              className="w-full rounded-xl bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 p-3 flex flex-col justify-center transition-all duration-300 shadow-xs"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-sky-900 dark:text-sky-200">Tüketici Rantı</span>
                <span className="font-mono font-bold text-sky-800 dark:text-sky-300">+{consumerSurplus.toLocaleString()} ₺</span>
              </div>
              <div className="text-[10px] text-sky-700 dark:text-sky-400 mt-0.5">Müşteri Memnuniyeti & Sadakat</div>
            </div>

            {/* Middle Price Line */}
            <div className="border-t border-dashed border-indigo-400 dark:border-indigo-500 my-0.5 text-xs text-indigo-700 dark:text-indigo-300 font-mono font-bold text-right pr-2">
              ── Fiyat: {price.toLocaleString()} ₺
            </div>

            {/* Firm Profit Box */}
            <div
              style={{ minHeight: "55px" }}
              className="w-full rounded-xl bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800 p-3 flex flex-col justify-center shadow-xs transition-all duration-300"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-indigo-950 dark:text-indigo-100">Şirket Değeri (Kâr)</span>
                <span className="font-mono font-extrabold text-indigo-800 dark:text-indigo-300 text-sm">+{firmProfit.toLocaleString()} ₺</span>
              </div>
              <div className="text-[10px] text-indigo-700 dark:text-indigo-400 mt-0.5">Fiyat - Maliyet = Net Faaliyet Katkısı</div>
            </div>

            {/* Cost Line */}
            <div className="border-t border-dashed border-amber-400 dark:border-amber-500 my-0.5 text-xs text-amber-700 dark:text-amber-300 font-mono font-bold text-right pr-2">
              ── Maliyet: {cost.toLocaleString()} ₺
            </div>

            {/* Supplier Surplus Box */}
            <div
              style={{ minHeight: "45px" }}
              className="w-full rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 p-3 flex flex-col justify-center transition-all duration-300 shadow-xs"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">Tedarikçi/Çalışan Rantı</span>
                <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300">+{supplierSurplus.toLocaleString()} ₺</span>
              </div>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">Maliyet - WTS = Ekosistem Refahı</div>
            </div>

            {/* Bottom Label WTS */}
            <div className="text-right text-xs font-mono text-emerald-700 dark:text-emerald-300 font-bold pr-2">
              ▼ WTS: {wts.toLocaleString()} ₺
            </div>
          </div>

          {/* Summary Box */}
          <div className="w-full mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">Toplam Yaratılan Toplumsal Değer (WTP - WTS):</div>
            <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
              {totalValue.toLocaleString()} ₺
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
