// Hirings First: all text and data, from the "Hirings First Site" mockups (v2, 11 pages).
// TODO(client): confirm the contact details below (the mockup uses placeholders).
export const HF_CONTACT = {
  email: "hello@hiringsfirst.in",
  phone: "+91 00000 00000",
  office: "Office address",
};

// Six talent categories: page address /talent/<slug>
export const CATS = [
  {
    slug: "finance-accounting", name: "Finance & Accounting", short: "Finance", roles: "Accountants · Finance executives · Analysts",
    hero: "Accountants, finance executives and analysts, screened on the tools and compliance work your team does every day.",
    roleList: [["Accounts Executive", "Junior – Mid"], ["Finance Executive", "Mid"], ["AP / AR Specialist", "Junior – Mid"], ["GST & Tax Executive", "Mid"], ["Financial Analyst", "Mid – Senior"], ["Finance Manager", "Senior"]],
    screen: [["Technical", "Practical test on books, reconciliation and tax.", ["Tally", "Zoho Books", "GST", "TDS"]], ["Communication", "Clarity with stakeholders and reporting.", ["Spoken English", "Email", "MIS"]], ["Role fit", "Industry, notice period and expectations.", ["Availability", "Salary fit"]]],
    profiles: [["HF-FIN-0412", "Finance Executive", "2–5 yrs · Bengaluru", ["Zoho Books", "GST", "Tally"]], ["HF-FIN-0455", "Accounts Payable Specialist", "1–3 yrs · Bengaluru", ["AP", "Reconciliation", "SAP"]], ["HF-FIN-0467", "Financial Analyst", "3–6 yrs · Hybrid", ["MIS", "Excel", "Budgeting"]]],
  },
  {
    slug: "human-resources", name: "Human Resources", short: "HR", roles: "HR executives · Recruiters · Payroll",
    hero: "HR professionals across recruitment, payroll and compliance, assessed for process knowledge and people skills.",
    roleList: [["HR Executive", "Junior – Mid"], ["Talent Acquisition Specialist", "Mid"], ["Payroll Executive", "Junior – Mid"], ["HR Generalist", "Mid"], ["HR Business Partner", "Senior"], ["HR Manager", "Senior"]],
    screen: [["Technical", "Recruitment, payroll and statutory knowledge.", ["Payroll", "PF & ESI", "HRMS"]], ["Communication", "Interviewing and employee communication.", ["Spoken English", "Stakeholders"]], ["Role fit", "Team size, industry and expectations.", ["Availability", "Salary fit"]]],
    profiles: [["HF-HR-0187", "HR Executive", "2–4 yrs · Bengaluru", ["Recruitment", "Payroll", "Compliance"]], ["HF-HR-0192", "Talent Acquisition Specialist", "3–5 yrs · Hybrid", ["Sourcing", "ATS", "Tech hiring"]], ["HF-HR-0201", "Payroll Executive", "2–4 yrs · Bengaluru", ["Payroll", "PF & ESI", "Excel"]]],
  },
  {
    slug: "sales-and-business-development", name: "Sales & Business Development", short: "Sales", roles: "B2B sales · Inside sales · Key accounts",
    hero: "Sales professionals assessed on pitch, pipeline discipline and CRM use, ready to open conversations from week one.",
    roleList: [["Inside Sales Executive", "Junior"], ["B2B Sales Executive", "Junior – Mid"], ["Business Development Manager", "Mid"], ["Key Account Manager", "Mid – Senior"], ["Channel Sales Manager", "Mid – Senior"], ["Sales Lead", "Senior"]],
    screen: [["Technical", "Mock pitch and pipeline exercise.", ["Prospecting", "CRM", "Negotiation"]], ["Communication", "Clarity, confidence and objection handling.", ["Spoken English", "Regional language"]], ["Role fit", "Target experience and territory.", ["Availability", "Salary fit"]]],
    profiles: [["HF-SAL-0233", "Sales Executive", "1–4 yrs · Bengaluru", ["B2B Sales", "CRM", "Lead Generation"]], ["HF-SAL-0241", "Key Account Manager", "4–7 yrs · Bengaluru", ["Enterprise", "Renewals", "Upsell"]], ["HF-SAL-0250", "Inside Sales Executive", "1–2 yrs · Remote", ["Cold calling", "HubSpot", "Demos"]]],
  },
  {
    slug: "marketing", name: "Marketing", short: "Marketing", roles: "Digital · Content · Brand",
    hero: "Digital, content and brand marketers, assessed on real work samples, not just titles.",
    roleList: [["Digital Marketing Executive", "Junior – Mid"], ["Performance Marketer", "Mid"], ["Content Writer", "Junior – Mid"], ["Social Media Manager", "Mid"], ["Brand Manager", "Mid – Senior"], ["Marketing Manager", "Senior"]],
    screen: [["Technical", "Portfolio review and practical brief.", ["SEO", "Paid ads", "Analytics"]], ["Communication", "Writing and presentation skills.", ["Copy", "Presentation"]], ["Role fit", "Industry and channel experience.", ["Availability", "Salary fit"]]],
    profiles: [["HF-MKT-0098", "Digital Marketing Executive", "2–4 yrs · Remote", ["SEO", "Paid ads", "Analytics"]], ["HF-MKT-0104", "Content Writer", "1–3 yrs · Hybrid", ["B2B content", "SEO", "Editing"]], ["HF-MKT-0111", "Performance Marketer", "3–5 yrs · Bengaluru", ["Google Ads", "Meta Ads", "GA4"]]],
  },
  {
    slug: "operations", name: "Operations", short: "Operations", roles: "Admin · Supply chain · Customer ops",
    hero: "Operations and admin talent who keep the business running, screened for process, systems and reliability.",
    roleList: [["Admin Executive", "Junior"], ["Operations Coordinator", "Junior – Mid"], ["Customer Operations Executive", "Junior – Mid"], ["Supply Chain Executive", "Mid"], ["Procurement Executive", "Mid"], ["Operations Manager", "Senior"]],
    screen: [["Technical", "Process and systems exercise.", ["MIS", "Excel", "ERP"]], ["Communication", "Vendor and team coordination.", ["Spoken English", "Email"]], ["Role fit", "Shift, location and expectations.", ["Availability", "Salary fit"]]],
    profiles: [["HF-OPS-0145", "Operations Coordinator", "2–5 yrs · Bengaluru", ["Vendor mgmt", "MIS", "Excel"]], ["HF-OPS-0152", "Procurement Executive", "3–5 yrs · Bengaluru", ["Sourcing", "POs", "SAP"]], ["HF-OPS-0160", "Admin Executive", "1–3 yrs · Bengaluru", ["Facilities", "Travel", "Records"]]],
  },
  {
    slug: "technology", name: "Technology", short: "Technology", roles: "Developers · QA · IT support",
    hero: "Developers, QA and IT professionals, assessed with hands-on technical rounds before they reach you.",
    roleList: [["Frontend Developer", "Junior – Mid"], ["Backend Developer", "Mid"], ["Full-stack Developer", "Mid – Senior"], ["QA Engineer", "Junior – Mid"], ["IT Support Engineer", "Junior"], ["Tech Lead", "Senior"]],
    screen: [["Technical", "Coding or practical round.", ["React", "Node.js", "SQL", "Testing"]], ["Communication", "Explaining decisions and working in teams.", ["Spoken English", "Code review"]], ["Role fit", "Stack, work mode and notice period.", ["Availability", "Salary fit"]]],
    profiles: [["HF-TEC-0321", "Full-stack Developer", "3–6 yrs · Hybrid", ["React", "Node.js", "SQL"]], ["HF-TEC-0302", "QA Engineer", "2–4 yrs · Bengaluru", ["Manual QA", "Selenium", "API testing"]], ["HF-TEC-0330", "IT Support Engineer", "1–3 yrs · Bengaluru", ["Networking", "Windows", "Helpdesk"]]],
  },
];

// Four services: page address /services/<slug>
export const SVCS = [
  {
    slug: "it-corporate-recruitment", name: "IT & Corporate Recruitment",
    hero: "Permanent hiring across technology and corporate functions, from a single role to a full team build-out.",
    facts: [["Hiring model", "Permanent"], ["First profiles", "72 hours"], ["Replacement", "Guarantee period"]],
    incl: [["Role scoping", "Job description, skills and salary benchmarks agreed upfront."], ["Sourcing", "Active search across our pool, referrals and job platforms."], ["Pre-screening", "Technical and communication checks before you see a profile."], ["Interview coordination", "Scheduling, feedback and follow-ups handled for you."], ["Offer & negotiation", "Offer structuring and candidate closure."], ["Onboarding support", "Joining follow-up until day one."]],
    steps: [["Brief", "A 30-minute call to scope the role."], ["Search & screen", "We source and assess against your brief."], ["Shortlist", "You receive a focused shortlist with notes."], ["Hire", "We close the offer and track joining."]],
    cards: [["Startups", "First 10–50 hires across functions", ["Tech", "Sales", "Ops"]], ["Growing SMEs", "Scaling teams with consistent quality", ["Finance", "HR", "Marketing"]], ["Enterprises", "Volume and niche corporate roles", ["IT", "Shared services"]]],
  },
  {
    slug: "leadership-hiring", name: "Leadership Hiring",
    hero: "Confidential search for senior and leadership roles, mapped, assessed and referenced with care.",
    facts: [["Levels", "Senior to CXO"], ["Approach", "Confidential search"], ["Shortlist", "3–5 leaders"]],
    incl: [["Market mapping", "A view of the leaders who fit your brief, across competitors and adjacent industries."], ["Confidential outreach", "Discreet, one-to-one approaches to passive candidates."], ["Leadership assessment", "Structured interviews on track record, judgement and culture fit."], ["Reference checks", "Deep references and background verification."], ["Compensation advisory", "Benchmarks and offer structuring."], ["Transition support", "Support through notice period and onboarding."]],
    steps: [["Brief", "Role, mandate and success measures agreed."], ["Map & approach", "Market mapped and candidates approached discreetly."], ["Assess", "Structured leadership assessment and references."], ["Appoint", "Offer, negotiation and transition."]],
    cards: [["CXO & VP", "CFO, CHRO, CTO and business heads", ["Board-facing", "P&L"]], ["Functional heads", "Finance, HR, Sales and Technology leads", ["Team leadership"]], ["Founding leaders", "First senior hires for growing companies", ["Build", "Scale"]]],
  },
  {
    slug: "campus-placements", name: "Campus Placements",
    hero: "Graduate hiring programmes run end to end, from campus partnerships to batch onboarding.",
    facts: [["Hiring model", "Graduate batches"], ["Campuses", "Partner network"], ["Format", "On-campus & virtual"]],
    incl: [["Campus partnerships", "Relationships with colleges that match your hiring profile."], ["Drive planning", "Calendars, logistics and employer branding on campus."], ["Assessments", "Aptitude, technical and communication rounds."], ["Interviews", "Panel scheduling and evaluation support."], ["Batch offers", "Offer release, acceptance tracking and documentation."], ["Onboarding", "Joining coordination for the full batch."]],
    steps: [["Plan", "Roles, batch size and campuses agreed."], ["Engage", "Campus outreach and pre-placement talks."], ["Assess", "Tests, group discussions and interviews."], ["Onboard", "Batch offers and joining."]],
    cards: [["Freshers", "Graduates and postgraduates", ["B.Com", "BBA", "B.Tech"]], ["Interns", "Internship-to-hire programmes", ["3–6 months"]], ["Trainees", "Management and graduate trainees", ["MBA", "CA Inter"]]],
  },
  {
    slug: "workforce-outsourcing", name: "Workforce Outsourcing",
    hero: "Contract and outsourced staff, with payroll and compliance managed by us. Scale up or down as you need.",
    facts: [["Model", "Contract & outsourced"], ["Payroll", "Managed by HF"], ["Flexibility", "Ramp up or down"]],
    incl: [["Contract staffing", "Skilled staff on fixed-term or project contracts."], ["Payroll processing", "Monthly payroll and payslips."], ["Statutory compliance", "PF, ESI, PT and labour law compliance."], ["Attendance & leave", "Tracking and reporting for every associate."], ["HR administration", "Onboarding, documentation and exits."], ["Flexible scaling", "Add or release staff with short notice."]],
    steps: [["Scope", "Roles, headcount and duration agreed."], ["Deploy", "Screened staff deployed to your site."], ["Manage", "Payroll, attendance and compliance handled monthly."], ["Scale", "Ramp up or down as needs change."]],
    cards: [["Short-term projects", "Fixed-duration teams", ["3–12 months"]], ["Seasonal demand", "Peak-period staffing", ["Ops", "Sales", "Support"]], ["Long-term outsourcing", "Ongoing outsourced functions", ["Admin", "Back office"]]],
  },
];

export const getCategory = (slug) => CATS.find((c) => c.slug === slug);
export const getService = (slug) => SVCS.find((s) => s.slug === slug);

// Home
export const ROTATE = ["Finance", "HR", "Sales", "Marketing", "Operations", "Technology"];
export const DECK = [
  ["HF-FIN-0412", "Finance Executive", "4 yrs · Bengaluru", ["Zoho Books", "GST", "Tally"], "F"],
  ["HF-HR-0187", "HR Executive", "3 yrs · Bengaluru", ["Recruitment", "Payroll", "Compliance"], "H"],
  ["HF-SAL-0233", "Sales Executive", "2 yrs · Bengaluru", ["B2B Sales", "CRM", "Lead Generation"], "S"],
];
export const STEPS = [
  ["Tell us what you need", "Share the role, skills and timelines in a short call. We search wide against your brief.", "Profiles sourced for your brief", 120],
  ["We screen & match", "Every candidate is assessed for technical skills, communication and fit.", "Pass screening & assessment", 24],
  ["Interview & select", "You meet a focused shortlist, not a pile of resumes.", "Shortlisted for your interviews", 5],
  ["Hire", "We handle the offer and joining, so your hire starts on time.", "Hired", 1],
];
export const POOL = [
  ["HF-FIN-0412", "Finance", "Finance Executive", "2–5 yrs · Bengaluru", ["Zoho Books", "GST", "Tally"]],
  ["HF-HR-0187", "HR", "HR Executive", "2–4 yrs · Bengaluru", ["Recruitment", "Payroll", "Compliance"]],
  ["HF-SAL-0233", "Sales", "Sales Executive", "1–4 yrs · Bengaluru", ["B2B Sales", "CRM", "Lead Generation"]],
  ["HF-MKT-0098", "Marketing", "Digital Marketing Executive", "2–4 yrs · Remote", ["SEO", "Paid ads", "Analytics"]],
  ["HF-OPS-0145", "Operations", "Operations Coordinator", "2–5 yrs · Bengaluru", ["Vendor mgmt", "MIS", "Excel"]],
  ["HF-TEC-0321", "Technology", "Full-stack Developer", "3–6 yrs · Hybrid", ["React", "Node.js", "SQL"]],
  ["HF-FIN-0455", "Finance", "Accounts Payable Specialist", "1–3 yrs · Bengaluru", ["AP", "Reconciliation", "SAP"]],
  ["HF-TEC-0302", "Technology", "QA Engineer", "2–4 yrs · Bengaluru", ["Manual QA", "Selenium", "API testing"]],
];
export const FILTERS = ["All", ...ROTATE];

export const FAQ_CAT = [
  ["How quickly will I receive profiles?", "Most mandates receive profiles within 72 hours of the brief."],
  ["Are candidates screened before I see them?", "Yes. Every profile has completed technical, communication and role-fit checks."],
  ["Why are names hidden?", "To protect candidate privacy. Full profiles are shared once you request them."],
  ["What if a hire does not work out?", "Replacement terms are agreed upfront as part of the engagement."],
];
export const FAQ_SVC = [
  ["How do we get started?", "Share the requirement through the form or a short call, and we will propose a plan the same day."],
  ["How are fees structured?", "Fees depend on the service and role level and are agreed before work begins."],
  ["Do you work across India?", "Yes. We hire for on-site, hybrid and remote roles."],
  ["Can we combine services?", "Yes. Many clients use recruitment and workforce outsourcing together."],
];
