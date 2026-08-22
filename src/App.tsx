import React, { useState, useEffect } from "react";
import { LearningModule, UserLearningState } from "./types";
import { MODULES_DATA } from "./data/modulesData";
import {
  loadUserLearningState,
  saveUserLearningState,
  checkAndUpdateStreak,
} from "./utils/spacedRepetition";
import { Navbar, NavTab } from "./components/Navbar";
import { RoadmapView } from "./components/RoadmapView";
import { ModuleReader } from "./components/ModuleReader";
import { SpacedRepetitionView } from "./components/SpacedRepetitionView";
import { SimulationsView } from "./components/SimulationsView";
import { CompanyAuditLab } from "./components/CompanyAuditLab";
import { MoatDuelView } from "./components/MoatDuelView";
import { FootnoteDetectiveLab } from "./components/simulators/FootnoteDetectiveLab";
import { ReverseDCFSim } from "./components/simulators/ReverseDCFSim";
import { INITIAL_PRESET_DOSSIERS } from "./data/companyAuditData";
import { GlossaryModal } from "./components/GlossaryModal";
import { AICoachDrawer } from "./components/AICoachDrawer";
import { OnboardingGuideModal } from "./components/OnboardingGuideModal";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [userState, setUserState] = useState<UserLearningState>(() => {
    const loaded = loadUserLearningState();
    return checkAndUpdateStreak(loaded);
  });

  // Guide / Onboarding modal state (auto-open for first-time visitors)
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(() => {
    try {
      const seen = localStorage.getItem("moat_guide_seen");
      return !seen;
    } catch {
      return false;
    }
  });

  // Get current dossiers for duel
  const getDossiers = () => {
    try {
      const saved = localStorage.getItem("moat_dossiers");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_PRESET_DOSSIERS;
  };

  const [activeTab, setActiveTab] = useState<NavTab>("roadmap");
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [aiCoachPrompt, setAiCoachPrompt] = useState<string | undefined>(undefined);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);


  // Apply dark mode class to html document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Sync state changes to local storage
  useEffect(() => {
    saveUserLearningState(userState);
  }, [userState]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleSelectModule = (module: LearningModule) => {
    setActiveModule(module);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToRoadmap = () => {
    setActiveModule(null);
    setActiveTab("roadmap");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCompleteModule = (moduleId: number, score: number) => {
    setUserState((prev) => {
      const completed = prev.completedModules.includes(moduleId)
        ? prev.completedModules
        : [...prev.completedModules, moduleId];

      const newScores = {
        ...prev.quizScores,
        [moduleId]: score,
      };

      const updated = {
        ...prev,
        completedModules: completed,
        quizScores: newScores,
      };
      saveUserLearningState(updated);
      return updated;
    });
  };

  const handleOpenGlossary = (termId?: string) => {
    setSelectedGlossaryTermId(termId || null);
    setIsGlossaryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-indigo-200 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveModule(null);
        }}
        userState={userState}
        onOpenAICoach={() => setIsAICoachOpen(true)}
        onOpenGlossary={() => handleOpenGlossary()}
        onOpenGuide={() => setIsGuideOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeModule ? (
          <ModuleReader
            module={activeModule}
            allModules={MODULES_DATA}
            userState={userState}
            onBackToRoadmap={handleBackToRoadmap}
            onSelectModule={handleSelectModule}
            onCompleteModule={handleCompleteModule}
            onOpenAICoach={() => setIsAICoachOpen(true)}
            onOpenGlossary={handleOpenGlossary}
          />
        ) : (
          <>
            {activeTab === "roadmap" && (
              <RoadmapView
                userState={userState}
                onSelectModule={handleSelectModule}
                onOpenGlossary={() => handleOpenGlossary()}
                onOpenGuide={() => setIsGuideOpen(true)}
                onOpenAICoach={() => {
                  setAiCoachPrompt(undefined);
                  setIsAICoachOpen(true);
                }}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === "footnote-detective" && (
              <FootnoteDetectiveLab />
            )}

            {activeTab === "reverse-dcf" && (
              <ReverseDCFSim
                onAskAICoach={(prompt) => {
                  setAiCoachPrompt(prompt);
                  setIsAICoachOpen(true);
                }}
              />
            )}

            {activeTab === "company-audit" && (
              <CompanyAuditLab
                onOpenAICoachWithPrompt={(prompt) => {
                  setAiCoachPrompt(prompt);
                  setIsAICoachOpen(true);
                }}
                onOpenGlossary={handleOpenGlossary}
              />
            )}

            {activeTab === "moat-duel" && (
              <MoatDuelView dossiers={getDossiers()} />
            )}

            {activeTab === "spaced-repetition" && (
              <SpacedRepetitionView
                userState={userState}
                setUserState={setUserState}
                onOpenGlossary={handleOpenGlossary}
                onOpenAICoach={() => {
                  setAiCoachPrompt(undefined);
                  setIsAICoachOpen(true);
                }}
              />
            )}

            {activeTab === "simulators" && <SimulationsView />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
              M
            </div>
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Ekonomik Hendek Akademisi & Bilanço Atölyesi
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                Michael J. Mauboussin & Dan Callahan (Measuring the Moat Uygulaması)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button
              onClick={() => {
                setActiveTab("company-audit");
                setActiveModule(null);
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold cursor-pointer"
            >
              Şirket Analiz Atölyesi
            </button>
            <span>•</span>
            <button
              onClick={() => handleOpenGlossary()}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Terimler Sözlüğü
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab("spaced-repetition");
                setActiveModule(null);
              }}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Aralıklı Tekrarlama (SM-2)
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab("simulators");
                setActiveModule(null);
              }}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Simülasyon Laboratuvarı
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setAiCoachPrompt(undefined);
                setIsAICoachOpen(true);
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold cursor-pointer"
            >
              Sokratik AI Koçu
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Socratic AI Coach Drawer */}
      <AICoachDrawer
        isOpen={isAICoachOpen}
        onClose={() => {
          setIsAICoachOpen(false);
          setAiCoachPrompt(undefined);
        }}
        currentTopic={
          activeTab === "company-audit"
            ? "Şirket Bilançosu Röntgeni & Hendek Teşhisi"
            : activeModule
            ? activeModule.title
            : "Genel Hendek Stratejisi"
        }
        initialPrompt={aiCoachPrompt}
      />

      {/* Full Terminology Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        selectedTermId={selectedGlossaryTermId}
      />

      {/* Onboarding & Journey Guide Modal */}
      <OnboardingGuideModal
        isOpen={isGuideOpen}
        onClose={() => {
          setIsGuideOpen(false);
          try {
            localStorage.setItem("moat_guide_seen", "true");
          } catch {
            // ignore
          }
        }}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setActiveModule(null);
          try {
            localStorage.setItem("moat_guide_seen", "true");
          } catch {
            // ignore
          }
        }}
        onStartFirstModule={() => {
          setActiveTab("roadmap");
          if (MODULES_DATA.length > 0) {
            setActiveModule(MODULES_DATA[0]);
          }
          try {
            localStorage.setItem("moat_guide_seen", "true");
          } catch {
            // ignore
          }
        }}
      />
    </div>
  );
}
