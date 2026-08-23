import React, { useState } from "react";
import { Swords, RotateCcw, Trophy, ShieldAlert, Sparkles, Award, CheckCircle2 } from "lucide-react";

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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="prisoners-dilemma-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              Modül 6 Laboratuvarı
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Oyun Teorisi & Fiyat Savaşları (Exhibit 36)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Mahkumlar İkilemi & Bilet Fiyat Savaşı Arenası
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            Havayolu A (Siz) vs Havayolu B (Bot). Uçuş başı maliyet $160. Fiyatı kırıp pazar payı mı çalacaksınız yoksa işbirliğiyle kâr marjını mı koruyacaksınız?
          </p>
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Sıfırla
        </button>
      </div>

      {/* Opponent Strategy Selection */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
          Rakip Havayolu B Stratejisi:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { id: "tit-for-tat", title: "Tit-for-Tat (Kısasa Kısas)", desc: "İşbirliği ile başlar, son hamlenizi aynen taklit eder." },
            { id: "aggressive", title: "Sürekli Agresif (Fiyat Kırıcı)", desc: "Her turda fiyatı $200'a indirerek pazar payınızı hedefler." },
            { id: "cooperative", title: "Saf Barışçıl (Yüksek Fiyat)", desc: "Siz ne yaparsanız yapın $220 yüksek fiyatta kalır." },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setBotStrategy(s.id as StrategyType);
                resetGame();
              }}
              className={`p-3 rounded-2xl border text-left transition-all text-xs cursor-pointer group ${
                botStrategy === s.id
                  ? "bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500/20"
                  : "bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/40 border-slate-200 dark:border-slate-700/80"
              }`}
            >
              <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {s.title}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-tight">
                {s.desc}
              </div>
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

      {/* Standardized Pedagogical Lesson Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <strong className="font-bold text-indigo-900 dark:text-indigo-300 block">Oyun Teorisi & Fiyat Disiplini:</strong>
          Kapasite fazlası ve yüksek sabit maliyetli sektörlerde (Havayolları, Çimento, Deniz Taşımacılığı) fiyat kırmak kısa vadeli kurnazlık gibi görünse de rakibin misillemesiyle sektörün tüm sermaye getirisini (ROIC) yok eder.
        </div>
      </div>
    </div>
  );
};
