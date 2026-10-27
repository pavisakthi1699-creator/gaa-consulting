// SEO for GAA Associates, served on the GAA Consulting domain under /gaa-associates
// (plain JavaScript: also read by scripts/seo-pages.mjs)
export const SITE = "https://www.gaaconsulting.com/gaa-associates"; // TODO(client): confirm
export const BRAND = "GAA Associates";
export const HOME_CANONICAL = SITE;
export const ORG = { type: "LegalService", extra: { address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" } } };

const S = (slug, name, desc) => ({ path: `/services/${slug}`, title: `${name} | GAA Associates`, description: desc });

export const ROUTES = [
  { path: "/", title: "GAA Associates | Corporate Law, Company Secretarial & M&A Advisory", description: "Corporate law, company secretarial, mergers & acquisitions, fundraising & restructuring and regulatory advisory for businesses, NBFCs and promoters. Part of the GAA Group." },
  S("corporate-law", "Corporate Law", "Advice on entity structuring, shareholder agreements, governance and legal documentation from GAA Associates."),
  S("company-secretarial", "Company Secretarial Services", "Board and general meetings, statutory registers, secretarial audit and event-based filings handled by experienced company secretaries."),
  S("mergers-and-acquisitions", "Mergers & Acquisitions", "M&A advisory from deal structuring and due diligence to transaction documentation and post-deal integration."),
  S("fundraising-and-restructuring", "Fundraising & Restructuring", "Fundraise structuring, investor documentation, schemes of arrangement and capital restructuring."),
  S("regulatory-advisory", "Regulatory Advisory for NBFCs", "NBFC registration, regulatory filings, compliance reviews and approvals for NBFCs and financial institutions."),
  { path: "/contact", title: "Contact Us | GAA Associates", description: "Talk to GAA Associates about corporate law, company secretarial, M&A, fundraising or NBFC regulatory advisory. A specialist replies within one working day." },
];
