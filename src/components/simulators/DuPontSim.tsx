import React, { useState } from "react";
import { TrendingUp, AlertTriangle, CheckCircle, RotateCcw, CheckCircle2 } from "lucide-react";

interface CompanyBenchmark {
  name: string;
  strategy: "Farklılaşma (Yüksek Marj)" | "Maliyet Liderliği (Yüksek Devir)" | "Süperstar (Her İkisi)" | "Kırılgan / Değer Yok Eden";
  margin: number;
  turnover: number;
  roic: number;
  desc: string;
}

const BENCHMARKS: CompanyBenchmark[] = [
  {
    name: "Coca-Cola Company",
    strategy: "Farklılaşma (Yüksek Marj)",
    margin: 26,
    turnover: 0.6,
    roic: 16,
    desc: "Güçlü marka ve gizli formül ile %26 NOPAT marjı üretir.",
  },
  {
    name: "Costco Wholesale",
    strategy: "Maliyet Liderliği (Yüksek Devir)",
    margin: 4,
    turnover: 4.3,
    roic: 16,
    desc: "Yalnızca %4 ince kâr marjıyla çalışır ama depodaki malları 4.3 kat hızla döndürür.",
  },
  {
    name: "Apple Inc.",
    strategy: "Süperstar (Her İkisi)",
    margin: 28,
    turnover: 1.6,
    roic: 45,
    desc: "Hem %28'lik devasa bir lüks marjına hem de 1.6x yüksek sermaye dönüşüm hızına sahiptir.",
  },
  {
    name: "Marathon Petroleum",
    strategy: "Maliyet Liderliği (Yüksek Devir)",
    margin: 8,
    turnover: 2.3,
    roic: 18,
    desc: "Rafineri ölçeği ve yüksek varlık verimliliği ile 2.3x devir hızına ulaşır.",
  },
  {
    name: "Devon Energy",
    strategy: "Farklılaşma (Yüksek Marj)",
    margin: 26,
    turnover: 0.7,
    roic: 18,
    desc: "Zengin petrol sahaları sayesinde %26 marj ile aynı %18 ROIC'e ulaşır.",
  },
  {
    name: "Ortalama Havayolu (Airline)",
    strategy: "Kırılgan / Değer Yok Eden",
    margin: 3,
    turnover: 0.9,
    roic: 2.7,
    desc: "Düşük bilet kârı ve pahalı uçak yatırımları nedeniyle sermaye maliyetini (%8) karşılayamaz.",
  },
];

export const DuPontSim: React.FC = () => {
  const [margin, setMargin] = useState<number>(15); // % NOPAT Margin
  const [turnover, setTurnover] = useState<number>(1.5); // x Invested Capital Turnover
  const [wacc, setWacc] = useState<number>(8.0); // % Cost of capital

  const roic = Number((margin * turnover).toFixed(1));
  const spread = Number((roic - wacc).toFixed(1));
  const isValueCreating = spread > 0;

  const loadBenchmark = (b: CompanyBenchmark) => {
    setMargin(b.margin);
    setTurnover(b.turnover);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="dupont-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              Modül 7 Laboratuvarı
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              DuPont Ayrıştırması & Marj vs Devir (Exhibit 34)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            ROIC Röntgeni & DuPont Ayrıştırma Simülatörü
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            ROIC = NOPAT Kâr Marjı (%) × Sermaye Devir Hızı (x). Şirketinizin marj gücüyle mi yoksa varlık dönüş hızıyla mı para kazandığını keşfedin.
          </p>
        </div>

        <button
          onClick={() => {
            setMargin(15);
            setTurnover(1.5);
            setWacc(8.0);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
        </button>
      </div>

      {/* Preset Real S&P 500 Benchmarks */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
          Örnek Şirket Modelleri (Morgan Stanley Exhibit 34):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {BENCHMARKS.map((b, idx) => (
            <button
              key={idx}
              onClick={() => loadBenchmark(b)}
              className="text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all text-xs cursor-pointer group"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{b.name}</span>
                <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400">ROIC: %{b.roic}</span>
              </div>
              <div className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium mt-0.5">{b.strategy}</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-tight line-clamp-2">{b.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders */}
        <div className="lg:col-span-6 space-y-4 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">1. NOPAT Kâr Marjı (Farklılaşma Gücü)</span>
              <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">%{margin}</span>
            </div>
            <input
              type="range"
              min={1}
              max={60}
              step={1}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <span>%1 (İnce Bakkal Marjı)</span>
              <span>%60 (Lüks / Yazılım Marjı)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">2. Yatırılan Sermaye Devir Hızı (Sürat)</span>
              <span className="text-sm font-mono font-bold text-amber-600 dark:text-amber-400">{turnover}x</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={6.0}
              step={0.1}
              value={turnover}
              onChange={(e) => setTurnover(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <span>0.2x (Ağır Sanayi / Enerji)</span>
              <span>6.0x (Süpermarket / Hızlı Dağıtım)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">3. WACC (Sermaye Maliyeti Eşiği)</span>
              <span className="text-sm font-mono font-bold text-rose-600 dark:text-rose-400">%{wacc}</span>
            </div>
            <input
              type="range"
              min={4.0}
              max={15.0}
              step={0.5}
              value={wacc}
              onChange={(e) => setWacc(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Hissedar ve kredi maliyetlerinin yıllık ortalaması.</p>
          </div>
        </div>

        {/* DuPont Formula Dashboard & Evaluation */}
        <div className="lg:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
              DuPont Matematiksel Eşitliği:
            </div>

            <div className="flex items-center justify-center gap-2 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center shadow-2xs">
              <div>
                <div className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">NOPAT Marjı</div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100">%{margin}</div>
              </div>
              <span className="text-slate-400 font-bold text-lg">×</span>
              <div>
                <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold">Sermaye Devri</div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100">{turnover}x</div>
              </div>
              <span className="text-slate-400 font-bold text-lg">=</span>
              <div>
                <div className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">ROIC Getirisi</div>
                <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">%{roic}</div>
              </div>
            </div>

            {/* Value Creation Meter */}
            <div className="mt-4 p-4 rounded-xl border bg-white dark:bg-slate-900 shadow-2xs transition-all border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                {isValueCreating ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <div>
                  <div className={`font-bold text-sm ${isValueCreating ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
                    {isValueCreating ? "DEĞER YARATIYOR (Value Creation)" : "DEĞER YOK EDİYOR (Value Destruction)"}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Ekonomik Fark (Spread) = ROIC (%{roic}) - WACC (%{wacc}) ={" "}
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {spread > 0 ? `+${spread}` : spread}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                {margin >= 20 && turnover <= 1.0 ? (
                  <span>
                    🎯 <strong>Farklılaşma Stratejisi:</strong> Coca-Cola veya Devon Energy gibi yüksek fiyat gücü ve geniş marjla kazanıyor.
                  </span>
                ) : margin <= 8 && turnover >= 2.0 ? (
                  <span>
                    ⚡ <strong>Maliyet Liderliği Stratejisi:</strong> Costco veya Walmart gibi düşük kâr marjını ışık hızında devirle telafi ediyor.
                  </span>
                ) : margin >= 20 && turnover >= 1.5 ? (
                  <span>
                    👑 <strong>Nadir Süperstar:</strong> Apple veya Microsoft gibi hem yüksek marj hem de yüksek devir hızına sahip efsanevi bir hendek!
                  </span>
                ) : (
                  <span>
                    ⚖️ <strong>Dengeli / Standart Yapı:</strong> Ortalama pazar dinamiklerine sahip.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standardized Pedagogical Lesson Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <strong className="font-bold text-indigo-900 dark:text-indigo-300 block">Raynor & Ahmed DuPont İlkesi:</strong>
          25.000 şirketin incelendiği ampirik araştırmada <em>'Ucuzluktan önce Kalite' (Better before Cheaper)</em> stratejisinin yani kâr marjı farklılaşmasının, salt devir hızı rekabetine göre uzun vadede çok daha kalıcı ve sürdürülebilir ROIC sağladığı kanıtlanmıştır.
        </div>
      </div>
    </div>
  );
};
