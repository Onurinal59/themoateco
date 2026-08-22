import React, { useState } from "react";
import {
  Swords,
  TrendingUp,
  Award,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  BarChart3,
  Copy,
  Check,
  ArrowRight,
  Zap,
  DollarSign,
  Layers,
  Sparkles
} from "lucide-react";
import { CompanyAuditDossier } from "../types";
import { calculateFinancialOutputs, computeMoatScore } from "../data/companyAuditData";

interface MoatDuelViewProps {
  dossiers: CompanyAuditDossier[];
  onOpenAuditStudio?: (dossierId: string) => void;
  onOpenAICoachWithPrompt?: (prompt: string) => void;
}

export const MoatDuelView: React.FC<MoatDuelViewProps> = ({
  dossiers,
  onOpenAuditStudio,
  onOpenAICoachWithPrompt,
}) => {
  // Select initial two dossiers
  const [comp1Id, setComp1Id] = useState<string>(dossiers[0]?.id || "");
  const [comp2Id, setComp2Id] = useState<string>(dossiers[1]?.id || dossiers[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const comp1 = dossiers.find((d) => d.id === comp1Id) || dossiers[0];
  const comp2 = dossiers.find((d) => d.id === comp2Id) || dossiers[1] || dossiers[0];

  if (!comp1 || !comp2) {
    return (
      <div className="p-8 text-center text-slate-500">
        Kıyaslama yapabilmek için en az 2 şirket dosyası gereklidir.
      </div>
    );
  }

  const fin1 = calculateFinancialOutputs(comp1.financials);
  const fin2 = calculateFinancialOutputs(comp2.financials);

  const score1 = computeMoatScore(comp1);
  const score2 = computeMoatScore(comp2);

  // DuPont decomposition
  const nopatMargin1 = fin1.nopatMarginPercent;
  const nopatMargin2 = fin2.nopatMarginPercent;

  const turnover1 = fin1.capitalTurnover;
  const turnover2 = fin2.capitalTurnover;

  const roic1 = fin1.roicPercent;
  const roic2 = fin2.roicPercent;

  const spread1 = fin1.spread;
  const spread2 = fin2.spread;

  // Winner logic
  const roicWinner = roic1 > roic2 ? 1 : roic1 < roic2 ? 2 : 0;
  const marginWinner = nopatMargin1 > nopatMargin2 ? 1 : nopatMargin1 < nopatMargin2 ? 2 : 0;
  const turnoverWinner = turnover1 > turnover2 ? 1 : turnover1 < turnover2 ? 2 : 0;
  const spreadWinner = spread1 > spread2 ? 1 : spread1 < spread2 ? 2 : 0;
  const overallWinner = score1.scorePercent > score2.scorePercent ? 1 : score1.scorePercent < score2.scorePercent ? 2 : 0;

  // Quick preset pairs
  const handleSelectPresetPair = (id1: string, id2: string) => {
    setComp1Id(id1);
    setComp2Id(id2);
  };

  const handleCopyComparison = () => {
    const summary = `⚔️ MAUBOUSSIN HENDEK DÜELLOSU RAPORU:
------------------------------------------
Şirket 1: ${comp1.companyName} (${comp1.ticker})
- ROIC: %${fin1.roicPercent} | WACC: %${comp1.financials.wacc} | Spread: %${fin1.spread}
- NOPAT Marjı: %${fin1.nopatMarginPercent} | Sermaye Devir Hızı: ${fin1.capitalTurnover}x
- Hendek Genişliği: ${score1.diagnosedMoat} (Skor: ${score1.scorePercent}/100)
- Tahmini CAP: ${comp1.sustainability.estimatedCapYears} Yıl

Şirket 2: ${comp2.companyName} (${comp2.ticker})
- ROIC: %${fin2.roicPercent} | WACC: %${comp2.financials.wacc} | Spread: %${fin2.spread}
- NOPAT Marjı: %${fin2.nopatMarginPercent} | Sermaye Devir Hızı: ${fin2.capitalTurnover}x
- Hendek Genişliği: ${score2.diagnosedMoat} (Skor: ${score2.scorePercent}/100)
- Tahmini CAP: ${comp2.sustainability.estimatedCapYears} Yıl

🏆 KAZANAN / METODOLOJİK TEŞHİS:
${
  overallWinner === 1
    ? `${comp1.companyName}, ${score1.scorePercent} hendek skoru ve %${spread1} ekonomik yayılımı ile düellonun galibidir.`
    : overallWinner === 2
    ? `${comp2.companyName}, ${score2.scorePercent} hendek skoru ve %${spread2} ekonomik yayılımı ile düellonun galibidir.`
    : "Her iki şirketin hendek skorları birbirine çok yakındır."
}
${
  marginWinner === 1 && turnoverWinner === 2
    ? `📌 ${comp1.companyName} Yüksek Fiyatlama/Marj avantajıyla, ${comp2.companyName} ise Yıldırım Hızında Sermaye Devri ile değer yaratmaktadır (Klasik DuPont Karşıtlığı).`
    : marginWinner === 2 && turnoverWinner === 1
    ? `📌 ${comp2.companyName} Yüksek Fiyatlama/Marj avantajıyla, ${comp1.companyName} ise Yıldırım Hızında Sermaye Devri ile değer yaratmaktadır.`
    : ""
}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16" id="moat-duel-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center gap-1.5">
              <Swords className="w-3.5 h-3.5 text-amber-400" />
              Michael Mauboussin Hendek Düellosu
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Göreli Rekabet Analizi (Relative Advantage)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            İki Şirketin Ekonomik Hendeklerini Yan Yana Çarpıştırın
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-3xl leading-relaxed">
            Mauboussin'e göre ekonomik hendek mutlak bir sayı değil, rakiplere karşı sağlanan <strong>göreli üstünlüktür</strong>. İki şirketin DuPont ayrıştırmasını, fiyatlama gücünü, sermaye devir hızını ve CAP ömrünü kafa kafaya test edin.
          </p>

          {/* Quick preset matchup tags */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Hızlı Karşılaştırma Önerileri:</span>
            {dossiers.length >= 2 && (
              <>
                <button
                  onClick={() => handleSelectPresetPair(dossiers[0].id, dossiers[1]?.id || dossiers[0].id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-indigo-200 border border-slate-700 text-[11px] cursor-pointer transition-colors"
                >
                  🛒 {dossiers[0]?.ticker} vs {dossiers[1]?.ticker}
                </button>
                {dossiers[2] && (
                  <button
                    onClick={() => handleSelectPresetPair(dossiers[0].id, dossiers[2].id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-indigo-200 border border-slate-700 text-[11px] cursor-pointer transition-colors"
                  >
                    🍎 {dossiers[0]?.ticker} vs {dossiers[2]?.ticker}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Company 1 Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[11px] font-extrabold">1</span>
            Sol Köşe: 1. Şirket
          </label>
          <select
            value={comp1Id}
            onChange={(e) => setComp1Id(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {dossiers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.companyName} ({d.ticker}) — {d.industry}
              </option>
            ))}
          </select>
        </div>

        {/* Company 2 Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center text-[11px] font-extrabold">2</span>
            Sağ Köşe: 2. Şirket
          </label>
          <select
            value={comp2Id}
            onChange={(e) => setComp2Id(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
          >
            {dossiers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.companyName} ({d.ticker}) — {d.industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Duel Head-to-Head Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company 1 Card */}
        <div className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-xs space-y-6 relative transition-all ${
          overallWinner === 1 ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-200 dark:border-slate-800"
        }`}>
          {overallWinner === 1 && (
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-300" /> Düello Galibi
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                {comp1.ticker}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {comp1.companyName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {comp1.industry}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {score1.scorePercent}
                <span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                {score1.diagnosedMoat}
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                ROIC
              </span>
              <span className={`text-lg font-black ${fin1.roicPercent >= 15 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-200"}`}>
                %{fin1.roicPercent}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                Değer Yayılımı (Spread)
              </span>
              <span className={`text-lg font-black ${fin1.spread > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {fin1.spread > 0 ? `+%{${fin1.spread}}` : `%{${fin1.spread}}`}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                NOPAT Kâr Marjı
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                %{fin1.nopatMarginPercent}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                Sermaye Devir Hızı
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                {fin1.capitalTurnover}x
              </span>
            </div>
          </div>

          {/* Moat Subdrivers Tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Hendek Motorları:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {comp1.competitiveAdvantage.subDrivers.map((driver, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold border border-indigo-200 dark:border-indigo-800">
                  {driver}
                </span>
              ))}
            </div>
          </div>

          {/* Estimated CAP */}
          <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Tahmini Hendek Ömrü (CAP):</span>
            <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
              {comp1.sustainability.estimatedCapYears} Yıl
            </span>
          </div>
        </div>

        {/* Company 2 Card */}
        <div className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-xs space-y-6 relative transition-all ${
          overallWinner === 2 ? "border-rose-500 ring-2 ring-rose-500/20" : "border-slate-200 dark:border-slate-800"
        }`}>
          {overallWinner === 2 && (
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-300" /> Düello Galibi
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">
                {comp2.ticker}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {comp2.companyName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {comp2.industry}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
                {score2.scorePercent}
                <span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                {score2.diagnosedMoat}
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                ROIC
              </span>
              <span className={`text-lg font-black ${fin2.roicPercent >= 15 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-200"}`}>
                %{fin2.roicPercent}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                Değer Yayılımı (Spread)
              </span>
              <span className={`text-lg font-black ${fin2.spread > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {fin2.spread > 0 ? `+%{${fin2.spread}}` : `%{${fin2.spread}}`}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                NOPAT Kâr Marjı
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                %{fin2.nopatMarginPercent}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase block">
                Sermaye Devir Hızı
              </span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                {fin2.capitalTurnover}x
              </span>
            </div>
          </div>

          {/* Moat Subdrivers Tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Hendek Motorları:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {comp2.competitiveAdvantage.subDrivers.map((driver, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[11px] font-semibold border border-rose-200 dark:border-rose-800">
                  {driver}
                </span>
              ))}
            </div>
          </div>

          {/* Estimated CAP */}
          <div className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Tahmini Hendek Ömrü (CAP):</span>
            <span className="font-extrabold text-rose-700 dark:text-rose-300">
              {comp2.sustainability.estimatedCapYears} Yıl
            </span>
          </div>
        </div>
      </div>

      {/* Granular Metric-by-Metric Comparison Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Kritik Metriklerin Kafa Kafaya Karşılaştırması
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-4 font-bold">Stratejik Metrik</th>
                <th className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">{comp1.ticker}</th>
                <th className="py-3 px-4 font-bold text-rose-600 dark:text-rose-400">{comp2.ticker}</th>
                <th className="py-3 px-4 font-bold">Üstün Taraf & Pedagojik Yorum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {/* ROIC */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">ROIC (Yatırılan Sermaye Getirisi)</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">%{fin1.roicPercent}</td>
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-300">%{fin2.roicPercent}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {roicWinner === 1 ? (
                    <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {comp1.ticker} sermayesini daha verimli çalıştırıyor
                    </span>
                  ) : roicWinner === 2 ? (
                    <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {comp2.ticker} sermayesini daha verimli çalıştırıyor
                    </span>
                  ) : "Eşit"}
                </td>
              </tr>

              {/* Spread */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Ekonomik Yayılım (ROIC - WACC)</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">%{fin1.spread}</td>
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-300">%{fin2.spread}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {spreadWinner === 1 ? `${comp1.ticker} hissedarına daha yüksek net katma değer bırakıyor` : `${comp2.ticker} hissedarına daha yüksek net katma değer bırakıyor`}
                </td>
              </tr>

              {/* NOPAT Margin */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">NOPAT Marjı (Fiyatlama Gücü / WTP)</td>
                <td className="py-3 px-4 text-indigo-700 dark:text-indigo-300 font-bold">%{fin1.nopatMarginPercent}</td>
                <td className="py-3 px-4 text-rose-700 dark:text-rose-300 font-bold">%{fin2.nopatMarginPercent}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {marginWinner === 1
                    ? `${comp1.ticker} ürününü daha yüksek primle satabiliyor veya birim maliyeti düşük`
                    : `${comp2.ticker} ürününü daha yüksek primle satabiliyor veya birim maliyeti düşük`}
                </td>
              </tr>

              {/* Turnover */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Sermaye Devir Hızı (Hız & Verimlilik)</td>
                <td className="py-3 px-4 text-indigo-700 dark:text-indigo-300 font-bold">{fin1.capitalTurnover}x</td>
                <td className="py-3 px-4 text-rose-700 dark:text-rose-300 font-bold">{fin2.capitalTurnover}x</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {turnoverWinner === 1
                    ? `${comp1.ticker} az sermaye ile çok yüksek ciro çeviriyor`
                    : `${comp2.ticker} az sermaye ile çok yüksek ciro çeviriyor`}
                </td>
              </tr>

              {/* Moat Width */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Teşhis Edilen Hendek Genişliği</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">{score1.diagnosedMoat}</td>
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-300">{score2.diagnosedMoat}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  Mauboussin 5 adımlı nitel ve nicel hendek puanı
                </td>
              </tr>

              {/* CAP */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Rekabetçi Avantaj Dönemi (CAP)</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300">{comp1.sustainability.estimatedCapYears} Yıl</td>
                <td className="py-3 px-4 font-bold text-rose-700 dark:text-rose-300">{comp2.sustainability.estimatedCapYears} Yıl</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  Rakiplerin kârlılığı eritene kadar geçmesi beklenen koruma süresi
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Synthesis & Action Bar */}
      <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Mauboussin Stratejik Düello Özeti
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {marginWinner !== turnoverWinner && marginWinner !== 0 && turnoverWinner !== 0 ? (
              <span>
                Bu düello tam bir <strong>DuPont karşıtlığı</strong> örneğidir! Şirketlerden biri yüksek fiyatlama/marj stratejisiyle, diğeri ise hızlı sermaye dönüşüyle değer yaratmaktadır.
              </span>
            ) : (
              <span>
                Düello sonuçları iki şirketin rekabetçi güçlerinin sermaye piyasalarında nasıl farklılaşacağını açıkça ortaya koymaktadır.
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={handleCopyComparison}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-500" />}
            <span>{copied ? "Kopyalandı!" : "Düello Raporunu Kopyala"}</span>
          </button>

          {onOpenAICoachWithPrompt && (
            <button
              onClick={() =>
                onOpenAICoachWithPrompt(
                  `${comp1.companyName} (${comp1.ticker}) ile ${comp2.companyName} (${comp2.ticker}) arasındaki Mauboussin hendek farkını DuPont ve WTP/WTS modelleriyle kıyaslayıp açıklar mısın?`
                )
              }
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Koç'a Kıyaslat</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
