import { LearningModule } from "../types";

export const MODULES_DATA_EN: LearningModule[] = [
  {
    id: 1,
    slug: "moat-and-value-creation",
    title: "Step 1: The Castle, Crocodile Moat & True Value Creation",
    subtitle: "Zero Knowledge Start: When Does a Business Truly Create Wealth?",
    estimatedMinutes: 14,
    iconName: "Shield",
    description:
      "Warren Buffett's iconic economic moat metaphor, Return on Invested Capital (ROIC), Cost of Capital (WACC), and the crucial mathematical divergence between accounting revenue and true shareholder value creation.",
    zeroKnowledgeSummary:
      "Even with zero financial background: Imagine starting a lemonade stand. If you borrow money from family at 10% interest, but your stand earns only a 5% return; even if lines are around the block and sales hit records, you are quietly destroying wealth! Real wealth begins only when your operational return (ROIC) exceeds your cost of capital (WACC).",
    moduleBridge: {
      transitionQuestion: "When does a business produce authentic economic wealth, and how does it protect that wealth from competitors?",
      nextTitle: "Step 2: Corporate Life Cycle & Dickinson Cash Flow Patterns",
      whyNext: "We have mastered the mathematical spread between ROIC and WACC. But can companies sustain high returns forever? By tracking cash flow signs rather than chronological age, we identify exactly when a firm reaches peak compounding power.",
      previewQuestion: "How do (+ / -) signs on the Cash Flow Statement reveal a company's true life cycle stage and ROIC trajectory?",
    },
    sections: [
      {
        id: "m1-s1",
        title: "1. Warren Buffett's Castle and Moat Metaphor",
        summary: "Businesses are economic castles, and competitors are invaders seeking to storm them.",
        content: [
          "Imagine opening an exquisite, packed coffee shop in your neighborhood. Driven by capitalism, dozens of entrepreneurs will immediately open competing cafes next door to capture your high profits.",
          "Warren Buffett observes: 'We think of every business as an economic castle. In a free market, castles are under continuous assault. Millions of people think about how to take your profit. The fundamental question is: What kind of moat protects that castle?'",
          "An Economic Moat is a structural, durable barrier that prevents rivals from stealing your profits and market share. The deeper and wider the moat, the longer a company sustains superior returns.",
          "According to Michael Mauboussin's research at Morgan Stanley, only ~17% of public companies possess a genuine 'Wide Moat' lasting over 20 years."
        ],
        analogyBox: {
          title: "🏰 Castle and Moat Analogy",
          description:
            "Treasury inside the castle: The company's profits. Invading soldiers: Competitors. Crocodile-filled water moat: The company's patents, brand power, network effects, or cost advantages."
        },
        keyTakeaway:
          "When evaluating any long-term investment, the first and most critical question is: Does this business possess a durable moat defending its returns against imitation?"
      },
      {
        id: "m1-s2",
        title: "2. ROIC and WACC: The Mathematics of True Value Creation",
        summary: "When ROIC > WACC, a company creates real economic value. Otherwise, growth destroys shareholder wealth.",
        content: [
          "ROIC (Return on Invested Capital): How much net operating profit after tax (NOPAT) a business generates for every $100 tied up in factories, stores, inventory, and equipment.",
          "WACC (Weighted Average Cost of Capital): The blended annual opportunity cost of capital (shareholder required returns + bank debt interest).",
          "Example: If a company's WACC is 8.0% and it earns 18.0% ROIC on its capital, the +10.0% spread (Economic Spread) represents genuine compounding wealth creation.",
          "The Trap: A company can double sales and grow 20% annually; if its ROIC is 6% and WACC is 9%, rapid growth only accelerates shareholder wealth destruction."
        ],
        formulaBox: {
          title: "WACC & ROIC and Economic Spread Equation",
          equation: "WACC = (E/V × Ke) + (D/V × Kd × (1 - t))\nROIC = NOPAT / Invested Capital\nEconomic Spread = ROIC - WACC",
          variables: [
            { symbol: "E / V", label: "Equity Weight", desc: "Market Cap / Total Capital (70%)" },
            { symbol: "Ke", label: "Cost of Equity", desc: "CAPM: Risk-Free + Beta × ERP (11%)" },
            { symbol: "D / V", label: "Debt Weight", desc: "Financial Debt / Total Capital (30%)" },
            { symbol: "Kd × (1 - t)", label: "Net Cost of Debt", desc: "After-tax interest cost (4.5%)" },
            { symbol: "NOPAT", label: "Operating Earnings", desc: "EBIT × (1 - Tax Rate)" }
          ],
          exampleCalculation: "WACC = (0.70 × 11%) + (0.30 × 6% × (1 - 0.25)) = 7.7% + 1.35% = 9.05%\nROIC = $180M / $1,000M = 18.0%\nSpread = 18.0% - 9.05% = +8.95% (Strong Value Creation)"
        },
        stepByStepMath: "Step 1: Cost of Equity = 4.5% Risk-Free + (1.2 Beta × 5.5% ERP) = 11.1%\nStep 2: After-Tax Debt = 6.0% × (1 - 0.25) = 4.5%\nStep 3: Blended WACC = (0.70 × 11.1%) + (0.30 × 4.5%) = 9.12%\nStep 4: ROIC (18.0%) > WACC (9.12%) -> Positive +8.88% Annual Economic Spread",
        formulaDeepDiveId: "wacc",
        analogyBox: {
          title: "🍋 Lemonade Stand Example",
          description:
            "You borrow $1,000 from family at 10% interest (WACC = 10%). By autumn, you net $180 operational profit (ROIC = 18%). After paying $100 interest, $80 pure wealth remains. But if you made only $60 (6% ROIC), you couldn't even cover interest!"
        },
        keyTakeaway:
          "Unless ROIC exceeds the cost of capital (WACC), rapid revenue growth is simply an illusion masking wealth destruction."
      },
      {
        id: "m1-s3",
        title: "3. The Two Dimensions of Value & Mean Reversion",
        summary: "Value = Spread Magnitude × Sustainability (Competitive Advantage Period / CAP).",
        content: [
          "Generating high ROIC for a single year is not enough. The second and far more critical dimension is how many years you can sustain that spread before competitors erode it (Competitive Advantage Period - CAP).",
          "Regression to the Mean: Mauboussin's empirical data across thousands of companies reveals that even top-quintile ROIC firms experience rapid margin decay toward market averages within 5-10 years.",
          "The rare exceptions are called 'Compounders'—businesses like Apple, Costco, and Microsoft capable of sustaining ROIC > WACC for 20+ consecutive years.",
          "Mauboussin's finding: On average, ~67% of a stock's price reflects the steady-state present value, while ~33% reflects expectations of future value creation."
        ],
        formulaDeepDiveId: "roic",
        analogyBox: {
          title: "🏃‍♂️ Sprint vs. Marathon Runner",
          description:
            "A sprinter can break records in a 100m dash, but exhausts themselves in a 42km marathon. Wide moat compounders are marathon champions sustaining elite pace across decades."
        },
        keyTakeaway:
          "The greatest fortunes in investing are made by identifying businesses whose moats withstand mean reversion far longer than the market expects."
      }
    ],
    quiz: [
      {
        id: "q1-1",
        question: "In Warren Buffett's metaphor, what does an 'Economic Moat' represent?",
        options: [
          "The total volume of bank loans taken by a business",
          "A sustainable barrier protecting profits from imitation and competitive assault",
          "The annual advertising expenditure of a corporation",
          "The total employee salary budget"
        ],
        correctAnswerIndex: 1,
        explanation: "An economic moat is a durable competitive advantage that enables a company to maintain superior ROIC over decades."
      },
      {
        id: "q1-2",
        question: "What occurs when a company with 7% ROIC and 10% WACC doubles its revenue through aggressive capital expenditure?",
        options: [
          "It creates massive shareholder wealth because revenue grew",
          "It destroys shareholder wealth because every dollar invested earns less than its capital cost",
          "WACC automatically drops to zero",
          "ROIC immediately triples"
        ],
        correctAnswerIndex: 1,
        explanation: "When ROIC < WACC, capital expansion accelerates economic value destruction."
      }
    ]
  },
  {
    id: 2,
    slug: "corporate-lifecycle",
    title: "Step 2: Corporate Life Cycle & Dickinson Cash Flow Patterns",
    subtitle: "How Cash Flow Signs Reveal a Firm's True Stage and Compounding Horizon",
    estimatedMinutes: 16,
    iconName: "Activity",
    description:
      "Victoria Dickinson's 8-combination empirical cash flow model. Identifying Introduction, Growth, Maturity, Shake-Out, and Decline stages via Operating, Investing, and Financing cash flow patterns.",
    zeroKnowledgeSummary:
      "A company's age is not measured by calendar years, but by its cash flow fingerprint! Victoria Dickinson showed that looking at whether Operating, Investing, and Financing cash flows are positive (+) or negative (-) instantly reveals whether a company is an infant startup, a high-growth compounder, a cash-printing mature castle, or a dying zombie.",
    sections: [
      {
        id: "m2-s1",
        title: "1. The 5 Stages of Corporate Life Cycle",
        summary: "Introduction [- - +], Growth [+ - +], Maturity [+ - -], Shake-Out, and Decline.",
        content: [
          "Every enterprise moves through biological-like stages: Introduction, Growth, Maturity, Shake-out, and Decline.",
          "Victoria Dickinson (2011) proved that accounting profits can be manipulated, but the combination of signs in Cash Flow from Operations (CFO), Cash Flow from Investing (CFI), and Cash Flow from Financing (CFF) provides an unforgeable life cycle map.",
          "Maturity [+ - -]: The golden stage of compounders. The firm generates abundant cash from operations (+), reinvests in disciplined Capex (-), and returns excess cash to shareholders via dividends and buybacks (-)."
        ],
        keyTakeaway: "74% of public companies reside in Growth and Maturity stages. Mature compounders [+ - -] are the prime hunting ground for quality investors."
      }
    ],
    quiz: [
      {
        id: "q2-1",
        question: "What are the cash flow signs of a company in the 'Maturity' stage in the Dickinson model?",
        options: [
          "CFO (+), CFI (-), CFF (-)",
          "CFO (-), CFI (-), CFF (+)",
          "CFO (+), CFI (+), CFF (+)",
          "CFO (-), CFI (+), CFF (-)"
        ],
        correctAnswerIndex: 0,
        explanation: "Maturity is characterized by strong positive operational cash flow funding ongoing investments and paying down debt / returning cash to shareholders."
      }
    ]
  },
  {
    id: 3,
    slug: "industry-analysis-profit-pools",
    title: "Step 3: Industry Analysis, Profit Pools & Porter's Five Forces",
    subtitle: "Mapping Value Chains, Concentration, and Structural Profitability",
    estimatedMinutes: 15,
    iconName: "BarChart3",
    description:
      "Why industry structure explains up to 50% of corporate profitability. Constructing 2D Profit Pools, Michael Porter's Five Forces, HHI concentration, and avoiding capital-destroying segments.",
    zeroKnowledgeSummary:
      "Warren Buffett famously said: 'When a management with a reputation for brilliance tackles a business with a reputation for bad economics, the reputation of the business remains intact.' If you operate in an industry with terrible structural dynamics (like airlines), even genius managers cannot earn high ROIC.",
    sections: [
      {
        id: "m3-s1",
        title: "1. Industry Structure Dictates Long-Term Returns",
        summary: "The tide lifts or sinks all boats; choosing the right industry segment is half the battle.",
        content: [
          "Empirical studies prove that industry factors account for up to half of the variance in company returns.",
          "Michael Porter's Five Forces: 1) Threat of New Entrants, 2) Bargaining Power of Suppliers, 3) Bargaining Power of Buyers, 4) Threat of Substitutes, 5) Rivalry Among Existing Competitors.",
          "Profit Pool Mapping: Plotting invested capital on the X-axis and economic spread (ROIC - WACC) on the Y-axis reveals exactly where value accumulates."
        ],
        keyTakeaway: "Always map the industry profit pool before investing in a single business."
      }
    ],
    quiz: [
      {
        id: "q3-1",
        question: "In an industry profit pool map, what does the area of each box represent?",
        options: [
          "Total advertising budget",
          "Total economic profit generated by that segment (Invested Capital × Economic Spread)",
          "Total tax paid to the government",
          "The number of employees in the sector"
        ],
        correctAnswerIndex: 1,
        explanation: "The area of each block on a profit pool map equals Invested Capital × (ROIC - WACC), which is total economic profit."
      }
    ]
  },
  {
    id: 4,
    slug: "value-stick-mechanics",
    title: "Step 4: The Value Stick: WTP, Price, Cost & WTS",
    subtitle: "The Microeconomic Engine of Differentiation and Cost Advantage",
    estimatedMinutes: 14,
    iconName: "Sliders",
    description:
      "Felix Oberholzer-Gee and Adam Brandenburger's Value Stick framework. Driving customer Willingness to Pay (WTP) vs. lowering supplier Willingness to Sell (WTS).",
    zeroKnowledgeSummary:
      "How does a company make money without engaging in destructive price wars? By either raising customer Willingness to Pay (WTP) through delight and switching costs, or lowering supplier/employee Willingness to Sell (WTS) through scale and exceptional workplace productivity.",
    sections: [
      {
        id: "m4-s1",
        title: "1. The 4 Rungs of the Value Stick",
        summary: "WTP, Price, Cost, and WTS determine how value is distributed.",
        content: [
          "WTP (Willingness to Pay): The maximum price a customer will pay.",
          "Price: The actual transaction price charged.",
          "Cost: The accounting cost incurred by the firm.",
          "WTS (Willingness to Sell): The minimum payment required by suppliers/employees.",
          "Consumer Surplus = WTP - Price; Firm Margin = Price - Cost; Supplier Surplus = Cost - WTS."
        ],
        keyTakeaway: "Sustainable strategy expands the distance between WTP and WTS."
      }
    ],
    quiz: [
      {
        id: "q4-1",
        question: "How does a premium brand successfully apply the Value Stick?",
        options: [
          "By raising WTP significantly more than the incremental cost required to build the feature",
          "By dropping prices below manufacturing costs",
          "By eliminating all supplier payments",
          "By forcing employees to work for free"
        ],
        correctAnswerIndex: 0,
        explanation: "Differentiation raises customer WTP by an amount exceeding the extra cost incurred, expanding both customer surplus and corporate profit."
      }
    ]
  },
  {
    id: 5,
    slug: "roic-dupont-forensics",
    title: "Step 5: ROIC Decomposition & DuPont / CCC Röntgen",
    subtitle: "Mastering NOPAT Margins, Capital Turnover, and Cash Conversion Forensic Audit",
    estimatedMinutes: 18,
    iconName: "Search",
    description:
      "DuPont ROIC dissection: Margin vs. Velocity. Calculating Cash Conversion Cycle (DIO + DSO - DPO) and forensic adjustments for operating leases, R&D capitalization, and off-balance-sheet items.",
    zeroKnowledgeSummary:
      "A company can generate 25% ROIC in two completely different ways: 1) High Margin (Apple making 30% margin on iPhones) or 2) High Turnover (Costco making 2% margin but turning inventory 12 times a year). Understanding this formula lets you spot accounting illusions.",
    sections: [
      {
        id: "m5-s1",
        title: "1. The DuPont ROIC Formula",
        summary: "ROIC = (NOPAT / Sales) × (Sales / Invested Capital)",
        content: [
          "NOPAT Margin measures pricing power and cost discipline.",
          "Capital Turnover measures balance sheet asset efficiency.",
          "Cash Conversion Cycle (CCC): Days Inventory + Days Sales - Days Payable. A negative CCC provides free float for compounding."
        ],
        keyTakeaway: "Unlevered ROIC breaks down into pure operational margin multiplied by capital asset velocity."
      }
    ],
    quiz: [
      {
        id: "q5-1",
        question: "What does a negative Cash Conversion Cycle (CCC) indicate?",
        options: [
          "The company is bankrupt and cannot pay debts",
          "The company collects cash from sales before paying suppliers, generating interest-free working capital float",
          "The company has zero inventory",
          "The company's taxes are negative"
        ],
        correctAnswerIndex: 1,
        explanation: "A negative CCC means working capital provides net liquidity rather than tying up capital."
      }
    ]
  },
  {
    id: 6,
    slug: "morgan-stanley-checklist",
    title: "Step 6: The 60-Question Morgan Stanley Moat Checklist",
    subtitle: "Michael Mauboussin's Rigorous Framework for Scoring Competitive Durability",
    estimatedMinutes: 20,
    iconName: "CheckSquare",
    description:
      "The comprehensive Morgan Stanley competitive audit covering Industry Map, Five Forces, Supply/Demand Advantages, Scale Economies, and Management Capital Allocation.",
    zeroKnowledgeSummary:
      "Instead of guessing whether a company has a moat, Michael Mauboussin created a rigorous 60-question institutional checklist. Evaluating each pillar ensures you never fall for temporary cyclical surges.",
    sections: [
      {
        id: "m6-s1",
        title: "1. Systematic Moat Scoring",
        summary: "Evaluating supply, demand, scale, and management pillars.",
        content: [
          "Supply Advantages: Proprietary low-cost access, learning curves (Wright's Law), and patents.",
          "Demand Advantages: Customer switching costs, high search costs, and direct network effects.",
          "Scale Economics: Minimum Efficient Scale (MES) and distribution density."
        ],
        keyTakeaway: "A wide moat requires reinforcing synergy across supply, demand, and scale barriers."
      }
    ],
    quiz: [
      {
        id: "q6-1",
        question: "According to Wright's Law, what happens to unit costs as cumulative production doubles?",
        options: [
          "Unit costs double",
          "Unit costs drop by roughly 15-25% due to accumulated learning and process refinement",
          "Unit costs remain completely unchanged",
          "Unit costs become negative"
        ],
        correctAnswerIndex: 1,
        explanation: "Wright's Law establishes that unit costs decline by ~20% for every doubling of cumulative manufacturing experience."
      }
    ]
  },
  {
    id: 7,
    slug: "capital-allocation-mastery",
    title: "Step 7: Capital Allocation: Dividends, Buybacks, M&A & Capex",
    subtitle: "How Exceptional CEOs Deploy Free Cash Flow to Compound Shareholder Wealth",
    estimatedMinutes: 16,
    iconName: "Coins",
    description:
      "Warren Buffett's 'CEO as Chief Capital Allocator'. The 5 uses of cash: Reinvestment in operations (Capex), R&D, Mergers & Acquisitions (M&A), Dividends, and Opportunistic Share Buybacks.",
    zeroKnowledgeSummary:
      "Generating cash is only half the battle; how management reinvests that cash determines long-term compounding. Buybacks below intrinsic value create immense wealth, while overpriced acquisitions destroy it.",
    sections: [
      {
        id: "m7-s1",
        title: "1. The 5 Capital Allocation Choices",
        summary: "Internal Reinvestment, M&A, Debt Repayment, Dividends, and Buybacks.",
        content: [
          "1. High-ROIC Organic Reinvestment: The highest return path if runway exists.",
          "2. Share Repurchases: Highly accretive when stock is undervalued; destructive when overvalued.",
          "3. M&A: Most large acquisitions destroy buyer value due to overpayment and integration friction."
        ],
        keyTakeaway: "Great capital allocators treat capital like scarce water, directing it only to fertile soil."
      }
    ],
    quiz: [
      {
        id: "q7-1",
        question: "When are corporate share repurchases most beneficial to long-term shareholders?",
        options: [
          "When the company's shares are trading well below their intrinsic business value",
          "When the stock is at an all-time speculative high",
          "When the company has high debt and zero cash",
          "Only at the end of every calendar quarter"
        ],
        correctAnswerIndex: 0,
        explanation: "Repurchasing stock below intrinsic value transfers wealth from exiting sellers to continuing owners."
      }
    ]
  },
  {
    id: 8,
    slug: "expectations-investing-reverse-dcf",
    title: "Step 8: Expectations Investing: Reverse DCF & Fade Horizon",
    subtitle: "Stop Guessing Fair Value: Reverse-Engineer What the Market Price Implies",
    estimatedMinutes: 18,
    iconName: "Target",
    description:
      "Michael Mauboussin and Alfred Rappaport's Expectations Investing methodology. Using Reverse DCF to uncover implied revenue growth, operating margins, and Competitive Advantage Period (CAP).",
    zeroKnowledgeSummary:
      "Most investors try to predict the future with complex spreadsheets and guess a price target. Expectations Investing flips the process: Look at the current stock price and reverse-engineer what future growth and margin performance the market has ALREADY priced in!",
    sections: [
      {
        id: "m8-s1",
        title: "1. The Reverse DCF Paradigm",
        summary: "Start with price, uncover implied market expectations, and exploit the consensus gap.",
        content: [
          "Step 1: Read current market capitalization and enterprise value.",
          "Step 2: Solve for implied revenue growth rate and operating margins.",
          "Step 3: Compare implied expectations against historical industry base rates.",
          "Step 4: Invest when the company's real competitive advantages exceed what is priced into the stock."
        ],
        keyTakeaway: "Investment success comes from identifying when a company will outperform market expectations, not just buying good companies at any price."
      }
    ],
    quiz: [
      {
        id: "q8-1",
        question: "What is the primary advantage of a Reverse DCF model over a traditional DCF?",
        options: [
          "It eliminates the need to make speculative future forecasts by revealing what expectations are already embedded in the stock price",
          "It guarantees 100% accurate price predictions",
          "It avoids looking at financial statements",
          "It requires zero math"
        ],
        correctAnswerIndex: 0,
        explanation: "Reverse DCF starts from the market price to show the hurdle the business must beat to deliver excess investor returns."
      }
    ]
  }
];
