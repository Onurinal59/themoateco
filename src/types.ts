export interface GlossaryTerm {
  id: string;
  term: string;
  shortDefinition: string;
  detailedExplanation: string;
  realWorldAnalogy: string;
  category: "Temel Finans" | "Strateji" | "Mikroekonomi" | "Sektör Analizi" | "İnovasyon & Oyun Teorisi";
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  practicalScenario?: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  summary: string;
  content: string[]; // Pedagogical paragraphs with rich examples
  analogyBox?: {
    title: string;
    description: string;
  };
  keyTakeaway: string;
  interactiveWidgetId?: "value-stick" | "dupont" | "profit-pool" | "game-theory" | "blotto" | "ccc" | "checklist" | "life-cycle";
}

export interface LearningModule {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  iconName: string;
  description: string;
  zeroKnowledgeSummary: string;
  sections: ModuleSection[];
  quiz: QuizQuestion[];
}

export interface Flashcard {
  id: string;
  moduleId: number;
  term: string;
  question: string;
  answer: string;
  analogy: string;
  difficulty: "kolay" | "orta" | "zor";
  // SM-2 Spaced repetition state
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string; // ISO string
  lastReviewedDate?: string;
}

export interface UserLearningState {
  completedModules: number[];
  quizScores: Record<number, number>; // moduleId -> score percent
  flashcardStates: Record<string, Flashcard>;
  currentStreak: number;
  lastActiveDate: string;
  masteredCardsCount: number;
  bookmarkedTerms: string[];
}

export interface ChecklistItem {
  id: string;
  category: string;
  question: string;
  explanation: string;
  highScoreIndicator: string;
  lowScoreIndicator: string;
}

export interface FinancialMetricInputs {
  revenue: number; // Yıllık Satış Gelirleri (Milyon TL/USD)
  operatingIncome: number; // Faaliyet Kârı / EBIT (Milyon TL/USD)
  effectiveTaxRate: number; // Efektif Vergi Oranı (%)
  totalAssets: number; // Toplam Varlıklar (Milyon TL/USD)
  cashAndEquivalents: number; // Nakit ve Benzerleri (Milyon TL/USD)
  nonInterestCurrentLiabilities: number; // Ticari Borçlar & Faizsiz Kısa Vadeli Borçlar (Milyon TL/USD)
  wacc: number; // Ağırlıklı Ortalama Sermaye Maliyeti - WACC (%)
}

export interface CompanyAuditDossier {
  id: string;
  companyName: string;
  ticker: string;
  industry: string;
  description: string;
  financials: FinancialMetricInputs;
  // Qualitative Evaluation
  industryStructure: {
    supplierPower: "düşük" | "orta" | "yüksek"; // Düşük güç hendek için iyi
    buyerPower: "düşük" | "orta" | "yüksek"; // Düşük güç hendek için iyi
    threatOfNewEntrants: "düşük" | "orta" | "yüksek"; // Düşük tehdit iyi
    threatOfSubstitutes: "düşük" | "orta" | "yüksek"; // Düşük tehdit iyi
    industryRivalry: "düşük" | "orta" | "yüksek"; // Düşük rekabet iyi
    profitPoolPosition: string; // Kâr havuzunda hangi halkada?
  };
  competitiveAdvantage: {
    primaryType: "tüketici_avantajı" | "üretim_avantajı" | "ölçek_avantajı" | "yok";
    subDrivers: string[]; // ['Ağ Etkisi', 'Geçiş Maliyeti', 'Marka/Arama Maliyeti', 'Patent/Lisans', 'Süreç Üstünlüğü', 'Ölçek Ekonomisi']
    pricingPowerEvidence: string; // Şirketin fiyat artırabilme kanıtı
    costAdvantageEvidence: string; // Şirketin birim maliyet avantajı kanıtı
  };
  interactionAndDiscipline: {
    capacityDiscipline: "yüksek" | "orta" | "düşük"; // Kapasite fazlası riski var mı?
    priceWarRisk: "düşük" | "orta" | "yüksek"; // Fiyat kırma dürtüsü var mı?
    managementCapitalAllocation: "mükemmel" | "ortalama" | "kötü"; // Kârı nereye yatırıyor?
  };
  sustainability: {
    estimatedCapYears: number; // CAP: Rekabetçi Avantaj Dönemi (Yıl)
    moatWidth: "Geniş Hendek (Wide)" | "Dar Hendek (Narrow)" | "Hendek Yok (None)";
    keyVulnerability: string; // Hendegi tehdit eden en büyük risk (örn. teknolojik değişim)
  };
  notes: string;
  updatedAt: string;
  createdAt?: string;
  isCustom?: boolean;
  lastStep?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
}

