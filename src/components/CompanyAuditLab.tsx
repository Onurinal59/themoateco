import React, { useState, useEffect, useRef } from "react";
import {
  Building2,
  Plus,
  Trash2,
  Save,
  FileText,
  Calculator,
  Layers,
  Shield,
  Zap,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Copy,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  Share2,
  FolderKanban,
  ArrowLeft,
  Download,
  Upload,
  RotateCcw
} from "lucide-react";
import { CompanyAuditDossier } from "../types";
import {
  BALANCE_SHEET_GUIDE,
  INITIAL_PRESET_DOSSIERS,
  MAUBOUSSIN_GUIDED_TEMPLATE,
  STEP_METHODOLOGY_GUIDES,
  calculateFinancialOutputs,
  computeMoatScore
} from "../data/companyAuditData";
import { MyWorkspacesView } from "./MyWorkspacesView";
import { MauboussinMethodologyCoach } from "./MauboussinMethodologyCoach";
import { InvestmentCommitteeModal } from "./InvestmentCommitteeModal";
import { ShieldAlert, Swords } from "lucide-react";

interface CompanyAuditLabProps {
  onOpenAICoachWithPrompt?: (prompt: string) => void;
  onOpenGlossary?: (termId?: string) => void;
}

export function CompanyAuditLab({ onOpenAICoachWithPrompt, onOpenGlossary }: CompanyAuditLabProps) {
  // Modal for Investment Committee Devil's Advocate
  const [isCommitteeModalOpen, setIsCommitteeModalOpen] = useState(false);
  // Saved dossiers in local storage or fallback to presets
  const [dossiers, setDossiers] = useState<CompanyAuditDossier[]>(() => {
    const saved = localStorage.getItem("moat_dossiers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Dossiers parse error:", e);
      }
    }
    return INITIAL_PRESET_DOSSIERS;
  });

  const [selectedId, setSelectedId] = useState<string>(() => {
    const lastActive = localStorage.getItem("moat_last_selected_id");
    if (lastActive) {
      return lastActive;
    }
    return INITIAL_PRESET_DOSSIERS[0].id;
  });

  const [viewMode, setViewMode] = useState<"studio" | "workspaces">("workspaces");
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>(() => new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
  const [saveFlash, setSaveFlash] = useState(false);

  // Sync to local storage whenever dossiers change
  useEffect(() => {
    localStorage.setItem("moat_dossiers", JSON.stringify(dossiers));
    const now = new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    setLastSavedTime(now);
  }, [dossiers]);

  // Sync selectedId to local storage
  useEffect(() => {
    localStorage.setItem("moat_last_selected_id", selectedId);
  }, [selectedId]);

  const currentDossier = dossiers.find((d) => d.id === selectedId) || dossiers[0] || INITIAL_PRESET_DOSSIERS[0];

  // Whenever selected dossier changes, restore its lastStep
  const handleSelectDossier = (id: string, step?: 1 | 2 | 3 | 4 | 5) => {
    setSelectedId(id);
    const target = dossiers.find((d) => d.id === id);
    if (step) {
      setActiveStep(step);
    } else if (target && target.lastStep) {
      setActiveStep(target.lastStep);
    } else {
      setActiveStep(1);
    }
  };

  const handleStepChange = (newStep: 1 | 2 | 3 | 4 | 5) => {
    setActiveStep(newStep);
    // Persist step into the active dossier
    handleUpdateCurrentDossier({ lastStep: newStep });
  };

  const handleUpdateCurrentDossier = (updated: Partial<CompanyAuditDossier>) => {
    setDossiers((prev) =>
      prev.map((d) =>
        d.id === currentDossier.id
          ? {
              ...d,
              ...updated,
              updatedAt: new Date().toISOString().split("T")[0]
            }
          : d
      )
    );
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
  };

  const handleFinancialChange = (field: keyof CompanyAuditDossier["financials"], value: number) => {
    handleUpdateCurrentDossier({
      financials: {
        ...currentDossier.financials,
        [field]: value
      }
    });
  };

  const handleAddNewCompany = () => {
    const newId = "dossier-custom-" + Date.now();
    const newDossier: CompanyAuditDossier = {
      id: newId,
      companyName: "Yeni Analiz Edilen Şirket",
      ticker: "KOD",
      industry: "Sektör Belirtiniz",
      description: "Şirketin ana iş modeli ve değer önerisi.",
      isCustom: true,
      createdAt: new Date().toISOString().split("T")[0],
      lastStep: 1,
      financials: {
        revenue: 1000,
        operatingIncome: 150,
        effectiveTaxRate: 25,
        totalAssets: 1200,
        cashAndEquivalents: 150,
        nonInterestCurrentLiabilities: 250,
        wacc: 20
      },
      industryStructure: {
        supplierPower: "orta",
        buyerPower: "orta",
        threatOfNewEntrants: "orta",
        threatOfSubstitutes: "orta",
        industryRivalry: "orta",
        profitPoolPosition: "Sektörün kâr havuzundaki yeri..."
      },
      competitiveAdvantage: {
        primaryType: "tüketici_avantajı",
        subDrivers: ["Marka/Arama Maliyeti"],
        pricingPowerEvidence: "Enflasyonda fiyat artırabilme kanıtları...",
        costAdvantageEvidence: "Rakiplere göre birim maliyet farkı..."
      },
      interactionAndDiscipline: {
        capacityDiscipline: "orta",
        priceWarRisk: "orta",
        managementCapitalAllocation: "ortalama"
      },
      sustainability: {
        estimatedCapYears: 5,
        moatWidth: "Dar Hendek (Narrow)",
        keyVulnerability: "Giriş engellerinin aşınması..."
      },
      notes: "Kendi analiz notlarınız...",
      updatedAt: new Date().toISOString().split("T")[0]
    };

    setDossiers((prev) => [newDossier, ...prev]);
    setSelectedId(newId);
    setActiveStep(1);
    setViewMode("studio");
  };

  const handleDuplicateDossier = (dossierToClone: CompanyAuditDossier) => {
    const newId = "dossier-custom-" + Date.now();
    const cloned: CompanyAuditDossier = {
      ...JSON.parse(JSON.stringify(dossierToClone)),
      id: newId,
      companyName: `${dossierToClone.companyName} (Kopya)`,
      ticker: `${dossierToClone.ticker.replace(/ \(.*\)/, "")}-KOPYA`,
      isCustom: true,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      lastStep: dossierToClone.lastStep || 1
    };

    setDossiers((prev) => [cloned, ...prev]);
    setSelectedId(newId);
    setActiveStep(cloned.lastStep || 1);
  };

  const handleDeleteDossier = (id: string) => {
    if (dossiers.length <= 1) {
      alert("En az bir analiz dosyası bulunmalıdır.");
      return;
    }
    const remaining = dossiers.filter((d) => d.id !== id);
    setDossiers(remaining);
    if (selectedId === id) {
      setSelectedId(remaining[0].id);
      setActiveStep(remaining[0].lastStep || 1);
    }
  };

  const handleImportDossiers = (imported: CompanyAuditDossier[]) => {
    const formatted = imported.map((item) => ({
      ...item,
      id: `dossier-import-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      isCustom: true,
      updatedAt: new Date().toISOString().split("T")[0]
    }));

    setDossiers((prev) => [...formatted, ...prev]);
    if (formatted.length > 0) {
      setSelectedId(formatted[0].id);
      setActiveStep(formatted[0].lastStep || 1);
    }
  };

  const handleResetToPresets = () => {
    const userCustom = dossiers.filter((d) => d.isCustom);
    setDossiers([...userCustom, ...INITIAL_PRESET_DOSSIERS]);
  };

  const finCalc = calculateFinancialOutputs(currentDossier.financials);
  const moatScore = computeMoatScore(currentDossier);

  const copyReportToClipboard = () => {
    const text = `📊 EKONOMİK HENDEK DEĞERLENDİRME RAPORU
Şirket: ${currentDossier.companyName} (${currentDossier.ticker})
Sektör: ${currentDossier.industry}
Tarih: ${currentDossier.updatedAt}

1. FİNANSAL VERİMLİLİK & ROIC:
- Gelir: ${currentDossier.financials.revenue}
- NOPAT: ${finCalc.nopat} (NOPAT Marjı: %${finCalc.nopatMarginPercent})
- Yatırılan Sermaye (IC): ${finCalc.investedCapital} (Sermaye Devir Hızı: ${finCalc.capitalTurnover}x)
- ROIC: %${finCalc.roicPercent} vs WACC: %${currentDossier.financials.wacc}
- Değer Yayılımı (Spread): %${finCalc.spread} (${finCalc.isCreatingValue ? 'POZİTİF DEĞER YARATIMI' : 'DEĞER YIKIMI'})
- Yıllık Ekonomik Kâr: ${finCalc.economicProfit}

2. STRATEJİK HENDEK TEŞHİSİ:
- Hendek Tipi: ${currentDossier.competitiveAdvantage.primaryType.toUpperCase()}
- Hendek Alt Motorları: ${currentDossier.competitiveAdvantage.subDrivers.join(", ") || "Yok"}
- Mauboussin Hendek Skoru: %${moatScore.scorePercent}
- Sonuç Teşhisi: ${moatScore.diagnosedMoat} (Tahmini CAP: ${currentDossier.sustainability.estimatedCapYears} Yıl)
- Temel Risk: ${currentDossier.sustainability.keyVulnerability}

Özet Değerlendirme:
${currentDossier.notes}`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const askAICoachAboutThisCompany = () => {
    if (onOpenAICoachWithPrompt) {
      const prompt = `Michael Mauboussin'in "Measuring the Moat" çerçevesinde ${currentDossier.companyName} (${currentDossier.ticker}) şirketini analiz ediyorum.
Şirketin finansalları: ROIC: %${finCalc.roicPercent}, WACC: %${currentDossier.financials.wacc}, Spread: %${finCalc.spread}.
Belirlediğim Hendek Tipi: ${currentDossier.competitiveAdvantage.primaryType}.
Alt motorlar: ${currentDossier.competitiveAdvantage.subDrivers.join(", ")}.
Bana bu şirketin hendek sürdürülebilirliğini (CAP) test etmek için sormam gereken en kritik 3 Sokratik soruyu ve piyasadaki gerçek kanıtları nasıl teyit edeceğimi açıklar mısın?`;
      onOpenAICoachWithPrompt(prompt);
    }
  };

  return (
    <div className="space-y-8 pb-16" id="company-audit-lab">
      {/* Primary Top View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode("workspaces")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === "workspaces"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>📁 Çalışmalarım ({dossiers.length})</span>
          </button>

          <button
            onClick={() => setViewMode("studio")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === "studio"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>🔬 Bilanço & Hendek Röntgen Masası</span>
          </button>
        </div>

        {/* Live Auto-Save Status Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-3 px-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${saveFlash ? "bg-amber-400 animate-ping" : "bg-emerald-500"}`}></span>
            <span className="font-mono text-[11px]">
              {saveFlash ? "Kaydediliyor..." : `Otomatik kaydedildi: ${lastSavedTime}`}
            </span>
          </div>

          {viewMode === "studio" && (
            <button
              onClick={() => {
                handleUpdateCurrentDossier({});
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
              title="Değişiklikleri yerel belleğe manuel doğrula"
            >
              <Save className="w-3 h-3 text-indigo-500" />
              <span>Kaydet</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: MY WORKSPACES PORTFOLIO HUB */}
      {viewMode === "workspaces" ? (
        <MyWorkspacesView
          dossiers={dossiers}
          activeDossierId={selectedId}
          onSelectDossier={handleSelectDossier}
          onCreateNew={handleAddNewCompany}
          onDuplicateDossier={handleDuplicateDossier}
          onDeleteDossier={handleDeleteDossier}
          onImportDossiers={handleImportDossiers}
          onResetToPresets={handleResetToPresets}
          onOpenAuditStudio={() => setViewMode("studio")}
        />
      ) : (
        /* VIEW 2: ACTIVE COMPANY AUDIT STUDIO */
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("workspaces")}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Tüm Çalışmalarım
                  </button>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                    Aktif Dosya: {currentDossier.companyName} ({currentDossier.ticker})
                  </span>
                  {currentDossier.isCustom && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Özgün Çalışma
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {currentDossier.companyName} ({currentDossier.ticker}) — Hendek Teşhisi
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                  5 adımlı Mauboussin çerçevesinde bilançoyu doldurun, ROIC & DuPont çarpanlarını ve hendek motorlarını test edin. Değişiklikler anında <strong>'Çalışmalarım'</strong> altına kaydedilir.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const existing = dossiers.find((d) => d.id === MAUBOUSSIN_GUIDED_TEMPLATE.id);
                    if (existing) {
                      handleSelectDossier(existing.id, 1);
                    } else {
                      setDossiers((prev) => [MAUBOUSSIN_GUIDED_TEMPLATE, ...prev]);
                      setSelectedId(MAUBOUSSIN_GUIDED_TEMPLATE.id);
                      setActiveStep(1);
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                    currentDossier.id === MAUBOUSSIN_GUIDED_TEMPLATE.id
                      ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                      : "bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                  }`}
                  title="Mauboussin 'Measuring the Moat' örnek vaka taslağını aç"
                >
                  <Award className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                  <span>📘 Mauboussin Rehber Taslağı</span>
                </button>
                <button
                  onClick={() => setIsGuideModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Bilanço Rehberi (KAP / 10-K)
                </button>
                <button
                  onClick={handleAddNewCompany}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Yeni Şirket Ekle
                </button>
              </div>
            </div>

            {/* Company Quick-Switch Horizontal Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-thin">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 shrink-0">
                  Dosya Değiştir:
                </span>
                {dossiers.map((doss) => {
                  const isSelected = doss.id === currentDossier.id;
                  const isMauboussin = doss.id === MAUBOUSSIN_GUIDED_TEMPLATE.id;
                  return (
                    <button
                      key={doss.id}
                      onClick={() => handleSelectDossier(doss.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                      }`}
                    >
                      {isMauboussin && <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      <span>{doss.companyName}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? "bg-indigo-700 text-indigo-100" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"}`}>
                        {doss.ticker}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Duplicate & Copy Actions for active dossier */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleDuplicateDossier(currentDossier)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Bu çalışmanın kopyasını oluştur"
                >
                  <Copy className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Klonla</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Case Study Active Banner */}
          {currentDossier.id === MAUBOUSSIN_GUIDED_TEMPLATE.id && (
            <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-indigo-500/5 border border-amber-500/30 dark:border-amber-500/20 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                    Örnek Vaka: Michael Mauboussin "Measuring the Moat" Usta Taslağı
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
                    Bu dosya, perakende sektöründe (Costco & BİM modeli) <strong>negatif işletme sermayesi</strong>, <strong>%19.6 ROIC</strong> ve <strong>20 yıllık CAP süresi</strong> analizini pratik etmeniz için önceden eksiksiz doldurulmuş altın standart şablondur.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDuplicateDossier(currentDossier)}
                className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>Bu Şablonu Kendi Şirketime Kopyala</span>
              </button>
            </div>
          )}

          {/* Main Audit Workspace Form & Diagnostics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Interactive 5-Step Process (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step Navigation Tabs */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex items-center justify-between gap-1 sm:gap-2 shadow-xs overflow-x-auto scrollbar-thin">
                {[
                  { step: 1, title: "1. Finansal Röntgen (ROIC)", icon: Calculator },
                  { step: 2, title: "2. Sektör & Kâr Havuzu", icon: Layers },
                  { step: 3, title: "3. Değer Çubuğu & Hendek", icon: Shield },
                  { step: 4, title: "4. Oyun Teorisi & Sermaye", icon: Zap },
                  { step: 5, title: "5. Sonuç & Teşhis Raporu", icon: Award }
                ].map((st) => {
                  const IconComp = st.icon;
                  const isActive = activeStep === st.step;
                  return (
                    <button
                      key={st.step}
                      onClick={() => handleStepChange(st.step as any)}
                      className={`flex-1 min-w-[120px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{st.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mauboussin Methodology Coach Guide for the Active Step */}
              <MauboussinMethodologyCoach
                activeStep={activeStep}
                isTemplateDossier={currentDossier.id === MAUBOUSSIN_GUIDED_TEMPLATE.id}
                onAskAICoach={askAICoachAboutThisCompany}
                onOpenGlossary={onOpenGlossary}
              />

          {/* STEP 1: FINANCIAL INPUTS & ROIC / DUPONT */}
          {activeStep === 1 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Adım 1: Finansal Röntgen & Bilanço Girdileri
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Şirketin yıllık KAP bildiriminden veya 10-K raporundan aşağıdaki 7 kritik sayıyı girin.
                  </p>
                </div>
                <button
                  onClick={() => setIsGuideModalOpen(true)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Nereden Bulurum?
                </button>
              </div>

              {/* Company Info Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Şirket Adı:</label>
                  <input
                    type="text"
                    value={currentDossier.companyName}
                    onChange={(e) => handleUpdateCurrentDossier({ companyName: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Hisse / Borsa Kodu:</label>
                  <input
                    type="text"
                    value={currentDossier.ticker}
                    onChange={(e) => handleUpdateCurrentDossier({ ticker: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Faaliyet Sektörü:</label>
                  <input
                    type="text"
                    value={currentDossier.industry}
                    onChange={(e) => handleUpdateCurrentDossier({ industry: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Number Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">1. Yıllık Gelir (Hasılat / Revenue)</label>
                    <span className="text-[10px] text-slate-400 font-mono">Milyon TL / $</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.revenue}
                    onChange={(e) => handleFinancialChange("revenue", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Gelir Tablosu'ndaki 'Hasılat' (Total Revenue) satırı.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">2. Esas Faaliyet Kârı (EBIT)</label>
                    <span className="text-[10px] text-slate-400 font-mono">Milyon TL / $</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.operatingIncome}
                    onChange={(e) => handleFinancialChange("operatingIncome", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Finansman ve vergiden önceki operasyonel kâr (Operating Income).</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">3. Efektif Vergi Oranı (%)</label>
                    <span className="text-[10px] text-slate-400 font-mono">%</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.effectiveTaxRate}
                    onChange={(e) => handleFinancialChange("effectiveTaxRate", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Vergi Gideri / Vergi Öncesi Kâr (Türkiye için standart %25-30, ABD için %15-21).</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">4. Toplam Varlıklar (Total Assets)</label>
                    <span className="text-[10px] text-slate-400 font-mono">Milyon TL / $</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.totalAssets}
                    onChange={(e) => handleFinancialChange("totalAssets", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Bilanço aktif toplamı (Dönen + Duran Varlıklar).</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">5. Nakit ve Nakit Benzerleri</label>
                    <span className="text-[10px] text-slate-400 font-mono">Milyon TL / $</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.cashAndEquivalents}
                    onChange={(e) => handleFinancialChange("cashAndEquivalents", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Kasada duran atıl nakit ve kısa vadeli finansal yatırımlar.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">6. Ticari Borçlar & Faizsiz Kısa Borçlar</label>
                    <span className="text-[10px] text-slate-400 font-mono">Milyon TL / $</span>
                  </div>
                  <input
                    type="number"
                    value={currentDossier.financials.nonInterestCurrentLiabilities}
                    onChange={(e) => handleFinancialChange("nonInterestCurrentLiabilities", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Tedarikçilere olan borçlar (Accounts Payable - Faizsiz sermaye).</p>
                </div>

                <div className="sm:col-span-2 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-indigo-900 dark:text-indigo-200">7. Sermaye Maliyeti (WACC - Hurdle Rate)</label>
                    <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400">%{currentDossier.financials.wacc}</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={45}
                    value={currentDossier.financials.wacc}
                    onChange={(e) => handleFinancialChange("wacc", Number(e.target.value))}
                    className="w-full h-2 bg-indigo-200 dark:bg-indigo-900/60 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300">
                    Yatırımcıların bu şirketten talep ettiği asgari getiri oranı (BIST hisseleri için genelde %25-35, ABD hisseleri için %8-10).
                  </p>
                </div>
              </div>

              {/* Next Step Action */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  Adım 2'ye Geç: Sektör Yapısı <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INDUSTRY STRUCTURE & PROFIT POOL */}
          {activeStep === 2 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Adım 2: Sektör Yapısı & Porter 5 Güç Değerlendirmesi
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Michael Porter ve Mauboussin'in öğrettiği gibi: "Kötü bir sektörde harika bir şirket bile ortalamaya çekilir."
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "threatOfNewEntrants",
                    label: "1. Yeni Giriş Tehdidi (Giriş Engelleri)",
                    desc: "Yarın yeni bir rakip piyasaya girip şirketin müşterilerini kolayca kapabilir mi?",
                    goodIsLow: true
                  },
                  {
                    key: "supplierPower",
                    label: "2. Tedarikçi Pazarlık Gücü",
                    desc: "Hammadde/bileşen satanlar (örneğin Nvidia TSMC'ye, Havayolu Boeing'e) fiyatı tek taraflı dikte edebilir mi?",
                    goodIsLow: true
                  },
                  {
                    key: "buyerPower",
                    label: "3. Müşteri Pazarlık Gücü",
                    desc: "Müşteri toplu alım yapıp şirketin kâr marjını ezebilir mi?",
                    goodIsLow: true
                  },
                  {
                    key: "threatOfSubstitutes",
                    label: "4. İkame Ürün Tehdidi",
                    desc: "Müşteriler tamamen farklı bir teknolojiye (tren yerine uçak, petrol yerine elektrik) kayabilir mi?",
                    goodIsLow: true
                  },
                  {
                    key: "industryRivalry",
                    label: "5. Sektör İçi Rekabet Şiddeti",
                    desc: "Rakipler pazar payı için yıkıcı fiyat kırma savaşlarına giriyor mu?",
                    goodIsLow: true
                  }
                ].map((item) => {
                  const val = currentDossier.industryStructure[item.key as keyof CompanyAuditDossier["industryStructure"]];
                  return (
                    <div key={item.key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {(["düşük", "orta", "yüksek"] as const).map((level) => {
                          const isSelected = val === level;
                          const isFavorable = (level === "düşük" && item.goodIsLow) || (level === "yüksek" && !item.goodIsLow);
                          return (
                            <button
                              key={level}
                              onClick={() => {
                                handleUpdateCurrentDossier({
                                  industryStructure: {
                                    ...currentDossier.industryStructure,
                                    [item.key]: level
                                  }
                                });
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                                isSelected
                                  ? isFavorable
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                    : "bg-rose-600 text-white border-rose-600 shadow-xs"
                                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Sektör Kâr Havuzu Konumu (Profit Pool):
                  </label>
                  <textarea
                    rows={2}
                    value={currentDossier.industryStructure.profitPoolPosition}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        industryStructure: {
                          ...currentDossier.industryStructure,
                          profitPoolPosition: e.target.value
                        }
                      })
                    }
                    placeholder="Sektörde en çok kârı hangi halka topluyor? Şirket nerede duruyor?"
                    className="mt-1.5 w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  ◀ Finansallara Dön
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  Adım 3'e Geç: Hendek Motorları <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: VALUE STICK & COMPETITIVE ADVANTAGE DRIVERS */}
          {activeStep === 3 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Adım 3: Değer Çubuğu & Rekabet Avantajı Kaynağı
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Şirket bu kârı nereden üretiyor? Müşteriye daha çok değer katıp fiyat yükselterek mi (WTP), yoksa maliyetleri kısarak mı (WTS)?
                </p>
              </div>

              {/* Primary Advantage Radio */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Temel Rekabet Üstünlüğü Türü:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "tüketici_avantajı", title: "Tüketici Avantajı (WTP)", desc: "Yüksek fiyatlama gücü, marka, geçiş maliyeti, ağ etkisi." },
                    { id: "üretim_avantajı", title: "Üretim / Süreç Avantajı", desc: "Gizli formül, patent, benzersiz coğrafi lojistik üstünlük." },
                    { id: "ölçek_avantajı", title: "Ölçek Üstünlüğü (Birim Maliyet)", desc: "Devasa hacim sayesinde en düşük birim maliyet (Costco/BIM)." }
                  ].map((t) => {
                    const isSelected = currentDossier.competitiveAdvantage.primaryType === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          handleUpdateCurrentDossier({
                            competitiveAdvantage: {
                              ...currentDossier.competitiveAdvantage,
                              primaryType: t.id as any
                            }
                          });
                        }}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500"
                            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-200"
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{t.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{t.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Moat Sub-driver checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Şirkette Bulunan Hendek Alt Motorları (Birden fazla seçebilirsiniz):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Geçiş Maliyeti",
                    "Ağ Etkisi",
                    "Marka/Arama Maliyeti",
                    "Patent/Lisans",
                    "Süreç Üstünlüğü",
                    "Ölçek Ekonomisi"
                  ].map((sub) => {
                    const hasSub = currentDossier.competitiveAdvantage.subDrivers.includes(sub);
                    return (
                      <button
                        key={sub}
                        onClick={() => {
                          const currentSubs = currentDossier.competitiveAdvantage.subDrivers;
                          const newSubs = hasSub
                            ? currentSubs.filter((s) => s !== sub)
                            : [...currentSubs, sub];
                          handleUpdateCurrentDossier({
                            competitiveAdvantage: {
                              ...currentDossier.competitiveAdvantage,
                              subDrivers: newSubs
                            }
                          });
                        }}
                        className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                          hasSub
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700"
                            : "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <span>{sub}</span>
                        {hasSub ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evidence Text areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Fiyat Gücü Kanıtı (Pricing Power):
                  </label>
                  <textarea
                    rows={2}
                    value={currentDossier.competitiveAdvantage.pricingPowerEvidence}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        competitiveAdvantage: {
                          ...currentDossier.competitiveAdvantage,
                          pricingPowerEvidence: e.target.value
                        }
                      })
                    }
                    placeholder="Şirket enflasyonda fiyat artırabildi mi? Müşteri kaybı oldu mu?"
                    className="mt-1 w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Birim Maliyet / Süreç Kanıtı:
                  </label>
                  <textarea
                    rows={2}
                    value={currentDossier.competitiveAdvantage.costAdvantageEvidence}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        competitiveAdvantage: {
                          ...currentDossier.competitiveAdvantage,
                          costAdvantageEvidence: e.target.value
                        }
                      })
                    }
                    placeholder="Rakiplere göre faaliyet gideri % veya tedarik maliyet avantajı..."
                    className="mt-1 w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  ◀ Sektör Yapısına Dön
                </button>
                <button
                  onClick={() => setActiveStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  Adım 4'e Geç: Oyun Teorisi <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: INTERACTION, GAME THEORY & CAPITAL ALLOCATION */}
          {activeStep === 4 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Adım 4: Dinamik Etkileşim & Sermaye Tahsisi Disiplini
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Rakiplerle fiyat savaşı olasılığı ve yönetimin serbest nakit akışını nasıl değerlendirdiği.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">1. Kapasite Disiplini</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Sektörde atıl fabrika/stok/uçak fazlası riski var mı?</div>
                  </div>
                  <div className="flex gap-2">
                    {(["yüksek", "orta", "düşük"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() =>
                          handleUpdateCurrentDossier({
                            interactionAndDiscipline: {
                              ...currentDossier.interactionAndDiscipline,
                              capacityDiscipline: lvl
                            }
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                          currentDossier.interactionAndDiscipline.capacityDiscipline === lvl
                            ? lvl === "yüksek"
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">2. Fiyat Kırma & Fiyat Savaşı Riski (Mahkumlar İkilemi)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Rakipler pazar payı kapmak için kârları sıfırlayacak savaşlara girer mi?</div>
                  </div>
                  <div className="flex gap-2">
                    {(["düşük", "orta", "yüksek"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() =>
                          handleUpdateCurrentDossier({
                            interactionAndDiscipline: {
                              ...currentDossier.interactionAndDiscipline,
                              priceWarRisk: lvl
                            }
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                          currentDossier.interactionAndDiscipline.priceWarRisk === lvl
                            ? lvl === "düşük"
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-rose-600 text-white border-rose-600"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">3. Yönetimin Sermaye Tahsis Becerisi (Capital Allocation)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Kazanılan parayı yüksek ROIC'li işlere yatırıp, gereksiz satın almalardan kaçınıyor mu?</div>
                  </div>
                  <div className="flex gap-2">
                    {(["mükemmel", "ortalama", "kötü"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() =>
                          handleUpdateCurrentDossier({
                            interactionAndDiscipline: {
                              ...currentDossier.interactionAndDiscipline,
                              managementCapitalAllocation: lvl
                            }
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                          currentDossier.interactionAndDiscipline.managementCapitalAllocation === lvl
                            ? lvl === "mükemmel"
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-amber-600 text-white border-amber-600"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  ◀ Değer Çubuğuna Dön
                </button>
                <button
                  onClick={() => setActiveStep(5)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  Son Adım: Raporu Oluştur <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUSTAINABILITY & FULL DOSSIER REPORT */}
          {activeStep === 5 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Adım 5: Nihai Hendek Teşhisi & Yatırım Raporu
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Michael Mauboussin metodolojisine göre şirketin ekonomik hendek özeti ve risk haritası.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyReportToClipboard}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedNotification ? "Kopyalandı!" : "Raporu Kopyala"}
                  </button>
                  <button
                    onClick={askAICoachAboutThisCompany}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-indigo-200 dark:border-indigo-800"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Koçuna Değerlendirttir
                  </button>
                </div>
              </div>

              {/* Final Verdict Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Teşhis Edilen Hendek Genişliği (Moat Width)
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
                    {moatScore.diagnosedMoat}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {moatScore.summaryTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs shrink-0 w-full md:w-auto">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Mauboussin Hendek Skoru</div>
                  <div className="text-3xl font-mono font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    %{moatScore.scorePercent}
                  </div>
                  <div className="text-[10px] text-slate-400">100 Üzerinden</div>
                </div>
              </div>

              {/* Sustainability Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Tahmini Rekabetçi Avantaj Dönemi (CAP)
                    </label>
                    <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {currentDossier.sustainability.estimatedCapYears} Yıl
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={currentDossier.sustainability.estimatedCapYears}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        sustainability: {
                          ...currentDossier.sustainability,
                          estimatedCapYears: Number(e.target.value)
                        }
                      })
                    }
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Şirketin ortalamaya dönmeden (ROIC = WACC olmadan) kârını koruyabileceği tahmini yıl sayısı.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Hendeği Tehdit Eden En Büyük Kırılganlık:
                  </label>
                  <input
                    type="text"
                    value={currentDossier.sustainability.keyVulnerability}
                    onChange={(e) =>
                      handleUpdateCurrentDossier({
                        sustainability: {
                          ...currentDossier.sustainability,
                          keyVulnerability: e.target.value
                        }
                      })
                    }
                    placeholder="Örn: Regülasyon baskısı, teknolojik ikame, müşteri sadakati kaybı..."
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Final Notes */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Kişisel Analiz Özeti ve Notlarınız:
                </label>
                <textarea
                  rows={3}
                  value={currentDossier.notes}
                  onChange={(e) => handleUpdateCurrentDossier({ notes: e.target.value })}
                  placeholder="Bu şirket neden hendekli veya hendeksiz? Yatırım tezini özetleyin..."
                  className="mt-1 w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Challenge Your Thesis: Investment Committee (Devil's Advocate) Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Yatırım Komitesi Savunması (Devil's Advocate)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-lg">
                    Analizinizi şüpheci Mauboussin yatırım komitesi önünde test edin. Şirketin en zayıf noktalarına karşı tezinizi savunun ve puan alın!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCommitteeModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Komiteye Sun</span>
                </button>
              </div>

              {/* Dossier Danger Zone / Delete */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleDeleteDossier(currentDossier.id)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Bu Dosyayı Sil
                </button>
                <span className="text-[11px] text-slate-400">Son Güncelleme: {currentDossier.updatedAt}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Diagnostic Dashboard & DuPont Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Financial Health Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Canlı ROIC Röntgeni
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                  finCalc.isCreatingValue
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {finCalc.isCreatingValue ? "DEĞER YARATIYOR" : "DEĞER YIKIYOR"}
              </span>
            </div>

            {/* Big ROIC vs WACC Spread */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-1">
              <div className="text-xs text-slate-500 dark:text-slate-400">ROIC (Yatırılan Sermaye Getirisi)</div>
              <div
                className={`text-3xl sm:text-4xl font-mono font-black ${
                  finCalc.roicPercent >= currentDossier.financials.wacc
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                %{finCalc.roicPercent}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                WACC: %{currentDossier.financials.wacc} | Fark (Spread):{" "}
                <strong className={finCalc.spread >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                  {finCalc.spread > 0 ? `+${finCalc.spread}%` : `${finCalc.spread}%`}
                </strong>
              </div>
            </div>

            {/* DuPont Breakdown */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Mauboussin DuPont Ayrıştırması:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">NOPAT Marjı (Kârlılık)</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    %{finCalc.nopatMarginPercent}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Sermaye Devir Hızı (Verimlilik)</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {finCalc.capitalTurnover}x
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                ROIC = %{finCalc.nopatMarginPercent} × {finCalc.capitalTurnover}x = %{finCalc.roicPercent}
              </p>
            </div>

            {/* Financial Intermediate Details */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>NOPAT (Net Faaliyet Kârı):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{finCalc.nopat} Milyon</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Yatırılan Sermaye (IC):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{finCalc.investedCapital} Milyon</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Yıllık Ekonomik Kâr:</span>
                <span className={`font-bold ${finCalc.economicProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {finCalc.economicProfit >= 0 ? `+${finCalc.economicProfit}` : finCalc.economicProfit} Milyon
                </span>
              </div>
            </div>
          </div>

          {/* Quick Learning Callout */}
          <div className="p-5 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              Piyasa Analisti İpucu (Mauboussin İlkesi)
            </div>
            <p className="text-xs text-indigo-900/80 dark:text-indigo-300/90 leading-relaxed">
              Bir şirketin gelir büyümesi tek başına anlamsızdır. Eğer şirket %10 ROIC ile büyüyor ve sermaye maliyeti (WACC) %15 ise, <strong>her büyüdüğü gün hissedar değerini yok eder!</strong> Gerçek servet sadece ROIC &gt; WACC farkından doğar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )}

      {/* MODAL: Balance Sheet & 10-K Field Guide */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Bilanço Röntgeni: Hangi Sayıyı Nereden Alacaksınız?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  KAP (Borsa İstanbul) ve SEC 10-K (ABD Borsaları) finansal tablolarını Mauboussin metotlarıyla okuma rehberi.
                </p>
              </div>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {BALANCE_SHEET_GUIDE.map((guide) => (
                <div
                  key={guide.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{guide.metricName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                      {guide.formula}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70">
                      <strong className="text-indigo-600 dark:text-indigo-400 block mb-0.5">🇹🇷 KAP / BIST'te Nerede?</strong>
                      <span className="text-slate-600 dark:text-slate-300">{guide.whereToFindTr}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70">
                      <strong className="text-indigo-600 dark:text-indigo-400 block mb-0.5">🇺🇸 SEC 10-K / US'te Nerede?</strong>
                      <span className="text-slate-600 dark:text-slate-300">{guide.whereToFindUs}</span>
                    </div>
                  </div>

                  <div className="pt-1 text-slate-700 dark:text-slate-300">
                    <strong>Ne Anlama Gelir?</strong> {guide.practicalMeaning}
                  </div>
                  <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900/50">
                    💡 <strong>Tuzak Uyarısı:</strong> {guide.warningTip}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                Anladım, Analize Dön
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Investment Committee Devil's Advocate */}
      <InvestmentCommitteeModal
        isOpen={isCommitteeModalOpen}
        onClose={() => setIsCommitteeModalOpen(false)}
        dossier={currentDossier}
        onAskAICoach={onOpenAICoachWithPrompt}
      />
    </div>
  );
}
