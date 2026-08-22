import React, { useState, useEffect } from "react";
import { LearningModule, UserLearningState } from "../types";
import { ValueStickSim } from "./simulators/ValueStickSim";
import { DuPontSim } from "./simulators/DuPontSim";
import { ProfitPoolSim } from "./simulators/ProfitPoolSim";
import { PrisonersDilemmaSim } from "./simulators/PrisonersDilemmaSim";
import { ColonelBlottoSim } from "./simulators/ColonelBlottoSim";
import { CashConversionSim } from "./simulators/CashConversionSim";
import { MoatChecklistSim } from "./simulators/MoatChecklistSim";
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
}

export const ModuleReader: React.FC<ModuleReaderProps> = ({
  module,
  allModules,
  userState,
  onBackToRoadmap,
  onSelectModule,
  onCompleteModule,
  onOpenAICoach,
  onOpenGlossary,
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
      case "value-stick":
        return <ValueStickSim />;
      case "dupont":
        return <DuPontSim />;
      case "profit-pool":
        return <ProfitPoolSim />;
      case "game-theory":
        return <PrisonersDilemmaSim />;
      case "blotto":
        return <ColonelBlottoSim />;
      case "ccc":
        return <CashConversionSim />;
      case "checklist":
        return <MoatChecklistSim />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16" id="module-reader">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToRoadmap}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Yol Haritasına Dön
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenGlossary()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Terimler Sözlüğü
          </button>
          <button
            onClick={onOpenAICoach}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Sokratik Koça Sor
          </button>
        </div>
      </div>

      {/* Module Title Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 uppercase tracking-wider">
            Modül 0{module.id}
          </span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {module.subtitle}
          </span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            ⏱ ~{module.estimatedMinutes} Dakika
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {module.title}
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {module.description}
        </p>

        {/* Zero Knowledge Summary Box */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 mb-1">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Sıfır Bilgi Can Simidi (Giriş & Somut Analoji)
          </div>
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300/90 leading-relaxed">
            {module.zeroKnowledgeSummary}
          </p>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-8">
        {module.sections.map((section, sIdx) => (
          <div
            key={section.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6"
          >
            {/* Section Header */}
            <div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                Bölüm {sIdx + 1}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {section.summary}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
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
                <strong className="text-slate-900 dark:text-slate-100">Akılda Kalacak İlke:</strong> {section.keyTakeaway}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Module Quiz */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6" id="module-quiz">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 uppercase">
                Bilgi Pekiştirme Testi
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Modül Değerlendirme Testi ({module.quiz.length} Soru)</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Öğrendiklerinizi pekiştirin ve kalıcı hafızaya aktarın.
            </p>
          </div>

          {isQuizSubmitted && (
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Testi Yenile
            </button>
          )}
        </div>

        {/* Quiz Questions List */}
        <div className="space-y-6">
          {module.quiz.map((q, qIndex) => {
            const selectedOption = selectedAnswers[q.id];
            const isAnswered = selectedOption !== undefined;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {q.question}
                  </div>
                </div>

                {/* Practical scenario context if available */}
                {q.practicalScenario && (
                  <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                    🎯 <strong>Senaryo:</strong> {q.practicalScenario}
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === q.correctAnswerIndex;

                    let btnClass = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30";

                    if (isQuizSubmitted) {
                      if (isCorrect) {
                        btnClass = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        btnClass = "bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200";
                      }
                    } else if (isSelected) {
                      btnClass = "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isQuizSubmitted}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-3 cursor-pointer disabled:cursor-default ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-mono shrink-0 text-slate-700 dark:text-slate-300">
                          {["A", "B", "C", "D"][optIdx]}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {isQuizSubmitted && (
                  <div
                    className={`mt-3 p-3 rounded-xl text-xs leading-relaxed border animate-in fade-in duration-200 ${
                      selectedOption === q.correctAnswerIndex
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                        : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    <strong>{selectedOption === q.correctAnswerIndex ? "✓ Doğru!" : "✗ Yanlış!"}</strong>{" "}
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Action or Score Result */}
        {!isQuizSubmitted ? (
          <div className="pt-2">
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length !== module.quiz.length}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 font-bold text-white text-sm transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              Cevaplarımı Gönder ve Değerlendir
            </button>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
              <Trophy className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Modül Testi Tamamlandı! Skorunuz: %{quizScore}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {quizScore && quizScore >= 66
                ? "Tebrikler! Bu modülün ana kavramlarını başarıyla kavradınız. Bir sonraki modüle geçebilirsiniz."
                : "Birkaç kavramda tereddüt yaşadınız. İsterseniz dersi tekrar inceleyebilir veya Sokratik Koçtan yardım alabilirsiniz."}
            </p>

            {nextModule && (
              <button
                onClick={() => onSelectModule(nextModule)}
                className="mt-3 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Sonraki Modüle Geç: {nextModule.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Prev / Next Navigation Bar */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {prevModule ? (
          <button
            onClick={() => onSelectModule(prevModule)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Önceki Modül</span>
          </button>
        ) : (
          <div />
        )}

        {nextModule ? (
          <button
            onClick={() => onSelectModule(nextModule)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs transition-colors shadow-xs cursor-pointer"
          >
            <span className="hidden sm:inline">Sonraki Modül: {nextModule.title}</span>
            <span className="sm:hidden">Sonraki Modül</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToRoadmap}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs transition-colors shadow-xs cursor-pointer"
          >
            <span>Tüm Müfredatı Tamamladınız!</span>
            <Trophy className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
