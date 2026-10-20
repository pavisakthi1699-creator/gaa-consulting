import React, { useState, useEffect, useRef, useMemo } from "react";
import "./AboutPage.css";
import { TEAM_MEMBERS, CATEGORIES, DEPARTMENTS } from "../data/teamData";
import logoMain from "../assets/logo-main.png";

const DESK_DATA = [
  {
    c: "#fff",
    tag: "Corporate & Strategic Advisory Desk",
    t: "GAA Consulting",
    d: "High-stakes corporate law, company secretarial governance, M&A structuring, and regulatory advisory for promoters, financial institutions, and growth-stage enterprises.",
    l: [
      "Corporate Law & Board Governance",
      "M&A, Restructuring & Demergers",
      "Fundraising, SHA Drafting & DD",
      "NBFC, RBI & FEMA Regulatory Clearances"
    ],
    w: "Collaborates with Filings First on statutory records and Hirings First on executive placements during restructuring.",
    h: "#ch1"
  },
  {
    c: "#F0A98A",
    tag: "Statutory Accounting & Compliance Desk",
    t: "Filings First",
    d: "The Compliance & Filings Execution Desk of GAA Consulting. Keeping your books, corporate taxation, GST returns, and statutory reporting in clockwork order so deadlines never become liabilities.",
    l: [
      "Statutory Bookkeeping & Ind AS / IFRS",
      "Corporate Tax, TDS & GST Calendars",
      "MCA Secretarial & ROC Filings",
      "Internal Controls & Statutory Audit Prep"
    ],
    w: "Works with GAA Consulting on audit-ready balance sheets and transaction cap tables.",
    h: "#ch2"
  },
  {
    c: "#DC6A40",
    tag: "Executive Search & Talent Desk",
    t: "Hirings First",
    d: "Executive search and specialized leadership recruitment. Placing the finance controllers, legal counsels, compliance heads, and C-suite leaders who protect and scale your organization.",
    l: [
      "C-Suite & Key Managerial Personnel Search",
      "Finance & Corporate Legal Talent Acquisition",
      "Regulatory Compliance & Risk Officer Placements",
      "Board Director & Advisory Bench Staffing"
    ],
    w: "Integrates with GAA Consulting to staff legal teams and Filings First for senior finance talent.",
    h: "#ch3"
  }
];

const STATEMENT_WORDS = [
  { text: "GAA", isBrand: true },
  { text: "Consulting", isBrand: true },
  { text: "advises" },
  { text: "businesses," },
  { text: "financial" },
  { text: "institutions," },
  { text: "NBFCs" },
  { text: "and" },
  { text: "promoters" },
  { text: "on" },
  { text: "corporate" },
  { text: "law," },
  { text: "company" },
  { text: "secretarial" },
  { text: "matters," },
  { text: "transactions" },
  { text: "and" },
  { text: "regulation." },
  { text: "Filings", isBrand: true },
  { text: "First", isBrand: true },
  { text: "keeps" },
  { text: "the" },
  { text: "accounts," },
  { text: "tax" },
  { text: "and" },
  { text: "filings" },
  { text: "on" },
  { text: "time." },
  { text: "Hirings", isBrand: true },
  { text: "First", isBrand: true },
  { text: "builds" },
  { text: "the" },
  { text: "team" },
  { text: "behind" },
  { text: "them." },
  { text: "One" },
  { text: "partner" },
  { text: "for" },
  { text: "businesses" },
  { text: "establishing," },
  { text: "operating" },
  { text: "and" },
  { text: "growing" },
  { text: "in" },
  { text: "India." }
];

export default function AboutPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalMember, setActiveModalMember] = useState(null);
  const [activeDeskIndex, setActiveDeskIndex] = useState(0);
  const [highlightWordIndex, setHighlightWordIndex] = useState(0);

  // Animated stats count-up state
  const [bentoGo, setBentoGo] = useState(false);
  const [stats, setStats] = useState({
    specialists: 0,
    years: 0,
    deals: "0.0",
    onTime: "0.0"
  });

  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const stackRef = useRef(null);
  const sheetRef = useRef(null);
  const curtainRef = useRef(null);
  const directoryGridRef = useRef(null);

  // Smooth Count-Up Animation on Mount
  useEffect(() => {
    let startTimestamp = null;
    const duration = 1600;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setStats({
        specialists: Math.floor(ease * TEAM_MEMBERS.length),
        years: Math.floor(ease * 18),
        deals: (ease * 1.2).toFixed(1),
        onTime: (ease * 99.8).toFixed(1)
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setStats({
          specialists: TEAM_MEMBERS.length,
          years: 18,
          deals: "1.2",
          onTime: "99.8"
        });
      }
    };

    const timer = setTimeout(() => {
      setBentoGo(true);
      window.requestAnimationFrame(step);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Ensure body has .ready class for animations & fit curtain
  useEffect(() => {
    document.body.classList.add("ready");

    const fitCurtain = () => {
      if (!curtainRef.current || !sheetRef.current) return;
      const h = curtainRef.current.offsetHeight;
      if (h < window.innerHeight * 0.95) {
        document.body.classList.add("cur");
        sheetRef.current.style.marginBottom = `${h}px`;
      } else {
        document.body.classList.remove("cur");
        sheetRef.current.style.marginBottom = "0";
      }
    };

    fitCurtain();
    window.addEventListener("resize", fitCurtain);
    return () => {
      document.body.classList.remove("ready");
      document.body.classList.remove("cur");
      window.removeEventListener("resize", fitCurtain);
    };
  }, []);

  // Hero Mouse Tracking for 3D Perspective Tilt on the architectural disc
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl || !window.matchMedia("(pointer:fine)").matches) return;

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5).toFixed(3);
      const py = ((e.clientY - rect.top) / rect.height - 0.5).toFixed(3);
      heroEl.style.setProperty("--px", px);
      heroEl.style.setProperty("--py", py);
    };

    const handleMouseLeave = () => {
      heroEl.style.setProperty("--px", "0");
      heroEl.style.setProperty("--py", "0");
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Word-by-word scroll highlighting & card stack scroll scaling
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;

      // 1. Word highlight in #story
      if (storyRef.current) {
        const b = storyRef.current.getBoundingClientRect();
        const scrollRange = Math.max(1, b.height - vh);
        const progress = Math.min(1, Math.max(0, -b.top / scrollRange));
        const activeCount = Math.floor(Math.min(1, Math.max(0, (progress - 0.05) / 0.85)) * STATEMENT_WORDS.length);
        setHighlightWordIndex(activeCount);
      }

      // 2. Card stack scale & brightness in #principles
      if (stackRef.current) {
        const cards = stackRef.current.querySelectorAll(".sc2");
        cards.forEach((card, i) => {
          const nextCard = cards[i + 1];
          if (!nextCard) {
            card.style.transform = "";
            card.style.filter = "";
            return;
          }
          const nextTop = nextCard.getBoundingClientRect().top;
          const nextTargetTop = parseFloat(nextCard.style.top) || 100;
          const k = Math.min(1, Math.max(0, (vh * 0.95 - nextTop) / (vh * 0.95 - nextTargetTop)));
          card.style.transform = `scale(${1 - 0.06 * k})`;
          card.style.filter = `brightness(${1 - 0.12 * k})`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatic cycling for Tri-Desk Network Map
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDeskIndex((prev) => (prev + 1) % 3);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // Close modal on Escape key and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModalMember(null);
      }
    };

    if (activeModalMember) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalMember]);

  // Interactive 3D tilt and spotlight on directory cards
  useEffect(() => {
    const dr = directoryGridRef.current;
    if (!dr || !window.matchMedia("(pointer:fine)").matches) return;

    const handleCardMove = (e) => {
      const c = e.target.closest(".dc");
      if (!c) return;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--mx", `${x * 100}%`);
      c.style.setProperty("--my", `${y * 100}%`);
      c.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
      c.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    };

    const handleCardLeave = (e) => {
      const c = e.target.closest(".dc");
      if (c && !c.contains(e.relatedTarget)) {
        c.style.setProperty("--rx", "0deg");
        c.style.setProperty("--ry", "0deg");
      }
    };

    dr.addEventListener("mousemove", handleCardMove);
    dr.addEventListener("mouseout", handleCardLeave);

    return () => {
      dr.removeEventListener("mousemove", handleCardMove);
      dr.removeEventListener("mouseout", handleCardLeave);
    };
  }, []);

  // Filtered members for directory
  const filteredMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((member) => {
      if (selectedCategory !== "all" && member.category !== selectedCategory) {
        return false;
      }
      if (
        selectedDepartment !== "all" &&
        member.department !== selectedDepartment
      ) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = member.name.toLowerCase().includes(query);
        const matchesRole = member.role.toLowerCase().includes(query);
        const matchesDept = member.department.toLowerCase().includes(query);
        const matchesSkills = member.skills?.some((s) =>
          s.toLowerCase().includes(query)
        );
        return matchesName || matchesRole || matchesDept || matchesSkills;
      }
      return true;
    });
  }, [selectedCategory, selectedDepartment, searchQuery]);

  const handleNavigateContact = () => {
    if (onNavigate) {
      onNavigate("contact");
    } else {
      window.location.hash = "#/contact";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const currentDesk = DESK_DATA[activeDeskIndex];

  return (
    <div className="about-page-premium">
      <div id="top" style={{ position: "absolute", top: 0, left: 0, height: 1, width: 1, opacity: 0, pointerEvents: "none" }} aria-hidden="true" />
      <div className="sheet" id="sheet" ref={sheetRef}>
        <main>
          {/* 1. HERO SECTION (Bento Grid, Architectural Image Circle & Stat Deck) */}
          <section className="hero4" id="about-hero" ref={heroRef}>
            <div className="h4bg" aria-hidden="true">
              <span className="disc"></span>
            </div>

            <div className="w h4main">
              <div className="h4nar">
                <span className="pill4 e3" style={{ "--t": ".05s" }}>
                  <i></i>18+ Years Fiduciary Practice · 32 Specialists
                </span>

                <h1 aria-label="The Multidisciplinary Collective Behind Modern Governance.">
                  <span className="ln">
                    <span>
                      <span className="hw">The</span>{" "}
                      <span className="hw">Multidisciplinary</span>
                    </span>
                  </span>
                  <span className="ln">
                    <span>
                      <span className="hw">Collective</span>{" "}
                      <span className="hw">Behind</span>
                    </span>
                  </span>
                  <span className="ln">
                    <span>
                      <em>
                        <span className="hw">Modern</span>{" "}
                        <span className="hw">Governance.</span>
                      </em>
                    </span>
                  </span>
                </h1>

                <p className="sub4 e3" style={{ "--t": ".55s" }}>
                  GAA synchronizes high-stakes corporate legal counsel, statutory MCA compliance, and C-suite talent acquisition—engineered with Big 4 DNA for India’s fastest-growing enterprises.
                </p>

                <div className="acts e3" style={{ "--t": ".7s" }}>
                  <a
                    className="btn o"
                    href="#/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigateContact();
                    }}
                  >
                    <span>Engage Practice</span>
                    <span className="ar r">→</span>
                  </a>
                  <a
                    className="btn g"
                    href="#team"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("team");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span>Explore 32 Specialists</span>
                    <span className="ar d">↓</span>
                  </a>
                </div>

                {/* ULTRA-PREMIUM STATS DECK - ALL 4 COUNTS IN ONE SINGLE ROW */}
                <div className={`h4-stats-deck e3 ${bentoGo ? "go" : ""}`} style={{ "--t": ".85s" }}>
                  {/* Stat 1: 32+ Specialists */}
                  <div className="h4-stat-item">
                    <div className="h4-stat-num">
                      <span className="n-val">{stats.specialists || TEAM_MEMBERS.length}</span>
                      <span className="n-suf">+</span>
                    </div>
                    <div className="h4-stat-label">Specialists</div>
                    <div className="h4-stat-sub">Across 3 Desks</div>
                    <div className="h4-stat-avs" aria-hidden="true">
                      <span className="h4-av">
                        RA
                        <img
                          src="/team/rose-agarwal.jpg"
                          alt="Rose Agarwal"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      </span>
                      <span className="h4-av">
                        CN
                        <img
                          src="/team/chetana-n-s.jpg"
                          alt="Chetana N S"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      </span>
                      <span className="h4-av">
                        SC
                        <img
                          src="/team/shashank-choube.jpg"
                          alt="Shashank Choube"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      </span>
                      <span className="h4-av">
                        KC
                        <img
                          src="/team/khushbu-chand-suresh.jpg"
                          alt="Khushbu Chand Suresh"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      </span>
                    </div>
                  </div>

                  {/* Stat 2: 18+ Years Standing */}
                  <div className="h4-stat-item">
                    <div className="h4-stat-num">
                      <span className="n-val">{stats.years || 18}</span>
                      <span className="n-suf">+</span>
                    </div>
                    <div className="h4-stat-label">Years Standing</div>
                    <div className="h4-stat-sub">Fiduciary Practice</div>
                    <div className="h4-stat-yrs" aria-hidden="true">
                      {[0.45, 0.65, 0.4, 0.8, 0.55, 0.9, 0.5, 0.75, 0.35, 0.85, 0.6, 1].map((h, i) => (
                        <b key={i} style={{ "--h": h, "--i": i }}></b>
                      ))}
                    </div>
                  </div>

                  {/* Stat 3: ₹1.2k Cr+ Advised Deals */}
                  <div className="h4-stat-item">
                    <div className="h4-stat-num">
                      <span className="n-pre">₹</span>
                      <span className="n-val">{stats.deals || "1.2"}</span>
                      <span className="n-suf sm">k Cr+</span>
                    </div>
                    <div className="h4-stat-label">Advised Deals</div>
                    <div className="h4-stat-sub">Corporate Advisory</div>
                    <div className="h4-stat-bar" aria-hidden="true">
                      <i></i>
                    </div>
                  </div>

                  {/* Stat 4: 99.8% On-Time MCA */}
                  <div className="h4-stat-item">
                    <div className="h4-stat-num">
                      <span className="n-val">{stats.onTime || "99.8"}</span>
                      <span className="n-suf">%</span>
                    </div>
                    <div className="h4-stat-label">On-Time MCA</div>
                    <div className="h4-stat-sub">Statutory Compliance</div>
                    <div className="h4-stat-bar full" aria-hidden="true">
                      <i></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Running Marquee Ticker */}
            <div className="tk" aria-hidden="true">
              <div>
                <span>18+ Years Fiduciary Practice</span>
                <span className="s">✦</span>
                <span>32 Specialists</span>
                <span className="s">✦</span>
                <span>10,000+ Annual Statutory Filings · Zero-Defect Standard</span>
                <span className="s">✦</span>
                <span>Corporate Law · Statutory Compliance · Executive Search</span>
                <span className="s">✦</span>
                <span>18+ Years Fiduciary Practice</span>
                <span className="s">✦</span>
                <span>32 Specialists</span>
                <span className="s">✦</span>
                <span>10,000+ Annual Statutory Filings · Zero-Defect Standard</span>
                <span className="s">✦</span>
                <span>Corporate Law · Statutory Compliance · Executive Search</span>
                <span className="s">✦</span>
                <span>18+ Years Fiduciary Practice</span>
                <span className="s">✦</span>
                <span>32 Specialists</span>
                <span className="s">✦</span>
                <span>10,000+ Annual Statutory Filings · Zero-Defect Standard</span>
                <span className="s">✦</span>
                <span>Corporate Law · Statutory Compliance · Executive Search</span>
                <span className="s">✦</span>
              </div>
            </div>
          </section>

          {/* 2. COMPANY PROFILE STATEMENT (Word-by-Word Scroll Reveal) */}
          <section className="fill" id="story" ref={storyRef}>
            <div className="stk">
              <div className="w">
                <span className="gm">Company profile</span>
                <p id="stmt">
                  {STATEMENT_WORDS.map((w, idx) => {
                    const isPassed = idx < highlightWordIndex;
                    return (
                      <React.Fragment key={idx}>
                        <span
                          className={`wo ${w.isBrand ? "k" : ""} ${isPassed ? "on" : ""}`}
                        >
                          {w.text}
                        </span>{" "}
                      </React.Fragment>
                    );
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* 3. TRI-DESK ENGINE (Interactive Networking Circuit Map) */}
          <section className="net" id="group">
            <div className="w">
              <span className="gm" style={{ color: "var(--o)" }}>
                The Tri-Desk Engine
              </span>
              <h2 style={{ marginTop: "14px" }}>
                Three synchronized desks.{" "}
                <em style={{ color: "var(--o)" }}>One unified standard.</em>
              </h2>
              <p
                style={{
                  color: "#cfc8c0",
                  fontSize: "17px",
                  lineHeight: "1.6",
                  maxWidth: "720px",
                  marginTop: "16px"
                }}
              >
                Inspect how our corporate legal advisory, statutory compliance, and executive talent arms operate both independently and in unison.
              </p>

              <div className="ng">
                {/* SVG Circuit Networking Map (v3 Observatory Stage) */}
                <div
                  className="map2 in"
                  id="map"
                  role="group"
                  aria-label="How the three practices connect"
                >
                  <svg viewBox="0 0 500 430" aria-hidden="true">
                    <defs>
                      <radialGradient id="hs" cx=".32" cy=".25" r=".85">
                        <stop offset="0" stopColor="#ffd2b9" />
                        <stop offset=".35" stopColor="#F08A62" />
                        <stop offset=".7" stopColor="#DC6A40" />
                        <stop offset="1" stopColor="#7d3015" />
                      </radialGradient>
                      <linearGradient id="sweep" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0" stopColor="#DC6A40" stopOpacity="0" />
                        <stop offset="1" stopColor="#DC6A40" stopOpacity=".28" />
                      </linearGradient>
                      <radialGradient id="hg">
                        <stop offset="0" stopColor="#DC6A40" stopOpacity=".6" />
                        <stop offset="1" stopColor="#DC6A40" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle className="or" cx="250" cy="257" r="70" />
                    <circle className="or d" cx="250" cy="257" r="118" />
                    <circle className="or" cx="250" cy="257" r="170" />
                    <circle className="or d d2" cx="250" cy="257" r="215" />
                    <path className="sw" d="M250 257 L250 87 A170 170 0 0 1 345 116 Z" />
                    <path
                      className={`ln2 ${activeDeskIndex === 0 || activeDeskIndex === 1 ? "on" : ""}`}
                      d="M250 80 L75 345"
                      data-p="0-1"
                    />
                    <path
                      className={`ln2 ${activeDeskIndex === 0 || activeDeskIndex === 2 ? "on" : ""}`}
                      d="M250 80 L425 345"
                      data-p="0-2"
                    />
                    <path
                      className={`ln2 ${activeDeskIndex === 1 || activeDeskIndex === 2 ? "on" : ""}`}
                      d="M75 345 L425 345"
                      data-p="1-2"
                    />

                    <circle r="5" fill="#DC6A40" className="pls">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M250 80 L75 345" />
                    </circle>
                    <circle r="5" fill="#F0A98A" className="pls">
                      <animateMotion dur="5s" repeatCount="indefinite" path="M75 345 L425 345" />
                    </circle>
                    <circle r="5" fill="#fff" className="pls">
                      <animateMotion dur="4.5s" repeatCount="indefinite" path="M425 345 L250 80" />
                    </circle>

                    <circle className="hglow" cx="250" cy="257" r="92" fill="url(#hg)" />
                    <path className={`spk ${activeDeskIndex === 0 ? "on" : ""}`} d="M250 257 L250 80" />
                    <path className={`spk ${activeDeskIndex === 1 ? "on" : ""}`} d="M250 257 L75 345" />
                    <path className={`spk ${activeDeskIndex === 2 ? "on" : ""}`} d="M250 257 L425 345" />
                    <circle className="hr1" cx="250" cy="257" r="48" />
                    <circle className="hr2" cx="250" cy="257" r="36" />
                    <circle cx="250" cy="257" r="29" fill="url(#hs)" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
                    <text className="ht" x="250" y="262" textAnchor="middle">GAA</text>
                  </svg>

                  <button
                    className={`nd ${activeDeskIndex === 0 ? "sel" : ""}`}
                    type="button"
                    onClick={() => setActiveDeskIndex(0)}
                    style={{
                      left: "50%",
                      top: "19%",
                      background: "#fff",
                      "--c": "#fff"
                    }}
                  >
                    <b className="nn">01</b>GAA Consulting<small>Advisory</small>
                  </button>

                  <button
                    className={`nd ${activeDeskIndex === 1 ? "sel" : ""}`}
                    type="button"
                    onClick={() => setActiveDeskIndex(1)}
                    style={{
                      left: "15%",
                      top: "80%",
                      background: "#F0A98A",
                      "--c": "#F0A98A"
                    }}
                  >
                    <b className="nn">02</b>Filings First<small>Accounting</small>
                  </button>

                  <button
                    className={`nd ${activeDeskIndex === 2 ? "sel" : ""}`}
                    type="button"
                    onClick={() => setActiveDeskIndex(2)}
                    style={{
                      left: "85%",
                      top: "80%",
                      background: "#DC6A40",
                      "--c": "#DC6A40"
                    }}
                  >
                    <b className="nn">03</b>Hirings First<small>Talent</small>
                  </button>
                </div>

                {/* Dynamic Desk Detail Panel */}
                <div
                  className="pnl"
                  id="pnl"
                  aria-live="polite"
                  style={{ "--c": currentDesk.c }}
                >
                  <span className="bgn">{`0${activeDeskIndex + 1}`}</span>
                  <span className="gm" style={{ color: currentDesk.c }}>
                    {currentDesk.tag}
                  </span>
                  <h3>{currentDesk.t}</h3>
                  <p>{currentDesk.d}</p>
                  <ul>
                    {currentDesk.l.map((capability, idx) => (
                      <li key={idx} style={{ "--k": idx }}>
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <p className="wk">
                    <b style={{ color: "#fff" }}>Tri-Desk Synergy:</b> {currentDesk.w}
                  </p>
                  <div className="acts" style={{ marginTop: "18px" }}>
                    <button
                      type="button"
                      className="btn o"
                      onClick={handleNavigateContact}
                    >
                      <span>See {currentDesk.t} services</span>
                      <span className="ar r">→</span>
                    </button>
                  </div>
                  <div className="pgb" key={activeDeskIndex}>
                    <i></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. FOUR INSTITUTIONAL PRINCIPLES (Stacked Sticky Cards) */}
          <section className="stackw" id="principles">
            <div className="w">
              <span className="gm eb">How we work</span>
              <h2 style={{ marginTop: "14px" }}>
                Four things <em>you can expect.</em>
              </h2>

              <div className="stack" id="stack" ref={stackRef}>
                <article className="sc2" style={{ top: "96px", background: "#fff" }}>
                  <div className="n" style={{ color: "var(--o)" }}>
                    01
                  </div>
                  <div className="r">
                    <h3>
                      Decisions that
                      <br />
                      stand up.
                    </h3>
                    <p>Advisory grounded in corporate law and regulation.</p>
                  </div>
                </article>

                <article
                  className="sc2"
                  style={{
                    top: "114px",
                    background: "var(--o)",
                    color: "var(--k)"
                  }}
                >
                  <div className="n">02</div>
                  <div className="r">
                    <h3>
                      Numbers you
                      <br />
                      can trust.
                    </h3>
                    <p>Accounting, tax and filings handled on time.</p>
                  </div>
                </article>

                <article
                  className="sc2"
                  style={{ top: "132px", background: "var(--k)", color: "#fff" }}
                >
                  <div className="n" style={{ color: "var(--o)" }}>
                    03
                  </div>
                  <div className="r">
                    <h3>
                      People you
                      <br />
                      need.
                    </h3>
                    <p>Hiring that keeps pace as the business grows.</p>
                  </div>
                </article>

                <article
                  className="sc2"
                  style={{
                    top: "150px",
                    background: "#EADFD2",
                    marginBottom: 0
                  }}
                >
                  <div className="n" style={{ color: "var(--od)" }}>
                    04
                  </div>
                  <div className="r">
                    <h3>
                      One accountable
                      <br />
                      partner.
                    </h3>
                    <p>Advisory, compliance and hiring move in step.</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* 5. WHO WE SERVE SECTION */}
          <section className="s noise" style={{ borderTop: 0 }}>
            <div className="w">
              <span className="gm eb">Who we serve</span>
              <h2 style={{ marginTop: "14px" }}>
                Built for <em>growing businesses.</em>
              </h2>

              <div className="hl">
                <div tabIndex={0}>
                  <b>01</b>
                  <h3>Start-ups &amp; growing businesses</h3>
                  <small>From incorporation to funding to the first team.</small>
                </div>
                <div tabIndex={0}>
                  <b>02</b>
                  <h3>Financial institutions &amp; NBFCs</h3>
                  <small>Regulatory advisory and compliance support.</small>
                </div>
                <div tabIndex={0}>
                  <b>03</b>
                  <h3>Promoters &amp; founders</h3>
                  <small>Structuring, transactions and restructuring.</small>
                </div>
              </div>
              <p className="ph2" style={{ marginTop: "20px" }}>
                [Team to confirm that Filings First and Hirings First are divisions under GAA.]
              </p>
            </div>
          </section>

          {/* 6. COMPLETE 32-SPECIALIST DIRECTORY */}
          <section className="s" id="team">
            <div className="w">
              <div className="drintro">
                <span className="gm eb">The Specialist Collective</span>
                <h2 style={{ marginTop: "14px" }}>
                  All 32 specialists. <em>Across three synchronized desks.</em>
                </h2>
                <p>
                  Direct access to our practice leaders, senior associates, finance heads, and statutory compliance specialists.
                </p>
              </div>

              {/* Directory Filter Bar */}
              <div className="drbar">
                <div className="drsr">
                  <div className="drsw">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="search"
                      id="drs"
                      placeholder="Search by name, designation, or specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search specialists"
                    />
                  </div>

                  <div className="drcount" aria-live="polite">
                    Showing <b id="drn">{filteredMembers.length}</b> of{" "}
                    {TEAM_MEMBERS.length} specialists
                  </div>
                </div>

                <div className="drrow">
                  <span className="gm">Category:</span>
                  <div className="drrow" style={{ display: "contents" }}>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        aria-pressed={selectedCategory === cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        <span>{cat.label}</span>
                        <span>
                          {cat.id === "all"
                            ? TEAM_MEMBERS.length
                            : TEAM_MEMBERS.filter((m) => m.category === cat.id).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="drrow">
                  <span className="gm">Desk:</span>
                  <div className="drrow" style={{ display: "contents" }}>
                    {DEPARTMENTS.map((dept) => (
                      <button
                        key={dept.id}
                        type="button"
                        aria-pressed={selectedDepartment === dept.id}
                        onClick={() => setSelectedDepartment(dept.id)}
                      >
                        <span>{dept.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Directory Grid */}
              <div className="drg" id="dr" ref={directoryGridRef}>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, i) => (
                    <article
                      key={member.id}
                      className="dc"
                      style={{ "--i": Math.min(i, 14) }}
                      tabIndex={0}
                      role="button"
                      onClick={() => setActiveModalMember(member)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveModalMember(member);
                        }
                      }}
                      aria-label={`${member.name}, ${member.role}. Open profile`}
                    >
                      <div className="drph">
                        <div className="drp">
                          <div className="ini" aria-hidden="true">
                            <span>{getInitials(member.name)}</span>
                          </div>
                          <img
                            src={member.image}
                            alt=""
                            loading="lazy"
                            width="800"
                            height="1000"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <span className="dpill">{member.department}</span>
                        <span className="dgo" aria-hidden="true">↗</span>
                        <div className="dov" aria-hidden="true">
                          {member.skills?.slice(0, 3).map((k, j) => (
                            <span key={j} style={{ "--k": j }}>{k}</span>
                          ))}
                        </div>
                      </div>

                      <div className="dcb">
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>

                        {member.linkedin && (
                          <a
                            className="dli"
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${member.name} on LinkedIn`}
                          >
                            LinkedIn ↗
                          </a>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="dempty">
                    <h3>No specialists match your criteria</h3>
                    <p>Try clearing your search or switching filters.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 7. RECOGNITION & STANDING SECTION */}
          <section className="s alt">
            <div className="w">
              <span className="gm eb">Credentials, awards and media</span>
              <h2 style={{ marginTop: "14px" }}>
                Recognition <em>and standing.</em>
              </h2>
              <div className="grid">
                <div className="card ph">
                  <span className="gm">Credentials</span>
                  <h3>Memberships and registrations</h3>
                  <p className="ph2">Placeholder: team to supply verified details.</p>
                </div>
                <div className="card ph">
                  <span className="gm">Awards</span>
                  <h3>Awards and recognition</h3>
                  <p className="ph2">Placeholder: team to supply verified details.</p>
                </div>
                <div className="card ph">
                  <span className="gm">Media</span>
                  <h3>Articles, interviews and updates</h3>
                  <p className="ph2">Placeholder: team to supply verified details.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* 8. CURTAIN FOOTER CTA (Start with one conversation) */}
      <div className="curtain" id="curtain" ref={curtainRef}>
        <section className="cta2">
          <div className="w">
            <span className="gm" style={{ color: "var(--o)" }}>Next step</span>
            <h2 style={{ margin: "16px 0 30px" }}>
              Start with one <em>conversation.</em>
            </h2>
            <div className="acts" style={{ margin: 0 }}>
              <button
                type="button"
                className="btn o"
                onClick={handleNavigateContact}
              >
                <span>Discuss your requirements</span>
              </button>
              <button
                type="button"
                className="btn g"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate("home", "careers");
                  } else {
                    window.location.hash = "#careers";
                  }
                }}
              >
                <span>Careers &amp; CS Training</span>
              </button>
            </div>
          </div>
        </section>
        <footer>
          <div className="ft">
            <img src={logoMain} alt="GAA Consulting" />
            <div>
              <span>© 2026 GAA Advisory Group. All rights reserved.</span>
              <a
                href="#/services"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate("home", "chapters");
                }}
              >
                Services
              </a>
              <a
                href="#/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigateContact();
                }}
              >
                Contact
              </a>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* 9. PROMPT MODAL DOSSIER */}
      {activeModalMember && (
        <div
          className="drm"
          id="drm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mn"
          onClick={() => setActiveModalMember(null)}
        >
          <div
            className="drmc"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="mx"
              id="mx"
              onClick={() => setActiveModalMember(null)}
              aria-label="Close profile"
            >
              ✕
            </button>

            <div className="drmg">
              <div className="drpw" id="mpic">
                <div className="drp">
                  <div className="ini" aria-hidden="true">
                    <span>{getInitials(activeModalMember.name)}</span>
                  </div>
                  <img
                    src={activeModalMember.image}
                    alt={activeModalMember.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 id="mn">{activeModalMember.name}</h3>
                <div className="mr" id="mr">
                  {activeModalMember.role} · {activeModalMember.department}
                </div>
                <p id="mb">{activeModalMember.bio}</p>

                <span className="gm" style={{ color: "var(--m)" }}>
                  Core competencies
                </span>
                <div className="msk" id="ms">
                  {activeModalMember.skills?.map((skill, idx) => (
                    <span key={idx}>{skill}</span>
                  ))}
                </div>

                <div className="acts" style={{ margin: "20px 0 0" }}>
                  {activeModalMember.linkedin && (
                    <a
                      className="btn o"
                      id="mli"
                      href={activeModalMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View LinkedIn profile ↗</span>
                    </a>
                  )}
                  {activeModalMember.email && (
                    <a
                      className="btn g"
                      id="mml"
                      href={`mailto:${activeModalMember.email}`}
                      style={{ color: "var(--k)" }}
                    >
                      <span>Email ✉</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}