import React, { useState } from "react";
import { CHECKLIST_ITEMS } from "../../data/checklistData";
import { CheckSquare, ShieldCheck, ShieldAlert, ShieldX, Sparkles, RotateCcw } from "lucide-react";

interface CompanyProfile {
  name: string;
  answers: Record<string, boolean>;
}

const PRESET_COMPANIES: CompanyProfile[] = [
  {
    name: "Apple Inc. (Geniş Hendek)",
    answers: {
      "chk-1": true, "chk-2": true, "chk-3": true, "chk-4": true, "chk-5": true, "chk-6": true,
      "chk-7": true, "chk-8": true, "chk-9": true, "chk-10": true, "chk-11": true, "chk-12": true,
      "chk-13": true, "chk-14": true, "chk-15": true, "chk-16": true, "chk-17": true, "chk-18": true,
      "chk-19": true, "chk-20": true, "chk-21": true, "chk-22": true,
    },
  },
  {
    name: "Costco Wholesale (Geniş Hendek)",
    answers: {
      "chk-1": true, "chk-2": true, "chk-3": true, "chk-4": true, "chk-5": true, "chk-6": true,
      "chk-7": true, "chk-8": true, "chk-9": true, "chk-10": true, "chk-11": false, "chk-12": true,
      "chk-13": true, "chk-14": false, "chk-15": true, "chk-16": true, "chk-17": true, "chk-18": true,
      "chk-19": true, "chk-20": true, "chk-21": true, "chk-22": true,
    },
  },
  {
    name: "Ortalama Havayolu (Hendek Yok)",
    answers: {
      "chk-1": false, "chk-2": false, "chk-3": false, "chk-4": false, "chk-5": true, "chk-6": true,
      "chk-7": false, "chk-8": false, "chk-9": false, "chk-10": true, "chk-11": false, "chk-12": false,
      "chk-13": false, "chk-14": true, "chk-15": false, "chk-16": false, "chk-17": false, "chk-18": false,
      "chk-19": false, "chk-20": false, "chk-21": false, "chk-22": false,
    },
  },
];

export const MoatChecklistSim: React.FC = () => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");

  const categories = ["Tümü", ...Array.from(new Set(CHECKLIST_ITEMS.map((item) => item.category)))];

  const totalItems = CHECKLIST_ITEMS.length;
  const checkedCount = Object.values(checkedState).filter(Boolean).length;
  const scorePercent = Math.round((checkedCount / totalItems) * 100);

  let moatVerdict = "Hendek Yok (No Moat)";
  let verdictColor = "text-rose-600";
  let verdictIcon = ShieldX;
  let verdictBadge = "bg-rose-50 text-rose-700 border-rose-200";

  if (scorePercent >= 75) {
    moatVerdict = "Geniş Hendek (Wide Moat - 20+ Yıl Korumalı)";
    verdictColor = "text-emerald-700 dark:text-emerald-400";
    verdictIcon = ShieldCheck;
    verdictBadge = "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
  } else if (scorePercent >= 45) {
    moatVerdict = "Dar Hendek (Narrow Moat - 10-20 Yıl Korumalı)";
    verdictColor = "text-amber-700 dark:text-amber-400";
    verdictIcon = ShieldAlert;
    verdictBadge = "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  }

  const toggleItem = (id: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const loadCompany = (comp: CompanyProfile) => {
    setCheckedState(comp.answers);
  };

  const filteredItems =
    selectedCategory === "Tümü"
      ? CHECKLIST_ITEMS
      : CHECKLIST_ITEMS.filter((item) => item.category === selectedCategory);

  const VerdictIconComponent = verdictIcon;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-slate-100 shadow-xs" id="checklist-sim">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              Morgan Stanley Kontrol Listesi
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">60 Maddelik Ekonomik Hendek Değerlendirme Aracı</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Michael Mauboussin'in makalesinde sunduğu kriterlerle bir şirketin rekabet kalesini puanlayın.
          </p>
        </div>

        <button
          onClick={() => setCheckedState({})}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Temizle
        </button>
      </div>

      {/* Preset Profiles */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Örnek Şirket Yükle:</span>
        {PRESET_COMPANIES.map((comp, idx) => (
          <button
            key={idx}
            onClick={() => loadCompany(comp)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-lg transition-all cursor-pointer"
          >
            {comp.name}
          </button>
        ))}
      </div>

      {/* Score Header Card */}
      <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${verdictBadge} border`}>
            <VerdictIconComponent className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Hendek Değerlendirmesi ({checkedCount} / {totalItems} Kriter)</div>
            <div className={`text-lg font-bold ${verdictColor}`}>{moatVerdict}</div>
          </div>
        </div>

        <div className="w-full md:w-64">
          <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
            <span className="text-slate-500 dark:text-slate-400">Hendek Güç Skoru</span>
            <span className={verdictColor}>%{scorePercent}</span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              style={{ width: `${scorePercent}%` }}
              className={`h-full transition-all duration-500 ${
                scorePercent >= 75
                  ? "bg-emerald-600 dark:bg-emerald-500"
                  : scorePercent >= 45
                  ? "bg-amber-500 dark:bg-amber-400"
                  : "bg-rose-500 dark:bg-rose-400"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mt-6 border-b border-slate-200 dark:border-slate-800 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="mt-4 space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {filteredItems.map((item) => {
          const isChecked = !!checkedState[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isChecked
                  ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700/70 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}} // handled by parent div click
                className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 cursor-pointer accent-indigo-600"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.question}</div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {item.category.split(".")[1] || item.category}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{item.explanation}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-emerald-800 dark:text-emerald-400 font-medium">
                    ✓ <strong>Geniş Hendek:</strong> {item.highScoreIndicator}
                  </div>
                  <div className="text-rose-800 dark:text-rose-400 font-medium">
                    ✗ <strong>Zayıf / Yok:</strong> {item.lowScoreIndicator}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
