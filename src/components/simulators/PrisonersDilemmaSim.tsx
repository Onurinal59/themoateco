import React, { useState } from "react";
import { Swords, RotateCcw, Trophy, ShieldAlert, Sparkles, Award, CheckCircle2, HelpCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

type StrategyType = "tit-for-tat" | "aggressive" | "cooperative";

interface RoundResult {
  round: number;
  playerChoice: 220 | 200;
  botChoice: 220 | 200;
  playerPayoff: number;
  botPayoff: number;
}

export const PrisonersDilemmaSim: React.FC = () => {
  const { isEnglish, t } = useLanguage();
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

  const handleReset = () => {
    setHistory([]);
    setCurrentRound(1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-6 text-slate-800 dark:text-slate-100 shadow-xs animate-in fade-in duration-200" id="game-theory-sim">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
              {isEnglish ? "Module 6: Game Theory & Pricing" : "Modül 6: Oyun Teorisi & Fiyatlama"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isEnglish ? "Prisoner's Dilemma Duopoly Arena" : "Tutsak İkilemi İkili Tekel Arenası"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEnglish ? "Airline Duopoly Price War Simulation" : "Havayolu Fiyat Savaşı & Oyun Teorisi Simülatörü"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {isEnglish
              ? "Compete against rival Airline B on the NY-London route across 5 seasonal quarters. Maintain ticket price at $220 or slash to $200?"
              : "New York - Londra hattında rakip B Havayolu ile 5 sezon boyunca yarışın. Bilet fiyatını 220$'da mı tutacaksınız yoksa 200$'a kırıp pazar mı kapmaya çalışacaksınız?"}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {isEnglish ? "Reset Game" : "Yeniden Başlat"}
        </button>
      </div>

      {/* Opponent Strategy Selection */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {isEnglish ? "Opponent (Rival B) Strategy:" : "Rakip (B Havayolu) Stratejisi:"}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "tit-for-tat", labelTr: "Kısasa Kısas (Tit-for-Tat)", labelEn: "Tit-for-Tat (Reciprocal)" },
            { id: "aggressive", labelTr: "Sürekli Fiyat Kıran (Agresif)", labelEn: "Always Price Cut (Aggressive)" },
            { id: "cooperative", labelTr: "Daima İşbirlikçi (Barışçıl)", labelEn: "Always Cooperate (Peaceful)" },
          ].map((strat) => (
            <button
              key={strat.id}
              onClick={() => {
                setBotStrategy(strat.id as StrategyType);
                handleReset();
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                botStrategy === strat.id
                  ? "bg-indigo-600 text-white shadow-2xs font-bold"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {isEnglish ? strat.labelEn : strat.labelTr}
            </button>
          ))}
        </div>
      </div>

      {/* 2x2 Payoff Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse border border-slate-200 dark:border-slate-700 text-xs rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
              <th className="p-2.5 border border-slate-200 dark:border-slate-700">
                {isEnglish ? "Payoff Matrix (Quarterly Profit)" : "Kâr Matrisi (Sezonluk Milyon $)"}
              </th>
              <th className="p-2.5 border border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-400">
                {isEnglish ? "Rival B: Keeps High ($220)" : "Rakip B: Yüksek Fiyat ($220)"}
              </th>
              <th className="p-2.5 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400">
                {isEnglish ? "Rival B: Slashes Price ($200)" : "Rakip B: Fiyat Kırar ($200)"}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2.5 font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-400">
                {isEnglish ? "You: Keep High ($220)" : "Siz: Yüksek Fiyat ($220)"}
              </td>
              <td className="p-3 border border-slate-200 dark:border-slate-700 bg-emerald-50/50 dark:bg-emerald-950/30 font-bold text-emerald-800 dark:text-emerald-300">
                {isEnglish ? "Win-Win: $300M / $300M" : "Kazan-Kazan: 300M$ / 300M$"}
              </td>
              <td className="p-3 border border-slate-200 dark:border-slate-700 bg-rose-50/50 dark:bg-rose-950/30 text-slate-700 dark:text-slate-300">
                {isEnglish ? "Siz: $120M / Rakip: $320M" : "Siz: 120M$ / Rakip: 320M$"}
              </td>
            </tr>
            <tr>
              <td className="p-2.5 font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400">
                {isEnglish ? "You: Slash Price ($200)" : "Siz: Fiyat Kır ($200)"}
              </td>
              <td className="p-3 border border-slate-200 dark:border-slate-700 bg-amber-50/50 dark:bg-amber-950/30 text-slate-700 dark:text-slate-300">
                {isEnglish ? "Siz: $320M / Rakip: $120M" : "Siz: 320M$ / Rakip: 120M$"}
              </td>
              <td className="p-3 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-bold text-rose-600 dark:text-rose-400">
                {isEnglish ? "Nash Trap: $200M / $200M" : "Nash Tuzağı: 200M$ / 200M$"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons for Current Round */}
      {currentRound <= maxRounds ? (
        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              {isEnglish ? `Season ${currentRound} of ${maxRounds}` : `${currentRound}. Sezon Hamleniz (Toplam ${maxRounds} Sezon)`}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isEnglish ? "Select your price policy:" : "Fiyat politikanızı seçin:"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handlePlay(220)}
              className="p-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-left transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  {isEnglish ? "Maintain Premium ($220)" : "Fiyatı Koru ($220)"}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                  {isEnglish ? "Discipline" : "İşbirliği"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isEnglish
                  ? "Cooperate with the market; target $300M profit if rival also cooperates."
                  : "Pazarda disiplini koru; rakip de uyarsa 300M$ kâr hedeflenir."}
              </p>
            </button>

            <button
              onClick={() => handlePlay(200)}
              className="p-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-400 text-left transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-rose-700 dark:group-hover:text-rose-300">
                  {isEnglish ? "Slash Price ($200)" : "Fiyat Kır ($200)"}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-300">
                  {isEnglish ? "Price War" : "Fiyat Savaşı"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isEnglish
                  ? "Steal volume from competitor; risk triggering a mutually destructive price war."
                  : "Rakibin müşterisini çal; ancak yıkıcı bir fiyat savaşını tetikleme riski taşırsın."}
              </p>
            </button>
          </div>
        </div>
      ) : (
        /* Game Over Scorecard */
        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {isEnglish ? "Simulation Completed (5 Seasons)" : "Simülasyon Tamamlandı (5 Sezon)"}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                {isEnglish
                  ? `Final Earnings: You $${totalPlayerScore}M vs Rival $${totalBotScore}M`
                  : `Toplam Kâr: Siz ${totalPlayerScore}M$ - Rakip B ${totalBotScore}M$`}
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              {isEnglish ? "Play Again" : "Tekrar Oyna"}
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {totalPlayerScore >= 1400
              ? isEnglish
                ? "🏆 Exemplary Discipline: By maintaining mutual pricing power, both airlines maximized total profit pool without destroying economic value."
                : "🏆 Muazzam Koordinasyon: Her iki havayolu da disiplinli kalarak kâr havuzunu buharlaştırmadan maksimum refah üretti."
              : isEnglish
              ? "⚠️ Price War Trap: Frequent price slashing destroyed industry profit margins, shifting economic surplus entirely to passengers."
              : "⚠️ Fiyat Savaşı Tuzağı: Fiyat kırmalar yüzünden sektörün toplam kârı buharlaştı ve tüm artı değer yolculara aktı."}
          </p>
        </div>
      )}

      {/* History Log */}
      {history.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {isEnglish ? "Quarterly Match History:" : "Geçmiş Sezon Kararları:"}
          </div>
          <div className="space-y-1.5">
            {history.map((h) => (
              <div
                key={h.round}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-mono"
              >
                <span>
                  {isEnglish ? `Season ${h.round}:` : `${h.round}. Sezon:`}
                </span>
                <span className={h.playerChoice === 220 ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-rose-600 dark:text-rose-400 font-bold"}>
                  {isEnglish ? `You: $${h.playerChoice}` : `Siz: ${h.playerChoice}$`}
                </span>
                <span className={h.botChoice === 220 ? "text-emerald-700 dark:text-emerald-400 font-bold" : "text-rose-600 dark:text-rose-400 font-bold"}>
                  {isEnglish ? `Rival B: $${h.botChoice}` : `Rakip B: ${h.botChoice}$`}
                </span>
                <span className="text-slate-900 dark:text-slate-100 font-bold font-sans">
                  {isEnglish ? `Gain: +$${h.playerPayoff}M` : `Kazancınız: +${h.playerPayoff}M$`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Takeaway */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
          <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>{isEnglish ? "Core Strategic Lesson: Nash Equilibrium vs Industry Moat" : "Temel Stratejik Ders: Nash Dengesi ve Hendek"}</span>
        </div>
        <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
          {isEnglish
            ? "When barriers to entry are low and products are undifferentiated, price-cutting is a dominant strategy for individual players, leading inevitably to the Nash trap where ROIC collapses below WACC for the entire sector."
            : "Giriş engellerinin düşük ve ürünün farksız olduğu sektörlerde fiyat kırmak bireysel olarak cazip görünse de, tüm sektörün ROIC'sini WACC altına çekip kâr havuzunu yok eder."}
        </p>
      </div>
    </div>
  );
};
