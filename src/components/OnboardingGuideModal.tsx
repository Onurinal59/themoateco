import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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

const TOUR_STEPS: TourStep[] = [
  {
    id: "step-1-roadmap",
    stepNumber: 1,
    title: "1. Durak: Sıfırdan Başlangıç — Yol Haritası",
    badge: "BAŞLANGIÇ ADIMI (ZORUNLU)",
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

export const OnboardingGuideModal: React.FC<OnboardingGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onStartFirstModule
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const tabButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const contentBodyRef = useRef<HTMLDivElement>(null);

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;
  const IconComponent = currentStep.icon;

  // Auto-scroll the active tab into view whenever step changes
  useEffect(() => {
    if (isOpen && tabButtonsRef.current[currentStepIndex]) {
      tabButtonsRef.current[currentStepIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    contentBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex, isOpen]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-white dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-md shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Moat Academy Öğrenme Yolculuğu Rehberi
                </h2>
                <span className="text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  {currentStepIndex + 1} / {TOUR_STEPS.length}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                İlk defa gelenler için adım adım nereye gitmeli, neyi öğrenmeli yol haritası
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-slate-50/90 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-thin shrink-0">
          {TOUR_STEPS.map((s, idx) => (
            <button
              key={s.id}
              ref={(el) => {
                tabButtonsRef.current[idx] = el;
              }}
              onClick={() => setCurrentStepIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                idx === currentStepIndex
                  ? "bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400/40"
                  : idx < currentStepIndex
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{s.stepNumber}.</span>
              <span>{s.tabName}</span>
              {idx < currentStepIndex && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div ref={contentBodyRef} className="p-5 sm:p-7 space-y-5 overflow-y-auto flex-1 min-h-0">
          {/* Step Hero */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl border ${currentStep.iconBg}`}>
                <IconComponent className={`w-8 h-8 ${currentStep.iconColor}`} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  {currentStep.badge}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                  {currentStep.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                  {currentStep.summary}
                </p>
              </div>
            </div>
          </div>

          {/* What will you learn list */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Bu Adımda Neler Öğrenecek ve Keşfedeceksiniz?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentStep.whatYouWillLearn.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Action Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <strong className="font-bold text-amber-900 dark:text-amber-200 block">
                Önerilen Hemen Eylem Planı:
              </strong>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                {currentStep.recommendedAction}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={isFirstStep}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isFirstStep
                  ? "opacity-40 cursor-not-allowed text-slate-400"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Önceki
            </button>

            <button
              onClick={() => setCurrentStepIndex((prev) => Math.min(TOUR_STEPS.length - 1, prev + 1))}
              disabled={isLastStep}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isLastStep
                  ? "opacity-40 cursor-not-allowed text-slate-400"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              Sonraki
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStepAction}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
            >
              <span>{currentStep.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};
