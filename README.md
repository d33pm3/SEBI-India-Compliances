# SEBI India Compliances

Demonstration front-end for tracking **SEBI / NSE / BSE** filing obligations of listed companies in India.

This repository is a **public sample application**. It ships with fictional issuer data, mock users, and illustrative compliance rows. It is **not** a live compliance system, **not** legal advice, and **not** a substitute for primary SEBI instruments or professional counsel.

## What this app shows

- Master compliance register (sample LODR / PIT / SAST-style obligations)
- Filing calendar and category views
- Risk assessment and task workflows (in-memory only)
- Document vault UI with sample metadata (no real filings)
- Assistant / chatbot screens that answer from bundled sample text

State lives in the browser (Zustand). There is no production backend and no connected tenant.

## Disclaimer

Obligation text in `src/data/` is a **demo snapshot** for product illustration. Always confirm current law on [sebi.gov.in](https://www.sebi.gov.in) and the relevant stock exchange.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (default `http://127.0.0.1:8080`).

```bash
npm run test
npm run build
npm run preview
```

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

MIT — see [LICENSE](LICENSE).
