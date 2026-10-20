import React, { useEffect, useRef, useState } from "react";
import "./GaaConsultingPage.css"; // Shares the exact same high-fidelity design system

const DIGITS = "01234567890123456789";

const STATS = [
  { val: "10k+", label: "Statutory Filings Delivered" },
  { val: "99.8%", label: "On-Time Compliance SLA" },
  { val: "24h", label: "Query Resolution SLA" },
  { val: "4", label: "Financial Hub Desks" }
];

const PRACTICES = [
  {
    num: "01 — Practice",
    title: "Accounting & Virtual CFO Retainer",
    desc: "Complete financial operations management, real-time cloud bookkeeping (Zoho Books, Tally, QuickBooks), MIS reporting, cash flow projections, and dedicated virtual CFO advisory for growing businesses.",
    chips: ["Cloud Bookkeeping", "Virtual CFO", "Monthly MIS Reports", "Cashflow Modeling"],
    intent: "Accounting & bookkeeping"
  },
  {
    num: "02 — Practice",
    title: "Corporate Direct Taxation & TDS",
    desc: "End-to-end corporate income tax advisory, advance tax computations, quarterly TDS returns, tax audit reports under Section 44AB, and representation before income tax authorities.",
    chips: ["Advance Tax Planning", "TDS Returns (24Q/26Q)", "Section 44AB Audit", "ITR-6 Filing"],
    intent: "Taxation"
  },
  {
    num: "03 — Practice",
    title: "GST Compliance, ITC & Refund Desk",
    desc: "Seamless monthly and quarterly GST filings (GSTR-1, GSTR-3B, GSTR-9/9C annual returns), reconciliation of input tax credit (GSTR-2B vs Books), and expedited export refund processing.",
    chips: ["GSTR-1 & 3B", "GSTR-9/9C Annual", "2B Reconciliation", "Export GST Refunds"],
    intent: "GST"
  },
  {
    num: "04 — Practice",
    title: "ROC & MCA Corporate Compliance",
    desc: "Timely filing of MCA annual returns (AOC-4, MGT-7/7A), DIR-3 KYC for directors, maintaining statutory registers, and ensuring zero late fees or strike-off notices under Companies Act, 2013.",
    chips: ["AOC-4 & MGT-7", "DIR-3 KYC", "DIN Activation", "Event-Based Filings"],
    intent: "Corporate compliance"
  },
  {
    num: "05 — Practice",
    title: "Payroll & Labour Law Compliance",
    desc: "Full-cycle automated payroll processing, salary slips, Provident Fund (PF / ECR), Employee State Insurance (ESIC), Professional Tax (PT), and Labour Welfare Fund statutory deductions.",
    chips: ["PF / ECR Filings", "ESIC Compliance", "Professional Tax (PT)", "Payroll Slips & Form 16"],
    intent: "Corporate compliance"
  },
  {
    num: "06 — Practice",
    title: "Entity Incorporation & Registrations",
    desc: "Turnkey company formation across India: Private Limited, LLP, Section 8, and Producer Companies, along with MSME Udyam, Startup India DPIIT recognition, and Import Export Code (IEC).",
    chips: ["Private Limited & LLP", "MSME Udyam", "DPIIT Recognition", "IEC Code"],
    intent: "Corporate compliance"
  }
];

const HUBS = [
  {
    tag: "HQ & Tax Hub",
    name: "Mumbai (BKC)",
    address: "Financial Centre, G-Block, Bandra Kurla Complex, Mumbai — 400 051",
    tel: "+91 22 4980 1200"
  },
  {
    tag: "ROC & Regulatory Desk",
    name: "New Delhi (CP)",
    address: "Statesman House, Barakhamba Road, Connaught Place, New Delhi — 110 001",
    tel: "+91 11 4150 8800"
  },
  {
    tag: "Startup & Tech Filings",
    name: "Bengaluru (Indiranagar)",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru — 560 038",
    tel: "+91 80 4320 5500"
  },
  {
    tag: "Cross-Border & GST",
    name: "GIFT City IFSC",
    address: "Brigade International Financial Centre, GIFT City, Gandhinagar — 382 355",
    tel: "+91 79 6770 3300"
  }
];

export default function FilingsFirstPage({ onNavigate }) {
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

  const handleContactIntent = (intent = "Accounting & bookkeeping") => {
    if (onNavigate) {
      onNavigate("contact");
    } else {
      window.location.hash = `#/contact?brand=filings&intent=${encodeURIComponent(intent)}`;
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
      <div id="ff-cursor-ring" ref={ringRef} aria-hidden="true" />

      {/* DEDICATED HEADER */}
      <header id="hdr-gaa">
        <div className="hd-gaa">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Filings First home"
          >
            <img src="/gaa-consulting-logo.png" alt="Filings First" />
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
              Practice Areas
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("about-gaa")}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              About Filings First
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
              onClick={() => handleContactIntent("Accounting & bookkeeping")}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              Contact Lead
            </button>
          </nav>
          <button
            type="button"
            className="book-gaa"
            onClick={() => handleContactIntent("Accounting & bookkeeping")}
          >
            Book Consultation →
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
              <i /> Filings First Practice
            </span>
            <span className="gm" style={{ color: "var(--m)", fontSize: "11px" }}>
              Accounting · Taxation · ROC Compliance
            </span>
          </div>
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="hero6" id="top" ref={heroRef}>
          <span className="sect" aria-hidden="true">
            ¶
          </span>
          <div className="w h6main">
            <div>
              <span className="tag6 e3" style={{ "--t": ".05s" }}>
                Accounting · Taxation · GST · Corporate Filings
              </span>
              <h1 aria-label="Seamless Compliance for High-Velocity Enterprises.">
                <span className="ln">
                  <span>
                    <span className="hw">Seamless</span> <span className="hw">Tax</span>
                  </span>
                </span>
                <span className="ln">
                  <span>
                    <span className="hw">&amp;</span> <em><span className="hw">Statutory</span></em>
                  </span>
                </span>
                <span className="ln">
                  <span>
                    <em><span className="hw">Execution.</span></em>
                  </span>
                </span>
              </h1>
              <p className="sub6 e3" style={{ "--t": ".55s" }}>
                Filings First is the dedicated accounting, tax, GST, and corporate compliance engine of GAA Group. We combine rigorous Chartered Accountant oversight with automated filing workflows to ensure your books are immaculate and your statutory deadlines are met with zero default.
              </p>
              <div className="acts e3" style={{ "--t": ".7s" }}>
                <button
                  type="button"
                  className="btn o"
                  onClick={() => handleContactIntent("Accounting & bookkeeping")}
                >
                  <span>Connect with Tax &amp; Compliance Lead</span>
                  <span className="ar">→</span>
                </button>
                <a className="btn g" href="#practices">
                  View Compliance Packages ↓
                </a>
              </div>
            </div>

            {/* Stacked Ledger Card */}
            <div className="stackc e3" style={{ "--t": ".4s" }}>
              <div className="lyr l3" />
              <div className="lyr l2" />
              <div className="front" id="front">
                <div className="fh">
                  <span>Compliance Benchmarks</span>
                  <span>Zero Default Record</span>
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
                  Direct CA &amp; CS supervisory review on every statutory return. Complete peace of mind for founders and CFOs.
                </p>
              </div>
            </div>
          </div>

          {/* Marquee Ticker */}
          <div className="tk" aria-hidden="true">
            <div>
              <span>GST Filings</span>
              <span className="s">✦</span>
              <span>Income Tax Audits</span>
              <span className="s">✦</span>
              <span>Cloud Bookkeeping</span>
              <span className="s">✦</span>
              <span>ROC Annual Returns</span>
              <span className="s">✦</span>
              <span>Payroll &amp; PF</span>
              <span className="s">✦</span>
              <span>Virtual CFO</span>
              <span className="s">✦</span>
              <span>GST Filings</span>
              <span className="s">✦</span>
              <span>Income Tax Audits</span>
              <span className="s">✦</span>
              <span>Cloud Bookkeeping</span>
              <span className="s">✦</span>
              <span>ROC Annual Returns</span>
              <span className="s">✦</span>
              <span>Payroll &amp; PF</span>
              <span className="s">✦</span>
              <span>Virtual CFO</span>
              <span className="s">✦</span>
            </div>
          </div>
        </section>

        {/* THE FILINGS ADVANTAGE */}
        <section className="s" id="advantage">
          <div className="w">
            <div className="head6">
              <span className="gm eb">The Filings Advantage</span>
              <h2 style={{ marginTop: "14px" }}>
                Why fast-growing companies <em>trust Filings First.</em>
              </h2>
              <p>
                Routine compliance should never drain executive bandwidth. Unlike disconnected freelancers or faceless portal bots, Filings First delivers structured, partner-reviewed statutory execution.
              </p>
            </div>
            <div className="cmp">
              <div className="cc rv">
                <span className="t">Generic DIY Portals</span>
                <h3>Automated Portal Bots</h3>
                <p>
                  Inexpensive automated software that files without reviewing underlying ledgers. When tax notices or GST mismatches arise, there is zero human support or audit representation.
                </p>
                <ul>
                  <li>
                    <b>✕</b> Zero pre-filing ledger validation
                  </li>
                  <li>
                    <b>✕</b> Inability to resolve 2B vs Books discrepancies
                  </li>
                  <li>
                    <b>✕</b> Leaves founders vulnerable to penalty notices
                  </li>
                </ul>
              </div>

              <div className="cc hl rv">
                <span className="t">Filings First Standard</span>
                <h3>Tech-Enabled CA Retainer</h3>
                <p>
                  Automated intake and reconciliation married with dedicated Chartered Accountant supervision. Fixed, transparent monthly retainers with guaranteed on-time statutory delivery.
                </p>
                <ul>
                  <li>
                    <b>✓</b> Dedicated CA &amp; Account Manager on WhatsApp &amp; Slack
                  </li>
                  <li>
                    <b>✓</b> Real-time GST &amp; TDS input credit maximisation
                  </li>
                  <li>
                    <b>✓</b> Zero Penalty &amp; Zero Default Guarantee
                  </li>
                  <li>
                    <b>✓</b> Seamless sync with GAA Consulting legal desk
                  </li>
                </ul>
              </div>

              <div className="cc rv">
                <span className="t">Traditional CA Offices</span>
                <h3>Manual Accounting Firms</h3>
                <p>
                  Paper-heavy legacy practitioners with slow email turnarounds, manual Excel handoffs, and last-minute panic rushes on the 20th of every month.
                </p>
                <ul>
                  <li>
                    <b>✕</b> Disorganized document requests
                  </li>
                  <li>
                    <b>✕</b> Outdated desktop accounting workflows
                  </li>
                  <li>
                    <b>✕</b> Slow query response times
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CORE PRACTICE AREAS */}
        <section className="s alt" id="practices">
          <div className="w">
            <div className="head6">
              <span className="gm eb">Core Practice Verticals</span>
              <h2 style={{ marginTop: "14px" }}>
                End-to-end accounting &amp; <em>statutory execution.</em>
              </h2>
              <p>
                Explore our full suite of finance, tax, and ROC filing services designed to keep your business fully compliant.
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

        {/* ABOUT FILINGS FIRST */}
        <section className="s" id="about-gaa">
          <div className="w ag">
            <div>
              <span className="gm eb">About Filings First</span>
              <h2 style={{ marginTop: "14px" }}>
                Precision accounting powered by <em>modern systems.</em>
              </h2>
              <p className="ap">
                At Filings First, we believe statutory compliance should be seamless, proactive, and fully transparent. We combine deep domain mastery of Indian tax statutes (Income Tax Act, GST Acts, Companies Act) with state-of-the-art reconciliation tools.
              </p>
              <p className="ap">
                Whether you are an early-stage startup needing Day-1 bookkeeping, or an established enterprise running ₹100Cr+ in annual turnover, our dedicated compliance pods ensure every ledger entry is audit-ready.
              </p>

              <div className="vals">
                <div className="val rv">
                  <i>01</i>
                  <div>
                    <b>Zero Default Guarantee</b>
                    <span>We track 50+ statutory tax and filing calendars with automated deadline safeguards.</span>
                  </div>
                </div>
                <div className="val rv">
                  <i>02</i>
                  <div>
                    <b>Dedicated CA Pods</b>
                    <span>Every client is assigned a designated Senior Accountant and supervising Chartered Accountant.</span>
                  </div>
                </div>
                <div className="val rv">
                  <i>03</i>
                  <div>
                    <b>Input Tax Credit Maximisation</b>
                    <span>Relentless monthly reconciliation of GSTR-2B against purchase registers to capture every eligible rupee.</span>
                  </div>
                </div>
                <div className="val rv">
                  <i>04</i>
                  <div>
                    <b>Investor-Ready Financials</b>
                    <span>Clean balance sheets and clean audit trails ready for due diligence at a moment's notice.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Credentials Sticky Box */}
            <aside className="cred rv">
              <h3>Quality Frameworks &amp; Standards</h3>
              <p className="sub">Operated under strict professional standards</p>

              <div className="ci">
                <span className="ic">01</span>
                <div>
                  <b>ICAI Quality Compliance</b>
                  <span>All tax returns and audit reports conform to the technical guidelines of ICAI.</span>
                </div>
              </div>

              <div className="ci">
                <span className="ic">02</span>
                <div>
                  <b>Secured Cloud Infrastructure</b>
                  <span>Bank-grade 256-bit encryption for all financial ledgers, bank statements, and tax data.</span>
                </div>
              </div>

              <div className="ci">
                <span className="ic">03</span>
                <div>
                  <b>Direct GSTN &amp; MCA API Gateways</b>
                  <span>Automated filing validation directly connected to statutory government portals.</span>
                </div>
              </div>

              <div className="ci">
                <span className="ic">04</span>
                <div>
                  <b>24-Hour Notice Turnaround</b>
                  <span>Immediate analysis and preliminary response drafting on any departmental inquiry.</span>
                </div>
              </div>

              <button
                type="button"
                className="btn o"
                onClick={() => handleContactIntent("Accounting & bookkeeping")}
              >
                <span>Initiate Compliance Consultation</span>
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
                Physical presence across <em>major commercial hubs.</em>
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
              Ready to automate your <em>tax &amp; compliance?</em>
            </h2>
            <p>
              Connect directly with our senior accounting and tax practice leads at Filings First. Transparent monthly pricing with zero surprise charges.
            </p>
            <div className="acts">
              <button
                type="button"
                className="btn o"
                onClick={() => handleContactIntent("Accounting & bookkeeping")}
              >
                Schedule Free Tax &amp; Books Health Check →
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
          <img src="/gaa-consulting-logo.png" alt="Filings First" />
          <div>
            <button
              type="button"
              onClick={() => navigateTo("gaa-consulting")}
            >
              GAA Consulting
            </button>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Filings First
            </button>
            <button
              type="button"
              onClick={() => navigateTo("hirings-first")}
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
