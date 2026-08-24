import React, { useState } from "react";
import { PieChart, TrendingUp, HelpCircle, Layers, Award, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface ValueChainSegment {
  nameTr: string;
  nameEn: string;
  shareTr: string;
  shareEn: string;
  profitShare: number; // %
  capitalShare: number; // %
  roic: number; // %
  descTr: string;
  descEn: string;
}

const AVIATION_POOL: ValueChainSegment[] = [
  {
    nameTr: "GDS & Rezervasyon Sistemleri (Amadeus, Sabre)",
    nameEn: "GDS & Booking Platforms (Amadeus, Sabre)",
    shareTr: "Küresel bilet rezervasyon ve dağıtım ağları",
    shareEn: "Global distribution systems & booking software",
    profitShare: 24,
    capitalShare: 3,
    roic: 38.5,
    descTr: "İki taraflı ağ etkisiyle neredeyse sıfır sermaye yatırımıyla kâr havuzunun devasa bir dilimini kaparlar.",
    descEn: "Two-sided network effects allow near-zero capital requirements to harvest massive economic rents.",
  },
  {
    nameTr: "Uçak İmalatı & Motorlar (Boeing, GE, Safran)",
    nameEn: "OEMs & Jet Engines (Boeing, GE, Safran)",
    shareTr: "Karmaşık aerodinamik ve türbin motorları",
    shareEn: "Complex aerospace engineering & turbine engines",
    profitShare: 31,
    capitalShare: 18,
    roic: 16.2,
    descTr: "Giriş engelleri ve 30 yıllık yedek parça tekel servisiyle yüksek getiri sağlarlar.",
    descEn: "High barriers to entry and 30-year aftermarket parts monopolies secure high returns.",
  },
  {
    nameTr: "Havalimanları & Duty-Free Operatörleri",
    nameEn: "Airports & Duty-Free Concessionaires",
    shareTr: "Doğal coğrafi tekeller ve perakende alanları",
    shareEn: "Geographic natural monopolies & terminal retail",
    profitShare: 22,
    capitalShare: 15,
    roic: 13.8,
    descTr: "Şehir başına tek havalimanı olması ve fahiş dükkan kiraları sayesinde istikrarlı kâr üretirler.",
    descEn: "Single airport per metropolitan area and captive retail rents provide consistent spread.",
  },
  {
    nameTr: "Havayolu Operatörleri (Uçuş Şirketleri)",
    nameEn: "Airline Operators (Flying Airlines)",
    shareTr: "Uçak satın alıp yolcu taşıyan filo sahipleri",
    shareEn: "Fleet owners flying passengers between hubs",
    profitShare: 12,
    capitalShare: 58,
    roic: 4.8,
    descTr: "Sektör sermayesinin %58'ini bağlamalarına rağmen yıkıcı rekabet yüzünden kârın sadece %12'sini alabilirler!",
    descEn: "Despite consuming 58% of industry capital, hyper-competition leaves them with only 12% of economic profit!",
  },
  {
    nameTr: "Kargo, İkram & Yer Hizmetleri",
    nameEn: "Ground Handling, Catering & Cargo",
    shareTr: "Bagaj taşıma, yemek ve apron operasyonları",
    shareEn: "Baggage handling, catering & ramp services",
    profitShare: 11,
    capitalShare: 6,
    roic: 9.4,
    descTr: "Yerel operasyonel sözleşmelerle orta düzey sermaye getirisi üretirler.",
    descEn: "Local airport service contracts generating moderate capital return.",
  },
];

export const ProfitPoolSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const selectedSegment = AVIATION_POOL[selectedIdx];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="profit-pool-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 1 & 2: Industry Value Chain" : "Modül 1 & 2: Sektör Değer Zinciri"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Aviation Industry Profit Pool (Exhibit 8)" : "Havacılık Sektörü Kâr Havuzu (Exhibit 8)"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Profit Pool Value Chain Diagnostic" : "Sektör Kâr Havuzu (Profit Pool) Röntgeni"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "See how industry profits are distributed across segments. While airline carriers absorb 58% of capital, booking software captures 38.5% ROIC with minimal capital."
              : "Toplam ekonomik kârın değer zincirindeki farklı halkalar arasında nasıl asimetrik dağıldığını keşfedin. Havayolları sermayenin çoğunu emerken, rezervasyon yazılımları kârı toplar."}
          </p>
        </div>

        <button
          onClick={() => setSelectedIdx(0)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset" : "Sıfırla"}
        </button>
      </div>

      {/* Segment Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {AVIATION_POOL.map((seg, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedIdx === idx
                ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-700 shadow-2xs"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isEnglish ? `Segment ${idx + 1}` : `${idx + 1}. Halka`}
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1 line-clamp-2">
                {isEnglish ? seg.nameEn : seg.nameTr}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-500">{isEnglish ? "ROIC:" : "ROIC:"}</span>
              <span className={`font-black ${seg.roic >= 15 ? "text-emerald-700 dark:text-emerald-400" : seg.roic >= 10 ? "text-indigo-700 dark:text-indigo-400" : "text-rose-600 dark:text-rose-400"}`}>
                %{seg.roic}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Segment Detailed Inspector */}
      <div className="p-6 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              {isEnglish ? "Selected Value Chain Link" : "Seçilen Değer Zinciri Halkası"}
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {isEnglish ? selectedSegment.nameEn : selectedSegment.nameTr}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {isEnglish ? selectedSegment.shareEn : selectedSegment.shareTr}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold text-slate-400">{isEnglish ? "Sector ROIC" : "Sektör ROIC"}</div>
              <div className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                %{selectedSegment.roic}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Bars */}
        <div className="space-y-3 pt-3 border-t border-indigo-200 dark:border-indigo-900/60">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
              <span>{isEnglish ? "Share of Industry Economic Profit:" : "Sektörün Toplam Kârındaki Payı:"}</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">%{selectedSegment.profitShare}</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                style={{ width: `${selectedSegment.profitShare * 2}%` }}
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
              <span>{isEnglish ? "Share of Industry Invested Capital:" : "Sektörün Toplam Yatırılan Sermayesindeki Payı:"}</span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">%{selectedSegment.capitalShare}</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                style={{ width: `${selectedSegment.capitalShare * 1.5}%` }}
                className="h-full bg-rose-600 rounded-full transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium pt-1">
          {isEnglish ? selectedSegment.descEn : selectedSegment.descTr}
        </p>
      </div>
    </div>
  );
};
