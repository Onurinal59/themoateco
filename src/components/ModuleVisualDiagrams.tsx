import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  ArrowRight,
  Shield,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Info,
  DollarSign,
  PieChart,
  BarChart3,
  Scale,
  Award,
} from "lucide-react";

/* =========================================================================
   1. VICTORIA DICKINSON NAKİT AKIŞI YAŞAM DÖNGÜSÜ İNTERAKTİF DİYAGRAMI
   ========================================================================= */

interface DickinsonStageData {
  id: string;
  name: string;
  nameTr: string;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  bgGradient: string;
  cfo: "+" | "-";
  cfi: "+" | "-";
  cff: "+" | "-";
  avgRoic: string;
  roicNum: number;
  description: string;
  diagnosticInsight: string;
  idealForMoat: boolean;
  archetypeCompany: string;
  dangerAlert?: string;
}

const DICKINSON_STAGES: DickinsonStageData[] = [
  {
    id: "intro",
    name: "Introduction",
    nameTr: "1. Giriş Evresi",
    badgeColor: "bg-amber-500 text-white",
    textColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-400 dark:border-amber-600",
    bgGradient: "from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20",
    cfo: "-",
    cfi: "-",
    cff: "+",
    avgRoic: "-%2.8",
    roicNum: -2.8,
    description: "Şirket henüz operasyonundan nakit üretemez. Sürekli yatırım harcaması yapar (CFI -) ve dışarıdan borç/yatırımcı parası bulur (CFF +).",
    diagnosticInsight: "Girişim sermayesi (VC) desteğiyle yaşar. Kâr marjı negatif veya çok düşüktür; pazar payı kapmaya odaklanır.",
    idealForMoat: false,
    archetypeCompany: "Rivian / Erken Dönem Biyoteknoloji / OpenAI",
  },
  {
    id: "growth",
    name: "Growth",
    nameTr: "2. Büyüme Evresi",
    badgeColor: "bg-indigo-600 text-white",
    textColor: "text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-400 dark:border-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/40 dark:to-indigo-900/20",
    cfo: "+",
    cfi: "-",
    cff: "+",
    avgRoic: "+%10.6",
    roicNum: 10.6,
    description: "Artık kendi işinden nakit üretir (CFO +), ancak büyüme o kadar agresiftir ki hem kendi nakdini hem dış borçları yatırıma (CFI -) gömer.",
    diagnosticInsight: "Ciro roket gibi büyür. Müşteri sadakati oluşmaya başlar; birim ekonomisi pozitife döner.",
    idealForMoat: false,
    archetypeCompany: "Tesla (2018-2021) / Uber (2022) / Spotify",
  },
  {
    id: "maturity",
    name: "Maturity",
    nameTr: "3. Olgunluk Evresi",
    badgeColor: "bg-emerald-600 text-white shadow-md shadow-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500 dark:border-emerald-500",
    bgGradient: "from-emerald-50 via-teal-50 to-emerald-100/50 dark:from-emerald-950/50 dark:via-teal-950/30 dark:to-emerald-900/20",
    cfo: "+",
    cfi: "-",
    cff: "-",
    avgRoic: "+%11.2",
    roicNum: 11.2,
    description: "Nakit Basma Makinesi! Operasyondan devasa nakit girer (CFO +), yatırımlarını kendi karşılar ve üstüne borç öder ya da temettü dağıtır (CFF -).",
    diagnosticInsight: "🏰 İDEAL HENDEK KALESİ: Şirket piyasa lideridir. Fiyatlama gücü maksimumdadır ve hissedarlara devasa serbest nakit akışı akıtır.",
    idealForMoat: true,
    archetypeCompany: "Apple / Microsoft / Coca-Cola / TSMC",
  },
  {
    id: "shakeout",
    name: "Shake-Out",
    nameTr: "4. Sarsıntı Evresi",
    badgeColor: "bg-purple-600 text-white",
    textColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-400 dark:border-purple-600",
    bgGradient: "from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/20",
    cfo: "+",
    cfi: "-",
    cff: "+",
    avgRoic: "+%3.8",
    roicNum: 3.8,
    description: "Sektörde talep doygunluğa ulaşır, büyüme yavaşlar. Zayıf rakipler elenirken kâr marjları ve nakit akışları şiddetli dalgalanır.",
    diagnosticInsight: "Fiyat savaşları patlak verir. Hendeği zayıf olan şirketler zarara geçer ve konsolidasyon başlar.",
    idealForMoat: false,
    archetypeCompany: "Geleneksel TV Yayıncıları / Eski Perakende Zincirleri",
  },
  {
    id: "decline",
    name: "Decline",
    nameTr: "5. Düşüş Evresi",
    badgeColor: "bg-rose-600 text-white",
    textColor: "text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-400 dark:border-rose-600",
    bgGradient: "from-rose-50 to-rose-100/50 dark:from-rose-950/40 dark:to-rose-900/20",
    cfo: "-",
    cfi: "+",
    cff: "-",
    avgRoic: "-%12.0",
    roicNum: -12.0,
    description: "Operasyondan para gelmez (CFO -). Şirket ayakta kalmak için fabrikalarını, binalarını ve patentlerini satarak nakit yaratır (CFI +).",
    diagnosticInsight: "🚨 DEĞER TUZAĞI (Value Trap): F/K oranı ucuz görünse bile şirketin iş modeli çökmektedir.",
    idealForMoat: false,
    archetypeCompany: "Kodak (2010) / Sears / Blockbuster",
    dangerAlert: "CFI pozitif (+) ise şirket varlıklarını satarak can çekişiyor demektir!",
  },
];

export const DickinsonLifecycleVisual: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>("maturity");
  const currentStage = DICKINSON_STAGES.find((s) => s.id === selectedStageId) || DICKINSON_STAGES[2];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 uppercase tracking-wider border border-emerald-500/30">
              📊 Görsel Yaşam Döngüsü Röntgeni
            </span>
            <span className="text-xs font-semibold text-slate-400">Victoria Dickinson (2011) Modeli</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            5 Evreli Nakit Akışı & ROIC Gelişim Eğrisi
          </h3>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          Evreyi seçmek için kartlara tıklayın 👇
        </div>
      </div>

      {/* Interactive 5 Stages Pipeline Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
        {DICKINSON_STAGES.map((stg, idx) => {
          const isSelected = stg.id === selectedStageId;
          return (
            <button
              key={stg.id}
              onClick={() => setSelectedStageId(stg.id)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer flex flex-col justify-between min-h-[96px] ${
                isSelected
                  ? `bg-slate-800/90 ${stg.borderColor} ring-2 ring-indigo-500/40 shadow-lg scale-[1.02]`
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40 text-slate-400 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    isSelected ? stg.badgeColor : "bg-slate-800 text-slate-300"
                  }`}
                >
                  0{idx + 1}
                </span>
                {stg.idealForMoat && (
                  <span className="text-[11px]" title="İdeal Hendek Evresi">
                    🏰
                  </span>
                )}
              </div>

              <div>
                <div className={`text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-slate-200"}`}>
                  {stg.nameTr.replace(/^\d+\.\s*/, "")}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  ROIC: <span className={stg.roicNum >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{stg.avgRoic}</span>
                </div>
              </div>

              {/* Cash flow pills */}
              <div className="flex items-center gap-1 text-[9px] font-mono pt-1 border-t border-slate-800">
                <span className={`px-1 rounded ${stg.cfo === "+" ? "bg-emerald-950 text-emerald-300" : "bg-rose-950 text-rose-300"}`}>
                  CFO:{stg.cfo}
                </span>
                <span className={`px-1 rounded ${stg.cfi === "+" ? "bg-amber-950 text-amber-300" : "bg-blue-950 text-blue-300"}`}>
                  CFI:{stg.cfi}
                </span>
                <span className={`px-1 rounded ${stg.cff === "+" ? "bg-purple-950 text-purple-300" : "bg-slate-800 text-slate-300"}`}>
                  CFF:{stg.cff}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Deep-Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
        >
          {/* Stage Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded-xl text-xs font-black ${currentStage.badgeColor}`}>
                {currentStage.nameTr} ({currentStage.name})
              </span>
              {currentStage.idealForMoat && (
                <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1">
                  👑 Hissedar Değer Zirvesi
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">Ortalama ROIC:</span>
              <span
                className={`px-2.5 py-0.5 rounded-lg font-bold text-xs ${
                  currentStage.roicNum > 0
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    : "bg-rose-950 text-rose-300 border border-rose-800"
                }`}
              >
                {currentStage.avgRoic}
              </span>
            </div>
          </div>

          {/* Cash Flow Signs Display Radar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* CFO */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">CFO (Faaliyet Nakit Akışı)</span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cfo === "+"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {currentStage.cfo === "+" ? "POZİTİF (+)" : "NEGATİF (-)"}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {currentStage.cfo === "+"
                  ? "Müşterilerden gelen para faaliyet giderlerini aşıyor; iş nakit üretiyor."
                  : "Müşterilerden gelen para maaş ve tedarikçileri karşılamaya yetmiyor; nakit yakılıyor."}
              </p>
            </div>

            {/* CFI */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">CFI (Yatırım Nakit Akışı)</span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cfi === "-"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {currentStage.cfi === "-" ? "NEGATİF (-) [Yatırım]" : "POZİTİF (+) [Varlık Satışı]"}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {currentStage.cfi === "-"
                  ? "Şirket geleceğe yatırım yapıyor; fabrika, makine ve yazılım satın alıyor."
                  : "🚨 Şirket duran varlıklarını ve fabrikalarını satarak nakit yaratmaya çalışıyor."}
              </p>
            </div>

            {/* CFF */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">CFF (Finansman Nakit Akışı)</span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-xs ${
                    currentStage.cff === "+"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-slate-700 text-slate-200 border border-slate-600"
                  }`}
                >
                  {currentStage.cff === "+" ? "POZİTİF (+) [Borç/Sermaye]" : "NEGATİF (-) [Geri Ödeme/Temettü]"}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {currentStage.cff === "+"
                  ? "Şirket dışarıdan banka kredisi alıyor veya yeni hisse ihraç ediyor."
                  : "Şirket borçlarını kapatıyor veya hissedara temettü / hisse geri alımı yapıyor."}
              </p>
            </div>
          </div>

          {/* Narrative & Diagnostic Insight */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-200 leading-relaxed font-medium">
              {currentStage.description}
            </div>
            <div className="text-xs text-amber-300 font-semibold flex items-start gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{currentStage.diagnosticInsight}</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 flex items-center gap-1.5 font-mono">
              <span>🏢 Vaka / Arketip Şirketler:</span>
              <span className="text-indigo-300 font-bold">{currentStage.archetypeCompany}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* =========================================================================
   2. DEĞER ÇUBUĞU (VALUE STICK) GÖRSEL DİYAGRAMI
   ========================================================================= */

export const ValueStickVisual: React.FC = () => {
  const [strategyMode, setStrategyMode] = useState<"standard" | "diff" | "cost">("standard");

  let wtp = 100;
  let price = 65;
  let cost = 30;
  let wts = 15;

  if (strategyMode === "diff") {
    wtp = 135;
    price = 90;
    cost = 35;
    wts = 15;
  } else if (strategyMode === "cost") {
    wtp = 95;
    price = 50;
    cost = 20;
    wts = 10;
  }

  const consumerSurplus = wtp - price;
  const firmProfit = price - cost;
  const supplierSurplus = cost - wts;
  const totalValue = wtp - wts;

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/20 text-indigo-300 uppercase tracking-wider border border-indigo-500/30">
              📏 Görsel Değer Çubuğu
            </span>
            <span className="text-xs font-semibold text-slate-400">Felix Oberholzer-Gee Modeli</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            WTP, Fiyat, Maliyet ve WTS Arasındaki Rant Bölüşümü
          </h3>
        </div>

        {/* Strategy Mode Toggles */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setStrategyMode("standard")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              strategyMode === "standard" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Standart
          </button>
          <button
            onClick={() => setStrategyMode("diff")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              strategyMode === "diff" ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Farklılaşma (Apple)
          </button>
          <button
            onClick={() => setStrategyMode("cost")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              strategyMode === "cost" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Maliyet Liderliği (Costco)
          </button>
        </div>
      </div>

      {/* Visual Stick Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Graphical Vertical Stick */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
          <div className="w-full max-w-[240px] space-y-2">
            {/* WTP line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400 border-b border-dashed border-amber-500/60 pb-1">
              <span>WTP (Ödeme İstekliliği)</span>
              <span>{wtp} TL</span>
            </div>

            {/* Block 1: Consumer Surplus */}
            <motion.div
              layout
              className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-center space-y-0.5 shadow-inner"
            >
              <div className="text-xs font-bold">😊 Müşteri Rantı</div>
              <div className="text-[11px] font-mono opacity-90">WTP - Fiyat = {consumerSurplus} TL</div>
            </motion.div>

            {/* Price line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-400 border-b border-dashed border-indigo-500/60 pb-1">
              <span>FİYAT (Etiket)</span>
              <span>{price} TL</span>
            </div>

            {/* Block 2: Firm Value Creation */}
            <motion.div
              layout
              className="p-3.5 rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 text-center space-y-0.5 shadow-md shadow-indigo-950"
            >
              <div className="text-xs font-extrabold text-white flex items-center justify-center gap-1">
                <span>🏰 Şirket Kârı (Hendek Alanı)</span>
              </div>
              <div className="text-xs font-mono text-indigo-300 font-bold">Fiyat - Maliyet = {firmProfit} TL</div>
            </motion.div>

            {/* Cost line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-400 border-b border-dashed border-rose-500/60 pb-1">
              <span>MALİYET</span>
              <span>{cost} TL</span>
            </div>

            {/* Block 3: Supplier Surplus */}
            <motion.div
              layout
              className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-center space-y-0.5 shadow-inner"
            >
              <div className="text-xs font-bold">🤝 Tedarikçi / Çalışan Rantı</div>
              <div className="text-[11px] font-mono opacity-90">Maliyet - WTS = {supplierSurplus} TL</div>
            </motion.div>

            {/* WTS line */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400 border-t border-dashed border-emerald-500/60 pt-1">
              <span>WTS (Satmaya İsteklilik)</span>
              <span>{wts} TL</span>
            </div>
          </div>
        </div>

        {/* Right: Narrative & Strategic Analysis */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Toplam Yaratılan Ekonomik Refah (WTP - WTS):</span>
              <span className="font-bold text-amber-300">{totalValue} TL</span>
            </div>
            <div className="flex items-center justify-between text-indigo-300">
              <span>Şirketin Aldığı Kâr Payı (%):</span>
              <span className="font-bold">{Math.round((firmProfit / totalValue) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between text-amber-300">
              <span>Tüketicinin Yaşadığı Memnuniyet Payı (%):</span>
              <span className="font-bold">{Math.round((consumerSurplus / totalValue) * 100)}%</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            {strategyMode === "standard" && (
              <p>
                ⚖️ <strong>Dengeli Piyasa:</strong> Şirket fiyatı maliyetinin üstünde tutarken müşteriye de yeterli bir fayda (WTP - Fiyat) bırakmaktadır.
              </p>
            )}
            {strategyMode === "diff" && (
              <p>
                💎 <strong>Farklılaşma Stratejisi (Apple, Ferrari):</strong> Üst çizgi (WTP) tavan yapmıştır. Müşteri ürüne aşık olduğu için 90 TL gibi yüksek bir fiyatta bile mutlu hisseder (Tüketici rantı 45 TL!). Şirket kârı 55 TL'ye fırlar.
              </p>
            )}
            {strategyMode === "cost" && (
              <p>
                ⚡ <strong>Maliyet Liderliği (Costco, Amazon):</strong> Tedarikçilerin verimliliği artırılarak WTS tabanı düşürülür, etiket fiyatı 50 TL'ye çekilir. Müşteri akın eder ve şirket yüksek devir hızıyla devasa bir toplam refah üretir.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. PORTER'IN 5 GÜCÜ & GİRİŞ ENGELLERİ GÖRSEL DİYAGRAMI
   ========================================================================= */

export const PorterForcesVisual: React.FC = () => {
  const [activeForce, setActiveForce] = useState<string>("entrants");

  const forces = [
    {
      id: "entrants",
      name: "1. Yeni Girenlerin Tehdidi",
      sub: "En Belirleyici Güç!",
      icon: "🚪",
      color: "bg-indigo-600 text-white",
      desc: "Eğer sektöre girmek çok kolaysa, yüksek kârları gören yüzlerce yeni şirket içeri dalar ve kâr marjlarını sıfıra çeker.",
      moatDefense: "7 Giriş Engeli: Ölçek ekonomisi, Ağ etkisi, Yüksek geçiş maliyeti ve Patentler.",
    },
    {
      id: "suppliers",
      name: "2. Tedarikçilerin Gücü",
      sub: "Bozucu Baskı",
      icon: "🏭",
      color: "bg-amber-600 text-white",
      desc: "Tedarikçiniz tekel ise (örneğin uçak motorunda GE/Rolls-Royce), kârınızı fiyat artışlarıyla süpürür.",
      moatDefense: "Çoklu tedarikçi yapısı kurmak veya geriye doğru dikey entegrasyon.",
    },
    {
      id: "buyers",
      name: "3. Alıcıların Gücü",
      sub: "Fiyat Baskısı",
      icon: "🛒",
      color: "bg-emerald-600 text-white",
      desc: "Müşteriler az sayıda ve fiyata aşırı duyarlıysa, sürekli indirim talep ederek kârınızı kırarlar.",
      moatDefense: "Müşteri geçiş maliyeti (Lock-in) ve üstün marka aidiyeti (WTP artışı).",
    },
    {
      id: "substitutes",
      name: "4. İkame Ürünlerin Tehdidi",
      sub: "Görünmez Tehlike",
      icon: "⚡",
      color: "bg-purple-600 text-white",
      desc: "Doğrudan rakip olmasa bile müşterinin problemini farklı bir yoldan çözen ürünler (Örn: Havayoluna karşı Hızlı Tren).",
      moatDefense: "Ekosistem kurarak müşterinin hayatını kolaylaştırmak.",
    },
    {
      id: "rivalry",
      name: "5. Mevcut Rakipler Arası Rekabet",
      sub: "Fiyat Savaşları",
      icon: "⚔️",
      color: "bg-rose-600 text-white",
      desc: "Aynı sektördeki rakiplerin kapasite fazlası ve fiyat kırma yarışına girmesi.",
      moatDefense: "Pazar payı istikrarı, kapasite disiplini ve örtük işbirliği (Tit-for-Tat).",
    },
  ];

  const current = forces.find((f) => f.id === activeForce) || forces[0];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-300 uppercase tracking-wider border border-purple-500/30">
              🛡️ Michael Porter Modeli
            </span>
            <span className="text-xs font-semibold text-slate-400">Sektör Kârlılığını Belirleyen 5 Çekim Gücü</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            Rakipleri ve Tehditleri Haritalandırma
          </h3>
        </div>
      </div>

      {/* Grid of 5 forces buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {forces.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveForce(f.id)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[88px] ${
              f.id === activeForce
                ? `bg-slate-800/90 ring-2 ring-indigo-500/40 border-indigo-400 shadow-md`
                : "bg-slate-950/60 border-slate-800 hover:bg-slate-800/40 opacity-75 hover:opacity-100"
            }`}
          >
            <div className="text-lg">{f.icon}</div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">{f.name}</div>
              <div className="text-[10px] text-slate-400">{f.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Force Deep Dive Card */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{current.icon}</span>
          <h4 className="text-sm font-bold text-slate-100">{current.name}</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-xs text-indigo-200 flex items-start gap-2">
          <Shield className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong>Hendek Savunması:</strong> {current.moatDefense}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
