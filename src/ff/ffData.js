// Filings First: navigation, home page and GST registration content (from the client's mockups).
// Em dashes from the mockups are replaced with commas or colons.
import { PAGES } from "./ffPages.js";

export { PAGES };

// The mockups show placeholders here. These are Filings First's public details.
// TODO(client): confirm address, email and phone.
export const FF_CONTACT = {
  office: "Bannerghatta Road, Bengaluru 560076",
  email: "info@filingsfirst.com",
  phone: "+91 90084 76666",
};

// The five services and their detail pages (mega menu, home services list, footer)
export const SERVICES = [
  { slug: "accounting", name: "Accounting", line: "Statements, MIS & audit support", items: [["financial-statements", "Financial statements"], ["monthly-mis-reporting", "Monthly MIS reporting"], ["audit-support", "Audit support"], ["ledger-reviews", "Ledger reviews"]] },
  { slug: "bookkeeping", name: "Bookkeeping", line: "Recording, reconciliation & close", items: [["transaction-recording", "Transaction recording"], ["bank-reconciliations", "Bank reconciliations"], ["payables-and-receivables", "Payables & receivables"], ["monthly-close", "Monthly close"]] },
  { slug: "taxation", name: "Taxation", line: "Planning, returns, TDS & assessments", items: [["tax-planning", "Tax planning"], ["income-tax-returns", "Income tax returns"], ["advance-tax-and-tds", "Advance tax & TDS"], ["assessment-support", "Assessment support"]] },
  { slug: "gst", name: "GST", line: "Registration, returns & ITC", items: [["gst-registration", "GST registration"], ["gst-periodic-returns", "Periodic returns"], ["itc-reconciliation", "ITC reconciliation"], ["gst-notices-and-queries", "Notices & queries"]] },
  { slug: "corporate-compliance", name: "Corporate compliance", line: "ROC filings, registers & alerts", items: [["roc-and-annual-filings", "ROC & annual filings"], ["compliance-calendar", "Compliance calendar"], ["statutory-registers", "Statutory registers"], ["due-date-alerts", "Due-date alerts"]] },
];

export const isPage = (slug) => slug === "gst-registration" || !!PAGES[slug];

export const HOME = {
  eyebrow: "Accounting · Tax · GST · Compliance",
  h1: ["Every deadline.", "Handled."],
  lead: "Filings First keeps your books, taxes, GST and ROC filings on schedule, so you can run the business, not the paperwork.",
  calendar: {
    month: "November 2026",
    rows: [
      ["07", "TDS deposit", "Previous month deductions"],
      ["11", "GSTR-1", "Outward supplies"],
      ["15", "PF & ESI", "Employee contributions"],
      ["20", "GSTR-3B", "Summary return & tax"],
      ["30", "MIS report", "Monthly close & reporting"],
      ["31", "TDS return", "Quarterly statement"],
    ],
    note: "Illustrative schedule: actual due dates depend on your registrations.",
  },
  marquee: ["GSTR-1", "GSTR-3B", "TDS returns", "Advance tax", "Income tax returns", "ROC annual filings", "ITC reconciliation", "Monthly MIS", "Bank reconciliations", "Statutory registers", "Audit support", "GST registration"],
  change: {
    eyebrow: "Before & after",
    h2: "What changes when we take over",
    without: [
      ["Missed due dates", "GST, TDS and ROC deadlines tracked in spreadsheets and memory."],
      ["Year-end scramble", "Books updated only before the audit."],
      ["Unclaimed credit", "Supplier mismatches mean lost input tax credit."],
      ["Too many vendors", "Different people for accounts, tax and ROC."],
    ],
    with: [
      ["Every date tracked", "A shared compliance calendar with alerts before each deadline."],
      ["Books closed monthly", "Reconciled accounts and MIS every month."],
      ["Credit reconciled", "ITC matched with supplier filings before every return."],
      ["One accountable team", "Accounts, tax, GST and ROC handled together."],
    ],
  },
  packages: {
    eyebrow: "Packages",
    h2: "Pick a plan. Grow into the next.",
    tiers: [
      { tier: "Tier 01", name: "Essential", for: "Early-stage startups and proprietorships", items: ["Monthly bookkeeping", "GST returns (GSTR-1 & 3B)", "TDS returns", "Annual income tax return", "Email support"], limit: "Up to 100 transactions / month · 1 GST registration", cta: "Choose Essential" },
      { tier: "Tier 02", name: "Growth", for: "SMEs and funded startups", items: ["Everything in Essential", "Monthly MIS report", "GST & ITC reconciliation", "Advance tax computation", "ROC annual filings", "Dedicated accountant"], limit: "Up to 400 transactions / month · 2 GST registrations", cta: "Choose Growth", top: true },
      { tier: "Tier 03", name: "Complete", for: "Established and multi-entity companies", items: ["Everything in Growth", "Audit coordination", "Compliance calendar & alerts", "Statutory registers", "Quarterly review call", "Priority response"], limit: "Custom volume · Multiple entities & states", cta: "Choose Complete" },
    ],
    note: "Fees exclude government charges and applicable GST. Custom scopes available for groups and multi-state businesses.",
  },
  process: {
    eyebrow: "Process & timelines",
    h2: "Live in two weeks",
    steps: [
      ["Day 1", "Consultation", "A short call to understand your business and compliance status."],
      ["Day 2–3", "Proposal", "A fixed-scope proposal with package, fees and responsibilities."],
      ["Week 1", "Onboarding", "Documents, access and past filings are collected and reviewed."],
      ["Week 2", "Set-up", "Compliance calendar, chart of accounts and routine go live."],
      ["Monthly", "Ongoing", "Books, returns and reports delivered on schedule."],
    ],
  },
  terms: {
    eyebrow: "Exclusions & terms",
    h2: "Clear boundaries, no surprises",
    excluded: ["Statutory audit (coordinated, but performed by an independent auditor)", "Litigation, appeals and tribunal representation", "Backlogs older than the current financial year", "Government fees, penalties and late charges", "Valuation and transaction advisory (via GAA Consulting)"],
    terms: ["12-month engagement, renewable annually", "Fees billed in advance, monthly or annually", "Timelines depend on complete information from you", "Scope changes agreed in writing", "All client data handled confidentially"],
  },
  faqs: {
    eyebrow: "FAQs",
    h2: "Practical answers",
    items: [
      ["How quickly can you start?", "Most clients are onboarded within one to two weeks of signing."],
      ["Can you take over from our current accountant?", "Yes. We handle the transition, review past filings and flag pending items."],
      ["What if we exceed the package limit?", "We review volumes quarterly and recommend the right tier or a custom scope."],
      ["Do you handle multi-state GST?", "Yes. The Complete package covers multiple registrations and entities."],
      ["Which accounting software do you use?", "We work with the software you already use."],
      ["Who is my point of contact?", "Growth and Complete clients get a dedicated accountant."],
    ],
  },
  insights: {
    eyebrow: "Insights",
    h2: "From our blog",
    posts: [
      ["GST", "5 min read", "Common ITC reconciliation mistakes and how to avoid them"],
      ["Compliance", "4 min read", "Your annual ROC filing checklist for private limited companies"],
      ["Taxation", "6 min read", "Advance tax for startups: dates, calculation and penalties"],
    ],
  },
  contact: { eyebrow: "Contact us", h2: ["Hand over the", "deadlines."], topics: ["Accounting", "Bookkeeping", "Taxation", "GST", "Compliance"] },
};

// GST registration: same layout as the other service pages plus eligibility and registration types
export const GST_REG = {
  slug: "gst-registration",
  name: "GST registration",
  parent: "gst",
  eyebrow: "GST services",
  h1: ["GST registration,", "done right."],
  lead: "Get your GSTIN with expert help on eligibility, documents and filing, handled end to end by the Filings First team.",
  checks: ["Eligibility check and registration-type advice", "Document review before submission", "Application filing and query handling", "Guidance on your first GST returns"],
  formTitle: "Talk to a GST expert",
  overview: {
    h2: "What is GST registration?",
    p1: "GST registration is the process through which a business is enrolled under the Goods and Services Tax law and receives a unique 15-digit GST Identification Number (GSTIN).",
    p2: "Once registered, a business can collect GST from customers, claim input tax credit on purchases and file GST returns. Registration is mandatory for businesses that cross the prescribed turnover limit or fall under specific categories.",
  },
  eligibility: {
    h2: "Who needs to register?",
    thresholds: [
      ["Supply of goods", "₹40 lakh", "Annual aggregate turnover threshold (₹20 lakh in special category states)."],
      ["Supply of services", "₹20 lakh", "Annual aggregate turnover threshold (₹10 lakh in special category states)."],
    ],
    mandatoryLabel: "Mandatory regardless of turnover",
    mandatory: ["Inter-state suppliers of goods", "Sellers on e-commerce platforms", "Casual taxable persons", "Non-resident taxable persons", "Persons required to pay tax under reverse charge"],
    note: "Thresholds are indicative and subject to current GST law. Our team confirms applicability for your business.",
  },
  types: {
    h2: "Choose the right registration",
    items: [
      ["Regular registration", "For most businesses above the turnover threshold that charge GST and claim input tax credit."],
      ["Composition scheme", "A simplified option for eligible small businesses, paying tax at a fixed rate on turnover."],
      ["Casual taxable person", "For businesses supplying occasionally from a state where they have no fixed place of business."],
      ["Non-resident taxable person", "For overseas persons making taxable supplies in India on an occasional basis."],
      ["Input Service Distributor", "For offices that receive service invoices and distribute input credit to branches."],
      ["TDS / TCS registration", "For government bodies and e-commerce operators required to deduct or collect tax."],
    ],
  },
  docTabs: {
    h2: "What you'll need",
    tabs: {
      Proprietorship: ["PAN card of the proprietor", "Aadhaar card of the proprietor", "Passport-size photograph", "Proof of business address", "Electricity bill or rent agreement for the premises", "Bank statement or cancelled cheque"],
      "Partnership / LLP": ["PAN card of the firm / LLP", "Partnership deed or LLP agreement", "PAN, Aadhaar and photos of partners", "Authorisation letter for the signatory", "Proof of principal place of business", "Bank statement or cancelled cheque"],
      Company: ["PAN card of the company", "Certificate of incorporation", "MOA and AOA", "PAN, Aadhaar and photos of directors", "Board resolution for the authorised signatory", "Proof of registered office and bank details"],
    },
  },
  process: {
    h2: "From documents to GSTIN",
    cadence: "Typically 3–7 working days*",
    steps: [
      ["Consultation", "We confirm eligibility and the right registration type for your business."],
      ["Document check", "We collect and review your documents before anything is filed."],
      ["Application", "We file Part A and Part B on the GST portal and share the ARN."],
      ["Verification", "We handle any clarification requests from the department."],
      ["GSTIN issued", "You receive your registration certificate and first-return guidance."],
    ],
    note: "*Timelines depend on document readiness and department verification.",
  },
  pricing: {
    h2: "Simple, transparent fees",
    plans: [
      { name: "Standard", rec: false, price: "₹ X,XXX", suffix: "+ applicable taxes", items: ["Eligibility consultation", "Document review", "Application filing", "ARN and GSTIN tracking"], cta: "Get started" },
      { name: "Registration + Returns", rec: true, price: "₹ X,XXX", suffix: "+ applicable taxes", items: ["Everything in Standard", "Query and clarification handling", "First three months of GST returns", "Dedicated GST expert"], cta: "Get started" },
    ],
  },
  benefits: {
    h2: "Why register",
    items: [
      ["Legal recognition", "Operate as a registered supplier of goods or services."],
      ["Input tax credit", "Claim credit for GST paid on business purchases."],
      ["Inter-state and online sales", "Sell across states and on e-commerce platforms."],
      ["Credibility with clients", "Larger clients and tenders often require a GSTIN."],
    ],
    eyebrow: "Penalties",
    title: "Not registering when required can be costly",
    text: "Businesses that are liable but fail to register may face a penalty of 10% of the tax due, subject to a minimum of ₹10,000. Higher penalties can apply in cases of deliberate evasion.",
    cta: "Check your eligibility",
  },
  faqs: {
    h2: "GST registration questions",
    items: [
      ["How long does GST registration take?", "Typically 3–7 working days once documents are complete, depending on department verification."],
      ["Can I register voluntarily below the threshold?", "Yes. Voluntary registration lets you claim input tax credit and sell to GST-registered clients."],
      ["Do I need a separate registration for each state?", "Yes. A separate GSTIN is required for each state where you have a place of business."],
      ["Can I register from a home address?", "Yes, provided you have valid proof of address and, where applicable, consent from the owner."],
      ["What happens after I get my GSTIN?", "You must issue GST-compliant invoices and file returns on time. We can manage this for you."],
      ["Can a GST registration be cancelled?", "Yes, on closure of business or if you no longer meet the registration requirements."],
    ],
  },
  related: {
    label: "Related services",
    items: [["gst", "GST", "GST returns & compliance"], ["taxation", "Taxation", "Income tax & TDS"], ["bookkeeping", "Bookkeeping", "Monthly bookkeeping"], ["corporate-compliance", "Compliance", "Corporate compliance"]],
  },
};
