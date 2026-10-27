# GAA Group websites: GAA Consulting, GAA Associates, Filings First, Hirings First

One project, three separate websites, all linked to each other.

| Website | On your computer | Live domain |
| --- | --- | --- |
| GAA Consulting (group home) | http://localhost:5173/ | gaaconsulting.com |
| GAA Associates | http://localhost:5173/gaa-associates | gaaconsulting.com/gaa-associates |
| Filings First | http://localhost:5173/filings-first | filingsfirst.com |
| Hirings First | http://localhost:5173/hirings-first | hiringsfirst.com |

Every site's menu starts with **Home** and **About us** (the GAA Consulting group home and About page) and ends with a **Group** dropdown: GAA Associates, Filings First, Hirings First.

## GAA Consulting pages (the GAA Group home)

| Address | Page |
| --- | --- |
| / | Home ("GAA Home v2" design) |
| /about | About us |
| /contact | Contact us |
| /careers, /industries, /insights, /people, /how-we-work, /india-entry, /experience, /disclaimer | Other pages (footer links) |

Menu: Home · About us · Contact us · Group

## GAA Associates pages (corporate advisory)

| Address | Page |
| --- | --- |
| /gaa-associates | Home ("GAA Consulting Services" design) |
| /gaa-associates/services/corporate-law, /company-secretarial, /mergers-and-acquisitions, /fundraising-and-restructuring, /regulatory-advisory | The 5 service pages |
| /gaa-associates/contact | Contact us |

Menu: Home · Services (hover shows the 5 services, click opens the services list) · Contact us · Group.
Old /services addresses redirect here.

## Filings First pages (built from the "Filings First Site" mockups)

| Address | Page |
| --- | --- |
| /filings-first | Home |
| /filings-first/services/accounting, /bookkeeping, /taxation, /gst, /corporate-compliance | 5 service pages |
| /filings-first/services/<detail> | 20 detail pages (financial-statements, gst-registration, ...) |

Menu (as in the mockups): Services (mega menu) · Packages · Process · FAQs · Insights · Group

## Hirings First pages (built from the "Hirings First Site" mockups, v2)

| Address | Page |
| --- | --- |
| /hirings-first | Home |
| /hirings-first/talent/finance-accounting, /human-resources, /sales-and-business-development, /marketing, /operations, /technology | 6 talent pages |
| /hirings-first/services/it-corporate-recruitment, /leadership-hiring, /campus-placements, /workforce-outsourcing | 4 service pages |

Menu: Home · About us · Talent & services (mega menu) · Talent pool · How it works · Contact · Group

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
| GAA Consulting and GAA Associates header, footer | src/pages/gaa/GaaShell.jsx |
| GAA Associates home and services text | src/data/gaaServices.js |
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
