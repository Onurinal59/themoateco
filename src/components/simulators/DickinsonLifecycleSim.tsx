import React, { useState } from "react";
import {
  TrendingUp,
  Activity,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Zap,
  Building,
  DollarSign
} from "lucide-react";

type Sign = "+" | "-";

interface StageInfo {
  stage: string;
  stageTr: string;
  color: string;
  badgeBg: string;
  avgRoic: number;
  roicSpread: string;
  description: string;
  examples: string[];
  characteristic: string;
  distributionShare: number; // % of public firms
}

const STAGE_DATABASE: Record<string, StageInfo> = {
  "- - +": {
    stage: "Introduction",
    stageTr: "1. Giriş Evresi (Introduction)",
    color: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    avgRoic: -2.8,
    roicSpread: "-10.8% ile +5.2%",
    description: "Şirket henüz kendi operasyonundan nakit üretemez (Faaliyet -). Sürekli yatırım yapar (Yatırım -) ve hayatını sürdürebilmek için dışarıdan borç veya hissedar sermayesi (Finansman +) bulmak zorundadır.",
    examples: ["Erken Aşama Biyoteknoloji Girişimleri", "2010 Öncesi Erken SaaS Girişimleri", "1997 Amazon (İlk Halka Arz Dönemi)"],
    characteristic: "Giriş aşamasında kâr değil hayatta kalma ve pazar testi önceliklidir.",
    distributionShare: 9.2,
  },
  "+ - +": {
    stage: "Growth",
    stageTr: "2. Büyüme Evresi (Growth)",
    color: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    avgRoic: 10.6,
    roicSpread: "+4.1% ile +17.2%",
    description: "Şirket artık kendi ana faaliyetinden güçlü nakit üretir (Faaliyet +). Ancak pazar talebi o kadar büyüktür ki hem kendi nakdini yatırıma harcar (Yatırım -) hem de ek borç/sermaye çekerek büyümeyi finanse eder (Finansman +).",
    examples: ["2016-2021 Tesla", "2008-2015 Netflix", "Büyüyen E-Ticaret Şirketleri"],
    characteristic: "Yüksek ciro büyümesi, pazar payı kapma yarışı ve sermaye yoğun kapasite artırımı.",
    distributionShare: 38.4,
  },
  "+ - -": {
    stage: "Maturity",
    stageTr: "3. Olgunluk Evresi (Maturity - Nakit İneği)",
    color: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    avgRoic: 11.2,
    roicSpread: "+5.8% ile +16.5%",
    description: "Şirket gerçek bir nakit basma makinesine dönüşmüştür! Faaliyetlerden devasa nakit girer (Faaliyet +). Tüm rutin yatırımlarını kendi nakdiyle karşılar (Yatırım -) ve arta kalan devasa nakitle borç öder veya temettü/hisse geri alımı yapar (Finansman -).",
    examples: ["Günümüz Apple Inc.", "Coca-Cola Company", "Microsoft", "BİM Birleşik Mağazalar"],
    characteristic: "En yüksek ROIC istikrarı, güçlü ekonomik hendek ve devasa serbest nakit akımı (FCF).",
    distributionShare: 36.1,
  },
  "- - -": {
    stage: "Shake-out (Zorlanan)",
    stageTr: "4. Sarsıntı Evresi (Shake-Out)",
    color: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    avgRoic: 3.8,
    roicSpread: "-4.2% ile +11.8%",
    description: "Sektörde talep aniden durmuştur. İşten nakit gelmez (Faaliyet -), eski yatırımların taksitleri sürer (Yatırım -) ve borç ödemeleri veya temettü taahhütleri şirketi sıkıştırır (Finansman -).",
    examples: ["Krizdeki Geleneksel Otomotiv Şirketleri", "Durgunluk Dönemindeki Sanayi Tesisleri"],
    characteristic: "Kârlılıkta sert oynaklık, zayıf hendekli şirketlerin elendiği veya satıldığı dönem.",
    distributionShare: 11.3,
  },
  "+ + -": {
    stage: "Shake-out (Varlık Satan)",
    stageTr: "4. Sarsıntı Evresi (Varlık Satan Büyüme)",
    color: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    avgRoic: 4.5,
    roicSpread: "-2.0% ile +11.0%",
    description: "Şirket ana işinden nakit üretirken (Faaliyet +), bazı fabrika veya iştiraklerini satarak nakit yaratır (Yatırım +) ve bu parayla borçlarını kapatır (Finansman -).",
    examples: ["Yeniden Yapılanan Holdingler", "Portföy Sadeleştiren Devler (GE)"],
    characteristic: "Şirket stratejisini daraltıp ana karlı çekirdeğine geri döner.",
    distributionShare: 3.2,
  },
  "- + +": {
    stage: "Decline",
    stageTr: "5. Düşüş Evresi (Decline)",
    color: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    avgRoic: -12.0,
    roicSpread: "-24.0% ile -0.2%",
    description: "Şirketin iş modeli çökmüştür. Faaliyetler nakit yakar (Faaliyet -). Şirket hayatta kalmak için fabrikalarını ve gayrimenkullerini satar (Yatırım +) ve acil borç/kredi arar (Finansman +).",
    examples: ["2008 Kodak", "2010 Blockbuster", "Batmakta Olan Perakendeciler"],
    characteristic: "Yıkıcı inovasyon karşısında ezilme, negatif ROIC ve değer erimesi.",
    distributionShare: 5.0,
  },
  "- + -": {
    stage: "Decline (Tasfiye)",
    stageTr: "5. Düşüş Evresi (Tasfiye ve Kapanış)",
    color: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    avgRoic: -14.5,
    roicSpread: "-30.0% ile -2.0%",
    description: "Varlıklarını satıp elde ettiği parayla borçlarını ve alacaklılarını ödeyerek piyasadan çekilen şirket tablosudur.",
    examples: ["İflas ve Tasfiye Sürecindeki İşletmeler"],
    characteristic: "Sermaye piyasasından tamamen çıkış.",
    distributionShare: 1.0,
  },
};

export const DickinsonLifecycleSim: React.FC = () => {
  const [operatingSign, setOperatingSign] = useState<Sign>("+");
  const [investingSign, setInvestingSign] = useState<Sign>("-");
  const [financingSign, setFinancingSign] = useState<Sign>("-");

  const patternKey = `${operatingSign} ${investingSign} ${financingSign}`;
  const currentStage = STAGE_DATABASE[patternKey] || {
    stage: "Özel / Karışık Evre",
    stageTr: "Özel Durum / Geçiş Evresi",
    color: "text-slate-600 dark:text-slate-400",
    badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
    avgRoic: 0.0,
    roicSpread: "-5% ile +5%",
    description: "Bu kombinasyon nadir görülen ara geçiş dönemlerini veya özel yeniden yapılandırma süreçlerini yansıtır.",
    examples: ["Mevsimsel ve döngüsel geçiş şirketleri"],
    characteristic: "Geçici nakit akış anomalisi.",
    distributionShare: 2.0,
  };

  const handleApplyPresetStage = (op: Sign, inv: Sign, fin: Sign) => {
    setOperatingSign(op);
    setInvestingSign(inv);
    setFinancingSign(fin);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="dickinson-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50">
              Modül 2 Laboratuvarı
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Victoria Dickinson Modeli
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Şirket Yaşam Döngüsü: Nakit Akış Tablosu Röntgeni
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Şirketin kuruluş yılına aldanmayın; nakit akış tablosundaki 3 ana kalemin işaretlerini (+ / -) değiştirerek şirketin hangi yaşam evresinde olduğunu anında teşhis edin.
          </p>
        </div>

        <button
          onClick={() => handleApplyPresetStage("+", "-", "-")}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Sıfırla (Olgunluk)
        </button>
      </div>

      {/* Preset Stage Buttons */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Hızlı Evre Seçimleri:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => handleApplyPresetStage("-", "-", "+")}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              patternKey === "- - +"
                ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 text-indigo-900 dark:text-indigo-200 font-bold"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <span className="block text-[11px] text-slate-400 font-mono">[- - +]</span>
            🌱 1. Giriş Evresi
          </button>

          <button
            onClick={() => handleApplyPresetStage("+", "-", "+")}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              patternKey === "+ - +"
                ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <span className="block text-[11px] text-slate-400 font-mono">[+ - +]</span>
            🚀 2. Büyüme Evresi
          </button>

          <button
            onClick={() => handleApplyPresetStage("+", "-", "-")}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              patternKey === "+ - -"
                ? "bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200 font-bold"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <span className="block text-[11px] text-slate-400 font-mono">[+ - -]</span>
            👑 3. Olgunluk (Nakit İneği)
          </button>

          <button
            onClick={() => handleApplyPresetStage("-", "+", "+")}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              patternKey === "- + +"
                ? "bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200 font-bold"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <span className="block text-[11px] text-slate-400 font-mono">[- + +]</span>
            📉 5. Düşüş / Çöküş
          </button>
        </div>
      </div>

      {/* Main Interactive Controls & Diagnostic Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left: 3 Cash Flow Toggle Switches (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Nakit Akış Yönlerini Belirleyin:
          </h3>

          {/* 1. Operating Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                1. Faaliyet Nakit Akışı (İşten Gelen)
              </span>
              <span className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded ${operatingSign === "+" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"}`}>
                {operatingSign} {operatingSign === "+" ? "GİRİŞ (+)" : "ÇIKIŞ (-)"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Şirket kendi esas ticari operasyonundan nakit üretiyor mu?
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setOperatingSign("+")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  operatingSign === "+"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                + Nakit Üretiyor
              </button>
              <button
                onClick={() => setOperatingSign("-")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  operatingSign === "-"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                - Nakit Yakıyor
              </button>
            </div>
          </div>

          {/* 2. Investing Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                2. Yatırım Nakit Akışı (Geleceğe Harcanan)
              </span>
              <span className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded ${investingSign === "-" ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300" : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"}`}>
                {investingSign} {investingSign === "-" ? "YATIRIM (-)" : "SATIŞ (+)"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Şirket yeni fabrika/yazılım alıyor mu (-) yoksa varlıklarını satarak mı nakit buluyor (+)?
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setInvestingSign("-")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  investingSign === "-"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                - Yatırım Yapıyor
              </button>
              <button
                onClick={() => setInvestingSign("+")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  investingSign === "+"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                + Varlık Satıyor
              </button>
            </div>
          </div>

          {/* 3. Financing Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                3. Finansman Nakit Akışı (Sermaye/Temettü)
              </span>
              <span className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded ${financingSign === "-" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"}`}>
                {financingSign} {financingSign === "-" ? "GERİ ÖDEME (-)" : "BORÇLANMA (+)"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Şirket dışarıdan borç/para mı alıyor (+) yoksa borç ödeyip temettü mü dağıtıyor (-)?
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setFinancingSign("+")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  financingSign === "+"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                + Dış Kaynak Çekiyor
              </button>
              <button
                onClick={() => setFinancingSign("-")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  financingSign === "-"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                - Temettü / Borç Ödüyor
              </button>
            </div>
          </div>
        </div>

        {/* Right: Diagnostic Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          <div className={`p-5 sm:p-6 rounded-2xl border ${currentStage.badgeBg} space-y-4`}>
            {/* Stage Title */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                  Dickinson Yaşam Döngüsü Teşhisi
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/70 dark:bg-black/40 border border-current/20">
                  Kombinasyon: [{patternKey}]
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black mt-1">
                {currentStage.stageTr}
              </h3>
            </div>

            {/* ROIC Stat Badge */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/15 text-slate-900 dark:text-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  Bu Evrede Ortalama ROIC
                </span>
                <span className={`text-xl sm:text-2xl font-black font-mono ${currentStage.avgRoic >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  %{currentStage.avgRoic > 0 ? `+${currentStage.avgRoic}` : currentStage.avgRoic}
                </span>
                <span className="text-[10px] text-slate-400 block">Yayılım: {currentStage.roicSpread}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  Borsa Şirketlerinin Oranı
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                  %{currentStage.distributionShare}
                </span>
                <span className="text-[10px] text-slate-400 block">Victoria Dickinson Verisi</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm leading-relaxed opacity-95">
              {currentStage.description}
            </p>

            {/* Real World Company Examples */}
            <div className="pt-2 border-t border-current/15 space-y-1.5">
              <span className="text-xs font-bold block">
                🏢 Tipik Şirket Örnekleri:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentStage.examples.map((ex, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/90 dark:bg-slate-800/90 border border-current/20 shadow-2xs"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insight Box */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-200">
            <strong>🎯 Yatırımcı Çıkarımı:</strong> "Hisselerin %74'ü Büyüme (%38) ve Olgunluk (%36) evresindedir. Uzun vadeli bileşik getirili (Compounder) şirketler genellikle <strong>[+ - -] Olgunluk</strong> evresinde olup yüksek serbest nakit akışı üreten kalelerdir."
          </div>
        </div>
      </div>
    </div>
  );
};
