import React, { useState } from "react";
import { Shield, Target, Award, RotateCcw, HelpCircle } from "lucide-react";

export const ColonelBlottoSim: React.FC = () => {
  const [b1, setB1] = useState<number>(33);
  const [b2, setB2] = useState<number>(33);
  const [b3, setB3] = useState<number>(34);

  // Opponent default allocation (Exhibit 37: 30, 30, 40)
  const oppB1 = 30;
  const oppB2 = 30;
  const oppB3 = 40;

  const totalSoldiers = b1 + b2 + b3;
  const isValid = totalSoldiers === 100;

  // Battle outcomes
  const win1 = b1 > oppB1;
  const tie1 = b1 === oppB1;
  const win2 = b2 > oppB2;
  const tie2 = b2 === oppB2;
  const win3 = b3 > oppB3;
  const tie3 = b3 === oppB3;

  const playerWins = (win1 ? 1 : 0) + (win2 ? 1 : 0) + (win3 ? 1 : 0);
  const oppWins = (!win1 && !tie1 ? 1 : 0) + (!win2 && !tie2 ? 1 : 0) + (!win3 && !tie3 ? 1 : 0);

  const overallWinner = playerWins > oppWins ? "Siz Kazandınız!" : oppWins > playerWins ? "Pazar Lideri Kazandı" : "Berabere";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-slate-100 shadow-xs" id="blotto-sim">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              Oyun Teorisi (Exhibit 37)
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Albay Blotto Stratejik Kaynak Dağıtım Oyunu</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Toplam 100 askerinizi (bütçenizi) 3 cepheye dağıtın. En az 2 cepheyi kazanan savaşı kazanır!
          </p>
        </div>

        <button
          onClick={() => {
            setB1(33);
            setB2(33);
            setB3(34);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
        </button>
      </div>

      {/* Soldier Balance Status */}
      <div className="mt-4 flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
        <div className="text-xs text-slate-700 dark:text-slate-300">
          Kullanılan Asker: <strong className={isValid ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>{totalSoldiers} / 100</strong>
        </div>
        {!isValid && (
          <div className="text-xs text-rose-600 dark:text-rose-400 font-bold">
            Toplam tam olarak 100 asker olmalıdır! (Fark: {100 - totalSoldiers})
          </div>
        )}
      </div>

      {/* 3 Battlefields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Battlefield 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">1. Cephe (Ana Pazar)</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  win1
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : tie1
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {win1 ? "KAZANDINIZ" : tie1 ? "BERABERE" : "KAYBETTİNİZ"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-700 dark:text-indigo-400 font-bold">Sizin Askeriniz:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{b1}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={b1}
                  onChange={(e) => setB1(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Pazar Lideri Askeri:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{oppB1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Battlefield 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">2. Cephe (İkincil Pazar)</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  win2
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : tie2
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {win2 ? "KAZANDINIZ" : tie2 ? "BERABERE" : "KAYBETTİNİZ"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-700 dark:text-indigo-400 font-bold">Sizin Askeriniz:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{b2}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={b2}
                  onChange={(e) => setB2(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Pazar Lideri Askeri:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{oppB2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Battlefield 3 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">3. Cephe (Niş / Yeni Pazar)</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  win3
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : tie3
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {win3 ? "KAZANDINIZ" : tie3 ? "BERABERE" : "KAYBETTİNİZ"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-700 dark:text-indigo-400 font-bold">Sizin Askeriniz:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{b3}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={b3}
                  onChange={(e) => setB3(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Pazar Lideri Askeri:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{oppB3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome Verdict */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Genel Sonuç (Skor: {playerWins} - {oppWins})</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">{overallWinner}</div>
          </div>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 max-w-md leading-relaxed text-right">
          💡 <strong>Stratejik Ders:</strong> Zayıf oyuncu, dev rakibin en çok asker yığdığı 3. cepheyi (40 asker) terk edip; 1. ve 2. cephelere 33'er asker yığarak 2-1 savaşı kazanabilir (Favorable Mismatch)!
        </div>
      </div>
    </div>
  );
};
