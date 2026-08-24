import { ChecklistItem } from "../types";

export const CHECKLIST_ITEMS_EN: ChecklistItem[] = [
  // 1. Introduction & Basic Returns
  {
    id: "chk-1",
    category: "1. Intro & Returns",
    question: "Does the company earn an ROIC substantially higher than its WACC (Cost of Capital)?",
    explanation: "The company's return on invested capital must comfortably exceed the opportunity cost of capital (ROIC > WACC).",
    highScoreIndicator: "ROIC substantially above WACC (e.g., 20%+ vs. 8% WACC)",
    lowScoreIndicator: "ROIC below WACC or barely breaking even",
  },
  {
    id: "chk-2",
    category: "1. Intro & Returns",
    question: "Is the company's ROIC stable, expanding, or deteriorating over time?",
    explanation: "Sustained high returns over multi-year periods demonstrate moat durability.",
    highScoreIndicator: "10+ years of persistent or expanding high ROIC",
    lowScoreIndicator: "Rapidly eroding or highly volatile ROIC",
  },
  {
    id: "chk-3",
    category: "1. Intro & Returns",
    question: "How much of the current stock price reflects future value creation expectations?",
    explanation: "Measures how aggressively the market has already priced in long-term future growth.",
    highScoreIndicator: "Reasonable valuation (<40% of market value is future growth value)",
    lowScoreIndicator: "Highly speculative (>80% of price relies on aggressive distant assumptions)",
  },

  // 2. Industry Map & Structure
  {
    id: "chk-4",
    category: "2. Industry Map",
    question: "How is the industry profit pool distributed, and where is the company positioned?",
    explanation: "Is the company in the high-spread segment or trapped in a capital-intensive value-destroying segment?",
    highScoreIndicator: "Dominates the highest-margin, capital-light segment of the value chain",
    lowScoreIndicator: "Trapped in the commoditized, loss-making tier (e.g., airline operations)",
  },
  {
    id: "chk-5",
    category: "2. Industry Map",
    question: "How stable is market share over a 5-year rolling period?",
    explanation: "Greenwald rule: An average 5-year market share fluctuation ≤ 2% signifies structural stability.",
    highScoreIndicator: "Extremely stable market shares (Average change < 2%)",
    lowScoreIndicator: "Volatile, constantly shifting market shares (> 5% swings)",
  },
  {
    id: "chk-6",
    category: "2. Industry Map",
    question: "What is the industry concentration level (HHI / C4 ratio)?",
    explanation: "Combined market share of the top 4 competitors and degree of disciplined oligopoly.",
    highScoreIndicator: "Rational oligopoly with few disciplined, profit-oriented incumbents",
    lowScoreIndicator: "Hyper-fragmented market with destructive price-cutting rivals",
  },

  // 3. Porter Five Forces
  {
    id: "chk-7",
    category: "3. Porter 5 Forces",
    question: "What is the bargaining power of suppliers over the company?",
    explanation: "Do suppliers possess scarce, irreplaceable inputs or monopolistic pricing power?",
    highScoreIndicator: "Fragmented suppliers; company is a vital, volume-dictating buyer",
    lowScoreIndicator: "Concentrated supplier monopoly (e.g., essential single-source components)",
  },
  {
    id: "chk-8",
    category: "3. Porter 5 Forces",
    question: "What is the bargaining power of buyers/customers?",
    explanation: "Can customers easily demand discounts or switch to alternative vendors with zero penalty?",
    highScoreIndicator: "High customer fragmentation with high switching costs",
    lowScoreIndicator: "Concentrated enterprise buyers generating >30% of total revenue",
  },
  {
    id: "chk-9",
    category: "3. Porter 5 Forces",
    question: "What is the threat of direct substitute products or alternative technologies?",
    explanation: "Can customer needs be met through completely different technological solutions?",
    highScoreIndicator: "No viable substitute offering comparable utility and cost structure",
    lowScoreIndicator: "Emerging technological alternatives with rapidly falling cost curves",
  },

  // 4. Barriers to Entry & Scale
  {
    id: "chk-10",
    category: "4. Barriers to Entry",
    question: "What is the Minimum Efficient Scale (MES) relative to total industry volume?",
    explanation: "The minimum capacity required to achieve lowest unit production costs.",
    highScoreIndicator: "MES exceeds 25%+ of total industry demand, blocking entry",
    lowScoreIndicator: "Negligible capital requirements; anyone can enter immediately",
  },
  {
    id: "chk-11",
    category: "4. Barriers to Entry",
    question: "Does the company benefit from Wright's Law / steep learning curves?",
    explanation: "Do cumulative production volume advantages permanently depress unit costs?",
    highScoreIndicator: "Steep learning curve with proprietary manufacturing techniques",
    lowScoreIndicator: "Standard off-the-shelf equipment and generic assembly processes",
  },
  {
    id: "chk-12",
    category: "4. Barriers to Entry",
    question: "Are there substantial regulatory, licensing, or patent barriers to entry?",
    explanation: "Legal protections, exclusive municipal rights, spectrum licenses, or patents.",
    highScoreIndicator: "Long-dated exclusive patents, regulatory approvals, or spectrum rights",
    lowScoreIndicator: "Unregulated market with zero licensing requirements",
  },

  // 5. Customer Lock-in & Network Effects
  {
    id: "chk-13",
    category: "5. Customer Moat",
    question: "How substantial are customer switching costs (monetary, operational, data)?",
    explanation: "The friction, downtime, retraining, and cost required to abandon the platform.",
    highScoreIndicator: "Mission-critical software/hardware deeply embedded in client workflows",
    lowScoreIndicator: "Zero friction; customers switch instantly based on daily price promos",
  },
  {
    id: "chk-14",
    category: "5. Customer Moat",
    question: "Does the company possess genuine two-sided or direct network effects?",
    explanation: "Value increases quadratically with each additional user or developer joining.",
    highScoreIndicator: "Self-reinforcing flywheel with billions of connected users or nodes",
    lowScoreIndicator: "Pure standalone product with zero network interaction utility",
  },
  {
    id: "chk-15",
    category: "5. Customer Moat",
    question: "Does the company possess authentic pricing power (Willingness to Pay)?",
    explanation: "Ability to raise prices faster than inflation without losing unit volumes.",
    highScoreIndicator: "Demonstrated history of annual price hikes with rising retention",
    lowScoreIndicator: "Price taker; any attempted price increase triggers mass customer churn",
  },

  // 6. Management & Capital Allocation
  {
    id: "chk-16",
    category: "6. Capital Allocation",
    question: "How disciplined is management in allocating free cash flow?",
    explanation: "Track record in Capex, R&D, disciplined M&A, share buybacks vs. dividends.",
    highScoreIndicator: "Opportunistic share buybacks below intrinsic value, high-ROIC reinvestment",
    lowScoreIndicator: "Empire building, overpriced dilutive acquisitions, value destruction",
  },
  {
    id: "chk-17",
    category: "6. Capital Allocation",
    question: "Does management have meaningful 'Skin in the Game' and aligned incentives?",
    explanation: "Insider equity ownership and executive compensation tied to ROIC and TSR.",
    highScoreIndicator: "Founders/executives hold substantial stock; bonus tied to ROIC/WACC spread",
    lowScoreIndicator: "Negligible ownership; bonuses tied merely to revenue growth or accounting EPS",
  },
  {
    id: "chk-18",
    category: "6. Capital Allocation",
    question: "How robust is the balance sheet against macroeconomic shocks?",
    explanation: "Cash runway, Net Debt/EBITDA ratio, debt maturity distribution.",
    highScoreIndicator: "Net cash position or low debt (Net Debt / EBITDA < 1.5x) with long maturities",
    lowScoreIndicator: "Highly leveraged (>4x EBITDA) with floating debt maturing during tight credit",
  },
];
