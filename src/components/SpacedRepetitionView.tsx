import React, { useState } from "react";
import { Flashcard, UserLearningState } from "../types";
import { INITIAL_FLASHCARDS } from "../data/flashcardsData";
import { calculateSM2, saveUserLearningState } from "../utils/spacedRepetition";
import {
  RotateCcw,
  Sparkles,
  Repeat,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";

interface SpacedRepetitionViewProps {
  userState: UserLearningState;
  setUserState: React.Dispatch<React.SetStateAction<UserLearningState>>;
  onOpenGlossary: (termId?: string) => void;
  onOpenAICoach: () => void;
}

export const SpacedRepetitionView: React.FC<SpacedRepetitionViewProps> = ({
  userState,
  setUserState,
  onOpenGlossary,
  onOpenAICoach,
}) => {
  const [activeModuleFilter, setActiveModuleFilter] = useState<number | "Tümü">("Tümü");
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Cards array based on userState or fallback
  const cardsList = INITIAL_FLASHCARDS.map((initCard) => {
    return userState.flashcardStates[initCard.id] || initCard;
  });

  const filteredCards =
    activeModuleFilter === "Tümü"
      ? cardsList
      : cardsList.filter((c) => c.moduleId === activeModuleFilter);

  const currentCard = filteredCards[currentCardIndex] || filteredCards[0];

  const handleRate = (quality: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    const updatedCard = calculateSM2(currentCard, quality);

    const updatedStates = {
      ...userState.flashcardStates,
      [updatedCard.id]: updatedCard,
    };

    // Calculate mastered count (repetitions >= 3)
    const masteredCount = (Object.values(updatedStates) as Flashcard[]).filter(
      (c) => c.repetitions >= 3
    ).length;

    const newState: UserLearningState = {
      ...userState,
      flashcardStates: updatedStates,
      masteredCardsCount: masteredCount,
    };

    setUserState(newState);
    saveUserLearningState(newState);

    if (quality === 4 && updatedCard.repetitions >= 3) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }

    // Move to next card
    setIsFlipped(false);
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const masteredTotal = (Object.values(userState.flashcardStates) as Flashcard[]).filter(
    (c) => c.repetitions >= 3
  ).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16" id="spaced-repetition-view">
      {/* Header Info */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
            Hermann Ebbinghaus Unutma Eğrisi & SM-2 Algoritması
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Aralıklı Tekrarlama (Spaced Repetition) Laboratuvarı
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Beyniniz yeni öğrendiği bilgilerin %70'ini 24 saat içinde unutur. Bu algoritma, tam unutmak üzere olduğunuz kritik eşiklerde kartları tekrar karşınıza çıkararak bilgiyi kalıcı hafızaya kazır.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Toplam Kart</div>
            <div className="text-xl font-mono font-bold text-slate-900 dark:text-slate-100 mt-0.5">{INITIAL_FLASHCARDS.length}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">Kalıcı Hafızada (Usta)</div>
            <div className="text-xl font-mono font-bold text-emerald-800 dark:text-emerald-200 mt-0.5">{masteredTotal}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
            <div className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">Öğrenme Aşamasında</div>
            <div className="text-xl font-mono font-bold text-amber-800 dark:text-amber-200 mt-0.5">
              {INITIAL_FLASHCARDS.length - masteredTotal}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50">
            <div className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold">Aktif Seri</div>
            <div className="text-xl font-mono font-bold text-indigo-800 dark:text-indigo-200 mt-0.5">
              {userState.currentStreak} Gün 🔥
            </div>
          </div>
        </div>
      </div>

      {/* Module Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-thin">
        {[
          { id: "Tümü" as const, label: "Tüm Kartlar" },
          { id: 1, label: "Modül 1: ROIC & Hendek" },
          { id: 2, label: "Modül 2: Havacılık & Sektör" },
          { id: 3, label: "Modül 3: Değer Çubuğu (WTP)" },
          { id: 4, label: "Modül 4: DuPont Analizi" },
          { id: 5, label: "Modül 5: Giriş Engelleri & CCC" },
          { id: 6, label: "Modül 6: Oyun Teorisi" },
          { id: 7, label: "Modül 7: Yıkıcı İnovasyon" },
          { id: 8, label: "Modül 8: 60 Maddelik Kontrol" },
        ].map((f) => (
          <button
            key={String(f.id)}
            onClick={() => {
              setActiveModuleFilter(f.id);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeModuleFilter === f.id
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* The Interactive Flip Card */}
      {currentCard ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Kart {currentCardIndex + 1} / {filteredCards.length}
            </span>
            <span className="font-mono">
              Tekrar: {currentCard.repetitions} | Aralık: {currentCard.intervalDays} Gün | Kolaylık: {currentCard.easeFactor}
            </span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[300px] sm:min-h-[340px] p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between shadow-xs relative select-none group"
          >
            {/* Top Card Badge */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase border border-slate-200 dark:border-slate-700">
                {currentCard.term}
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                <Repeat className="w-3.5 h-3.5" /> Çevirmek için tıkla
              </span>
            </div>

            {/* Middle Question / Answer */}
            <div className="my-auto py-4 text-center">
              {!isFlipped ? (
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Soru / Problem
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed max-w-xl mx-auto">
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Cevap & Açıklama
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed max-w-xl mx-auto">
                    {currentCard.answer}
                  </p>
                  <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 max-w-xl mx-auto leading-relaxed text-left">
                    💡 <strong>Somut Analoji:</strong> {currentCard.analogy}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Tip */}
            <div className="text-center text-[11px] text-slate-400 dark:text-slate-500">
              {!isFlipped ? "Cevabı zihninizde canlandırın ve ardından kartı çevirin" : "Şimdi cevabınızı değerlendirin"}
            </div>
          </div>

          {/* SM-2 Quality Rating Buttons */}
          {isFlipped ? (
            <div className="space-y-2 animate-in fade-in duration-200">
              <div className="text-center text-xs font-bold text-slate-600 dark:text-slate-300">
                Bu bilgiyi ne kadar rahat hatırladınız?
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleRate(1)}
                  className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span>1. Unuttum (Yeniden)</span>
                  <span className="text-[10px] font-normal text-rose-600 dark:text-rose-400">Yarın tekrar sor</span>
                </button>
                <button
                  onClick={() => handleRate(2)}
                  className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span>2. Zor Hatırladım</span>
                  <span className="text-[10px] font-normal text-amber-600 dark:text-amber-400">2-3 gün sonra</span>
                </button>
                <button
                  onClick={() => handleRate(3)}
                  className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-900/60 text-sky-800 dark:text-sky-200 text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span>3. İyi Bildim</span>
                  <span className="text-[10px] font-normal text-sky-600 dark:text-sky-400">5-7 gün sonra</span>
                </button>
                <button
                  onClick={() => handleRate(4)}
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition-colors flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span>4. Mükemmel (Çok Kolay)</span>
                  <span className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400">14+ gün sonra</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setIsFlipped(true)}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs transition-all shadow-xs cursor-pointer"
              >
                Cevabı Göster
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
          Bu modüle ait kart bulunamadı.
        </div>
      )}
    </div>
  );
};
