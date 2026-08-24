import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import {
  Compass,
  Search,
  Target,
  Building2,
  Swords,
  Repeat,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  X,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Zap,
  Award,
  Calculator,
  ChevronRight,
} from "lucide-react";
import { NavTab } from "./Navbar";
import { SimTab } from "./SimulationsView";

interface OnboardingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavTab, sim?: SimTab) => void;
  onStartFirstModule?: () => void;
}

interface TourStep {
  id: string;
  stepNumber: number;
  title: string;
  badge: string;
  targetTab: NavTab;
  targetSim?: SimTab;
  tabName: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  summary: string;
  whatYouWillLearn: string[];
  recommendedAction: string;
  ctaText: string;
}

export const OnboardingGuideModal: React.FC<OnboardingGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onStartFirstModule
}) => {
  const { isEnglish, t } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const contentBodyRef = useRef<HTMLDivElement>(null);

  const TOUR_STEPS_TR: TourStep[] = [
    {
      id: "step-1-roadmap",
      stepNumber: 1,
      title: "1. Durak: Sıfırdan Başlangıç — Yol Haritası",
      badge: "TEMEL VE KAVRAMLAR",
      targetTab: "roadmap",
      tabName: "Yol Haritası",
      icon: Compass,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800",
      summary: "Finans veya strateji geçmişiniz olmasa bile; mahalle fırını, limonata tezgahı ve iPhone gibi somut analojilerle ekonomik hendeklerin (Economic Moats) arkasındaki bilimi öğrenin.",
      whatYouWillLearn: [
        "Değer Çubuğu (WTP vs. Maliyet) ile kalıcı fiyatlama gücü",
        "Porter 5 Güç analiziyle sektör kârlılığını tahmin etme",
        "DuPont Yöntemi (Kâr Marjı × Sermaye Devir Hızı) ile ROIC ayrıştırması",
        "CAP (Rekabetçi Avantaj Dönemi) ve ortalamaya dönüş dinamikleri"
      ],
      recommendedAction: "1. Modül olan 'Ekonomik Hendek Nedir?' ile başlayın ve mini testleri çözerek ilk rozetlerinizi kazanın.",
      ctaText: "Yol Haritasına Git ve 1. Modüle Başla"
    },
    {
      id: "step-2-formulas",
      stepNumber: 2,
      title: "2. Durak: Formül & Röntgen Atölyesi",
      badge: "FİNANSAL MATEMATİK",
      targetTab: "formulas",
      tabName: "Formüller Atölyesi",
      icon: Calculator,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
      summary: "Michael Mauboussin ve Morgan Stanley analizlerinde kullanılan 8 temel ekonomik hendek formülünü tam sayfa interaktif hesaplayıcılarla pratik edin.",
      whatYouWillLearn: [
        "WACC (Ağırlıklı Ortalama Sermaye Maliyeti) ve Hurdle Rate hesabı",
        "ROIC, NOPAT ve Yatırılan Sermaye (Invested Capital) matematiği",
        "Victoria Dickinson 5 Evreli Nakit Akışı Röntgeni (+/-/ işaretleri)",
        "Sektörel Kâr Havuzu (Profit Pool) ve Ekonomik Refah Yayılımı"
      ],
      recommendedAction: "Formüller sekmesine geçin, hazır şirket şablonlarını (Coca-Cola, Amazon, Costco) seçip sayıları değiştirerek kârlılık tepkilerini inceleyin.",
      ctaText: "Formül Atölyesine Git"
    },
    {
      id: "step-3-footnote",
      stepNumber: 3,
      title: "3. Durak: Bilanço & Dipnot Dedektifi",
      badge: "UYGULAMALI PRATİK",
      targetTab: "simulators",
      targetSim: "footnote-detective",
      tabName: "Dipnot Dedektifi",
      icon: Search,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800",
      summary: "Standart muhasebe rakamları gerçek kârlılığı gizler. Şirketlerin 10-K ve KAP dipnotlarına inerek gerçek ROIC ve WACC hesaplamalarını keşfedin.",
      whatYouWillLearn: [
        "Ar-Ge harcamalarını gider yazmak yerine bilançoya aktifleştirme (R&D Capitalization)",
        "Bilançodaki devasa hazine bonolarını ve atıl nakdi ayıklama",
        "Mağaza faaliyet kiralamalarını borç ve kullanım hakkı varlığına dönüştürme",
        "Tek seferlik fabrika kapatma cezalarını kâra geri ekleyerek normalleştirme"
      ],
      recommendedAction: "Nexus Cloud veya Atlas Market vakasını seçip dipnot butonlarına tıklayarak düzeltmeleri modele uygulayın.",
      ctaText: "Dipnot Dedektifini Aç"
    },
    {
      id: "step-4-reverse-dcf",
      stepNumber: 4,
      title: "4. Durak: Tersine DCF & Zımni CAP Simülatörü",
      badge: "İLERİ DÜZEY DEĞERLEME",
      targetTab: "simulators",
      targetSim: "reverse-dcf",
      tabName: "Tersine DCF & CAP",
      icon: Target,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
      summary: "Geleceği tahmin etmek yerine, Michael Mauboussin metodolojisiyle mevcut hisse fiyatının içine piyasanın kaç yıllık hendek (CAP) fiyatladığını tersine mühendislikle çözün.",
      whatYouWillLearn: [
        "Piyasa fiyatının ima ettiği ciro büyümesi ve NOPAT marjı beklentileri",
        "Hisse fiyatında kaç yıllık rekabetçi avantaj (CAP Yılı) gömülü?",
        "Piyasa aşırı mı iyimser yoksa hendek yeterince fiyatlanmamış mı?"
      ],
      recommendedAction: "Apple veya Spotify hazır şablonunu yükleyip hisse fiyatı sürgüsünü kaydırarak zımni yılları gözlemleyin.",
      ctaText: "Tersine DCF Simülatörüne Git"
    },
    {
      id: "step-5-company-audit",
      stepNumber: 5,
      title: "5. Durak: Şirket Analiz Stüdyosu & Yatırım Komitesi",
      badge: "KENDİ TEZİNİ OLUŞTUR",
      targetTab: "company-audit",
      tabName: "Analiz Stüdyosu",
      icon: Building2,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
      summary: "İstediğiniz BIST veya küresel bir şirketi 5 adımda analiz edin; ardından tezinizi Yatırım Komitesi Şeytanın Avukatı'na karşı savunun.",
      whatYouWillLearn: [
        "Sektör yapısı, WTP faktörleri ve sermaye getirisi puanlaması",
        "Hendek kaynağı belirleme (Maliyet Avantajı, Geçiş Maliyeti, Ağ Etkisi, Marka)",
        "Şüpheci Yatırım Komitesi üyelerinin zorlayıcı sorularına karşı tez savunması"
      ],
      recommendedAction: "Hazır dosyalardan (BIMAS, Apple, Netflix) birini açın veya 'Yeni Dosya' oluşturup komite simülasyonunu başlatın.",
      ctaText: "Analiz Stüdyosuna Git"
    },
    {
      id: "step-6-duel",
      stepNumber: 6,
      title: "6. Durak: Hendek Düellosu & Kıyaslama",
      badge: "İKİ ŞİRKETİ YARIŞTIR",
      targetTab: "moat-duel",
      tabName: "Hendek Düellosu",
      icon: Swords,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
      summary: "İki rakip şirketi yan yana koyarak DuPont marjlarını, ROIC yayılımlarını ve Porter 5 Güç dirençlerini doğrudan kıyaslayın.",
      whatYouWillLearn: [
        "Kim daha yüksek sermaye verimliliğine sahip? (DuPont ayrıştırması)",
        "Hangi şirketin hendeği daha geniş ve aşınmaya karşı dirençli?",
        "Sermaye tahsisatçısı olarak CEO ve yönetim performansı kıyaslaması"
      ],
      recommendedAction: "Apple vs. Spotify veya BIMAS vs. BIST Perakende düellosunu başlatın.",
      ctaText: "Hendek Düellosuna Git"
    },
    {
      id: "step-7-spaced-rep",
      stepNumber: 7,
      title: "7. Durak: Aralıklı Tekrarlama (SM-2 Flashcards)",
      badge: "KALICI HAFIZA",
      targetTab: "spaced-repetition",
      tabName: "Aralıklı Tekrar",
      icon: Repeat,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800",
      summary: "Öğrendiğiniz kritik finans ve strateji terimlerini unutmamak için bilimsel SuperMemo SM-2 algoritmasıyla günde 2 dakika tekrar yapın.",
      whatYouWillLearn: [
        "WTP erozyonu, NOPAT türetimi, CAP aşınması gibi 20+ kritik terimin aktif hatırlanması",
        "Seri (Streak) takibi ile her gün düzenli pratik alışkanlığı"
      ],
      recommendedAction: "Günde 5 dakikanızı ayırıp kartları puanlayın ve öğrenme serinizi koruyun.",
      ctaText: "Flashcard Tekrarlarına Git"
    }
  ];

  const TOUR_STEPS_EN: TourStep[] = [
    {
      id: "step-1-roadmap",
      stepNumber: 1,
      title: "Stop 1: Starting from Zero — Roadmap & Modules",
      badge: "FOUNDATION & CONCEPTS",
      targetTab: "roadmap",
      tabName: "Roadmap",
      icon: Compass,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800",
      summary: "Even with zero finance background: learn the science of Economic Moats through intuitive real-world analogies like local bakeries, lemonade stands, and Apple.",
      whatYouWillLearn: [
        "Value Stick (WTP vs. Cost) and enduring pricing power",
        "Porter's 5 Forces to gauge industry profitability dynamics",
        "DuPont Decomposition (Margin × Asset Turnover) for ROIC",
        "Competitive Advantage Period (CAP) and mean reversion"
      ],
      recommendedAction: "Begin with Module 1 'What is an Economic Moat?' and complete mini quizzes to earn badges.",
      ctaText: "Go to Roadmap & Start Module 1"
    },
    {
      id: "step-2-formulas",
      stepNumber: 2,
      title: "Stop 2: Formula & Diagnostic Workshop",
      badge: "FINANCIAL MATH",
      targetTab: "formulas",
      tabName: "Formula Lab",
      icon: Calculator,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
      summary: "Practice 8 fundamental economic moat formulas used by Michael Mauboussin and Morgan Stanley in full-page interactive sandboxes.",
      whatYouWillLearn: [
        "WACC (Weighted Average Cost of Capital) and Hurdle Rate calculations",
        "ROIC, NOPAT, and Invested Capital math",
        "Victoria Dickinson 5-Stage Cash Flow Diagnostic (+/-/ patterns)",
        "Industry Profit Pools and Economic Profit Spread"
      ],
      recommendedAction: "Open the Formula Lab, pick company presets (Coca-Cola, Amazon, Costco), and observe changes dynamically.",
      ctaText: "Go to Formula Lab"
    },
    {
      id: "step-3-footnote",
      stepNumber: 3,
      title: "Stop 3: 10-K Footnote Detective",
      badge: "APPLIED PRACTICE",
      targetTab: "simulators",
      targetSim: "footnote-detective",
      tabName: "Footnote Detective",
      icon: Search,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800",
      summary: "Standard GAAP accounting often masks true economic profitability. Dive into 10-K footnotes to calculate Adjusted Invested Capital and forensic ROIC.",
      whatYouWillLearn: [
        "Capitalizing R&D expenses as balance sheet assets",
        "Excluding non-operating cash and treasury bills",
        "Converting operating leases into interest-bearing debt & right-of-use assets",
        "Normalizing one-off restructuring charges"
      ],
      recommendedAction: "Select Nexus Cloud or Atlas Market case and apply forensic adjustments.",
      ctaText: "Open Footnote Detective"
    },
    {
      id: "step-4-reverse-dcf",
      stepNumber: 4,
      title: "Stop 4: Reverse DCF & Implied CAP Simulator",
      badge: "ADVANCED VALUATION",
      targetTab: "simulators",
      targetSim: "reverse-dcf",
      tabName: "Reverse DCF & CAP",
      icon: Target,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
      summary: "Instead of forecasting the unknown, reverse-engineer current market stock prices to reveal the implied Competitive Advantage Period (CAP).",
      whatYouWillLearn: [
        "What revenue growth and NOPAT margins are priced in",
        "How many years of high-spread moat the market currently expects",
        "Spotting market over-optimism vs undervalued durable moats"
      ],
      recommendedAction: "Load Apple or Spotify presets and adjust stock price sliders to examine implied expectations.",
      ctaText: "Go to Reverse DCF Simulator"
    },
    {
      id: "step-5-company-audit",
      stepNumber: 5,
      title: "Stop 5: Company Audit Studio & Investment Committee",
      badge: "BUILD YOUR THESIS",
      targetTab: "company-audit",
      tabName: "Audit Studio",
      icon: Building2,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
      summary: "Audit any public company across 5 structured steps, then defend your moat thesis against the Investment Committee Devil's Advocate.",
      whatYouWillLearn: [
        "Industry dynamics, WTP factors, and capital return scoring",
        "Identifying primary moat drivers (Cost, Switching Cost, Network Effects, Intangibles)",
        "Defending your valuation thesis against skeptical committee challenges"
      ],
      recommendedAction: "Open a dossier (Apple, Costco, Netflix) or build a new one and run the committee simulation.",
      ctaText: "Go to Audit Studio"
    },
    {
      id: "step-6-duel",
      stepNumber: 6,
      title: "Stop 6: Moat Duel & Head-to-Head Comparison",
      badge: "COMPARE COMPETITORS",
      targetTab: "moat-duel",
      tabName: "Moat Duel",
      icon: Swords,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
      summary: "Place two rival companies side-by-side to directly compare DuPont margins, ROIC spreads, and Porter's 5 Forces resilience.",
      whatYouWillLearn: [
        "Who possesses superior capital efficiency? (DuPont Breakdown)",
        "Which moat is wider and more resilient to competitive erosion?",
        "Evaluating capital allocation track record of management"
      ],
      recommendedAction: "Launch an Apple vs. Spotify or retail rivalry duel.",
      ctaText: "Go to Moat Duel"
    },
    {
      id: "step-7-spaced-rep",
      stepNumber: 7,
      title: "Stop 7: Spaced Repetition (SM-2 Flashcards)",
      badge: "LONG-TERM RETENTION",
      targetTab: "spaced-repetition",
      tabName: "Flashcards",
      icon: Repeat,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800",
      summary: "Retain critical financial and strategic concepts with 2 minutes of daily flashcards powered by the SuperMemo SM-2 algorithm.",
      whatYouWillLearn: [
        "Active recall of 20+ crucial concepts like WTP erosion, NOPAT derivation, CAP decay",
        "Streak tracking for daily disciplined learning"
      ],
      recommendedAction: "Spend 5 minutes grading flashcards to maintain your streak.",
      ctaText: "Go to Flashcards"
    }
  ];

  const TOUR_STEPS = isEnglish ? TOUR_STEPS_EN : TOUR_STEPS_TR;
  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;
  const IconComponent = currentStep.icon;

  useEffect(() => {
    contentBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex]);

  const handleStepAction = () => {
    onNavigateTab(currentStep.targetTab, currentStep.targetSim);
    if (currentStep.id === "step-1-roadmap" && onStartFirstModule) {
      onStartFirstModule();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                      {isEnglish ? "Moat Academy: 7-Stop Learning Journey" : "Moat Academy: 7 Duraklı Öğrenme Rehberi"}
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      {currentStepIndex + 1} / {TOUR_STEPS.length}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isEnglish
                      ? "Vertical step-by-step roadmap from foundations to professional audits"
                      : "Sıfırdan başlayıp ileri düzey şirket değerleme ve hendek analizine giden yol"}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Body: Top-to-Bottom Vertical Step Navigation + Details (2 Column Layout) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
              
              {/* Left Column: Top-to-Bottom Vertical Steps List */}
              <div className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-3 sm:p-4 overflow-y-auto space-y-2 shrink-0 max-h-48 md:max-h-none">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-1">
                  {isEnglish ? "Learning Steps (Top to Bottom)" : "Öğrenme Adımları (Üstten Aşağıya)"}
                </div>

                <div className="space-y-1.5">
                  {TOUR_STEPS.map((s, idx) => {
                    const isCurrent = idx === currentStepIndex;
                    const StepIcon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setCurrentStepIndex(idx)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 font-bold"
                            : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              isCurrent
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {s.stepNumber}
                          </div>
                          <div className="min-w-0 truncate">
                            <span className="text-xs block truncate leading-tight">
                              {s.tabName}
                            </span>
                            <span
                              className={`text-[10px] block truncate leading-tight mt-0.5 ${
                                isCurrent ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"
                              }`}
                            >
                              {s.badge}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isCurrent ? "text-white translate-x-0.5" : "text-slate-300 dark:text-slate-600"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Step Details & Deep Dive Card */}
              <div
                ref={contentBodyRef}
                className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-white dark:bg-slate-900"
              >
                {/* Step Hero Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-4">
                  <div className={`p-3 sm:p-3.5 rounded-2xl border ${currentStep.iconBg} shrink-0`}>
                    <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${currentStep.iconColor}`} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      {currentStep.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100">
                      {currentStep.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentStep.summary}
                    </p>
                  </div>
                </div>

                {/* What You Will Learn List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    {isEnglish ? "What You Will Master in This Step" : "Bu Adımda Neler Öğreneceksiniz?"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentStep.whatYouWillLearn.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Immediate Action Plan */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs">
                    <strong className="font-bold text-amber-900 dark:text-amber-200 block">
                      {isEnglish ? "Recommended Immediate Action:" : "Önerilen Hemen Eylem:"}
                    </strong>
                    <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                      {currentStep.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Navigation Bar */}
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={isFirstStep}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isFirstStep
                      ? "opacity-40 cursor-not-allowed text-slate-400"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {isEnglish ? "Previous" : "Önceki"}
                </button>

                <button
                  onClick={() => setCurrentStepIndex((prev) => Math.min(TOUR_STEPS.length - 1, prev + 1))}
                  disabled={isLastStep}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isLastStep
                      ? "opacity-40 cursor-not-allowed text-slate-400"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {isEnglish ? "Next" : "Sonraki"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct Launch Button */}
              <button
                onClick={handleStepAction}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
              >
                <span>{currentStep.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
