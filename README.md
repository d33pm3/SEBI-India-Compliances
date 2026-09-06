# SEBI India Compliances

**Author:** DK Mendiratta

Demonstration front-end for tracking **SEBI / NSE / BSE** filing obligations of listed companies in India.

This repository is a **public sample application**. It ships with fictional issuer data, mock users, and illustrative compliance rows. It is **not** a live compliance system, **not** legal advice, and **not** a substitute for primary SEBI instruments or professional counsel.

Neighbour repos: [SEBI-Compliance-Research](https://github.com/d33pm3/SEBI-Compliance-Research) researches live obligations into a 12-column workbook. [Multi-agent-Full-Stack-App](https://github.com/d33pm3/Multi-agent-Full-Stack-App) is the command-centre UI whose source ships in a zip. This repo is the complete demo UI on `main`.

## This is / this is not

**This is** an unofficial demonstration UI for SEBI / NSE / BSE-style filing tracking.
**This is** a local Vite/React app with fictional issuer data and sample register rows in `src/data/`.
**This is** a working prototype you can clone and run — state is Zustand in the browser.
**This is not** SEBI, NSE, or BSE software.
**This is not** [SEBI-Compliance-Research](https://github.com/d33pm3/SEBI-Compliance-Research) (that repo researches live obligations into a workbook).
**This is not** [Multi-agent-Full-Stack-App](https://github.com/d33pm3/Multi-agent-Full-Stack-App) (that repo is the command-centre UI whose source ships in a zip).
**This is not** a live filing, calendar submission, or legal opinion.
**This is not** a connected tenant or production compliance system.

## What this app shows

- Master compliance register (sample LODR / PIT / SAST-style obligations)
- Filing calendar and category views
- Risk assessment and task workflows (in-memory only)
- Document vault UI with sample metadata (no real filings)
- Assistant / chatbot screens that answer from bundled sample text

State lives in the browser (Zustand). There is no production backend and no connected tenant.

## Disclaimer

Obligation text in `src/data/` is a **demo snapshot** for product illustration. Always confirm current law on [sebi.gov.in](https://www.sebi.gov.in) and the relevant stock exchange.

## Run the prototype

`src/` is already on `main`. No zip extract. Requires Node.js 18+ and npm.

```bash
git clone https://github.com/d33pm3/SEBI-India-Compliances.git
cd SEBI-India-Compliances
npm install
npm run dev
```

Then open the URL Vite prints (default `http://127.0.0.1:8080`).

```bash
npm run test
npm run build
npm run preview
```

## What is not deployed

- There is no hosted URL, GitHub Pages site, or SEBI/exchange integration.
- Persistence is in-memory Zustand for the session only.
- Assistant answers come from bundled sample text, not a live model or SEBI feed.
- Do not treat register rows, due dates, or risk flags as a filing or a compliance conclusion.

## Repository layout

```
src/
  components/   UI and shared widgets
  data/         Sample register, vault, workflow, and chat data
  lib/          Export and formatting helpers
  pages/        Route-level screens
  store/        In-memory Zustand store
  test/         Vitest setup
public/         Static assets
```

## Configuration

Copy `.env.example` to `.env.local` if you add API integrations later. **Do not commit secrets.** This demo does not require any API key to run.

## Security

See [SECURITY.md](SECURITY.md). Report vulnerabilities privately via GitHub Security Advisories.

## License

MIT. See [LICENSE](LICENSE).

You may use this code; this is not a SEBI filing system and not a compliance conclusion.
