import React, { useState } from "react";
import { getChecklistItems } from "../../data/checklistData";
import { CheckSquare, ShieldCheck, ShieldAlert, ShieldX, Sparkles, RotateCcw, CheckCircle2, Trophy, HelpCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface CompanyProfile {
  nameTr: string;
  nameEn: string;
  answers: Record<string, boolean>;
}

const PRESET_COMPANIES: CompanyProfile[] = [
  {
    nameTr: "Apple Inc. (Geniş Hendek)",
    nameEn: "Apple Inc. (Wide Moat)",
    answers: {
      "chk-1": true, "chk-2": true, "chk-3": true, "chk-4": true, "chk-5": true, "chk-6": true,
      "chk-7": true, "chk-8": true, "chk-9": true, "chk-10": true, "chk-11": true, "chk-12": true,
      "chk-13": true, "chk-14": true, "chk-15": true, "chk-16": true, "chk-17": true, "chk-18": true,
      "chk-19": true, "chk-20": true, "chk-21": true, "chk-22": true,
    },
  },
  {
    nameTr: "Costco Wholesale (Geniş Hendek)",
    nameEn: "Costco Wholesale (Wide Moat)",
    answers: {
      "chk-1": true, "chk-2": true, "chk-3": true, "chk-4": true, "chk-5": true, "chk-6": true,
      "chk-7": true, "chk-8": true, "chk-9": true, "chk-10": true, "chk-11": false, "chk-12": true,
      "chk-13": true, "chk-14": false, "chk-15": true, "chk-16": true, "chk-17": true, "chk-18": true,
      "chk-19": true, "chk-20": true, "chk-21": true, "chk-22": true,
    },
  },
  {
    nameTr: "Ortalama Havayolu (Hendek Yok)",
    nameEn: "Average Airline (No Moat)",
    answers: {
      "chk-1": false, "chk-2": false, "chk-3": false, "chk-4": false, "chk-5": true, "chk-6": true,
      "chk-7": false, "chk-8": false, "chk-9": false, "chk-10": true, "chk-11": false, "chk-12": false,
      "chk-13": false, "chk-14": true, "chk-15": false, "chk-16": false, "chk-17": false, "chk-18": false,
      "chk-19": false, "chk-20": false, "chk-21": false, "chk-22": false,
    },
  },
];

export const MoatChecklistSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
  const checklistItems = getChecklistItems(isEnglish);

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: isEnglish ? "All 22 Items" : "Tüm Maddeler (22)" },
    ...Array.from(new Set(checklistItems.map((item) => item.category))).map((cat) => ({
      id: cat,
      label: cat,
    })),
  ];

  const totalItems = checklistItems.length;
  const checkedCount = Object.values(checkedState).filter(Boolean).length;
  const scorePercent = Math.round((checkedCount / totalItems) * 100);

  let moatVerdict = isEnglish ? "No Moat (Capital Destroyer)" : "Hendek Yok (Değer Yok Eden)";
  let verdictColor = "text-rose-600";
  let verdictIcon = ShieldX;
  let verdictBadge = "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800";

  if (scorePercent >= 75) {
    moatVerdict = isEnglish ? "Wide Moat (20+ Years Durable Advantage)" : "Geniş Hendek (Wide Moat - 20+ Yıl Korumalı)";
    verdictColor = "text-emerald-700 dark:text-emerald-400";
    verdictIcon = ShieldCheck;
    verdictBadge = "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
  } else if (scorePercent >= 45) {
    moatVerdict = isEnglish ? "Narrow Moat (5-10 Years Decaying Advantage)" : "Dar Hendek (Narrow Moat - 5-10 Yıl Korumalı)";
    verdictColor = "text-amber-600 dark:text-amber-400";
    verdictIcon = ShieldAlert;
    verdictBadge = "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  }

  const handleToggle = (id: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleApplyPreset = (profile: CompanyProfile) => {
    setCheckedState(profile.answers);
  };

  const handleReset = () => {
    setCheckedState({});
  };

  const filteredItems =
    selectedCategory === "all"
      ? checklistItems
      : checklistItems.filter((item) => item.category === selectedCategory);

  const VerdictIcon = verdictIcon;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="moat-checklist-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 8: Practical Audit" : "Modül 8: Uygulamalı Denetim"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "22-Question Mauboussin Diagnostic" : "22 Maddelik Mauboussin Hendek Testi"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "22-Question Economic Moat Checklist" : "22 Maddelik Ekonomik Hendek Kontrol Listesi"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "Assess your target company against Michael Mauboussin's 22 moat criteria spanning industry structure, Porter's 5 forces, and unit economics."
              : "Hedef şirketinizi Michael Mauboussin'in 22 hendek kriterine göre test edin; şirketin dar, geniş veya sıfır hendekli olduğunu anında tespit edin."}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Clear All" : "Temizle"}
        </button>
      </div>

      {/* Preset Profiles */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {isEnglish ? "Load Benchmark Preset:" : "Örnek Şirketi Yükle:"}
        </span>
        {PRESET_COMPANIES.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleApplyPreset(preset)}
            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {isEnglish ? preset.nameEn : preset.nameTr}
          </button>
        ))}
      </div>

      {/* Score and Moat Verdict Hero Card */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${verdictBadge}`}>
        <div className="flex items-center gap-3 text-center sm:text-left">
          <VerdictIcon className={`w-10 h-10 ${verdictColor} shrink-0`} />
          <div>
            <div className="text-xs font-black uppercase tracking-wider opacity-80">
              {isEnglish ? "Diagnostic Moat Verdict" : "Teşhis & Hendek Sonucu"}
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {moatVerdict}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-slate-100">
              {checkedCount} / {totalItems}
            </div>
            <div className="text-xs font-semibold opacity-80">
              {isEnglish ? `${scorePercent}% Moat Confidence` : `%${scorePercent} Hendek Güven Skoru`}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-indigo-600 text-white shadow-2xs font-bold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3">
        {filteredItems.map((item, idx) => {
          const isChecked = !!checkedState[item.id];
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                isChecked
                  ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 shadow-2xs"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800/80"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}} // handled by parent div
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer shrink-0 accent-emerald-600"
              />

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    #{item.id}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {item.question}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.explanation}
                </p>

                <div className="pt-1.5 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-medium">
                    ✅ {item.highScoreIndicator}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 font-medium">
                    ❌ {item.lowScoreIndicator}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
