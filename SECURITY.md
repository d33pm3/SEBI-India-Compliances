# Security policy

## Supported versions

Only the default branch of this public demonstration repository is supported for security reports.

## Reporting a vulnerability

Do **not** open a public issue for security findings.

Use GitHub private vulnerability reporting:

1. Open https://github.com/d33pm3/SEBI-India-Compliances/security/advisories/new
2. Or: repository **Settings → Security → Code security → Private vulnerability reporting → Enable**
3. Then use **Security → Advisories → New draft security advisory / Report a vulnerability**

Please include affected paths, commit SHA, impact, and a PoC that uses no live customer data.

We aim to acknowledge reports within 7 days.

## Enable Secret Protection on this public repo

GitHub partner secret scanning can run on public repositories. User alerts and push protection still need to be switched on in the UI:

1. https://github.com/d33pm3/SEBI-India-Compliances/settings/security_analysis
2. Under **Secret Protection**, click **Enable**
3. Enable **Push protection**
4. Optionally enable **Code Security** / CodeQL default setup

The connected GitHub App used to publish this repo cannot flip those settings via API (Advanced Security enablement is a repository-admin UI action).

## What this project must never contain

- API keys, tokens, passwords, certificates, or `.env` files
- Client, employee, or issuer records beyond the fictional demo data
- Production hostnames, internal IPs, or service-account names
- Real SEBI submissions, audit workpapers, or licensed extracts
- RAG corpora, embeddings, or private agent instructions

If you find any of the above in a commit, report it privately and assume the value is compromised until rotated.
