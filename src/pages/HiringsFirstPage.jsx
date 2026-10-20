import React, { useEffect, useRef, useState } from "react";
import "./GaaConsultingPage.css"; // Shares the exact same high-fidelity design system

const DIGITS = "01234567890123456789";

const STATS = [
  { val: "2500+", label: "Placements Successfully Closed" },
  { val: "94%", label: "12-Month Retention Rate" },
  { val: "14d", label: "Average Time-to-Shortlist" },
  { val: "4", label: "Physical Talent Desks" }
];

const PRACTICES = [
  {
    num: "01 — Practice",
    title: "Executive Search & CXO Placement",
    desc: "Confidential C-suite recruitment for founders, private equity sponsors, and boards. We place visionary CEOs, CFOs, CTOs, Chief Commercial Officers, and Independent Board Directors who drive exponential scale.",
    chips: ["CEO / MD Searches", "CFO & Finance Leaders", "Chief Legal Officers", "Board Appointments"],
    intent: "Leadership hiring"
  },
  {
    num: "02 — Practice",
    title: "Legal, CS & Governance Talent",
    desc: "Unique industry-specialized practice placing Practising Company Secretaries, In-House Legal Counsels, M&A Lawyers, and Regulatory Compliance Officers, rigorously vetted by GAA Consulting partners.",
    chips: ["General Counsels", "Company Secretaries (CS)", "Compliance Heads", "Contract Negotiators"],
    intent: "Hire talent"
  },
  {
    num: "03 — Practice",
    title: "Finance, Tax & CA Recruitment",
    desc: "Sourcing top-tier Chartered Accountants, FP&A Heads, Controllers, Internal Audit Directors, and Treasury specialists with verified institutional pedigree and cross-border tax experience.",
    chips: ["Chartered Accountants", "FP&A Specialists", "Treasury & Risk", "Internal Audit"],
    intent: "Hire talent"
  },
  {
    num: "04 — Practice",
    title: "Tech, AI & Product Engineering",
    desc: "High-speed technical recruitment for seed-stage startups to publicly traded tech firms. Vetted Software Architects, Full-Stack Engineers, AI/ML Scientists, and VP Engineering candidates.",
    chips: ["Tech Architects", "AI/ML Engineers", "Engineering Leaders", "Product Managers"],
    intent: "Hire talent"
  },
  {
    num: "05 — Practice",
    title: "Workforce Outsourcing & Staffing",
    desc: "Flexible contract staffing, project-based workforce deployment, and payroll administration for seasonal surges or rapid scale-up phases, fully compliant with Indian labour statutes.",
    chips: ["Contract Staffing", "Payroll Management", "Compliance Onboarding", "Rapid Deployment"],
    intent: "Workforce outsourcing"
  },
  {
    num: "06 — Practice",
    title: "Campus Drives & Trainee Batches",
    desc: "End-to-end management of university recruitment drives across premier tier-1 engineering, law, and management institutions for fast-track Management Trainee and Associate cohorts.",
    chips: ["Tier-1 Campus Drives", "Hackathons & Assessments", "CS Trainee Programs", "Management Cohorts"],
    intent: "Campus drive"
  }
];

const HUBS = [
  {
    tag: "HQ & Executive Search",
    name: "Mumbai (BKC)",
    address: "Financial Centre, G-Block, Bandra Kurla Complex, Mumbai — 400 051",
    tel: "+91 22 4980 1200"
  },
  {
    tag: "Corporate & Public Sector",
    name: "New Delhi (CP)",
    address: "Statesman House, Barakhamba Road, Connaught Place, New Delhi — 110 001",
    tel: "+91 11 4150 8800"
  },
  {
    tag: "Tech & Scaleup Talent",
    name: "Bengaluru (Indiranagar)",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru — 560 038",
    tel: "+91 80 4320 5500"
  },
  {
    tag: "Global & Cross-Border",
    name: "GIFT City IFSC",
    address: "Brigade International Financial Centre, GIFT City, Gandhinagar — 382 355",
    tel: "+91 79 6770 3300"
  }
];

export default function HiringsFirstPage({ onNavigate }) {
  const [isReady, setIsReady] = useState(false);
  const [sgridGo, setSgridGo] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100, tx: -100, ty: -100 });

  const navigateTo = (page, section = null) => {
    if (onNavigate) {
      onNavigate(page, section);
    } else if (page === "home") {
      window.location.hash = "#/";
    } else {
      window.location.hash = `#/${page}`;
    }
  };

  const handleContactIntent = (intent = "Hire talent") => {
    if (onNavigate) {
      onNavigate("contact");
    } else {
      window.location.hash = `#/contact?brand=hirings&intent=${encodeURIComponent(intent)}`;
    }
  };

  useEffect(() => {
    const tReady = setTimeout(() => setIsReady(true), 80);
    const tGo = setTimeout(() => setSgridGo(true), 350);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const heroEl = heroRef.current;
    const handleHeroMouseMove = (e) => {
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5).toFixed(3);
      const py = ((e.clientY - rect.top) / rect.height - 0.5).toFixed(3);
      heroEl.style.setProperty("--px", px);
      heroEl.style.setProperty("--py", py);
    };

    if (heroEl) heroEl.addEventListener("mousemove", handleHeroMouseMove);

    const ringEl = ringRef.current;
    let animId = 0;

    const handleMouseMove = (e) => {
      mousePos.current.tx = e.clientX;
      mousePos.current.ty = e.clientY;
      if (ringEl) ringEl.classList.add("on");
    };

    const handleMouseLeave = () => {
      if (ringEl) ringEl.classList.remove("on");
    };

    const handleMouseOver = (e) => {
      if (!ringEl) return;
      const isTarget = !!e.target.closest("a, button, .pc5, .hub, .val, .cc");
      ringEl.classList.toggle("big", isTarget);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    const renderLoop = () => {
      const m = mousePos.current;
      m.x += (m.tx - m.x) * 0.18;
      m.y += (m.ty - m.y) * 0.18;
      if (ringEl) ringEl.style.transform = `translate(${m.x}px, ${m.y}px)`;
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const rvElements = document.querySelectorAll(".gaa-page-wrapper .rv");
    rvElements.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 4) * 80}ms`;
      observer.observe(el);
    });

    return () => {
      clearTimeout(tReady);
      clearTimeout(tGo);
      window.removeEventListener("scroll", handleScroll);
      if (heroEl) heroEl.removeEventListener("mousemove", handleHeroMouseMove);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  const handlePracticeMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`gaa-page-wrapper ${isReady ? "ready" : ""}`}>
      <div id="pg" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div id="hf-cursor-ring" ref={ringRef} aria-hidden="true" />

      {/* DEDICATED HEADER */}
      <header id="hdr-gaa">
        <div className="hd-gaa">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Hirings First home"
          >
            <img src="/gaa-consulting-logo.png" alt="Hirings First" />
          </a>
          <nav aria-label="Main">
            <button
              type="button"
              onClick={() => navigateTo("home")}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              Group Portal
            </button>
            <button
              type="button"
              className="active"
              aria-current="page"
              onClick={() => scrollToSection("practices")}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              Search Verticals
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("about-gaa")}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              About Hirings First
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("hubs")}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              Commercial Hubs
            </button>
            <button
              type="button"
              onClick={() => handleContactIntent("Leadership hiring")}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              Contact Partner
            </button>
          </nav>
          <button
            type="button"
            className="book-gaa"
            onClick={() => handleContactIntent("Leadership hiring")}
          >
            Commission Mandate →
          </button>
        </div>
      </header>

      {/* Sub-bar / Portal Switcher */}
      <div className="sbar">
        <div className="w">
          <button
            type="button"
            className="back"
            onClick={() => navigateTo("home")}
            aria-label="Return to GAA Group Portal"
          >
            <span>←</span>
            <span>Return to GAA Advisory Group Portal (All 3 Practices)</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span className="bpill">
              <i /> Hirings First Practice
            </span>
            <span className="gm" style={{ color: "var(--m)", fontSize: "11px" }}>
              Executive Search · Leadership · Talent Advisory
            </span>
          </div>
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="hero6" id="top" ref={heroRef}>
          <span className="sect" aria-hidden="true">
            &amp;
          </span>
          <div className="w h6main">
            <div>
              <span className="tag6 e3" style={{ "--t": ".05s" }}>
                Executive Search · Tech Hiring · Corporate Placement
              </span>
              <h1 aria-label="Exceptional Leadership for Market Builders.">
                <span className="ln">
                  <span>
                    <span className="hw">Exceptional</span> <span className="hw">Talent</span>
                  </span>
                </span>
                <span className="ln">
                  <span>
                    <span className="hw">for</span> <em><span className="hw">Market</span></em>
                  </span>
                </span>
                <span className="ln">
                  <span>
                    <em><span className="hw">Builders.</span></em>
                  </span>
                </span>
              </h1>
              <p className="sub6 e3" style={{ "--t": ".55s" }}>
                Hirings First is the specialized executive search, CXO recruitment, and talent advisory practice of GAA Group. We connect high-growth enterprises and institutional boards with world-class leaders in Legal, Governance, Finance, and Technology.
              </p>
              <div className="acts e3" style={{ "--t": ".7s" }}>
                <button
                  type="button"
                  className="btn o"
                  onClick={() => handleContactIntent("Leadership hiring")}
                >
                  <span>Commission Executive Mandate</span>
                  <span className="ar">→</span>
                </button>
                <a className="btn g" href="#practices">
                  Explore Talent Verticals ↓
                </a>
              </div>
            </div>

            {/* Stacked Ledger Card */}
            <div className="stackc e3" style={{ "--t": ".4s" }}>
              <div className="lyr l3" />
              <div className="lyr l2" />
              <div className="front" id="front">
                <div className="fh">
                  <span>Search Benchmarks</span>
                  <span>Impact That Lasts</span>
                </div>
                <div className={`sgrid ${sgridGo ? "go" : ""}`} id="sgrid">
                  {STATS.map((stat) => {
                    let kCount = 0;
                    return (
                      <div className="st6" key={stat.label}>
                        <div className="num" role="img" aria-label={stat.val}>
                          {[...stat.val].map((ch, chIdx) => {
                            if (/\d/.test(ch)) {
                              const digit = parseInt(ch, 10);
                              const currentK = kCount++;
                              return (
                                <span className="dg" key={chIdx} aria-hidden="true">
                                  <span
                                    className="col"
                                    style={{
                                      "--d": 10 + digit,
                                      "--k-idx": currentK
                                    }}
                                  >
                                    {DIGITS.split("").map((d, dIdx) => (
                                      <span key={dIdx}>{d}</span>
                                    ))}
                                  </span>
                                </span>
                              );
                            }
                            return (
                              <span className="sf" key={chIdx} aria-hidden="true">
                                {ch}
                              </span>
                            );
                          })}
                        </div>
                        <span className="lbl">{stat.label}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="fnote">
                  Partner-led talent evaluation. Every candidate is assessed on technical rigor, governance alignment, and cultural resonance.
                </p>
              </div>
            </div>
          </div>

          {/* Marquee Ticker */}
          <div className="tk" aria-hidden="true">
            <div>
              <span>Executive Search</span>
              <span className="s">✦</span>
              <span>C-Suite Placements</span>
              <span className="s">✦</span>
              <span>General Counsels</span>
              <span className="s">✦</span>
              <span>Company Secretaries</span>
              <span className="s">✦</span>
              <span>CA &amp; CFO Hiring</span>
              <span className="s">✦</span>
              <span>Tech Leaders</span>
              <span className="s">✦</span>
              <span>Executive Search</span>
              <span className="s">✦</span>
              <span>C-Suite Placements</span>
              <span className="s">✦</span>
              <span>General Counsels</span>
              <span className="s">✦</span>
              <span>Company Secretaries</span>
              <span className="s">✦</span>
              <span>CA &amp; CFO Hiring</span>
              <span className="s">✦</span>
              <span>Tech Leaders</span>
              <span className="s">✦</span>
            </div>
          </div>
        </section>

        {/* THE SEARCH DIFFERENCE */}
        <section className="s" id="advantage">
          <div className="w">
            <div className="head6">
              <span className="gm eb">The Search Difference</span>
              <h2 style={{ marginTop: "14px" }}>
                Why industry leaders <em>hire through us.</em>
              </h2>
              <p>
                Hiring senior leadership shouldn't mean drowning in unvetted CV spam from generic recruiters. Hirings First provides strategic executive headhunting backed by domain experts.
              </p>
            </div>
            <div className="cmp">
              <div className="cc rv">
                <span className="t">Generic Job Portals</span>
                <h3>Automated Resume Dumps</h3>
                <p>
                  Keyword-matching algorithms that flood founders with hundreds of misaligned applicants, creating screening fatigue without uncovering passive tier-1 talent.
                </p>
                <ul>
                  <li>
                    <b>✕</b> Zero technical competence screening
                  </li>
                  <li>
                    <b>✕</b> Passive candidate pools only
                  </li>
                  <li>
                    <b>✕</b> Disastrous 60% early churn rates
                  </li>
                </ul>
              </div>

              <div className="cc hl rv">
                <span className="t">Hirings First Standard</span>
                <h3>Vetted Partner-Led Headhunting</h3>
                <p>
                  Bespoke executive search directed by industry veterans. Every candidate undergoes rigorous case-study evaluation, reference checks, and peer credential verification.
                </p>
                <ul>
                  <li>
                    <b>✓</b> Pre-screened by practising corporate counsels &amp; CAs
                  </li>
                  <li>
                    <b>✓</b> 94% retention rate at 12-month post-placement mark
                  </li>
                  <li>
                    <b>✓</b> Free candidate replacement guarantee within 90 days
                  </li>
                  <li>
                    <b>✓</b> Access to high-performing confidential passive talent
                  </li>
                </ul>
              </div>

              <div className="cc rv">
                <span className="t">Traditional Headhunters</span>
                <h3>Volume Staffing Agencies</h3>
                <p>
                  High-pressure sales agencies with junior recruiters who don't understand the nuance between corporate secretarial, tax structuring, or microservices architecture.
                </p>
                <ul>
                  <li>
                    <b>✕</b> Lack of domain expertise
                  </li>
                  <li>
                    <b>✕</b> Heavy upfront non-refundable retainers
                  </li>
                  <li>
                    <b>✕</b> Superficial LinkedIn outreach tactics
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CORE PRACTICE VERTICALS */}
        <section className="s alt" id="practices">
          <div className="w">
            <div className="head6">
              <span className="gm eb">Search Verticals</span>
              <h2 style={{ marginTop: "14px" }}>
                Specialized recruitment across <em>critical functions.</em>
              </h2>
              <p>
                Explore our specialized recruitment practices covering executive leadership, legal counsel, finance executives, and engineering talent.
              </p>
            </div>

            <div className="pgrid">
              {PRACTICES.map((p) => (
                <div
                  key={p.num}
                  className="pc5 rv"
                  onMouseMove={handlePracticeMouseMove}
                  onClick={() => handleContactIntent(p.intent)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleContactIntent(p.intent);
                  }}
                >
                  <div className="top">
                    <span className="n">{p.num}</span>
                    <span className="go2">→</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="chips">
                    {p.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT HIRINGS FIRST */}
        <section className="s" id="about-gaa">
          <div className="w ag">
            <div>
              <span className="gm eb">About Hirings First</span>
              <h2 style={{ marginTop: "14px" }}>
                Where institutional rigor meets <em>human talent.</em>
              </h2>
              <p className="ap">
                Hirings First was established to solve the greatest bottleneck in enterprise scaling: securing verified leadership talent that stays, executes, and scales. Because we are born out of GAA Advisory Group, we understand governance, fiduciary risk, and commercial execution from the inside out.
              </p>
              <p className="ap">
                Our talent partners don't just review resumes; we test candidate competencies against real boardroom and transaction challenges before making introductions.
              </p>

              <div className="vals">
                <div className="val rv">
                  <i>01</i>
                  <div>
                    <b>Domain-Expert Screening</b>
                    <span>Corporate lawyers vet legal candidates; veteran CAs interview finance talent.</span>
                  </div>
                </div>
                <div className="val rv">
                  <i>02</i>
                  <div>
                    <b>Confidential Search Protocol</b>
                    <span>Discreet headhunting for sensitive replacements, board transitions, and stealth mandates.</span>
                  </div>
                </div>
                <div className="val rv">
                  <i>03</i>
                  <div>
                    <b>90-Day Placement Guarantee</b>
                    <span>Total accountability with a complimentary candidate replacement guarantee on all executive searches.</span>
                  </div>
                </div>
                <div className="val rv">
                  <i>04</i>
                  <div>
                    <b>Bilateral Cultural Fit</b>
                    <span>Deep stakeholder alignment ensuring incoming leaders match promoter and boardroom values.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Credentials Sticky Box */}
            <aside className="cred rv">
              <h3>Our Search Commitments</h3>
              <p className="sub">Setting the gold standard in leadership acquisition</p>

              <div className="ci">
                <span className="ic">01</span>
                <div>
                  <b>14-Day Shortlist Delivery</b>
                  <span>First curated batch of fully screened candidates presented within 10-14 business days.</span>
                </div>
              </div>

              <div className="ci">
                <span className="ic">02</span>
                <div>
                  <b>Independent Background Checks</b>
                  <span>Thorough verification of past employment, criminal records, and professional bar standing.</span>
                </div>
              </div>

              <div className="ci">
                <span className="ic">03</span>
                <div>
                  <b>Compensation Benchmarking</b>
                  <span>Real-time compensation data and equity/ESOP structuring counsel for market-leading offers.</span>
                </div>
              </div>

              <div className="ci">
                <span className="ic">04</span>
                <div>
                  <b>Post-Placement Onboarding Support</b>
                  <span>Continuous 30-60-90 day check-ins with both candidate and promoter to ensure seamless integration.</span>
                </div>
              </div>

              <button
                type="button"
                className="btn o"
                onClick={() => handleContactIntent("Leadership hiring")}
              >
                <span>Initiate Executive Search Mandate</span>
                <span className="ar">→</span>
              </button>
            </aside>
          </div>
        </section>

        {/* COMMERCIAL HUBS */}
        <section className="s alt" id="hubs">
          <div className="w">
            <div className="head6">
              <span className="gm eb">Commercial Hubs</span>
              <h2 style={{ marginTop: "14px" }}>
                Physical presence across <em>India's talent corridors.</em>
              </h2>
            </div>
            <div className="hubs">
              {HUBS.map((hub) => (
                <div className="hub rv" key={hub.name}>
                  <span className="tg">{hub.tag}</span>
                  <b>{hub.name}</b>
                  <span className="ad">{hub.address}</span>
                  <a className="tel" href={`tel:${hub.tel.replace(/\s+/g, "")}`}>
                    {hub.tel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEXT STEP CTA BAND */}
        <section className="s band">
          <span className="orb" />
          <span className="orb" />
          <div className="w">
            <span className="gm eb">Next step</span>
            <h2 style={{ marginTop: "16px" }}>
              Ready to hire your next <em>game-changing leader?</em>
            </h2>
            <p>
              Connect directly with our senior executive search partners at Hirings First. Confidential briefings under mutual non-disclosure.
            </p>
            <div className="acts">
              <button
                type="button"
                className="btn o"
                onClick={() => handleContactIntent("Leadership hiring")}
              >
                Schedule Talent Consultation →
              </button>
              <button
                type="button"
                className="btn g"
                onClick={() => navigateTo("home")}
              >
                ← GAA Group Portal
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* DEDICATED FOOTER */}
      <footer className="ft-dedicated">
        <div className="ft">
          <img src="/gaa-consulting-logo.png" alt="Hirings First" />
          <div>
            <button
              type="button"
              onClick={() => navigateTo("gaa-consulting")}
            >
              GAA Consulting
            </button>
            <button
              type="button"
              onClick={() => navigateTo("filings-first")}
            >
              Filings First
            </button>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Hirings First
            </button>
            <button
              type="button"
              onClick={() => navigateTo("about")}
            >
              About us
            </button>
            <button
              type="button"
              onClick={() => navigateTo("contact")}
            >
              Contact us
            </button>
          </div>
          <span>© 2026 · All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
