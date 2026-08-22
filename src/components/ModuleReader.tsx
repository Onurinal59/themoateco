import React, { useState, useEffect } from "react";
import { LearningModule, UserLearningState } from "../types";
import { RoicWaccSim } from "./simulators/RoicWaccSim";
import { DickinsonLifecycleSim } from "./simulators/DickinsonLifecycleSim";
import { ValueStickSim } from "./simulators/ValueStickSim";
import { ProfitPoolSim } from "./simulators/ProfitPoolSim";
import { FootnoteDetectiveLab } from "./simulators/FootnoteDetectiveLab";
import { PrisonersDilemmaSim } from "./simulators/PrisonersDilemmaSim";
import { ColonelBlottoSim } from "./simulators/ColonelBlottoSim";
import { DuPontSim } from "./simulators/DuPontSim";
import { CashConversionSim } from "./simulators/CashConversionSim";
import { ReverseDCFSim } from "./simulators/ReverseDCFSim";
import { MoatChecklistSim } from "./simulators/MoatChecklistSim";
import { SimTab } from "./SimulationsView";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Trophy,
  BookOpen,
  MessageSquare,
  RotateCcw,
  Clock,
  Layers,
  FlaskConical,
  Play,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ModuleReaderProps {
  module: LearningModule;
  allModules: LearningModule[];
  userState: UserLearningState;
  onBackToRoadmap: () => void;
  onSelectModule: (m: LearningModule) => void;
  onCompleteModule: (moduleId: number, score: number) => void;
  onOpenAICoach: () => void;
  onOpenGlossary: (termId?: string) => void;
  onOpenLabSim?: (simId: SimTab) => void;
}

// Module to Lab Simulator Mapping for "Kendin Dene" feature
interface ModuleLabConfig {
  simId: SimTab;
  title: string;
  badge: string;
  description: string;
  buttonLabel: string;
}

const MODULE_LAB_MAPPINGS: Record<number, ModuleLabConfig> = {
  1: {
    simId: "roic-wacc",
    title: "ROIC vs WACC & Şato Hendeği Simülatörü",
    badge: "MODÜL 1 İLE İLİŞKİLİ",
    description: "Sıfırdan başlangıç: Limonata tezgahından holdinge, sermaye maliyeti (WACC) ile NOPAT getirisini (ROIC) ve yaratılan gerçek refahı hesaplayın.",
    buttonLabel: "ROIC & Şato Simülatöründe Kendin Dene",
  },
  2: {
    simId: "dickinson",
    title: "Dickinson Yaşam Döngüsü & Nakit Akış Röntgeni",
    badge: "MODÜL 2 İLE İLİŞKİLİ",
    description: "Faaliyet, Yatırım ve Finansman nakit akışlarının (+ / -) yönlerini değiştirerek şirketin Giriş, Büyüme, Olgunluk veya Düşüş evresini anında teşhis edin.",
    buttonLabel: "Yaşam Döngüsü Laboratuvarında Kendin Dene",
  },
  3: {
    simId: "value-stick",
    title: "Değer Çubuğu (Value Stick - WTP, Fiyat, Maliyet, WTS) Simülatörü",
    badge: "MODÜL 3 İLE İLİŞKİLİ",
    description: "Müşterinin ödeme isteği (WTP) ile tedarikçi tabanı (WTS) arasındaki rant paylaşımını interaktif çubuk üzerinde kaydırarak test edin.",
    buttonLabel: "Değer Çubuğunda Kendin Dene",
  },
  4: {
    simId: "profit-pool",
    title: "Havacılık Sektörü Kâr Havuzu (Profit Pool) Analiz Laboratuvarı",
    badge: "MODÜL 4 İLE İLİŞKİLİ",
    description: "Sermaye payı ile ekonomik getiri (ROIC-WACC) alanlarını interaktif sütun grafiğinde keşfedin.",
    buttonLabel: "Kâr Havuzunda Kendin Dene",
  },
  5: {
    simId: "footnote-detective",
    title: "10-K Dipnot Dedektifi & Giriş Engelleri (Ar-Ge & Kira Düzeltmeleri)",
    badge: "MODÜL 5 İLE İLİŞKİLİ",
    description: "Ar-Ge aktifleştirmesi ve faaliyet kiralaması kapitalizasyonu ile şirketin gerçek ekonomik sermaye tabanını ortaya çıkarın.",
    buttonLabel: "Dipnot Dedektifinde Kendin Dene",
  },
  6: {
    simId: "game-theory",
    title: "Oyun Teorisi & Mahkumlar İkilemi (Fiyat Savaşları ve Tit-for-Tat)",
    badge: "MODÜL 6 İLE İLİŞKİLİ",
    description: "Fiyat kırma savaşlarında Nash dengesini, Tit-for-Tat taktiğini ve Albay Blotto niş dağıtımını simüle edin.",
    buttonLabel: "Oyun Teorisi Simülatöründe Kendin Dene",
  },
  7: {
    simId: "dupont",
    title: "DuPont ROIC Röntgeni & Nakit Dönüşüm Süresi (CCC)",
    badge: "MODÜL 7 İLE İLİŞKİLİ",
    description: "Costco (Hız Şampiyonu) ile Coca-Cola (Marj Şampiyonu) arasındaki DuPont ayrıştırmasını ve Amazon'un negatif CCC döngüsünü inceleyin.",
    buttonLabel: "DuPont Röntgeninde Kendin Dene",
  },
  8: {
    simId: "reverse-dcf",
    title: "İleri Düzey Tersine DCF & 60 Maddelik Morgan Stanley Hendek Denetimi",
    badge: "MODÜL 8 İLE İLİŞKİLİ",
    description: "Büyük Final: Piyasa fiyatının ima ettiği CAP süresini (yıl) ve şirketin 60 kriterlik kurumsal hendek skorunu ölçün.",
    buttonLabel: "Tersine DCF ve Hendek Denetiminde Kendin Dene",
  },
};

export const ModuleReader: React.FC<ModuleReaderProps> = ({
  module,
  allModules,
  userState,
  onBackToRoadmap,
  onSelectModule,
  onCompleteModule,
  onOpenAICoach,
  onOpenGlossary,
  onOpenLabSim,
}) => {
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Reset quiz when module changes
  useEffect(() => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [module.id]);

  const currentIndex = allModules.findIndex((m) => m.id === module.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (module.quiz.length === 0) return;

    let correctCount = 0;
    module.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / module.quiz.length) * 100);
    setQuizScore(score);
    setIsQuizSubmitted(true);
    onCompleteModule(module.id, score);

    // Trigger confetti if high score
    if (score >= 66) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(null);
  };

  // Helper to render widget if specified in section
  const renderWidget = (widgetId?: string) => {
    switch (widgetId) {
      case "roic-wacc":
        return <RoicWaccSim />;
      case "dickinson":
        return <DickinsonLifecycleSim />;
      case "value-stick":
        return <ValueStickSim />;
      case "dupont":
        return <DuPontSim />;
      case "profit-pool":
        return <ProfitPoolSim />;
      case "footnote-detective":
        return <FootnoteDetectiveLab />;
      case "game-theory":
        return <PrisonersDilemmaSim />;
      case "blotto":
        return <ColonelBlottoSim />;
      case "ccc":
        return <CashConversionSim />;
      case "reverse-dcf":
        return <ReverseDCFSim />;
      case "checklist":
        return <MoatChecklistSim />;
      default:
        return null;
    }
  };

  const labConfig = MODULE_LAB_MAPPINGS[module.id];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16 px-1 sm:px-0" id="module-reader">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <button
          onClick={onBackToRoadmap}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Yol Haritasına Dön</span>
        </button>

        <div className="flex items-center gap-2">
          {labConfig && onOpenLabSim && (
            <button
              onClick={() => onOpenLabSim(labConfig.simId)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Bu modülün simülatörünü laboratuvarda aç"
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Laboratuvarda Dene</span>
              <span className="sm:hidden">Laboratuvar</span>
            </button>
          )}

          <button
            onClick={() => onOpenGlossary()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Sözlük</span>
          </button>
          
          <button
            onClick={onOpenAICoach}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Koça Sor</span>
          </button>
        </div>
      </div>

      {/* Module Title Header Card */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 uppercase tracking-wider">
            Modül 0{module.id}
          </span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {module.subtitle}
          </span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            ~{module.estimatedMinutes} Dakika
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {module.title}
        </h1>

        <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {module.description}
        </p>

        {/* Zero-Knowledge Everyday Analogy Card */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>0'dan Başlayanlar İçin Günlük Hayat Özeti:</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed opacity-95">
            {module.zeroKnowledgeSummary}
          </p>
        </div>
      </div>

      {/* Module Sections */}
      <div className="space-y-6">
        {module.sections.map((section, sIdx) => (
          <div
            key={section.id}
            className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 sm:space-y-6"
          >
            {/* Section Header */}
            <div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                Bölüm {sIdx + 1}
              </div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {section.summary}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3 text-xs sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="whitespace-pre-line leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Analogy Box */}
            {section.analogyBox && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  {section.analogyBox.title}
                </div>
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300/90 leading-relaxed">
                  {section.analogyBox.description}
                </p>
              </div>
            )}

            {/* Interactive Widget if linked */}
            {section.interactiveWidgetId && (
              <div className="pt-2">
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
                  Bu Bölüme Özel İnteraktif Simülatör
                </div>
                {renderWidget(section.interactiveWidgetId)}
              </div>
            )}

            {/* Key Takeaway */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-slate-100">Akılda Kalacak İlke:</strong>{" "}
                {section.keyTakeaway}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "Kendin Dene" Interactive Lab Gateway Banner */}
      {labConfig && onOpenLabSim && (
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-lg border border-indigo-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase tracking-wider">
                🧪 {labConfig.badge}
              </span>
              <span className="text-xs text-indigo-300 font-medium">Uygulamalı Atölye</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {labConfig.title}
            </h3>
            <p className="text-xs text-indigo-200/90 leading-relaxed max-w-xl">
              {labConfig.description}
            </p>
          </div>

          <button
            onClick={() => onOpenLabSim(labConfig.simId)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50 font-black text-xs transition-all shadow-md hover:scale-103 cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>Kendin Dene</span>
          </button>
        </div>
      )}

      {/* Interactive Module Quiz */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6" id="module-quiz">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Kavrama Testi
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Modül Sonu Değerlendirme Testi ({module.quiz.length} Soru)
            </h3>
          </div>
          {isQuizSubmitted && (
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Tekrar Dene
            </button>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {module.quiz.map((q, qIdx) => {
            const selectedOpt = selectedAnswers[q.id];
            const isCorrect = selectedOpt === q.correctAnswerIndex;

            return (
              <div key={q.id} className="space-y-3">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {qIdx + 1}. {q.question}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = selectedOpt === optIdx;
                    let optionStyle =
                      "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300";

                    if (isOptionSelected) {
                      optionStyle =
                        "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-200 font-semibold";
                    }

                    if (isQuizSubmitted) {
                      if (optIdx === q.correctAnswerIndex) {
                        optionStyle =
                          "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold";
                      } else if (isOptionSelected && !isCorrect) {
                        optionStyle =
                          "bg-red-50 dark:bg-red-950/60 border-red-400 dark:border-red-700 text-red-900 dark:text-red-200";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        disabled={isQuizSubmitted}
                        className={`w-full p-3 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${optionStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on submission */}
                {isQuizSubmitted && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isCorrect
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50"
                        : "bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-300 border border-red-200 dark:border-red-900/50"
                    }`}
                  >
                    <div className="font-bold mb-0.5 flex items-center gap-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Doğru Cevap!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span>Gözden Geçiriniz:</span>
                        </>
                      )}
                    </div>
                    <div>{q.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Action / Result */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {!isQuizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < module.quiz.length}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-xs shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              Testi Tamamla ve Puanımı Hesapla
            </button>
          ) : (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-amber-500" />
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    Başarı Oranınız
                  </div>
                  <div className="text-lg font-black text-slate-900 dark:text-slate-100 font-mono">
                    %{quizScore}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Module Navigation (Prev / Next) */}
      <div className="flex items-center justify-between gap-4 pt-4">
        {prevModule ? (
          <button
            onClick={() => onSelectModule(prevModule)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Önceki: {prevModule.title}</span>
            <span className="sm:hidden">Önceki Modül</span>
          </button>
        ) : (
          <div />
        )}

        {nextModule ? (
          <button
            onClick={() => onSelectModule(nextModule)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer ml-auto"
          >
            <span className="hidden sm:inline">Sonraki: {nextModule.title}</span>
            <span className="sm:hidden">Sonraki Modül</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToRoadmap}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer ml-auto"
          >
            <span>Müfredatı Tamamla (Yol Haritası)</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
