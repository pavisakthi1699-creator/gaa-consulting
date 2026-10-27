// Hirings First: all text and data, taken from the "Hirings First Site" mockups.
// TODO(client): confirm the contact details below (the mockup uses placeholders).
export const HF_CONTACT = {
  email: "hello@hiringsfirst.in",
  phone: "+91 00000 00000",
  office: "Office address",
};

// The six talent categories. `slug` is the page address: /talent/<slug>
export const CATS = [
  {
    slug: "finance-accounting", name: "Finance & Accounting", short: "Finance", roles: "Accountants · Finance executives · Analysts", glyph: "₹",
    hero: "Accountants, finance executives and analysts screened on the tools and compliance work your team does every day.",
    roleList: [["Accounts Executive", "Junior – Mid"], ["Finance Executive", "Mid"], ["Accounts Payable / Receivable", "Junior – Mid"], ["GST & Tax Executive", "Mid"], ["Financial Analyst", "Mid – Senior"], ["Finance Manager", "Senior"]],
    screen: [["Technical", "Practical test on books, reconciliation and tax.", ["Tally", "Zoho Books", "GST", "TDS"]], ["Communication", "Clarity with stakeholders and reporting.", ["Spoken English", "Email", "MIS"]], ["Role fit", "Industry, notice period and expectations.", ["Availability", "Salary fit"]]],
    profiles: [["Finance Executive", "2–5 yrs · Bengaluru", ["Zoho Books", "GST", "Tally"]], ["Accounts Payable Specialist", "1–3 yrs · Bengaluru", ["AP", "Reconciliation", "SAP"]], ["Financial Analyst", "3–6 yrs · Hybrid", ["MIS", "Excel", "Budgeting"]]],
  },
  {
    slug: "human-resources", name: "Human Resources", short: "HR", roles: "HR executives · Recruiters · Payroll", glyph: "HR",
    hero: "HR professionals across recruitment, payroll and compliance, assessed for process knowledge and people skills.",
    roleList: [["HR Executive", "Junior – Mid"], ["Talent Acquisition Specialist", "Mid"], ["Payroll Executive", "Junior – Mid"], ["HR Generalist", "Mid"], ["HR Business Partner", "Senior"], ["HR Manager", "Senior"]],
    screen: [["Technical", "Recruitment, payroll and statutory knowledge.", ["Payroll", "PF & ESI", "HRMS"]], ["Communication", "Interviewing and employee communication.", ["Spoken English", "Stakeholders"]], ["Role fit", "Team size, industry and expectations.", ["Availability", "Salary fit"]]],
    profiles: [["HR Executive", "2–4 yrs · Bengaluru", ["Recruitment", "Payroll", "Compliance"]], ["Talent Acquisition Specialist", "3–5 yrs · Hybrid", ["Sourcing", "ATS", "Tech hiring"]], ["Payroll Executive", "2–4 yrs · Bengaluru", ["Payroll", "PF & ESI", "Excel"]]],
  },
  {
    slug: "sales-and-business-development", name: "Sales & Business Development", short: "Sales", roles: "B2B sales · Inside sales · Key accounts", glyph: "↗",
    hero: "Sales professionals assessed on pitch, pipeline discipline and CRM use, ready to start conversations from week one.",
    roleList: [["Inside Sales Executive", "Junior"], ["B2B Sales Executive", "Junior – Mid"], ["Business Development Manager", "Mid"], ["Key Account Manager", "Mid – Senior"], ["Channel Sales Manager", "Mid – Senior"], ["Sales Lead", "Senior"]],
    screen: [["Technical", "Mock pitch and pipeline exercise.", ["Prospecting", "CRM", "Negotiation"]], ["Communication", "Clarity, confidence and objection handling.", ["Spoken English", "Regional language"]], ["Role fit", "Target experience and territory.", ["Availability", "Salary fit"]]],
    profiles: [["Sales Executive", "1–4 yrs · Bengaluru", ["B2B Sales", "CRM", "Lead Generation"]], ["Key Account Manager", "4–7 yrs · Bengaluru", ["Enterprise", "Renewals", "Upsell"]], ["Inside Sales Executive", "1–2 yrs · Remote", ["Cold calling", "HubSpot", "Demos"]]],
  },
  {
    slug: "marketing", name: "Marketing", short: "Marketing", roles: "Digital · Content · Brand", glyph: "◎",
    hero: "Digital, content and brand marketers assessed on real work samples, not just titles.",
    roleList: [["Digital Marketing Executive", "Junior – Mid"], ["Performance Marketer", "Mid"], ["Content Writer", "Junior – Mid"], ["Social Media Manager", "Mid"], ["Brand Manager", "Mid – Senior"], ["Marketing Manager", "Senior"]],
    screen: [["Technical", "Portfolio review and practical brief.", ["SEO", "Paid ads", "Analytics"]], ["Communication", "Writing and presentation skills.", ["Copy", "Presentation"]], ["Role fit", "Industry and channel experience.", ["Availability", "Salary fit"]]],
    profiles: [["Digital Marketing Executive", "2–4 yrs · Remote", ["SEO", "Paid ads", "Analytics"]], ["Content Writer", "1–3 yrs · Hybrid", ["B2B content", "SEO", "Editing"]], ["Performance Marketer", "3–5 yrs · Bengaluru", ["Google Ads", "Meta Ads", "GA4"]]],
  },
  {
    slug: "operations", name: "Operations", short: "Operations", roles: "Admin · Supply chain · Customer ops", glyph: "⚙",
    hero: "Operations and admin talent who keep the business running, screened for process, systems and reliability.",
    roleList: [["Admin Executive", "Junior"], ["Operations Coordinator", "Junior – Mid"], ["Customer Operations Executive", "Junior – Mid"], ["Supply Chain Executive", "Mid"], ["Procurement Executive", "Mid"], ["Operations Manager", "Senior"]],
    screen: [["Technical", "Process and systems exercise.", ["MIS", "Excel", "ERP"]], ["Communication", "Vendor and team coordination.", ["Spoken English", "Email"]], ["Role fit", "Shift, location and expectations.", ["Availability", "Salary fit"]]],
    profiles: [["Operations Coordinator", "2–5 yrs · Bengaluru", ["Vendor mgmt", "MIS", "Excel"]], ["Procurement Executive", "3–5 yrs · Bengaluru", ["Sourcing", "POs", "SAP"]], ["Admin Executive", "1–3 yrs · Bengaluru", ["Facilities", "Travel", "Records"]]],
  },
  {
    slug: "technology", name: "Technology", short: "Technology", roles: "Developers · QA · IT support", glyph: "</>",
    hero: "Developers, QA and IT professionals assessed with hands-on technical rounds before they reach you.",
    roleList: [["Frontend Developer", "Junior – Mid"], ["Backend Developer", "Mid"], ["Full-stack Developer", "Mid – Senior"], ["QA Engineer", "Junior – Mid"], ["IT Support Engineer", "Junior"], ["Tech Lead", "Senior"]],
    screen: [["Technical", "Coding or practical round.", ["React", "Node.js", "SQL", "Testing"]], ["Communication", "Explaining decisions and working in teams.", ["Spoken English", "Code review"]], ["Role fit", "Stack, work mode and notice period.", ["Availability", "Salary fit"]]],
    profiles: [["Full-stack Developer", "3–6 yrs · Hybrid", ["React", "Node.js", "SQL"]], ["QA Engineer", "2–4 yrs · Bengaluru", ["Manual QA", "Selenium", "API testing"]], ["IT Support Engineer", "1–3 yrs · Bengaluru", ["Networking", "Windows", "Helpdesk"]]],
  },
];

export const getCategory = (slug) => CATS.find((c) => c.slug === slug);

// Home: featured talent pool (category short name, role, meta, skills)
export const POOL = [
  ["Finance", "Finance Executive", "2–5 yrs · Bengaluru", ["Zoho Books", "GST", "Tally"]],
  ["HR", "HR Executive", "2–4 yrs · Bengaluru", ["Recruitment", "Payroll", "Compliance"]],
  ["Sales", "Sales Executive", "1–4 yrs · Bengaluru", ["B2B Sales", "CRM", "Lead Generation"]],
  ["Marketing", "Digital Marketing Executive", "2–4 yrs · Remote", ["SEO", "Paid ads", "Analytics"]],
  ["Operations", "Operations Coordinator", "2–5 yrs · Bengaluru", ["Vendor mgmt", "MIS", "Excel"]],
  ["Technology", "Full-stack Developer", "3–6 yrs · Hybrid", ["React", "Node.js", "SQL"]],
  ["Finance", "Accounts Payable Specialist", "1–3 yrs · Bengaluru", ["AP", "Reconciliation", "SAP"]],
  ["Technology", "QA Engineer", "2–4 yrs · Bengaluru", ["Manual QA", "Selenium", "API testing"]],
];

export const FILTERS = ["All", ...CATS.map((c) => c.short)];

export const STEPS = [
  ["Tell us what you need", "Share the role, skills and timelines in a short call."],
  ["We screen & match", "Candidates are assessed for skills, communication and fit."],
  ["Interview & select", "You meet a focused shortlist, not a pile of resumes."],
  ["Hire", "We handle offers and joining so they start on time."],
];

export const DIFF = [
  ["Screened", "Technical and communication assessments completed.", "3 checks"],
  ["Deployable", "Ready to join and perform from day one.", "Day 1"],
  ["Fast", "Shortlists delivered within days, not weeks.", "72h"],
];

export const SHORTLIST = [
  ["Candidate A", "4 yrs · Manufacturing", ["Zoho Books", "GST", "Tally"], [92, 88, 85]],
  ["Candidate B", "3 yrs · Services", ["Tally", "TDS", "MIS"], [86, 91, 80]],
  ["Candidate C", "5 yrs · Retail", ["GST", "Audit", "Excel"], [89, 84, 90]],
];

export const TICKER = ["Finance & Accounting", "Human Resources", "Sales", "Marketing", "Operations", "Technology", "Leadership hiring", "Campus placements", "Workforce outsourcing", "Contract staffing"];
