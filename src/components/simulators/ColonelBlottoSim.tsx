import React, { useState } from "react";
import { Shield, Target, Award, RotateCcw, HelpCircle, CheckCircle2, Trophy, Swords } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const ColonelBlottoSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
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

  const overallWinner =
    playerWins > oppWins
      ? isEnglish ? "You Won the War!" : "Siz Kazandınız!"
      : oppWins > playerWins
      ? isEnglish ? "Market Incumbent Won" : "Pazar Lideri Kazandı"
      : isEnglish ? "Stalemate / Tie" : "Berabere";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="blotto-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 6+ Advanced Strategy" : "Modül 6+ İleri Strateji"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Colonel Blotto Resource Allocation (Exhibit 37)" : "Albay Blotto Kaynak Dağıtımı (Exhibit 37)"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Colonel Blotto Strategic Resource Allocation" : "Albay Blotto Stratejik Kaynak Dağıtım Simülasyonu"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "Allocate your 100-unit budget across 3 competitive battlefields. Winning at least 2 battlefields wins the war!"
              : "Toplam 100 birimlik bütçenizi 3 farklı pazar/ürün cephesine dağıtın. En az 2 cephede lider rakibi geçen savaşı kazanır!"}
          </p>
        </div>

        <button
          onClick={() => {
            setB1(33);
            setB2(33);
            setB3(34);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset" : "Sıfırla"}
        </button>
      </div>

      {/* Soldier Balance Status */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
        <div className="text-xs text-slate-700 dark:text-slate-300">
          {isEnglish ? "Deployed Budget/Soldiers: " : "Kullanılan Asker/Bütçe: "}
          <strong className={isValid ? "text-emerald-700 dark:text-emerald-400 font-mono text-sm" : "text-rose-600 dark:text-rose-400 font-mono text-sm"}>
            {totalSoldiers} / 100
          </strong>
        </div>
        {!isValid && (
          <div className="text-xs text-rose-600 dark:text-rose-400 font-bold">
            {isEnglish
              ? `Total budget must equal exactly 100! (Difference: ${100 - totalSoldiers > 0 ? "+" : ""}${100 - totalSoldiers})`
              : `Toplam tam olarak 100 olmalıdır! (Kalan/Fazla: ${100 - totalSoldiers})`}
          </div>
        )}
      </div>

      {/* 3 Battlefields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Battlefield 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "1. Front (Core Market)" : "1. Cephe (Ana Pazar)"}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  win1
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : tie1
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {win1
                  ? isEnglish ? "VICTORY" : "KAZANDINIZ"
                  : tie1
                  ? isEnglish ? "TIE" : "BERABERE"
                  : isEnglish ? "DEFEAT" : "KAYBETTİNİZ"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-700 dark:text-indigo-400 font-bold">
                    {isEnglish ? "Your Allocation:" : "Sizin Askeriniz:"}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{b1}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={b1}
                  onChange={(e) => setB1(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{isEnglish ? "Incumbent Allocation:" : "Rakip Lider:"}</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{oppB1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Battlefield 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "2. Front (Growth Segment)" : "2. Cephe (Büyüme Segmenti)"}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  win2
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : tie2
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {win2
                  ? isEnglish ? "VICTORY" : "KAZANDINIZ"
                  : tie2
                  ? isEnglish ? "TIE" : "BERABERE"
                  : isEnglish ? "DEFEAT" : "KAYBETTİNİZ"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-700 dark:text-indigo-400 font-bold">
                    {isEnglish ? "Your Allocation:" : "Sizin Askeriniz:"}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{b2}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={b2}
                  onChange={(e) => setB2(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{isEnglish ? "Incumbent Allocation:" : "Rakip Lider:"}</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{oppB2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Battlefield 3 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isEnglish ? "3. Front (Innovation/Niche)" : "3. Cephe (İnovasyon / Niş)"}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  win3
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : tie3
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {win3
                  ? isEnglish ? "VICTORY" : "KAZANDINIZ"
                  : tie3
                  ? isEnglish ? "TIE" : "BERABERE"
                  : isEnglish ? "DEFEAT" : "KAYBETTİNİZ"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-700 dark:text-indigo-400 font-bold">
                    {isEnglish ? "Your Allocation:" : "Sizin Askeriniz:"}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{b3}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={b3}
                  onChange={(e) => setB3(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{isEnglish ? "Incumbent Allocation:" : "Rakip Lider:"}</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{oppB3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Outcome Card */}
      <div
        className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          playerWins > oppWins
            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80"
            : oppWins > playerWins
            ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80"
            : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
        }`}
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              playerWins > oppWins
                ? "bg-emerald-600 text-white"
                : oppWins > playerWins
                ? "bg-rose-600 text-white"
                : "bg-slate-600 text-white"
            }`}
          >
            {playerWins > oppWins ? <Trophy className="w-6 h-6" /> : <Swords className="w-6 h-6" />}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isEnglish ? "Strategic Showdown Result" : "Stratejik Savaş Sonucu"}
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              {overallWinner} ({isEnglish ? `Front Score: ${playerWins} - ${oppWins}` : `Cephe Skoru: ${playerWins} - ${oppWins}`})
            </h3>
          </div>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 text-center sm:text-right max-w-sm">
          {playerWins > oppWins
            ? isEnglish
              ? "By concentrating resources where the incumbent under-allocated (e.g. 35, 35, 30), you won 2 of 3 battlefields with equal total resources!"
              : "Liderin az kaynak ayırdığı 2 cepheye yoğunlaşarak (Örn: 35, 35, 30) eşit toplam bütçeyle savaşı kazandınız!"
            : isEnglish
            ? "Resource dilution: Spreading troops evenly or over-allocating on the incumbent's fortress led to defeat on other fronts."
            : "Kaynak seyreltmesi: Askerlerinizi her yere eşit dağıtmak veya liderin en güçlü olduğu yere fazla asker koymak diğer cepheleri kaybettirdi."}
        </div>
      </div>

      {/* Mauboussin Exhibit 37 Strategic Insight */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300">
          <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>{isEnglish ? "Mauboussin Lesson: The Power of Focus" : "Mauboussin Dersi: Odaklanmanın Gücü"}</span>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {isEnglish
            ? "In competitive markets, the incumbent with the same overall budget cannot defend every single market segment equally. Challengers that concentrate capital on 2 key niches can defeat larger incumbents even with symmetrical resources."
            : "Pazar liderleri her cepheyi aynı anda mükemmel savunamaz. Meydan okuyan şirketler, liderin zaaflarına odaklanarak ve kaynaklarını doğru 2 segmente yığarak lideri devirebilir."}
        </p>
      </div>
    </div>
  );
};
