// SEO for gaaconsulting.com (plain JavaScript: also read by scripts/seo-pages.mjs)
export const SITE = "https://www.gaaconsulting.com"; // TODO(client): confirm production domain
export const BRAND = "GAA Consulting";
export const ORG = { type: "LegalService", extra: { address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" } } };

const S = (slug, name, desc) => ({ path: `/services/${slug}`, title: `${name} | GAA Consulting`, description: desc });

export const ROUTES = [
  { path: "/", title: "GAA Consulting | Corporate Law, Company Secretarial & M&A Advisory", description: "Partner-led corporate law, company secretarial, M&A, fundraising and regulatory advisory for founders, boards, NBFCs and foreign companies in India." },
  { path: "/about", title: "About Us | GAA Consulting, Filings First, Hirings First", description: "GAA Group brings together GAA Consulting, Filings First and Hirings First: specialists in advisory, compliance and talent who work as one team." },
  { path: "/contact", title: "Contact Us | GAA Consulting", description: "Talk to GAA Consulting, Filings First or Hirings First. Share your requirement and the right specialist will reply within one working day." },
  { path: "/services", title: "Services | GAA Consulting", description: "Corporate law, company secretarial, mergers & acquisitions, fundraising & restructuring and regulatory advisory from GAA Consulting." },
  S("corporate-law", "Corporate Law", "Advice on entity structuring, shareholder agreements, governance and legal documentation from GAA Consulting."),
  S("company-secretarial", "Company Secretarial Services", "Board and general meetings, statutory registers, secretarial audit and event-based filings handled by experienced company secretaries."),
  S("mergers-and-acquisitions", "Mergers & Acquisitions", "M&A advisory from deal structuring and due diligence to transaction documentation and post-deal integration."),
  S("fundraising-and-restructuring", "Fundraising & Restructuring", "Fundraise structuring, investor documentation, schemes of arrangement and capital restructuring."),
  S("regulatory-advisory", "Regulatory Advisory for NBFCs", "NBFC registration, regulatory filings, compliance reviews and approvals for NBFCs and financial institutions."),
  { path: "/india-entry", title: "Set Up Your Business in India | GAA Consulting", description: "India entry for foreign companies: subsidiary, JV, LLP or branch office, incorporated and FEMA compliant." },
  { path: "/industries", title: "Industries We Serve | GAA Consulting", description: "Corporate and regulatory advisory for technology, fintech, NBFC, manufacturing, healthcare, real estate and more." },
  { path: "/experience", title: "Case Studies | GAA Consulting", description: "Selected engagements in India entry, restructuring, due diligence, NBFC advisory and governance." },
  { path: "/insights", title: "Insights & Compliance Calendar | GAA Consulting", description: "Practical notes from our partners and a yearly compliance calendar for Indian companies, LLPs and foreign-owned businesses." },
  { path: "/people", title: "Our Team | GAA Consulting", description: "Meet the company secretaries, corporate lawyers and finance professionals at GAA Consulting." },
  { path: "/how-we-work", title: "How We Work & Fees | GAA Consulting", description: "Fixed-fee mandates, annual retainers and partner advisory: clear scope, fixed fees and no surprises." },
  { path: "/careers", title: "Careers & CS Training | GAA Consulting", description: "Practical company secretarial and compliance training on live files, with mentorship from practising professionals at GAA Consulting." },
  { path: "/disclaimer", title: "Disclaimer | GAA Consulting", description: "Legal disclaimer and privacy notice for the GAA Consulting website." },
];
