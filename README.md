# GAA Group websites: GAA Consulting, Filings First, Hirings First

One project, three separate websites, all linked to each other.

| Website | On your computer | Live domain |
| --- | --- | --- |
| GAA Consulting | http://localhost:5173/ | gaaconsulting.com |
| Filings First | http://localhost:5173/filings-first | filingsfirst.com |
| Hirings First | http://localhost:5173/hirings-first | hiringsfirst.com |

Every site's menu ends with a **Group** dropdown: Filings First, Hirings First, GAA Consulting.

## GAA Consulting pages

| Address | Page |
| --- | --- |
| / | Home (built from the "GAA Home v2" design) |
| /about | About us |
| /services | Services (menu "Services": click opens this page, hover shows the 5 services) |
| /services/corporate-law, /company-secretarial, /mergers-and-acquisitions, /fundraising-and-restructuring, /regulatory-advisory | The 5 service pages |
| /contact | Contact us |
| /careers | Careers & CS training |
| /industries, /insights, /people, /how-we-work, /india-entry, /experience, /disclaimer | Other pages (footer links) |

Menu: Home · About us · Services · Contact us · Group

## Filings First pages (built from the "Filings First Site" mockups)

| Address | Page |
| --- | --- |
| /filings-first | Home |
| /filings-first/services/accounting, /bookkeeping, /taxation, /gst, /corporate-compliance | 5 service pages |
| /filings-first/services/<detail> | 20 detail pages (financial-statements, gst-registration, ...) |

Menu (as in the mockups): Services (mega menu) · Packages · Process · FAQs · Insights · Group

## Hirings First pages (built from the "Hirings First Site" mockups)

| Address | Page |
| --- | --- |
| /hirings-first | Home |
| /hirings-first/talent/finance-accounting, /human-resources, /sales-and-business-development, /marketing, /operations, /technology | 6 talent category pages |

Menu (as in the mockups): Talent (mega menu) · Talent pool · How it works · For candidates · Contact · Group

## Run it on your computer

1. Install **Node.js 22 LTS** (or 20.19 and above) from https://nodejs.org
2. Open this folder in VS Code, then Terminal > New Terminal
3. Run:

```
npm install      (first time only)
npm run dev      (all three websites at http://localhost:5173)
```

## Build for going live

```
npm run build
```

Creates one folder per domain:

| Folder | Upload to |
| --- | --- |
| dist/gaa | gaaconsulting.com |
| dist/ff | filingsfirst.com |
| dist/hf | hiringsfirst.com |

Each folder has an HTML file per page (own Google title and description), sitemap.xml, robots.txt
and redirect files for Vercel, Netlify and Apache/cPanel. On the live domains, links to the other two
companies go to their own domains. On review links (*.vercel.app) all three work on one address.

Check a build before uploading: `npm run preview:gaa` (or `preview:ff`, `preview:hf`).

## Where to change things

| What | File |
| --- | --- |
| Domains, emails, Group dropdown text | src/site/sites.js |
| GAA Consulting menu labels | src/data/gaaContent.js (GAA_NAV) |
| GAA Consulting home page | src/pages/gaa/GaaHomeV2.jsx (+ GaaHomeV2.css) |
| GAA Consulting header, footer | src/pages/gaa/GaaShell.jsx |
| GAA Consulting office address, phone, hours | src/site/gaaContact.js |
| Filings First text: home, menus, GST registration, contact details | src/ff/ffData.js |
| Filings First service pages (all 24 other pages) | src/ff/ffPages.js |
| Filings First design | src/ff/ff.css |
| Hirings First text, categories, roles, contact details | src/hf/hfData.js |
| Hirings First design | src/hf/hf.css |
| Google titles and descriptions | src/seo/gaa.js, src/seo/ff.js, src/seo/hf.js |

## Old files

Old reference HTML, scripts and retired pages (old group home page, old header and footer) are in
`_reference/`. The websites don't use them.
