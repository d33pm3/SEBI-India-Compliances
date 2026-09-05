# Security policy

## Supported versions

Only the default branch of this public demonstration repository is supported for security reports.

## Reporting a vulnerability

Do **not** open a public issue for security findings.

Use GitHub **Privately report a vulnerability** on this repository (Security → Advisories → New draft security advisory / Report a vulnerability).

Please include:

- Affected file paths and commit SHA
- Description of the issue and impact
- Proof of concept that does not include live customer data

We aim to acknowledge reports within 7 days.

## What this project must never contain

- API keys, tokens, passwords, certificates, or `.env` files
- Client, employee, or issuer records beyond the fictional demo data
- Production hostnames, internal IPs, or service-account names
- Real SEBI submissions, audit workpapers, or licensed extracts
- RAG corpora, embeddings, or private agent instructions

If you find any of the above in a commit, report it privately and assume the value is compromised until rotated.
