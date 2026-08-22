import React, { useState } from "react";
import { Plane, AlertCircle, Info, DollarSign } from "lucide-react";

interface SubIndustry {
  name: string;
  nameTr: string;
  capitalShare: number; // percentage 0-100
  spread: number; // ROIC - WACC (percentage)
  role: "Zarar Eden Dev" | "Kârlı Niş" | "Hizmet Sağlayıcı";
  explanation: string;
}

const AVIATION_ACTIVITIES: SubIndustry[] = [
  {
    name: "Airlines",
    nameTr: "Havayolu Şirketleri",
    capitalShare: 52,
    spread: -5.5,
    role: "Zarar Eden Dev",
    explanation: "Sermayenin %52'sini bağlar; yakıt, uçak kredileri ve pilot maaşları altında ezilir.",
  },
  {
    name: "Airports",
    nameTr: "Havalimanları",
    capitalShare: 24,
    spread: -4.0,
    role: "Zarar Eden Dev",
    explanation: "Devasa pist ve terminal inşaat maliyetleri nedeniyle ROIC sermaye maliyetinin altında kalır.",
  },
  {
    name: "Lessors",
    nameTr: "Uçak Kiralama Şirketleri",
    capitalShare: 11,
    spread: -0.5,
    role: "Hizmet Sağlayıcı",
    explanation: "Uçakları satın alıp havayollarına kiralar, faiz oranlarına karşı hassastır.",
  },
  {
    name: "Manufacturers (Boeing/Airbus)",
    nameTr: "Uçak Üreticileri",
    capitalShare: 5,
    spread: +1.2,
    role: "Hizmet Sağlayıcı",
    explanation: "İkili tekel olmalarına rağmen Ar-Ge ve tedarik zinciri darboğazları kârı sınırlar.",
  },
  {
    name: "Fuel Production",
    nameTr: "Jet Yakıtı Üretimi & Rafineri",
    capitalShare: 3,
    spread: +9.5,
    role: "Kârlı Niş",
    explanation: "Havacılık sermayesinin sadece %3'ünü bağlar ancak yüksek rafineri marjıyla zenginleşir.",
  },
  {
    name: "Freight Forwarders",
    nameTr: "Hava Kargo & Lojistik",
    capitalShare: 2,
    spread: +16.0,
    role: "Kârlı Niş",
    explanation: "Uçak sahibi olmadan komisyonculuk ve optimizasyon yazılımlarıyla dev kâr üretir.",
  },
  {
    name: "GDS (Global Bilet Sistemleri)",
    nameTr: "Bilet Rezervasyon Sistemleri (Amadeus/Sabre)",
    capitalShare: 1.5,
    spread: +12.0,
    role: "Kârlı Niş",
    explanation: "Yazılım ağı etkisiyle her satılan bilet başına neredeyse sıfır marjinal maliyetle komisyon alır.",
  },
];

export const ProfitPoolSim: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<SubIndustry>(AVIATION_ACTIVITIES[0]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-slate-100 shadow-xs" id="profit-pool-sim">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              Sektör Haritası (Exhibit 10)
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Havacılık Sektörü Kâr Havuzu (Profit Pool)</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Genişlik (Sermaye Payı) × Yükseklik (ROIC - WACC) = Toplam Ekonomik Kâr. 2022'de sektörün toplam zararı: -$69 Milyar!
          </p>
        </div>
      </div>

      {/* Visual Profit Pool Block Chart */}
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300 mb-2 font-medium">
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">▲ Pozitif Ekonomik Kâr (ROIC &gt; WACC)</span>
          <span className="text-slate-500 dark:text-slate-400">Share of Invested Capital (%0 - %100) ▶</span>
        </div>

        {/* The Profit Pool Grid Chart */}
        <div className="relative h-64 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center overflow-hidden shadow-inner">
          {/* Zero Spread Horizontal Line */}
          <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-slate-300 dark:border-slate-600 z-10">
            <span className="absolute right-2 -top-5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-1 rounded border border-slate-200 dark:border-slate-700">
              ROIC = WACC (Başabaş)
            </span>
          </div>

          {/* Activity Columns */}
          <div className="w-full h-full flex items-center">
            {AVIATION_ACTIVITIES.map((act, idx) => {
              const isPositive = act.spread >= 0;
              const isSelected = selectedActivity.name === act.name;
              // Height proportional to spread (max scale: 20%)
              const heightPercent = Math.min(Math.abs(act.spread) * 4, 45);

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedActivity(act)}
                  style={{ width: `${act.capitalShare}%` }}
                  className="h-full flex flex-col justify-center items-center relative group cursor-pointer border-r border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {/* Block rendering above or below zero line */}
                  <div
                    style={{
                      height: `${heightPercent}%`,
                      transform: isPositive
                        ? "translateY(-50%)"
                        : "translateY(50%)",
                    }}
                    className={`w-[90%] rounded-lg transition-all duration-300 border flex flex-col items-center justify-center p-1 ${
                      isPositive
                        ? "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 group-hover:bg-emerald-200/80 dark:group-hover:bg-emerald-900/60"
                        : "bg-rose-100 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 group-hover:bg-rose-200/80 dark:group-hover:bg-rose-900/60"
                    } ${isSelected ? "ring-2 ring-indigo-600 dark:ring-indigo-400 shadow-sm" : ""}`}
                  >
                    <div className="text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 text-center leading-tight truncate w-full px-1">
                      {act.name}
                    </div>
                    <div
                      className={`text-[9px] font-mono font-bold ${
                        isPositive ? "text-emerald-800 dark:text-emerald-300" : "text-rose-800 dark:text-rose-300"
                      }`}
                    >
                      {act.spread > 0 ? `+${act.spread}%` : `${act.spread}%`}
                    </div>
                  </div>

                  {/* Share indicator at bottom */}
                  <div className="absolute bottom-1 text-[9px] font-mono text-slate-400 dark:text-slate-500">
                    %{act.capitalShare}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
          <span className="text-rose-700 dark:text-rose-400 font-semibold">▼ Negatif Ekonomik Kâr / Değer Yıkımı (ROIC &lt; WACC)</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">Kaynak: Morgan Stanley & IATA 2022 Raporu</span>
        </div>
      </div>

      {/* Selected Sub-Industry Inspector Card */}
      <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-bold ${
                selectedActivity.spread >= 0
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  : "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
              }`}
            >
              {selectedActivity.role}
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {selectedActivity.nameTr} ({selectedActivity.name})
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{selectedActivity.explanation}</p>
        </div>

        <div className="flex items-center gap-6 shrink-0 bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Sermaye Payı</div>
            <div className="text-base font-mono font-bold text-slate-900 dark:text-slate-100">%{selectedActivity.capitalShare}</div>
          </div>
          <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">ROIC - WACC Farkı</div>
            <div
              className={`text-base font-mono font-extrabold ${
                selectedActivity.spread >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
              }`}
            >
              {selectedActivity.spread > 0 ? `+${selectedActivity.spread}%` : `${selectedActivity.spread}%`}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Callout */}
      <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Jeff Bezos'un İlkesi:</strong> <em>"Senin kâr marjın benim fırsatımdır."</em> Bir sektörde kâr havuzunun büyük olduğu niş halkalar (GDS veya Yakıt gibi) her zaman rakiplerin hücumuna uğrar; ancak güçlü giriş engelleri olanlar kârlarını korur.
        </div>
      </div>
    </div>
  );
};
