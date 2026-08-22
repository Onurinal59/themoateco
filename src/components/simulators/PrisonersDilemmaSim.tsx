import React, { useState } from "react";
import { Swords, RefreshCw, Trophy, ShieldAlert, Sparkles, Award } from "lucide-react";

type StrategyType = "tit-for-tat" | "aggressive" | "cooperative";

interface RoundResult {
  round: number;
  playerChoice: 220 | 200;
  botChoice: 220 | 200;
  playerPayoff: number;
  botPayoff: number;
}

export const PrisonersDilemmaSim: React.FC = () => {
  const [botStrategy, setBotStrategy] = useState<StrategyType>("tit-for-tat");
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const maxRounds = 5;

  const totalPlayerScore = history.reduce((sum, r) => sum + r.playerPayoff, 0);
  const totalBotScore = history.reduce((sum, r) => sum + r.botPayoff, 0);

  const getBotChoice = (strat: StrategyType, hist: RoundResult[]): 220 | 200 => {
    if (strat === "aggressive") return 200; // Always price-cuts
    if (strat === "cooperative") return 220; // Always cooperates
    // Tit-for-tat
    if (hist.length === 0) return 220; // Starts cooperative
    const lastRound = hist[hist.length - 1];
    return lastRound.playerChoice; // Copies opponent's previous move
  };

  const handlePlay = (playerChoice: 220 | 200) => {
    if (currentRound > maxRounds) return;

    const botChoice = getBotChoice(botStrategy, history);

    let playerPayoff = 0;
    let botPayoff = 0;

    if (playerChoice === 220 && botChoice === 220) {
      playerPayoff = 300;
      botPayoff = 300;
    } else if (playerChoice === 200 && botChoice === 220) {
      playerPayoff = 320;
      botPayoff = 120;
    } else if (playerChoice === 220 && botChoice === 200) {
      playerPayoff = 120;
      botPayoff = 320;
    } else {
      playerPayoff = 200;
      botPayoff = 200;
    }

    const newResult: RoundResult = {
      round: currentRound,
      playerChoice,
      botChoice,
      playerPayoff,
      botPayoff,
    };

    setHistory((prev) => [...prev, newResult]);
    setCurrentRound((prev) => prev + 1);
  };

  const resetGame = () => {
    setHistory([]);
    setCurrentRound(1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-slate-100 shadow-xs" id="prisoners-dilemma-sim">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              Oyun Teorisi (Exhibit 36)
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Mahkumlar İkilemi & Bilet Fiyat Savaşı Arenası</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Havayolu A (Siz) vs Havayolu B (Bot). Uçuş başı maliyet $160. Fiyatı kıracak mısınız yoksa işbirliği mi yapacaksınız?
          </p>
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Yeniden Başlat
        </button>
      </div>

      {/* Opponent Selection */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rakip Havayolu B Karakteri:</span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "tit-for-tat", label: "Tit-for-Tat (Kısasa Kısas - Akıllı)" },
            { id: "aggressive", label: "Sürekli Fiyat Kıran (Agresif)" },
            { id: "cooperative", label: "Sürekli Yüksek Tutan (Saf Barışçıl)" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setBotStrategy(s.id as StrategyType);
                resetGame();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                botStrategy === s.id
                  ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-semibold"
                  : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Game Matrix Visualizer */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* The 2x2 Payoff Matrix Table */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
          <div className="text-xs font-bold text-center text-slate-500 dark:text-slate-400 mb-3">
            Ödül Matrisi (Morgan Stanley Exhibit 36)
          </div>
          <div className="grid grid-cols-3 text-center text-xs font-mono">
            <div></div>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 p-1">Rakip: 220$</div>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 p-1">Rakip: 200$</div>

            <div className="font-bold text-slate-800 dark:text-slate-200 p-2 flex items-center justify-center">Siz: 220$</div>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg m-1">
              <div className="text-emerald-800 dark:text-emerald-300 font-bold">Siz: $300</div>
              <div className="text-indigo-800 dark:text-indigo-300">Rakip: $300</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-sans">Toplam $600 (Kazan-Kazan)</div>
            </div>
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-lg m-1">
              <div className="text-rose-800 dark:text-rose-300 font-bold">Siz: $120</div>
              <div className="text-indigo-800 dark:text-indigo-300">Rakip: $320</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-sans">Kazıklanma</div>
            </div>

            <div className="font-bold text-slate-800 dark:text-slate-200 p-2 flex items-center justify-center">Siz: 200$</div>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-lg m-1">
              <div className="text-indigo-800 dark:text-indigo-300 font-bold">Siz: $320</div>
              <div className="text-rose-800 dark:text-rose-300">Rakip: $120</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-sans">Fiyat Kırma Vurgunu</div>
            </div>
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg m-1">
              <div className="text-slate-800 dark:text-slate-200 font-bold">Siz: $200</div>
              <div className="text-slate-700 dark:text-slate-300">Rakip: $200</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-sans">Toplam $400 (Nash Dengesi)</div>
            </div>
          </div>
        </div>

        {/* Action Controls & Scoreboard */}
        <div className="space-y-4">
          {/* Score Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 text-center shadow-xs">
              <div className="text-xs text-indigo-700 dark:text-indigo-300 font-bold">Sizin Toplam Kârınız</div>
              <div className="text-2xl font-mono font-extrabold text-indigo-900 dark:text-indigo-100 mt-1">${totalPlayerScore}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shadow-xs">
              <div className="text-xs text-slate-600 dark:text-slate-400 font-bold">Rakip Havayolu Kârı</div>
              <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100 mt-1">${totalBotScore}</div>
            </div>
          </div>

          {/* Action Buttons */}
          {currentRound <= maxRounds ? (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Tur {currentRound} / {maxRounds} — Bilet Fiyatınızı Seçin:
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handlePlay(220)}
                  className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-sm transition-all shadow-xs flex flex-col items-center cursor-pointer"
                >
                  <span>220$ (İşbirliği)</span>
                  <span className="text-[10px] text-indigo-100 font-normal mt-0.5">Yüksek Fiyatı Koru</span>
                </button>
                <button
                  onClick={() => handlePlay(200)}
                  className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-white text-sm transition-all shadow-xs flex flex-col items-center cursor-pointer"
                >
                  <span>200$ (Fiyat Kır)</span>
                  <span className="text-[10px] text-rose-100 font-normal mt-0.5">Müşterileri Kap</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center shadow-xs">
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-1.5">
                <Trophy className="w-5 h-5 text-amber-500" /> 5 Tur Tamamlandı!
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {totalPlayerScore > totalBotScore
                  ? "Tebrikler! Rakibinizden daha fazla kâr elde ettiniz."
                  : totalPlayerScore === totalBotScore
                  ? "Mükemmel denge! İki şirket de rasyonel işbirliği yaptı."
                  : "Fiyat savaşları toplam kârınızı eritti."}
              </p>
              <button
                onClick={resetGame}
                className="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Tekrar Oyna
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Round History Log */}
      {history.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Tur Geçmişi:</div>
          <div className="space-y-1.5">
            {history.map((r) => (
              <div
                key={r.round}
                className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-slate-700 dark:text-slate-300"
              >
                <span className="text-slate-500 dark:text-slate-400">Tur #{r.round}</span>
                <span>
                  Siz: <strong className={r.playerChoice === 220 ? "text-indigo-700 dark:text-indigo-400" : "text-rose-600 dark:text-rose-400"}>${r.playerChoice}</strong> (+${r.playerPayoff})
                </span>
                <span>
                  Rakip: <strong className={r.botChoice === 220 ? "text-indigo-700 dark:text-indigo-400" : "text-rose-600 dark:text-rose-400"}>${r.botChoice}</strong> (+${r.botPayoff})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
