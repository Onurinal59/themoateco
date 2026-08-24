import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LearningModule, UserLearningState } from "./types";
import { useLanguage } from "./context/LanguageContext";
import {
  loadUserLearningState,
  saveUserLearningState,
  checkAndUpdateStreak,
} from "./utils/spacedRepetition";
import { Navbar, NavTab } from "./components/Navbar";
import { RoadmapView } from "./components/RoadmapView";
import { ModuleReader } from "./components/ModuleReader";
import { SpacedRepetitionView } from "./components/SpacedRepetitionView";
import { SimulationsView, SimTab } from "./components/SimulationsView";
import { CompanyAuditLab } from "./components/CompanyAuditLab";
import { MoatDuelView } from "./components/MoatDuelView";
import { INITIAL_PRESET_DOSSIERS } from "./data/companyAuditData";
import { GlossaryModal } from "./components/GlossaryModal";
import { AICoachDrawer } from "./components/AICoachDrawer";
import { OnboardingGuideModal } from "./components/OnboardingGuideModal";
import { FormulaDeepDiveModal } from "./components/FormulaDeepDiveModal";
import { FormulaWorkshopView } from "./components/FormulaWorkshopView";
import { Footer } from "./components/Footer";

export default function App() {
  const { getModules, isEnglish } = useLanguage();
  const currentModules = getModules();

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

  // Formula Deep Dive Modal Global State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);

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
  const [selectedSim, setSelectedSim] = useState<SimTab>("reverse-dcf");
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [aiCoachPrompt, setAiCoachPrompt] = useState<string | undefined>(undefined);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);

  const activeModule = activeModuleId ? currentModules.find(m => m.id === activeModuleId) || null : null;

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
    setActiveModuleId(module.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToRoadmap = () => {
    setActiveModuleId(null);
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
          setActiveModuleId(null);
        }}
        userState={userState}
        onOpenAICoach={() => setIsAICoachOpen(true)}
        onOpenGlossary={() => handleOpenGlossary()}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenFormulas={() => {
          setSelectedFormulaId(null);
          setActiveTab("formulas");
          setActiveModuleId(null);
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          {activeModule ? (
            <motion.div
              key={`module-${activeModule.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ModuleReader
                module={activeModule}
                allModules={currentModules}
                userState={userState}
                onBackToRoadmap={handleBackToRoadmap}
                onSelectModule={handleSelectModule}
                onCompleteModule={handleCompleteModule}
                onOpenAICoach={() => setIsAICoachOpen(true)}
                onOpenGlossary={handleOpenGlossary}
                onOpenLabSim={(simId) => {
                  setSelectedSim(simId);
                  setActiveTab("simulators");
                  setActiveModuleId(null);
                }}
                onOpenFormulaWorkshop={(formulaId) => {
                  setSelectedFormulaId(formulaId);
                  setActiveTab("formulas");
                  setActiveModuleId(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`tab-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
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
                  onNavigateTab={(tab, sim) => {
                    if (sim) setSelectedSim(sim);
                    setActiveTab(tab);
                    setActiveModuleId(null);
                  }}
                />
              )}

              {activeTab === "formulas" && (
                <FormulaWorkshopView
                  selectedFormulaId={selectedFormulaId}
                  onSelectFormula={(id) => setSelectedFormulaId(id)}
                  onNavigateToModule={(moduleId) => {
                    const target = currentModules.find((m) => m.id === moduleId);
                    if (target) {
                      setActiveModuleId(target.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  onNavigateToSim={(simId) => {
                    setSelectedSim(simId as any);
                    setActiveTab("simulators");
                    setActiveModuleId(null);
                  }}
                />
              )}

              {activeTab === "simulators" && (
                <SimulationsView
                  activeSim={selectedSim}
                  onSelectSim={(sim) => setSelectedSim(sim)}
                  onOpenAICoachWithPrompt={(prompt) => {
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modern Footer with Creator LinkedIn Link */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setActiveModuleId(null);
        }}
        onOpenGlossary={() => handleOpenGlossary()}
        onOpenAICoach={() => {
          setAiCoachPrompt(undefined);
          setIsAICoachOpen(true);
        }}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Floating Socratic AI Coach Drawer */}
      <AICoachDrawer
        isOpen={isAICoachOpen}
        onClose={() => {
          setIsAICoachOpen(false);
          setAiCoachPrompt(undefined);
        }}
        currentTopic={
          activeTab === "company-audit"
            ? (isEnglish ? "Company Balance Sheet X-Ray & Moat Diagnostic" : "Şirket Bilançosu Röntgeni & Hendek Teşhisi")
            : activeModule
            ? activeModule.title
            : (isEnglish ? "General Moat Strategy" : "Genel Hendek Stratejisi")
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
        onNavigateTab={(tab, sim) => {
          if (sim) setSelectedSim(sim);
          setActiveTab(tab);
          setActiveModuleId(null);
          try {
            localStorage.setItem("moat_guide_seen", "true");
          } catch {
            // ignore
          }
        }}
        onStartFirstModule={() => {
          setActiveTab("roadmap");
          if (currentModules.length > 0) {
            setActiveModuleId(currentModules[0].id);
          }
          try {
            localStorage.setItem("moat_guide_seen", "true");
          } catch {
            // ignore
          }
        }}
      />

      {/* Global Formula Deep Dive Atelier Modal */}
      <FormulaDeepDiveModal
        isOpen={isFormulaModalOpen}
        initialFormulaId={selectedFormulaId || undefined}
        onClose={() => {
          setIsFormulaModalOpen(false);
          setSelectedFormulaId(null);
        }}
        onOpenFullPage={(fId) => {
          setSelectedFormulaId(fId);
          setActiveTab("formulas");
          setActiveModuleId(null);
        }}
      />
    </div>
  );
}

