import React, { useState } from "react";
import {
  Award,
  ChevronDown,
  ChevronUp,
  Quote,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BookOpen
} from "lucide-react";
import { STEP_METHODOLOGY_GUIDES } from "../data/companyAuditData";

interface MauboussinMethodologyCoachProps {
  activeStep: 1 | 2 | 3 | 4 | 5;
  isTemplateDossier: boolean;
  onAskAICoach?: () => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const MauboussinMethodologyCoach: React.FC<MauboussinMethodologyCoachProps> = ({
  activeStep,
  isTemplateDossier,
  onAskAICoach,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const guide = STEP_METHODOLOGY_GUIDES[activeStep];

  if (!guide) return null;

  return (
    <div
      id={`mauboussin-methodology-guide-step-${activeStep}`}
      className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 text-white shadow-sm transition-all"
    >
      {/* Header & Collapse Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                Michael J. Mauboussin Metodolojik Rehberi
              </span>
              {isTemplateDossier && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Usta Vaka Modu
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-white">
              {guide.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onAskAICoach && (
            <button
              onClick={onAskAICoach}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-xs font-semibold text-white border border-indigo-400/40 transition-colors cursor-pointer"
              title="Bu adım için AI Koç'a Sokratik soru sor"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Koç'a Sor</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
            aria-label={isExpanded ? "Rehberi daralt" : "Rehberi genişlet"}
          >
            <span className="hidden md:inline">{isExpanded ? "Daralt" : "Aç"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="mt-5 space-y-5 pt-4 border-t border-slate-800/80 animate-in fade-in duration-200">
          {/* Mauboussin Quote */}
          <div className="bg-indigo-900/30 border border-indigo-500/20 rounded-2xl p-4 relative">
            <Quote className="w-6 h-6 text-indigo-400/30 absolute right-4 top-4" />
            <blockquote className="text-xs sm:text-sm text-indigo-100/90 italic font-serif leading-relaxed pr-8">
              {guide.mauboussinQuote}
            </blockquote>
          </div>

          {/* Grid of Concepts & Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Concepts */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 space-y-2.5">
              <h5 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Temel Kavramlar & Formüller
              </h5>
              <div className="space-y-2">
                {guide.coreConcepts.map((concept, idx) => {
                  const parts = concept.split(":");
                  return (
                    <div key={idx} className="text-xs leading-relaxed">
                      {parts.length > 1 ? (
                        <>
                          <span className="font-bold text-white bg-slate-700/50 px-1.5 py-0.5 rounded text-[11px] mr-1.5">
                            {parts[0].trim()}
                          </span>
                          <span className="text-slate-300 text-[11px] sm:text-xs">
                            {parts.slice(1).join(":").trim()}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-300 text-[11px] sm:text-xs">{concept}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checklist Questions */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 space-y-2.5">
              <h5 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Kendine Sorulacak Kritik Denetim Soruları
              </h5>
              <ul className="space-y-1.5">
                {guide.keyQuestions.map((q, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-snug">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Pitfalls & Practical Exercise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Common Pitfalls */}
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-4 space-y-2">
              <h5 className="text-xs font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Sık Yapılan Hatalar & Yanılgılar
              </h5>
              <ul className="space-y-1.5">
                {guide.commonPitfalls.map((pitfall, idx) => (
                  <li key={idx} className="text-xs text-rose-200/80 flex items-start gap-2 leading-snug">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Exercise */}
            <div className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Bu Adımın Pratik Görevi
                </h5>
                <p className="text-xs text-amber-100/90 leading-relaxed mt-1">
                  {guide.practicalExercise}
                </p>
              </div>

              {isTemplateDossier && (
                <div className="mt-3 pt-2.5 border-t border-amber-900/30 text-[11px] text-amber-200/80 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>
                    <strong>İpucu:</strong> Mevcut şablondaki Costco & BİM verileri bu adımı tam olarak karşılayacak şekilde formüle edilmiştir.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

