# The Moat Eco

### A quantitative finance terminal for economic moat analysis, ROIC discipline, and value investing research

[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

> **The Moat Eco is an interactive quantitative finance terminal built for understanding, testing, and defending durable competitive advantage.**

It translates Michael Mauboussin’s *Measuring the Moat* framework into a hands-on research environment. Investors, students, and finance professionals can connect operating performance to economic value creation through ROIC, WACC, economic spread, cash-flow life cycles, competitive barriers, capital allocation, and market-implied expectations.

The project is designed as a **terminal for quantitative finance and value-investing research**, not as a trading broker, a price-prediction engine, or personalized investment advice. Its purpose is to make high-quality analytical habits repeatable: define the economic question, model the drivers, stress-test the assumptions, and communicate the conclusion clearly.

## Product overview

The platform combines an educational curriculum with live analytical instruments. Users can move from first principles to an institutional-style company audit without leaving the same workspace. Each module turns a core idea into a scenario that can be adjusted, compared, and revisited.

| Research area | What the terminal provides |
| --- | --- |
| **Economic moat framework** | A structured curriculum covering durable competitive advantage, industry structure, barriers to entry, disruption, and strategic interaction. |
| **ROIC and economic spread** | Interactive ROIC versus WACC analysis, DuPont decomposition, NOPAT, invested capital, capital turnover, and value-creation diagnostics. |
| **Reverse DCF** | A market-implied expectations laboratory that estimates the growth and Competitive Advantage Period (CAP) embedded in a valuation. |
| **Cash-flow life cycle** | Victoria Dickinson-inspired operating, investing, and financing cash-flow vectors for lifecycle diagnosis. |
| **Competitive strategy** | Value Stick, profit-pool, Wright’s Law, Minimum Efficient Scale, game-theory, and disruption simulations. |
| **Company audit studio** | A five-step dossier workflow for financial x-rays, industry forces, moat drivers, capital allocation, and sustainability. |
| **Learning retention** | Bilingual spaced-repetition flashcards and review state persistence for deliberate practice. |

## Screenshots

The following paths are intentionally reserved for polished portfolio screenshots. Replace the placeholders with exported images from the deployed application when the visual capture set is ready.

> **Screenshot placeholder — Executive terminal overview**  
> Add: `docs/screenshots/hero-terminal.png`  
> Suggested capture: the roadmap, primary KPI cards, and the four-stage mastery architecture.

> **Screenshot placeholder — Quantitative laboratory**  
> Add: `docs/screenshots/quant-laboratory.png`  
> Suggested capture: the ROIC/WACC terminal or Reverse DCF with an active scenario and diagnostic output.

> **Screenshot placeholder — Company audit studio**  
> Add: `docs/screenshots/company-audit-studio.png`  
> Suggested capture: the five-step dossier workspace with the live moat score and financial x-ray.

## Why it matters

A high accounting profit does not automatically mean that a company creates value. The terminal keeps the central value-investing distinction visible:

> **A business creates economic value when its return on invested capital exceeds its cost of capital.**

That principle is extended across the full research workflow. A strong business must earn attractive returns, defend those returns against competition, reinvest intelligently, convert operations into cash, and sustain the advantage long enough for compounding to matter. The interface is therefore organized around **assumptions, mechanisms, and evidence**, rather than around a single headline score.

## Technology stack

| Layer | Technology | Role |
| --- | --- | --- |
| Frontend | React 19 + TypeScript | Component-driven terminal interface and typed research workflows. |
| Build system | Vite 6 | Fast development server and optimized production asset bundling. |
| Styling | Tailwind CSS 4 | Responsive, dark-mode-capable design system and utility styling. |
| Motion and charts | Motion + Recharts | Interactive transitions, financial visualizations, and diagnostic charts. |
| Backend | Express 4 + Node.js | Lightweight API layer for the Socratic AI coach and production static-file serving. |
| AI integration | Google GenAI SDK | Optional AI coaching endpoint with a pedagogical fallback path. |
| Persistence | Browser localStorage | Local dossier workspaces, language preference, theme, and learning progress. |
| Deployment | Vercel-ready Node/Vite build | Static assets are built to `dist/`; the Express bundle is emitted as `dist/server.cjs`. |

## Project structure

```text
.
├── src/
│   ├── components/        # Terminal views, audit studio, labs, modals, and navigation
│   ├── context/            # Language and application context providers
│   ├── data/               # Bilingual curriculum, formulas, checklists, and presets
│   ├── utils/              # Validation and spaced-repetition utilities
│   ├── App.tsx             # Application shell and global navigation
│   └── main.tsx            # React entry point
├── public/                 # Static assets such as the favicon
├── index.html              # SEO metadata and application document shell
├── server.ts               # Express API and production server entry point
├── vite.config.ts          # Vite configuration
├── vercel.json             # Vercel caching and security headers
├── package.json            # Scripts and dependencies
└── .env.example            # Environment variable template
```

## Getting started

### Prerequisites

Use Node.js 20 or newer and npm. The AI coaching route is optional for local development; the application remains usable with its built-in educational fallback when no Gemini key is configured.

### Installation

```bash
git clone https://github.com/Onurinal59/themoateco.git
cd themoateco
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```

The development server runs at [http://localhost:3000](http://localhost:3000). For a production-like local run, build the client and bundled server first:

```bash
npm run build
npm run start
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Optional | Enables the Socratic AI coach through the Google GenAI API. |
| `APP_URL` | Optional | Identifies the hosted application URL for deployment-aware integrations. |

Never commit `.env` or any live API key to the repository. Use Vercel Environment Variables for hosted deployments.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Express server with Vite middleware for development. |
| `npm run lint` | Runs TypeScript type checking without emitting files. |
| `npm run build` | Builds the Vite frontend and bundles `server.ts` into `dist/server.cjs`. |
| `npm run start` | Starts the compiled production server. |
| `npm run preview` | Serves the Vite production output for frontend previewing. |
| `npm run clean` | Removes generated build output. |

## Vercel deployment

The repository includes a `vercel.json` with a Vite build command, the `dist` output directory, immutable caching for hashed static assets, no-store behavior for the HTML shell, and baseline security headers. In Vercel, connect the repository and use the following deployment settings:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Install command | `npm ci --legacy-peer-deps` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js runtime | Node.js 20 or newer |

Add `GEMINI_API_KEY` and, when needed, `APP_URL` to the Vercel project’s environment variables. The application stores learning progress and dossier workspaces in the browser, so no database migration is required for the default deployment model.

## Design principles

The interface follows a few deliberate principles. Quantitative assumptions should be visible rather than hidden behind a black box. Every major calculation should be adjustable and explainable. Turkish and English content should remain aligned. Educational guidance should connect formulas to real company behavior. Finally, the visual system should make the terminal feel focused, calm, and credible in both light and dark modes.

## Responsible use

The Moat Eco is an educational and methodological research tool. Its scenarios, calculations, examples, and AI-generated explanations are not financial advice, investment recommendations, or a substitute for primary filings and independent due diligence. Always verify company-specific information against authoritative disclosures such as annual reports, regulatory filings, and investor-relations materials.

## License

This project is released under the **MIT License**. You are welcome to study, adapt, and extend the code in accordance with the terms of the MIT License.

## Acknowledgements

The curriculum is inspired by the work of Michael J. Mauboussin, Dan Callahan, Victoria Dickinson, Felix Oberholzer-Gee, Bruce Greenwald, Clayton Christensen, and other researchers whose frameworks help investors reason about competitive advantage and value creation.

## References

[1]: https://react.dev/ "React documentation"
[2]: https://vite.dev/guide/ "Vite documentation"
[3]: https://tailwindcss.com/docs "Tailwind CSS documentation"
[4]: https://expressjs.com/ "Express documentation"
[5]: https://vercel.com/docs/headers "Vercel headers documentation"
[6]: https://vercel.com/docs/deployments/configure-a-build "Vercel build configuration documentation"
