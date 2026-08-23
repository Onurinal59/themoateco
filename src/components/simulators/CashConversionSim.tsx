import React, { useState } from "react";
import { Clock, CheckCircle2, AlertCircle, RotateCcw, Zap } from "lucide-react";

interface CCCPreset {
  name: string;
  dio: number; // days inventory
  dso: number; // days sales
  dpo: number; // days payables
  desc: string;
}

const PRESETS: CCCPreset[] = [
  {
    name: "1999 Amazon.com (Yıkıcı E-Ticaret)",
    dio: 29,
    dso: 2,
    dpo: 60,
    desc: "Müşteriden 2 günde parayı aldı, yayıncıya 60 günde ödedi. 58 gün boyunca müşterinin parasıyla büyüdü!",
  },
  {
    name: "1999 Barnes & Noble (Geleneksel Kitapçı)",
    dio: 149,
    dso: 6,
    dpo: 75,
    desc: "Kitap 149 gün rafta tozlandı. Parası 80 gün boyunca kilitli kaldı ve devasa kredi faizi ödedi.",
  },
  {
    name: "Costco Wholesale",
    dio: 30,
    dso: 3,
    dpo: 35,
    desc: "Paletleri hemen satar, üyelerden nakit alır, tedarikçiyi 35 günde öder.",
  },
  {
    name: "Ağır Makine Üreticisi",
    dio: 90,
    dso: 60,
    dpo: 30,
    desc: "Hammadde ve üretim aylarca sürer, müşteriler 60 günde öder. Nakit döngüsü +120 gündür!",
  },
];

export const CashConversionSim: React.FC = () => {
  const [dio, setDio] = useState<number>(29);
  const [dso, setDso] = useState<number>(2);
  const [dpo, setDpo] = useState<number>(60);

  const ccc = dio + dso - dpo;
  const isNegative = ccc < 0;

  const loadPreset = (p: CCCPreset) => {
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
              Modül 7 Laboratuvarı
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Bilanço Verimliliği & Negatif İşletme Sermayesi
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Nakit Dönüşüm Süresi (CCC) Simülatörü
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            CCC = Stok Bekleme Süresi (DIO) + Alacak Tahsilat Süresi (DSO) - Borç Ödeme Süresi (DPO). Şirketin nakdi ne kadar sürede geri kazandığını test edin.
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
          <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
        </button>
      </div>

      {/* Real-World Presets */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
          Tarihsel Şirket Modelleri (Amazon vs Geleneksel):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(p)}
              className="text-left p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all text-xs cursor-pointer group"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{p.name}</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-tight line-clamp-2">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders & Formula */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders */}
        <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">1. DIO (Stok Bekleme Gün Sayısı)</span>
              <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">{dio} Gün</span>
            </div>
            <input
              type="range"
              min={5}
              max={180}
              value={dio}
              onChange={(e) => setDio(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Ürünün rafta müşteriye satılana kadar geçirdiği süre.</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">2. DSO (Alacak Tahsilat Gün Sayısı)</span>
              <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">{dso} Gün</span>
            </div>
            <input
              type="range"
              min={1}
              max={90}
              value={dso}
              onChange={(e) => setDso(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Satış yapıldıktan sonra müşteriden paranın fiilen tahsil süresi.</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">3. DPO (Tedarikçiye Ödeme Gün Sayısı)</span>
              <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">{dpo} Gün</span>
            </div>
            <input
              type="range"
              min={10}
              max={120}
              value={dpo}
              onChange={(e) => setDpo(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Malı getiren toptancıya kaç gün sonra ödeme yaptığınız.</p>
          </div>
        </div>

        {/* Output Verdict */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
              Nakit Dönüşüm Süresi Sonucu:
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono shadow-2xs">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>{dio}d (Stok)</span> + <span>{dso}d (Tahsilat)</span> - <span>{dpo}d (Ödeme)</span>
              </div>
              <div
                className={`text-3xl font-extrabold mt-2 ${
                  isNegative ? "text-emerald-600 dark:text-emerald-400" : "text-indigo-600 dark:text-indigo-400"
                }`}
              >
                {ccc} Gün
              </div>
              <div className="text-[11px] font-sans font-medium text-slate-500 dark:text-slate-400 mt-1">
                {isNegative ? "⚡ Negatif Döngü (Nakit Üreten Model)" : "⏳ Pozitif Döngü (Nakit Bağlayan Model)"}
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed shadow-2xs">
              {isNegative ? (
                <div className="flex items-start gap-2 text-emerald-800 dark:text-emerald-300">
                  <Zap className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    <strong>Süper Güç:</strong> Şirketiniz müşteriden parayı cebine koyduktan {Math.abs(ccc)} gün sonra tedarikçisine ödeme yapıyor! Yani büyümesini sıfır faizle tedarikçi sermayesiyle finanse ediyor.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    Şirketinizin parası {ccc} gün boyunca depolardaki stoklarda kilitli kalıyor. Bu süreyi finanse etmek için banka kredisine veya ek işletme sermayesine ihtiyaç duyar.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Standardized Pedagogical Lesson Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <strong className="font-bold text-indigo-900 dark:text-indigo-300 block">Nakit Döngüsü ve Sermaye Verimliliği İlkesi:</strong>
          Amazon 1999 yılında <strong>-29 günlük CCC</strong> sayesinde banka kredisi çekmeden veya hissedar sermayesini seyreltmeden yıldırım hızında büyümesini doğrudan tedarikçilerinin sermayesiyle finanse etmiştir.
        </div>
      </div>
    </div>
  );
};
