// SEO for gaaconsulting.com (plain JavaScript: also read by scripts/seo-pages.mjs)
export const SITE = "https://www.gaaconsulting.com"; // TODO(client): confirm production domain
export const BRAND = "GAA Consulting";
export const ORG = { type: "LegalService", extra: { address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" } } };

export const ROUTES = [
  { path: "/", title: "GAA Consulting | The GAA Group: Advisory, Compliance & Talent", description: "GAA Consulting is the home of the GAA Group: GAA Associates for corporate advisory, Filings First for accounting and compliance, and Hirings First for talent." },
  { path: "/about", title: "About Us | GAA Group: GAA Associates, Filings First, Hirings First", description: "The GAA Group brings together GAA Associates, Filings First and Hirings First: specialists in advisory, compliance and talent who work as one team." },
  { path: "/contact", title: "Contact Us | GAA Consulting", description: "Talk to GAA Associates, Filings First or Hirings First. Share your requirement and the right specialist will reply within one working day." },
  { path: "/india-entry", title: "Set Up Your Business in India | GAA Consulting", description: "India entry for foreign companies: subsidiary, JV, LLP or branch office, incorporated and FEMA compliant." },
  { path: "/industries", title: "Industries We Serve | GAA Consulting", description: "Corporate and regulatory advisory for technology, fintech, NBFC, manufacturing, healthcare, real estate and more." },
  { path: "/experience", title: "Case Studies | GAA Consulting", description: "Selected engagements in India entry, restructuring, due diligence, NBFC advisory and governance." },
  { path: "/insights", title: "Insights & Compliance Calendar | GAA Consulting", description: "Practical notes from our partners and a yearly compliance calendar for Indian companies, LLPs and foreign-owned businesses." },
  { path: "/people", title: "Our Team | GAA Consulting", description: "Meet the company secretaries, corporate lawyers and finance professionals at GAA Consulting." },
  { path: "/how-we-work", title: "How We Work & Fees | GAA Consulting", description: "Fixed-fee mandates, annual retainers and partner advisory: clear scope, fixed fees and no surprises." },
  { path: "/careers", title: "Careers & CS Training | GAA Consulting", description: "Practical company secretarial and compliance training on live files, with mentorship from practising professionals at GAA Consulting." },
  { path: "/disclaimer", title: "Disclaimer | GAA Consulting", description: "Legal disclaimer and privacy notice for the GAA Consulting website." },
];
