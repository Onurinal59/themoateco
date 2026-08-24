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
import { useLanguage } from "../../context/LanguageContext";

type Sign = "+" | "-";

interface StageInfo {
  stage: string;
  stageTr: string;
  color: string;
  badgeBg: string;
  avgRoic: number;
  roicSpread: string;
  descriptionTr: string;
  descriptionEn: string;
  examplesTr: string[];
  examplesEn: string[];
  characteristicTr: string;
  characteristicEn: string;
  distributionShare: number; // % of public firms
}

const STAGE_DATABASE: Record<string, StageInfo> = {
  "- - +": {
    stage: "1. Introduction Stage (Introduction)",
    stageTr: "1. Giriş Evresi (Introduction)",
    color: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    avgRoic: -2.8,
    roicSpread: "-10.8% - +5.2%",
    descriptionTr: "Şirket henüz kendi operasyonundan nakit üretemez (Faaliyet -). Sürekli yatırım yapar (Yatırım -) ve hayatını sürdürebilmek için dışarıdan borç veya hissedar sermayesi (Finansman +) bulmak zorundadır.",
    descriptionEn: "The firm cannot yet fund itself from operations (CFO -). It invests heavily in capacity (CFI -) and relies on external debt or equity financing (CFF +) to survive.",
    examplesTr: ["Erken Aşama Biyoteknoloji Girişimleri", "2010 Öncesi Erken SaaS Girişimleri", "1997 Amazon (İlk Halka Arz Dönemi)"],
    examplesEn: ["Early-stage Biotech Startups", "Pre-2010 SaaS Startups", "1997 Amazon (IPO Period)"],
    characteristicTr: "Giriş aşamasında kâr değil hayatta kalma ve pazar testi önceliklidir.",
    characteristicEn: "Survival and product-market fit are prioritized over accounting profit.",
    distributionShare: 9.2,
  },
  "+ - +": {
    stage: "2. Growth Stage (Growth)",
    stageTr: "2. Büyüme Evresi (Growth)",
    color: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    avgRoic: 10.6,
    roicSpread: "+4.1% - +17.2%",
    descriptionTr: "Şirket artık kendi ana faaliyetinden güçlü nakit üretir (Faaliyet +). Ancak pazar talebi o kadar büyüktür ki hem kendi nakdini yatırıma harcar (Yatırım -) hem de ek borç/sermaye çekerek büyümeyi finanse eder (Finansman +).",
    descriptionEn: "The firm generates healthy operating cash flow (CFO +), but growth opportunities exceed internal cash, prompting heavy reinvestment (CFI -) and debt/equity capital raises (CFF +).",
    examplesTr: ["2016-2021 Tesla", "2008-2015 Netflix", "Büyüyen E-Ticaret Şirketleri"],
    examplesEn: ["2016-2021 Tesla", "2008-2015 Netflix", "Scaling E-Commerce Platforms"],
    characteristicTr: "Yüksek ciro büyümesi, pazar payı kapma yarışı ve sermaye yoğun kapasite artırımı.",
    characteristicEn: "High revenue growth, land-grab market share race, and capital-intensive scaling.",
    distributionShare: 38.4,
  },
  "+ - -": {
    stage: "3. Maturity Stage (Cash Cow Compounder)",
    stageTr: "3. Olgunluk Evresi (Maturity - Nakit İneği)",
    color: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    avgRoic: 11.2,
    roicSpread: "+5.8% - +16.5%",
    descriptionTr: "Şirket gerçek bir nakit basma makinesine dönüşmüştür! Faaliyetlerden devasa nakit girer (Faaliyet +). Tüm rutin yatırımlarını kendi nakdiyle karşılar (Yatırım -) ve arta kalan devasa nakitle borç öder veya temettü/hisse geri alımı yapar (Finansman -).",
    descriptionEn: "A bona fide cash-generating compounder. Substantial operating cash (CFO +) easily funds maintenance and growth CapEx (CFI -), leaving huge surplus for dividends, debt paydown, and buybacks (CFF -).",
    examplesTr: ["Günümüz Apple Inc.", "Coca-Cola Company", "Microsoft", "BİM Birleşik Mağazalar"],
    examplesEn: ["Apple Inc.", "Coca-Cola Company", "Microsoft", "Alphabet (Google)"],
    characteristicTr: "En yüksek ROIC istikrarı, güçlü ekonomik hendek ve devasa serbest nakit akımı (FCF).",
    characteristicEn: "Highest ROIC stability, durable economic moat, and massive Free Cash Flow (FCF).",
    distributionShare: 36.1,
  },
  "- - -": {
    stage: "4. Shake-out Stage (Distressed)",
    stageTr: "4. Sarsıntı Evresi (Shake-Out)",
    color: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    avgRoic: 3.8,
    roicSpread: "-4.2% - +11.8%",
    descriptionTr: "Sektörde talep aniden durmuştur. İşten nakit gelmez (Faaliyet -), eski yatırımların taksitleri sürer (Yatırım -) ve borç ödemeleri veya temettü taahhütleri şirketi sıkıştırır (Finansman -).",
    descriptionEn: "Industry headwinds squeeze margins. Operating cash turns negative (CFO -), legacy commitments force spending (CFI -), and debt repayments drain liquidity (CFF -).",
    examplesTr: ["Krizdeki Geleneksel Otomotiv Şirketleri", "Durgunluk Dönemindeki Sanayi Tesisleri"],
    examplesEn: ["Cyclical Heavy Manufacturing in Downturn", "Legacy Automotive under Transition Stress"],
    characteristicTr: "Kârlılıkta sert oynaklık, zayıf hendekli şirketlerin elendiği veya satıldığı dönem.",
    characteristicEn: "High earnings volatility; vulnerable non-moat players get weeded out.",
    distributionShare: 11.3,
  },
  "+ + -": {
    stage: "4. Shake-out Stage (Asset Divesting)",
    stageTr: "4. Sarsıntı Evresi (Varlık Satan Büyüme)",
    color: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    avgRoic: 4.5,
    roicSpread: "-2.0% - +11.0%",
    descriptionTr: "Şirket ana işinden nakit üretirken (Faaliyet +), bazı fabrika veya iştiraklerini satarak nakit yaratır (Yatırım +) ve bu parayla borçlarını kapatır (Finansman -).",
    descriptionEn: "The company generates operating cash (CFO +), divests non-core units or factories (CFI +), and pays down outstanding obligations (CFF -).",
    examplesTr: ["Yeniden Yapılanan Holdingler", "Portföy Sadeleştiren Devler (GE)"],
    examplesEn: ["Restructuring Conglomerates (e.g. GE post-2018)", "Portfolio Streamlining Corporates"],
    characteristicTr: "Şirket stratejisini daraltıp ana karlı çekirdeğine geri döner.",
    characteristicEn: "Refocusing on profitable core units and reducing leverage.",
    distributionShare: 3.2,
  },
  "- + +": {
    stage: "5. Decline Stage (Terminal Decline)",
    stageTr: "5. Düşüş Evresi (Decline)",
    color: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    avgRoic: -12.0,
    roicSpread: "-24.0% - -0.2%",
    descriptionTr: "Şirketin iş modeli çökmüştür. Faaliyetler nakit yakar (Faaliyet -). Şirket hayatta kalmak için fabrikalarını ve gayrimenkullerini satar (Yatırım +) ve acil borç/kredi arar (Finansman +).",
    descriptionEn: "Core business is obsolete and burns cash (CFO -). Management liquidates assets (CFI +) and seeks emergency debt/rescue financing (CFF +).",
    examplesTr: ["2008 Kodak", "2010 Blockbuster", "Batmakta Olan Perakendeciler"],
    examplesEn: ["2008 Kodak", "2010 Blockbuster", "Distressed Brick-and-Mortar Retailers"],
    characteristicTr: "Yıkıcı inovasyon karşısında ezilme, negatif ROIC ve değer erimesi.",
    characteristicEn: "Disrupted by technology; negative economic spread and equity destruction.",
    distributionShare: 5.0,
  },
  "- + -": {
    stage: "5. Decline Stage (Liquidation / Wind-down)",
    stageTr: "5. Düşüş Evresi (Tasfiye ve Kapanış)",
    color: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    avgRoic: -14.5,
    roicSpread: "-30.0% - -2.0%",
    descriptionTr: "Varlıklarını satıp elde ettiği parayla borçlarını ve alacaklılarını ödeyerek piyasadan çekilen şirket tablosudur.",
    descriptionEn: "Selling remaining inventory and assets (CFI +) to settle debts and shut down operations (CFF -).",
    examplesTr: ["İflas ve Tasfiye Sürecindeki İşletmeler"],
    examplesEn: ["Bankrupt Entities in Formal Liquidation"],
    characteristicTr: "Sermaye piyasasından tamamen çıkış.",
    characteristicEn: "Terminal market exit.",
    distributionShare: 1.0,
  },
};

export const DickinsonLifecycleSim: React.FC = () => {
  const { isEnglish } = useLanguage();
  const [operatingSign, setOperatingSign] = useState<Sign>("+");
  const [investingSign, setInvestingSign] = useState<Sign>("-");
  const [financingSign, setFinancingSign] = useState<Sign>("-");

  const patternKey = `${operatingSign} ${investingSign} ${financingSign}`;
  const currentStage = STAGE_DATABASE[patternKey] || {
    stage: "Special / Transition Stage",
    stageTr: "Özel Durum / Geçiş Evresi",
    color: "text-slate-600 dark:text-slate-400",
    badgeBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
    avgRoic: 0.0,
    roicSpread: "-5% - +5%",
    descriptionTr: "Bu kombinasyon nadir görülen ara geçiş dönemlerini veya özel yeniden yapılandırma süreçlerini yansıtır.",
    descriptionEn: "This cash flow combination reflects rare transitional states or unusual restructuring setups.",
    examplesTr: ["Mevsimsel ve döngüsel geçiş şirketleri"],
    examplesEn: ["Cyclical inflection or seasonal anomaly firms"],
    characteristicTr: "Geçici nakit akış anomalisi.",
    characteristicEn: "Temporary cash flow anomaly.",
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
              {isEnglish ? "Module 2 Interactive Lab" : "Modül 2 Laboratuvarı"}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Victoria Dickinson Model" : "Victoria Dickinson Modeli"}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {isEnglish ? "Corporate Lifecycle: Cash Flow Statement X-Ray" : "Şirket Yaşam Döngüsü: Nakit Akış Tablosu Röntgeni"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {isEnglish
              ? "Don't judge a company by its founding year. Toggle Operating, Investing, and Financing cash flow signs (+ / -) to diagnose its real lifecycle stage."
              : "Şirketin kuruluş yılına aldanmayın; nakit akış tablosundaki 3 ana kalemin işaretlerini (+ / -) değiştirerek şirketin hangi yaşam evresinde olduğunu anında teşhis edin."}
          </p>
        </div>

        <button
          onClick={() => handleApplyPresetStage("+", "-", "-")}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset (Maturity)" : "Sıfırla (Olgunluk)"}
        </button>
      </div>

      {/* Preset Stage Buttons */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {isEnglish ? "Quick Stage Presets:" : "Hızlı Evre Seçimleri:"}
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
            🌱 {isEnglish ? "1. Introduction" : "1. Giriş Evresi"}
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
            🚀 {isEnglish ? "2. Growth" : "2. Büyüme Evresi"}
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
            👑 {isEnglish ? "3. Maturity (Compounder)" : "3. Olgunluk (Nakit İneği)"}
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
            📉 {isEnglish ? "5. Decline / Distress" : "5. Düşüş / Çöküş"}
          </button>
        </div>
      </div>

      {/* Main Interactive Controls & Diagnostic Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left: 3 Cash Flow Toggle Switches (5 cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            {isEnglish ? "Set Cash Flow Directions:" : "Nakit Akış Yönlerini Belirleyin:"}
          </h3>

          {/* 1. Operating Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {isEnglish ? "1. Operating Cash Flow (CFO)" : "1. Faaliyet Nakit Akışı (İşten Gelen)"}
              </span>
              <span className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded ${operatingSign === "+" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"}`}>
                {operatingSign} {operatingSign === "+" ? (isEnglish ? "INFLOW (+)" : "GİRİŞ (+)") : (isEnglish ? "OUTFLOW (-)" : "ÇIKIŞ (-)")}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEnglish ? "Does the core business generate cash on its own?" : "Şirket kendi esas ticari operasyonundan nakit üretiyor mu?"}
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
                {isEnglish ? "+ Generates Cash" : "+ Nakit Üretiyor"}
              </button>
              <button
                onClick={() => setOperatingSign("-")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  operatingSign === "-"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "- Burns Cash" : "- Nakit Yakıyor"}
              </button>
            </div>
          </div>

          {/* 2. Investing Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {isEnglish ? "2. Investing Cash Flow (CFI)" : "2. Yatırım Nakit Akışı (Geleceğe Harcanan)"}
              </span>
              <span className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded ${investingSign === "-" ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300" : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"}`}>
                {investingSign} {investingSign === "-" ? (isEnglish ? "CAPEX (-)" : "YATIRIM (-)") : (isEnglish ? "DIVEST (+)" : "SATIŞ (+)")}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEnglish
                ? "Is the firm buying future capacity/software (-) or selling assets for cash (+)?"
                : "Şirket yeni fabrika/yazılım alıyor mu (-) yoksa varlıklarını satarak mı nakit buluyor (+)?"}
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
                {isEnglish ? "- Reinvesting (CapEx)" : "- Yatırım Yapıyor"}
              </button>
              <button
                onClick={() => setInvestingSign("+")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  investingSign === "+"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "+ Liquidating Assets" : "+ Varlık Satıyor"}
              </button>
            </div>
          </div>

          {/* 3. Financing Cash Flow */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {isEnglish ? "3. Financing Cash Flow (CFF)" : "3. Finansman Nakit Akışı (Sermaye/Temettü)"}
              </span>
              <span className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded ${financingSign === "-" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"}`}>
                {financingSign} {financingSign === "-" ? (isEnglish ? "RETURN (-)" : "GERİ ÖDEME (-)") : (isEnglish ? "RAISE (+)" : "BORÇLANMA (+)")}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isEnglish
                ? "Is the firm borrowing/raising capital (+) or returning dividends & paying debt (-)?"
                : "Şirket dışarıdan borç/para mı alıyor (+) yoksa borç ödeyip temettü mü dağıtıyor (-)?"}
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
                {isEnglish ? "+ Raising Debt/Equity" : "+ Dış Kaynak Çekiyor"}
              </button>
              <button
                onClick={() => setFinancingSign("-")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  financingSign === "-"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isEnglish ? "- Dividends & Debt Paydown" : "- Temettü / Borç Ödüyor"}
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
                  {isEnglish ? "Dickinson Lifecycle Diagnostic" : "Dickinson Yaşam Döngüsü Teşhisi"}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/70 dark:bg-black/40 border border-current/20">
                  {isEnglish ? "Combination: " : "Kombinasyon: "}[{patternKey}]
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black mt-1">
                {isEnglish ? currentStage.stage : currentStage.stageTr}
              </h3>
            </div>

            {/* ROIC Stat Badge */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/15 text-slate-900 dark:text-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  {isEnglish ? "Historical Average ROIC" : "Bu Evrede Ortalama ROIC"}
                </span>
                <span className={`text-xl sm:text-2xl font-black font-mono ${currentStage.avgRoic >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  %{currentStage.avgRoic > 0 ? `+${currentStage.avgRoic}` : currentStage.avgRoic}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {isEnglish ? "Spread: " : "Yayılım: "}{currentStage.roicSpread}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  {isEnglish ? "Share of Public Firms" : "Borsa Şirketlerinin Oranı"}
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                  %{currentStage.distributionShare}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {isEnglish ? "Dickinson Empirical Study" : "Victoria Dickinson Verisi"}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm leading-relaxed opacity-95">
              {isEnglish ? currentStage.descriptionEn : currentStage.descriptionTr}
            </p>

            {/* Real World Company Examples */}
            <div className="pt-2 border-t border-current/15 space-y-1.5">
              <span className="text-xs font-bold block">
                {isEnglish ? "🏢 Typical Real-World Examples:" : "🏢 Tipik Şirket Örnekleri:"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(isEnglish ? currentStage.examplesEn : currentStage.examplesTr).map((ex, i) => (
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
        </div>
      </div>

      {/* Standardized Pedagogical Lesson Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <strong className="font-bold text-indigo-900 dark:text-indigo-300 block">
            {isEnglish ? "Victoria Dickinson Lifecycle Moat Principle:" : "Victoria Dickinson Yaşam Döngüsü İlkesi:"}
          </strong>
          {isEnglish
            ? "74% of public companies are either in Growth (38%) or Maturity (36%). Long-term compounders almost universally sit in [+ - -] Maturity, where internal cash generation funds both ongoing reinvestment and shareholder return via dividends and buybacks."
            : "Borsadaki şirketlerin %74'ü Büyüme (%38) ve Olgunluk (%36) evresindedir. Uzun vadeli bileşik getirili (Compounder) şirketler genellikle [+ - -] Olgunluk evresinde olup operasyonundan yarattığı nakitle hem yatırımlarını finanse eden hem de temettü/geri alımla hissedara nakit aktaran şirketlerdir."}
        </div>
      </div>
    </div>
  );
};
