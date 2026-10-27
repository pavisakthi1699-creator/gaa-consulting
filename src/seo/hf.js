// SEO for hiringsfirst.com (plain JavaScript: also read by scripts/seo-pages.mjs)
export const SITE = "https://www.hiringsfirst.com"; // TODO(client): confirm production domain
export const BRAND = "Hirings First";
export const ORG = { type: "EmploymentAgency", extra: { address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" } } };

const cat = (slug, name, desc) => ({ path: `/talent/${slug}`, title: `Hire Pre-screened ${name} Talent | Hirings First`, description: desc });

const svc = (slug, name, desc) => ({ path: `/services/${slug}`, title: `${name} | Hirings First`, description: desc });

export const ROUTES = [
  { path: "/", title: "Hirings First | Pre-screened Talent, Ready to Perform", description: "Hirings First delivers pre-screened professionals across Finance, HR, Sales, Marketing, Operations and Technology. Shortlists within 72 hours. A GAA Group company." },
  cat("finance-accounting", "Finance & Accounting", "Accountants, finance executives and analysts screened on the tools and compliance work your team does every day. Request profiles from Hirings First."),
  cat("human-resources", "Human Resources", "HR professionals across recruitment, payroll and compliance, assessed for process knowledge and people skills."),
  cat("sales-and-business-development", "Sales & Business Development", "Sales professionals assessed on pitch, pipeline discipline and CRM use, ready to start conversations from week one."),
  cat("marketing", "Marketing", "Digital, content and brand marketers assessed on real work samples, not just titles."),
  cat("operations", "Operations", "Operations and admin talent who keep the business running, screened for process, systems and reliability."),
  svc("it-corporate-recruitment", "IT & Corporate Recruitment", "Permanent hiring across technology and corporate functions, from a single role to a full team build-out. First profiles within 72 hours."),
  svc("leadership-hiring", "Leadership Hiring", "Confidential search for senior and leadership roles, from functional heads to CXO: market mapping, assessment and references."),
  svc("campus-placements", "Campus Placements", "Graduate hiring programmes run end to end, from campus partnerships and assessments to batch offers and onboarding."),
  svc("workforce-outsourcing", "Workforce Outsourcing", "Contract and outsourced staff with payroll and statutory compliance managed by Hirings First. Scale up or down as you need."),
  cat("technology", "Technology", "Developers, QA and IT professionals assessed with hands-on technical rounds before they reach you."),
];
