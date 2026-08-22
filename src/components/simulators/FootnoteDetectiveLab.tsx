import React, { useState } from "react";
import {
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Percent,
  Layers,
  HelpCircle,
  Sparkles,
  Calculator,
  RotateCcw,
  BookOpen,
  DollarSign,
  ShieldCheck,
  Eye,
  Award
} from "lucide-react";

export interface DetectiveFinancialItem {
  id: string;
  name: string;
  category: "income_statement" | "balance_sheet_asset" | "balance_sheet_liability" | "footnote_item";
  reportedValue: number;
  economicValueAdjusted: number;
  hasFootnote: boolean;
  footnoteNumber?: number;
  footnoteTitle?: string;
  footnoteText?: string;
  auditAdjustmentNote: string;
  adjustmentType: "nopat_addback" | "invested_capital_add" | "invested_capital_subtract" | "wacc_weight_shift" | "none";
  adjustmentImpactExplanation: string;
}

export interface DetectiveCase {
  id: string;
  companyName: string;
  ticker: string;
  industry: string;
  scenarioDescription: string;
  currency: string;
  reportedTaxRate: number;
  
  // Reported raw numbers
  reportedRevenue: number;
  reportedOperatingCost: number; // excluding special
  reportedEbit: number;
  reportedTotalAssets: number;
  reportedCashAndEquivalents: number;
  reportedNonOperatingCash: number; // Atıl nakit
  reportedCurrentLiabilities: number; // Non-interest bearing (Ticari borçlar vb.)
  reportedInterestBearingDebt: number;
  reportedShareholdersEquity: number;
  
  // WACC components
  costOfEquity: number; // % (Ke)
  costOfDebtPreTax: number; // % (Kd)
  
  // Footnotes and detailed balance sheet lines
  lineItems: DetectiveFinancialItem[];

  // Student guidance questions
  discoveryQuestions: {
    question: string;
    targetItemId: string;
    hint: string;
    whyItMatters: string;
  }[];

  // Pedagogical Summary
  takeaway: string;
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: "tech-cloud-rnd",
    companyName: "Nexus Cloud & AI Systems A.Ş.",
    ticker: "NXAI",
    industry: "Yazılım, Bulut & Yapay Zeka",
    currency: "Milyon $",
    scenarioDescription: "Yüksek Ar-Ge harcaması yapan ve bilançosunda devasa hazine bonosu/nakit tutan küresel bir SaaS devi. Standart muhasebede Ar-Ge gider yazıldığı ve atıl nakit varlıklarda tutulduğu için ROIC yanıltıcı görünmektedir.",
    reportedTaxRate: 0.20,
    reportedRevenue: 24000,
    reportedOperatingCost: 16000,
    reportedEbit: 4500, // Ar-Ge 3.500 düştükten sonra
    reportedTotalAssets: 48000,
    reportedCashAndEquivalents: 22000,
    reportedNonOperatingCash: 19000, // 19 Milyar $ atıl devlet tahvili
    reportedCurrentLiabilities: 6000, // Ticari borçlar & ertelenmiş gelirler (faizsiz)
    reportedInterestBearingDebt: 8000,
    reportedShareholdersEquity: 34000,
    costOfEquity: 10.5,
    costOfDebtPreTax: 5.5,
    takeaway: "Ar-Ge harcamalarını aktifleştirip faydalı ömrüne (3-5 yıl) itfa etmek ve operasyon dışı atıl nakdi bilançodan ayıklamak, şirketin gerçek ekonomik NOPAT ve Yatırılan Sermaye (Invested Capital) gücünü açığa çıkarır.",
    lineItems: [
      {
        id: "rnd-expense",
        name: "Yıllık Ar-Ge Harcaması (Gelir Tablosu Gideri)",
        category: "income_statement",
        reportedValue: 3500,
        economicValueAdjusted: 1100, // Amortisman payı (Cari Ar-Ge kâra iade edilir, 2400 net NOPAT artışı)
        hasFootnote: true,
        footnoteNumber: 14,
        footnoteTitle: "Araştırma ve Geliştirme Politikası & Yazılım Varlıkları",
        footnoteText: "Şirket cari yılda 3.500 Milyon $ Ar-Ge harcaması yapmış olup US GAAP/UFRS uyarınca tamamını faaliyet gideri kaydetmiştir. Geliştirilen büyük dil modelleri ve bulut algoritmalarının tahmini ekonomik ömrü 4 yıldır. Geçmiş 4 yılın itfa amortismanı 2.400 Milyon $'dır.",
        auditAdjustmentNote: "3.500 M$ gider kâra geri eklenir, 2.400 M$ ekonomik itfa düşülür -> Net EBIT Düzeltmesi: +1.100 M$. Kalan 7.200 M$ birikmiş Ar-Ge varlığı bilançoya (Invested Capital) eklenir.",
        adjustmentType: "nopat_addback",
        adjustmentImpactExplanation: "EBIT'i +1.100 M$, NOPAT'ı +880 M$ artırır. Bilançoya +7.200 M$ sermaye varlığı ekler.",
      },
      {
        id: "excess-cash-item",
        name: "Hazine Bonoları ve Vadeli Mevduatlar (Atıl Nakit)",
        category: "balance_sheet_asset",
        reportedValue: 22000,
        economicValueAdjusted: 3000, // Sadece 3.000 operasyonel
        hasFootnote: true,
        footnoteNumber: 4,
        footnoteTitle: "Nakit ve Finansal Varlıkların Operasyonel Ayrımı",
        footnoteText: "Toplam 22.000 Milyon $'lık likit varlığın yalnızca 3.000 Milyon $'ı maaş ve günlük operasyon işletme sermayesi için elzemdir. 19.000 Milyon $'lık bakiye ABD Hazine Bonolarında faiz geliri amaçlı park edilmiştir.",
        auditAdjustmentNote: "19.000 M$'lık atıl bono yatırılan sermayeden (Invested Capital) çıkarılmalıdır. Çünkü ana faaliyet kârı fabrikalar, sunucular ve mühendislerle üretilir, hazine bonosu faizi ana faaliyet kârına (NOPAT) dahil değildir.",
        adjustmentType: "invested_capital_subtract",
        adjustmentImpactExplanation: "Invested Capital'i 19.000 M$ düşürerek paydadaki yapay şişkinliği yok eder.",
      },
      {
        id: "sbc-item",
        name: "Hisse Bazlı Personel Ödemeleri (Stock-Based Comp - SBC)",
        category: "income_statement",
        reportedValue: 1200,
        economicValueAdjusted: 1200,
        hasFootnote: true,
        footnoteNumber: 18,
        footnoteTitle: "Hisse Opsiyonları ve Yönetici Primleri",
        footnoteText: "Şirket mühendislere ve üst yönetime 1.200 Milyon $ değerinde kısıtlı hisse senedi (RSU) dağıtmıştır. Bazı analistler bunu 'nakitsiz gider' diyerek NOPAT'a ekleme hatasına düşmektedir.",
        auditAdjustmentNote: "DİKKAT TUZAĞI: Mauboussin uyarır: SBC nakitsiz olsa da hissedarlar için gerçek bir seyreltme maliyetidir (Gerçek Ücret Gideridir). NOPAT'a GERİ EKLENMEMELİDİR!",
        adjustmentType: "none",
        adjustmentImpactExplanation: "Düzeltme yapılmaz; NOPAT'ı yapay şişirmemek için gerçek faaliyet gideri sayılır.",
      },
    ],
    discoveryQuestions: [
      {
        question: "Ar-Ge harcamaları kârdan hemen düşülünce ve sermayeye yazılmayınca ROIC neden bozulur?",
        targetItemId: "rnd-expense",
        hint: "Dipnot 14'e bakın: Yazılım algoritması 4 yıl boyunca gelir üretecek bir 'Varlık'tır (Asset).",
        whyItMatters: "Yazılım şirketleri gençken Ar-Ge nedeniyle kârsız, olgunlaşınca ise sermayesiz görünüp yapay %100+ ROIC üretir.",
      },
      {
        question: "Şirketin kasasındaki 19 Milyar $'lık Hazine Bonosu ana faaliyet sermayesine dahil edilmeli midir?",
        targetItemId: "excess-cash-item",
        hint: "Dipnot 4'e bakın: Faiz geliri EBIT'e dahil değildir; dolayısıyla bonolar da Yatırılan Sermaye'de olmamalıdır.",
        whyItMatters: "Atıl nakit düşülmezse şirketin çekirdek işinin ne kadar yüksek sermaye getirisi ürettiği gizlenir.",
      },
    ]
  },
  {
    id: "retail-leases-capitalization",
    companyName: "Atlas İndirim Marketleri & Mağazacılık A.Ş.",
    ticker: "ATLS",
    industry: "Organize Perakende & Süpermarket",
    currency: "Milyon TL",
    scenarioDescription: "12.000 mağazasının tamamını kiralayan ulusal bir perakende devi. Mağaza satın almak yerine kiraladığı için geleneksel bilançoda yatırılan sermayesi çok küçük, ROIC oranı ise yapay olarak astronomik görünmektedir.",
    reportedTaxRate: 0.22,
    reportedRevenue: 95000,
    reportedOperatingCost: 89000,
    reportedEbit: 4800,
    reportedTotalAssets: 32000,
    reportedCashAndEquivalents: 4500,
    reportedNonOperatingCash: 2000,
    reportedCurrentLiabilities: 21000, // Tedarikçi ticari borçları (Negatif işletme sermayesi)
    reportedInterestBearingDebt: 2500, // Banka kredisi çok az görünüyor!
    reportedShareholdersEquity: 8500,
    costOfEquity: 18.0,
    costOfDebtPreTax: 24.0,
    takeaway: "Mağaza kiralayan perakendecide kira taahhütlerini iskonto edip sermayeye ve borca eklemek (Kullanım Hakkı Varlığı), şirketin gerçek borçluluğunu, WACC ağırlığını ve sermaye yoğunluğunu ortaya koyar.",
    lineItems: [
      {
        id: "operating-leases-item",
        name: "Mağaza Faaliyet Kiralamaları Taahhütleri (Gelecek 5 Yıl)",
        category: "footnote_item",
        reportedValue: 0, // Tarihsel US GAAP / Eski bilançolarda 0 borç
        economicValueAdjusted: 16500, // İndirgenmiş bugünkü değer
        hasFootnote: true,
        footnoteNumber: 21,
        footnoteTitle: "Uzun Vadeli Kira Sözleşmeleri & İptal Edilemez Taahhütler",
        footnoteText: "Şirketin 12.000 mağazası için gelecek 7 yıllık asgari iptal edilemez kira yükümlülüklerinin toplamı 25.000 Milyon TL'dir. İskonto oranı %16 ile bugünkü indirgenmiş değeri 16.500 Milyon TL'dir. Cari yıl kira gideri içindeki zımni faiz payı 1.200 Milyon TL'dir.",
        auditAdjustmentNote: "16.500 Milyon TL 'Kullanım Hakkı Varlığı' olarak Yatırılan Sermaye'ye ve 'Kira Borcu' olarak Borç hanesine eklenir. Kira içindeki 1.200 M TL faiz EBIT'e geri eklenir.",
        adjustmentType: "invested_capital_add",
        adjustmentImpactExplanation: "EBIT'i +1.200 M TL (NOPAT'ı +936 M TL), Yatırılan Sermayeyi ise +16.500 M TL artırır.",
      },
      {
        id: "working-capital-item",
        name: "Negatif İşletme Sermayesi (Tedarikçi Finansmanı)",
        category: "balance_sheet_liability",
        reportedValue: 21000,
        economicValueAdjusted: 21000,
        hasFootnote: true,
        footnoteNumber: 8,
        footnoteTitle: "Ticari Borçlar ve Tedarikçi Vade Süreleri",
        footnoteText: "Şirket sattığı sütü ve bisküviyi müşteriden anında nakit/kartla (0 gün) tahsil ederken, üreticiye ödemeyi ortalama 75 günde yapmaktadır. Bu durum 8.000 Milyon TL negatif işletme sermayesi fonlaması yaratır.",
        auditAdjustmentNote: "Faizsiz ticari borçlar Yatırılan Sermaye'den düşülür. Bu perakendecinin müşterilerden ve tedarikçilerden bedava fon sağladığını kanıtlar.",
        adjustmentType: "none",
        adjustmentImpactExplanation: "Yatırılan Sermaye formülünde (Dönen Varlıklar - Nakit - Kısa Vadeli Faizsiz Borçlar) yer alır.",
      },
    ],
    discoveryQuestions: [
      {
        question: "Perakendeci mağazayı satın almak yerine 10 yıllığına kiralayınca neden bilançoda 'Borç' ve 'Varlık' gizlenmiş olur?",
        targetItemId: "operating-leases-item",
        hint: "Dipnot 21'e bakın: 16.500 Milyon TL'lik kira sözleşmesi banka kredisinden farksız bir borç taahhüdüdür.",
        whyItMatters: "Kira borcu eklenmezse şirketin WACC'ı yanlış hesaplanır ve ROIC %60 gibi yanıltıcı yüksek çıkar.",
      },
    ]
  },
  {
    id: "industrial-restructuring-pension",
    companyName: "Demir Çelik & Ağır Makine Sanayi A.Ş.",
    ticker: "DMRÇ",
    industry: "Ağır Sanayi & Metalurji",
    currency: "Milyon TL",
    scenarioDescription: "Geçtiğimiz yıl tek seferlik fabrika kapatma tazminatı ödeyen ve bilançosunda devasa fonlanmamış kıdem tazminatı yükümlülüğü olan döngüsel sanayi devi.",
    reportedTaxRate: 0.20,
    reportedRevenue: 38000,
    reportedOperatingCost: 34500,
    reportedEbit: 1500, // 1.200 M TL tek seferlik ceza/zarar düşülmüş hali!
    reportedTotalAssets: 42000,
    reportedCashAndEquivalents: 3000,
    reportedNonOperatingCash: 1200,
    reportedCurrentLiabilities: 7000,
    reportedInterestBearingDebt: 12000,
    reportedShareholdersEquity: 23000,
    costOfEquity: 16.0,
    costOfDebtPreTax: 20.0,
    takeaway: "Tek seferlik kazaları/cezaları NOPAT'a geri eklemek (Normalizasyon) ve fonlanmamış kıdem tazminatlarını borç benzeri yükümlülük saymak sürdürülebilir kazanç gücünü netleştirir.",
    lineItems: [
      {
        id: "one-off-restructuring",
        name: "Tek Seferlik Fabrika Kapatma ve Çevre Cezası",
        category: "income_statement",
        reportedValue: 1200,
        economicValueAdjusted: 0, // Gelecekte tekrarlanmayacak
        hasFootnote: true,
        footnoteNumber: 29,
        footnoteTitle: "Olağandışı Giderler ve Fabrika Dönüşüm Karşılığı",
        footnoteText: "Eski yüksek fırının kapatılması ve çevre rehabilitasyon cezaları nedeniyle cari dönemde 1.200 Milyon TL tek seferlik karşılık ayrılmış ve faaliyet kârından düşülmüştür.",
        auditAdjustmentNote: "Tek seferlik 1.200 M TL gider EBIT'e geri eklenir. Böylece şirketin normalleştirilmiş kalıcı faaliyet kârı ortaya çıkar.",
        adjustmentType: "nopat_addback",
        adjustmentImpactExplanation: "EBIT'i +1.200 M TL, NOPAT'ı +960 M TL artırarak normalleştirir.",
      },
      {
        id: "pension-deficit",
        name: "Fonlanmamış Kıdem Tazminatı & Emeklilik Yükümlülüğü",
        category: "balance_sheet_liability",
        reportedValue: 2800,
        economicValueAdjusted: 2800,
        hasFootnote: true,
        footnoteNumber: 16,
        footnoteTitle: "Çalışanlara Sağlanan Faydalar ve Aktüeryal Açık",
        footnoteText: "Şirketin 8.500 kıdemli personeli için aktüeryal hesaplanan kıdem tazminatı karşılığı 2.800 Milyon TL'dir. Bu borç için herhangi bir bloke fon ayrılmamıştır.",
        auditAdjustmentNote: "Fonlanmamış kıdem tazminatları borç benzeri (Debt-Equivalent) bir finansal yükümlülüktür ve WACC hesaplanırken borç tarafına dahil edilmelidir.",
        adjustmentType: "wacc_weight_shift",
        adjustmentImpactExplanation: "WACC hesaplamasında borç ağırlığını artırır ve hisse değerlemesinde borç olarak düşülür.",
      }
    ],
    discoveryQuestions: [
      {
        question: "1.200 Milyon TL'lik tek seferlik çevre cezası gelecek yılların hendek kârlılığı tahmininde neden dışarıda bırakılmalıdır?",
        targetItemId: "one-off-restructuring",
        hint: "Dipnot 29'a bakın: Şirket bu fırını kapattı ve ceza bir daha ödenmeyecek.",
        whyItMatters: "Normalizasyon yapılmazsa şirketin gelecekteki kâr potansiyeli çok düşük tahmin edilir.",
      }
    ]
  }
];

export const FootnoteDetectiveLab: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>(DETECTIVE_CASES[0].id);
  const [selectedFootnoteId, setSelectedFootnoteId] = useState<string | null>(null);
  const [appliedAdjustments, setAppliedAdjustments] = useState<Record<string, boolean>>({});
  const [userRoicGuess, setUserRoicGuess] = useState<string>("");
  const [userWaccGuess, setUserWaccGuess] = useState<string>("");
  const [guessChecked, setGuessChecked] = useState<boolean>(false);
  const [activeViewTab, setActiveViewTab] = useState<"balance-sheet" | "income-statement" | "wacc-calc" | "quiz-detective">("balance-sheet");

  const currentCase = DETECTIVE_CASES.find((c) => c.id === activeCaseId) || DETECTIVE_CASES[0];

  // Helper toggle for an adjustment
  const handleToggleAdjustment = (itemId: string) => {
    setAppliedAdjustments((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
    setGuessChecked(false);
  };

  // Calculate Raw Accounting Values
  const rawRevenue = currentCase.reportedRevenue;
  const rawEbit = currentCase.reportedEbit;
  const rawTaxRate = currentCase.reportedTaxRate;
  const rawNopat = rawEbit * (1 - rawTaxRate);
  
  // Raw Invested Capital = Total Assets - Non-interest Current Liabilities
  // (Traditional standard formula before corrections)
  const rawInvestedCapital = currentCase.reportedTotalAssets - currentCase.reportedCurrentLiabilities;
  const rawRoic = rawInvestedCapital > 0 ? (rawNopat / rawInvestedCapital) * 100 : 0;

  // Raw WACC Calculation
  const totalRawCapital = currentCase.reportedInterestBearingDebt + currentCase.reportedShareholdersEquity;
  const weightDebtRaw = totalRawCapital > 0 ? currentCase.reportedInterestBearingDebt / totalRawCapital : 0.3;
  const weightEquityRaw = totalRawCapital > 0 ? currentCase.reportedShareholdersEquity / totalRawCapital : 0.7;
  const costOfDebtAfterTaxRaw = currentCase.costOfDebtPreTax * (1 - rawTaxRate);
  const rawWacc = (weightEquityRaw * currentCase.costOfEquity) + (weightDebtRaw * costOfDebtAfterTaxRaw);

  // Calculate Adjusted Economic Values based on applied toggles
  let deltaEbit = 0;
  let deltaNopat = 0;
  let deltaInvestedCapital = 0;
  let extraDebtForWacc = 0;

  currentCase.lineItems.forEach((item) => {
    const isApplied = Boolean(appliedAdjustments[item.id]);
    if (isApplied) {
      if (item.id === "rnd-expense") {
        deltaEbit += 1100;
        deltaNopat += 880;
        deltaInvestedCapital += 7200; // Net capitalized R&D asset
      } else if (item.id === "excess-cash-item") {
        deltaInvestedCapital -= currentCase.reportedNonOperatingCash;
      } else if (item.id === "operating-leases-item") {
        deltaEbit += 1200; // Interest portion of lease
        deltaNopat += 936;
        deltaInvestedCapital += 16500; // Right-of-use asset
        extraDebtForWacc += 16500;
      } else if (item.id === "one-off-restructuring") {
        deltaEbit += 1200;
        deltaNopat += 960;
      } else if (item.id === "pension-deficit") {
        extraDebtForWacc += 2800;
      }
    }
  });

  const adjEbit = rawEbit + deltaEbit;
  const adjNopat = rawNopat + deltaNopat;
  const adjInvestedCapital = Math.max(100, rawInvestedCapital + deltaInvestedCapital);
  const adjRoic = (adjNopat / adjInvestedCapital) * 100;

  // Adjusted WACC
  const totalAdjDebt = currentCase.reportedInterestBearingDebt + extraDebtForWacc;
  const totalAdjCapital = totalAdjDebt + currentCase.reportedShareholdersEquity;
  const weightDebtAdj = totalAdjCapital > 0 ? totalAdjDebt / totalAdjCapital : weightDebtRaw;
  const weightEquityAdj = totalAdjCapital > 0 ? currentCase.reportedShareholdersEquity / totalAdjCapital : weightEquityRaw;
  const adjWacc = (weightEquityAdj * currentCase.costOfEquity) + (weightDebtAdj * costOfDebtAfterTaxRaw);

  // Spread (ROIC - WACC)
  const rawSpread = rawRoic - rawWacc;
  const adjSpread = adjRoic - adjWacc;

  const activeFootnote = currentCase.lineItems.find((item) => item.id === selectedFootnoteId);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs animate-in fade-in duration-200" id="footnote-detective-lab">
      {/* Header & Case Selector */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              10-K & KAP Dipnot Dedektifi
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Uygulamalı Bilanço ve Gelir Tablosu Çözümlemesi
            </span>
          </div>

          {/* Quick Case Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs text-slate-400 font-semibold shrink-0">Vaka Seçin:</span>
            {DETECTIVE_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseId(c.id);
                  setSelectedFootnoteId(null);
                  setGuessChecked(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCaseId === c.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                {c.ticker} ({c.industry.split(",")[0]})
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>{currentCase.companyName} ({currentCase.ticker})</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {currentCase.currency}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {currentCase.scenarioDescription}
          </p>
        </div>
      </div>

      {/* Primary KPI Spread Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md">
        {/* Metric 1: NOPAT */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Net Faaliyet Kârı (NOPAT)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-white">
              {Math.round(adjNopat).toLocaleString()} {currentCase.currency}
            </span>
            {deltaNopat !== 0 && (
              <span className="text-xs font-bold text-emerald-400">
                +{Math.round(deltaNopat).toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 block">Ham Muhasebe: {Math.round(rawNopat).toLocaleString()}</span>
        </div>

        {/* Metric 2: Invested Capital */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Yatırılan Sermaye (IC)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-white">
              {Math.round(adjInvestedCapital).toLocaleString()} {currentCase.currency}
            </span>
            {deltaInvestedCapital !== 0 && (
              <span className={`text-xs font-bold ${deltaInvestedCapital < 0 ? "text-emerald-400" : "text-amber-400"}`}>
                {deltaInvestedCapital > 0 ? `+${deltaInvestedCapital.toLocaleString()}` : `${deltaInvestedCapital.toLocaleString()}`}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 block">Ham Bilanço: {Math.round(rawInvestedCapital).toLocaleString()}</span>
        </div>

        {/* Metric 3: ROIC & WACC */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Düzeltilmiş ROIC vs WACC</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-300">
              %{adjRoic.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">
              / WACC %{adjWacc.toFixed(1)}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">Ham ROIC: %{rawRoic.toFixed(1)}</span>
        </div>

        {/* Metric 4: Economic Moat Spread */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Hendek Yayılımı (ROIC - WACC)</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${adjSpread >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {adjSpread >= 0 ? `+%{${adjSpread.toFixed(1)}}` : `%{${adjSpread.toFixed(1)}}`}
            </span>
            <span className="text-[11px] text-slate-400">
              {adjSpread > 5 ? "Geniş Hendek" : adjSpread > 0 ? "Dar Hendek" : "Değer Yıkımı"}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">Ham Yayılım: %{rawSpread.toFixed(1)}</span>
        </div>
      </div>

      {/* Sub-view Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveViewTab("balance-sheet")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === "balance-sheet"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Bilanço & Yatırılan Sermaye Analizi
        </button>

        <button
          onClick={() => setActiveViewTab("income-statement")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === "income-statement"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Gelir Tablosu & NOPAT Düzeltmesi
        </button>

        <button
          onClick={() => setActiveViewTab("wacc-calc")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === "wacc-calc"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Percent className="w-3.5 h-3.5" />
          WACC Sermaye Maliyeti Röntgeni
        </button>

        <button
          onClick={() => setActiveViewTab("quiz-detective")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === "quiz-detective"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100"
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          Kendini Test Et (ROIC / WACC Tahmini)
        </button>
      </div>

      {/* TAB 1: Bilanço & Yatırılan Sermaye (Invested Capital) */}
      {activeViewTab === "balance-sheet" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Balance Sheet Table */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Ekonomik Bilanço Kalemleri (10-K Raporu)
              </h3>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                Dipnot ikonuna tıklayarak inceleyin 🔍
              </span>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Bilanço Kalemi</th>
                    <th className="p-3 text-right">Raporlanan</th>
                    <th className="p-3 text-center">Dipnot</th>
                    <th className="p-3 text-right">Düzeltme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {/* Total Assets */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                    <td className="p-3 font-bold">Toplam Varlıklar (Total Assets)</td>
                    <td className="p-3 text-right font-mono font-bold">{currentCase.reportedTotalAssets.toLocaleString()}</td>
                    <td className="p-3 text-center">-</td>
                    <td className="p-3 text-right text-slate-400">Ham Taban</td>
                  </tr>

                  {/* Excess Cash */}
                  <tr className={appliedAdjustments["excess-cash-item"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                    <td className="p-3 pl-6 flex items-center gap-1.5">
                      <span>↳ Nakit ve Vadeli Hazine Bonoları</span>
                    </td>
                    <td className="p-3 text-right font-mono">{currentCase.reportedCashAndEquivalents.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedFootnoteId("excess-cash-item")}
                        className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px] hover:scale-105 transition-transform cursor-pointer"
                      >
                        Dipnot 4
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      {currentCase.reportedNonOperatingCash > 0 && (
                        <button
                          onClick={() => handleToggleAdjustment("excess-cash-item")}
                          className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                            appliedAdjustments["excess-cash-item"]
                              ? "bg-emerald-600 text-white"
                              : "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                          }`}
                        >
                          {appliedAdjustments["excess-cash-item"] ? "✓ Düşüldü (-19.000)" : "Atıl Nakdi Çıkar"}
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Leases Capitalization */}
                  {currentCase.id === "retail-leases-capitalization" && (
                    <tr className={appliedAdjustments["operating-leases-item"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 font-semibold text-indigo-700 dark:text-indigo-300">
                        ↳ Kullanım Hakkı Varlığı (Mağaza Kiraları)
                      </td>
                      <td className="p-3 text-right font-mono text-slate-400">0 (Eski US GAAP)</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedFootnoteId("operating-leases-item")}
                          className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px] hover:scale-105 transition-transform cursor-pointer"
                        >
                          Dipnot 21
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleToggleAdjustment("operating-leases-item")}
                          className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                            appliedAdjustments["operating-leases-item"]
                              ? "bg-emerald-600 text-white"
                              : "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                          }`}
                        >
                          {appliedAdjustments["operating-leases-item"] ? "✓ Eklendi (+16.500)" : "Kirayı Aktifleştir"}
                        </button>
                      </td>
                    </tr>
                  )}

                  {/* Capitalized R&D */}
                  {currentCase.id === "tech-cloud-rnd" && (
                    <tr className={appliedAdjustments["rnd-expense"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 font-semibold text-indigo-700 dark:text-indigo-300">
                        ↳ Birikmiş Ar-Ge Yazılım Varlığı (Capitalized R&D)
                      </td>
                      <td className="p-3 text-right font-mono text-slate-400">0 (Gider Yazıldı)</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedFootnoteId("rnd-expense")}
                          className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold text-[10px] hover:scale-105 transition-transform cursor-pointer"
                        >
                          Dipnot 14
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleToggleAdjustment("rnd-expense")}
                          className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                            appliedAdjustments["rnd-expense"]
                              ? "bg-emerald-600 text-white"
                              : "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                          }`}
                        >
                          {appliedAdjustments["rnd-expense"] ? "✓ Eklendi (+7.200)" : "Ar-Ge'yi Aktifleştir"}
                        </button>
                      </td>
                    </tr>
                  )}

                  {/* Current Liabilities */}
                  <tr>
                    <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">
                      (-) Kısa Vadeli Ticari & Faizsiz Borçlar (NIBCL)
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-rose-600">
                      -{currentCase.reportedCurrentLiabilities.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">-</td>
                    <td className="p-3 text-right text-slate-400">Otomatik İndirilir</td>
                  </tr>

                  {/* Result: Invested Capital */}
                  <tr className="bg-indigo-50 dark:bg-indigo-950/60 font-bold text-slate-900 dark:text-slate-100">
                    <td className="p-3">DÜZELTİLMİŞ YATIRILAN SERMAYE (Invested Capital)</td>
                    <td className="p-3 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                      {Math.round(adjInvestedCapital).toLocaleString()} {currentCase.currency}
                    </td>
                    <td className="p-3 text-center">-</td>
                    <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      {adjInvestedCapital !== rawInvestedCapital ? `Fark: ${(adjInvestedCapital - rawInvestedCapital).toLocaleString()}` : "Düzeltme Yok"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Mauboussin Yatırılan Sermaye (IC) Formülü:
              </strong>
              <p className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
                Invested Capital = Toplam Varlıklar - Operasyon Dışı Atıl Nakit + Aktifleştirilen Ar-Ge & Kiralar - Faizsiz Kısa Vadeli Borçlar
              </p>
            </div>
          </div>

          {/* Footnote Inspector Panel (Right side) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              Dipnot İnceleme Penceresi
            </h3>

            {activeFootnote ? (
              <div className="p-5 rounded-3xl bg-amber-50/70 dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 space-y-4 font-serif animate-in fade-in">
                <div className="space-y-1 font-sans">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    Dipnot {activeFootnote.footnoteNumber} — Resmi Şirket Açıklaması
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {activeFootnote.footnoteTitle}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-amber-200/60 dark:border-slate-700">
                  "{activeFootnote.footnoteText}"
                </p>

                <div className="font-sans space-y-2 pt-2 border-t border-amber-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block">
                    🔍 Mauboussin Ekonomik Analiz Notu:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeFootnote.auditAdjustmentNote}
                  </p>
                </div>

                <div className="font-sans pt-2">
                  <button
                    onClick={() => handleToggleAdjustment(activeFootnote.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      appliedAdjustments[activeFootnote.id]
                        ? "bg-emerald-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {appliedAdjustments[activeFootnote.id] ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Düzeltme Aktif (Geri Almak İçin Tıkla)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Bu Düzeltmeyi Modele Uygula</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Sol taraftaki tablodan <strong>Dipnot 4, Dipnot 14 veya Dipnot 21</strong> butonlarına tıklayarak şirketin gizli mali gerçeklerini açığa çıkarın.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Gelir Tablosu & NOPAT Düzeltmesi */}
      {activeViewTab === "income-statement" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Gelir Tablosu ve NOPAT Türetimi
            </h3>

            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Gelir Tablosu Kalemi</th>
                    <th className="p-3 text-right">Raporlanan</th>
                    <th className="p-3 text-right">Ekonomik Düzeltme</th>
                    <th className="p-3 text-right">Düzeltilmiş</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  <tr>
                    <td className="p-3 font-bold">Net Satışlar / Hasılat (Revenue)</td>
                    <td className="p-3 text-right font-mono">{rawRevenue.toLocaleString()}</td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right font-mono font-bold">{rawRevenue.toLocaleString()}</td>
                  </tr>

                  {/* Ar-Ge Geri Ekleme */}
                  {currentCase.id === "tech-cloud-rnd" && (
                    <tr className={appliedAdjustments["rnd-expense"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 text-indigo-700 dark:text-indigo-300">
                        (+) Ar-Ge Gideri Geri İadesi (Net Amortisman Düşülmüş)
                      </td>
                      <td className="p-3 text-right text-slate-400">-3.500 (Gider)</td>
                      <td className="p-3 text-right text-emerald-600 font-bold">
                        {appliedAdjustments["rnd-expense"] ? "+1.100 M$" : "0 (Uygulanmadı)"}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {appliedAdjustments["rnd-expense"] ? "+1.100 M$" : "0"}
                      </td>
                    </tr>
                  )}

                  {/* Tek Seferlik Normalizasyon */}
                  {currentCase.id === "industrial-restructuring-pension" && (
                    <tr className={appliedAdjustments["one-off-restructuring"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 text-indigo-700 dark:text-indigo-300">
                        (+) Tek Seferlik Fabrika Kapatma Cezası İadesi
                      </td>
                      <td className="p-3 text-right text-slate-400">-1.200 (Ceza)</td>
                      <td className="p-3 text-right text-emerald-600 font-bold">
                        {appliedAdjustments["one-off-restructuring"] ? "+1.200 M TL" : "0"}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {appliedAdjustments["one-off-restructuring"] ? "+1.200" : "0"}
                      </td>
                    </tr>
                  )}

                  {/* Operating Lease Interest */}
                  {currentCase.id === "retail-leases-capitalization" && (
                    <tr className={appliedAdjustments["operating-leases-item"] ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}>
                      <td className="p-3 pl-6 text-indigo-700 dark:text-indigo-300">
                        (+) Kira Gideri İçindeki Zımni Faiz Payının İadesi
                      </td>
                      <td className="p-3 text-right text-slate-400">Faaliyet Giderinde</td>
                      <td className="p-3 text-right text-emerald-600 font-bold">
                        {appliedAdjustments["operating-leases-item"] ? "+1.200 M TL" : "0"}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {appliedAdjustments["operating-leases-item"] ? "+1.200" : "0"}
                      </td>
                    </tr>
                  )}

                  {/* EBIT */}
                  <tr className="bg-slate-50 dark:bg-slate-900/60 font-bold">
                    <td className="p-3">FAALİYET KÂRI (EBIT)</td>
                    <td className="p-3 text-right font-mono">{rawEbit.toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-600 font-mono">+{deltaEbit.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-indigo-600 dark:text-indigo-400 font-extrabold">
                      {adjEbit.toLocaleString()}
                    </td>
                  </tr>

                  {/* Effective Tax */}
                  <tr>
                    <td className="p-3 text-rose-600">(-) Nakit Efektif Vergi Oranı (%{(rawTaxRate * 100).toFixed(0)})</td>
                    <td className="p-3 text-right font-mono text-rose-600">-{Math.round(rawEbit * rawTaxRate).toLocaleString()}</td>
                    <td className="p-3 text-right text-rose-600 font-mono">-{Math.round(deltaEbit * rawTaxRate).toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-rose-600">-{Math.round(adjEbit * rawTaxRate).toLocaleString()}</td>
                  </tr>

                  {/* NOPAT */}
                  <tr className="bg-indigo-50 dark:bg-indigo-950/80 font-bold text-slate-900 dark:text-slate-100">
                    <td className="p-3">DÜZELTİLMİŞ NOPAT (Net Operating Profit After Tax)</td>
                    <td className="p-3 text-right font-mono">{Math.round(rawNopat).toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-600 font-mono font-bold">+{Math.round(deltaNopat).toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-black text-indigo-600 dark:text-indigo-400 text-sm">
                      {Math.round(adjNopat).toLocaleString()} {currentCase.currency}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> NOPAT Neden Net Kârdan (Net Income) Üstündür?
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Net Kâr (Net Income), şirketin borç faizlerini ve finansman yapısını içerir. İki özdeş fabrikadan biri %100 krediyle, diğeri %100 özkaynakla kurulduysa Net Kârları bambaşka çıkar. <strong>NOPAT ise sermaye yapısından bağımsız olarak fabrikanın salt ekonomik getirisini ölçer.</strong>
              </p>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-slate-700 font-mono text-[11px] text-indigo-800 dark:text-indigo-300">
                NOPAT = EBIT × (1 - Efektif Vergi Oranı)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WACC Sermaye Maliyeti Röntgeni */}
      {activeViewTab === "wacc-calc" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Ağırlıklı Ortalama Sermaye Maliyeti (WACC) Hesabı
            </h3>

            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Sermaye Unsuru</th>
                    <th className="p-3 text-right">Tutar ({currentCase.currency})</th>
                    <th className="p-3 text-right">Ağırlık (%)</th>
                    <th className="p-3 text-right">Maliyet (Vergi Sonrası)</th>
                    <th className="p-3 text-right">Katkı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  <tr>
                    <td className="p-3 font-semibold">Özkaynak (Equity - Piyasa Değeri)</td>
                    <td className="p-3 text-right font-mono">{currentCase.reportedShareholdersEquity.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono">%{(weightEquityAdj * 100).toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-bold text-indigo-600">%{currentCase.costOfEquity.toFixed(1)} (Ke)</td>
                    <td className="p-3 text-right font-mono font-bold">{((weightEquityAdj * currentCase.costOfEquity)).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Finansal Borç + Ek Yükümlülükler</td>
                    <td className="p-3 text-right font-mono">{totalAdjDebt.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono">%{(weightDebtAdj * 100).toFixed(1)}</td>
                    <td className="p-3 text-right font-mono font-bold text-amber-600">%{costOfDebtAfterTaxRaw.toFixed(1)} (Kd × [1-T])</td>
                    <td className="p-3 text-right font-mono font-bold">{((weightDebtAdj * costOfDebtAfterTaxRaw)).toFixed(2)}%</td>
                  </tr>
                  <tr className="bg-indigo-50 dark:bg-indigo-950/80 font-bold text-slate-900 dark:text-slate-100">
                    <td className="p-3" colSpan={4}>AĞIRLIKLI SERMAYE MALİYETİ (WACC)</td>
                    <td className="p-3 text-right font-mono text-indigo-600 dark:text-indigo-400 text-sm font-black">
                      %{adjWacc.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <strong>💡 WACC Eşiği Kuralı:</strong> Şirket yeni yatırımlardan %{adjWacc.toFixed(1)}'in üzerinde getiri (ROIC) ürettiği sürece hissedar değeri yaratır. ROIC %{adjWacc.toFixed(1)}'in altına düştüğü an şirket büyüdükçe değer yok eder!
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                WACC Bileşenlerinin Anlamı
              </h4>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  <strong className="text-slate-900 dark:text-slate-100">Ke (Özkaynak Maliyeti):</strong> Hissedarların üstlendikleri hisse senedi riski karşılığında talep ettiği asgari getiri beklentisidir (CAPM modeli).
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-slate-100">Kd (Borçlanma Maliyeti):</strong> Şirketin banka kredisi ve tahvil faizidir. Faiz gideri vergiden düşüldüğü için <em>(1 - Vergi Oranı)</em> ile vergi kalkanı sağlanır.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Kendini Test Et (ROIC & WACC Sınavı) */}
      {activeViewTab === "quiz-detective" && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Dedektif Görevi: Bu Şirketin Düzeltilmiş ROIC ve WACC Oranını Tahmin Edin
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Yaptığınız dipnot düzeltmeleri neticesinde şirketin nihai ROIC ve WACC oranlarını kutucuklara yazın ve kontrol edin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Düzeltilmiş ROIC Tahmininiz (%):
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Örn: 24.5"
                value={userRoicGuess}
                onChange={(e) => setUserRoicGuess(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Düzeltilmiş WACC Tahmininiz (%):
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Örn: 9.2"
                value={userWaccGuess}
                onChange={(e) => setUserWaccGuess(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => setGuessChecked(true)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Tahmini Kontrol Et</span>
            </button>
          </div>

          {guessChecked && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Kontrol Raporu
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  Gerçek Değerler: ROIC %{adjRoic.toFixed(1)} | WACC %{adjWacc.toFixed(1)}
                </span>
              </div>

              <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  <strong>ROIC Durumu:</strong> {
                    Math.abs(parseFloat(userRoicGuess || "0") - adjRoic) <= 1.0
                      ? "🎯 Harika! ROIC değerini neredeyse birebir doğru hesapladınız."
                      : `Yaklaştınız. Düzeltilmiş NOPAT (${Math.round(adjNopat).toLocaleString()}) / Düzeltilmiş Sermaye (${Math.round(adjInvestedCapital).toLocaleString()}) = %${adjRoic.toFixed(1)}.`
                  }
                </p>
                <p>
                  <strong>WACC Durumu:</strong> {
                    Math.abs(parseFloat(userWaccGuess || "0") - adjWacc) <= 0.5
                      ? "🎯 Kusursuz! Ağırlıklı sermaye maliyetini tam tutturdunuz."
                      : `Ağırlıklı sermaye maliyeti %${adjWacc.toFixed(1)} olarak gerçekleşti.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Pedagogical Takeaway */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 flex-col sm:flex-row text-xs">
        <div className="space-y-1">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" /> Michael Mauboussin Ders Özeti:
          </span>
          <p className="text-slate-600 dark:text-slate-400">
            {currentCase.takeaway}
          </p>
        </div>

        <button
          onClick={() => {
            setAppliedAdjustments({});
            setSelectedFootnoteId(null);
            setGuessChecked(false);
          }}
          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 cursor-pointer shrink-0 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>
    </div>
  );
};
