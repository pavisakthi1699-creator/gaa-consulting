import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";
import { GaaHeader, GaaFooter, useLink } from "./gaa/GaaShell";
import { TEAM_MEMBERS } from "../data/teamData";
import logoMain from "../assets/logo-main.png";
import logoMark from "../assets/logo-mark.png";

/* GAA Group About Us: built 1:1 from the "GAA_Group_About_Us.html" design.
   Fonts: Instrument Sans (text and headings) + IBM Plex Mono (labels), both already in fonts.css.
   Colours: #DC6A40 orange, #C25A34 deep orange, #121212 ink, #F3EDE6 paper, #6b655e muted. */

// Optional group/office photo for the hero. Put the file in /public with this name.
// Until it exists, the hero shows a collage of team portraits instead.
const HERO_PHOTO = "/about-hero.jpg";

const O = "#DC6A40";
const K = "#121212";
const FIRMS = ["Group", "Hirings First", "Filings First", "GAA Consulting"];
const firmIndex = (dept) => Math.max(0, FIRMS.indexOf(dept));
const cl = (x) => Math.min(1, Math.max(0, x));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const VALUES = [
  {
    label: "01 / Clarity",
    title: "Straight answers, in plain language.",
    text: "Whether it's a hiring plan, a GST position or a deal structure, we explain what matters, what it costs and what happens next, before we begin.",
  },
  {
    label: "02 / Rigour",
    title: "Reliable execution, on every deadline.",
    text: "Timely filings, carefully screened candidates and well-documented advice. Our work is built to stand up to auditors, regulators and boards.",
  },
  {
    label: "03 / One team",
    title: "Three firms, sharing one view of you.",
    text: "Our recruiters, accountants and advisors talk to each other, so a new hire, a compliance change and a fundraise are planned together, not in isolation.",
  },
];

// Team: real people from teamData. Leadership row = category "leadership".
const LEADERS = TEAM_MEMBERS.filter((m) => m.category === "leadership");
const MEMBERS = TEAM_MEMBERS.filter((m) => m.category !== "leadership");

export default function AboutPage({ onNavigate }) {
  const pRef = useRef(null);
  const lastY = useRef(0);
  const raf = useRef(0);
  const [st, setSt] = useState({ pp: 0, vw: typeof window !== "undefined" ? window.innerWidth : 1400, up: true });
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState(0);
  const [heroOk, setHeroOk] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const measure = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const r = pRef.current;
      const pp = r ? cl(-r.getBoundingClientRect().top / Math.max(1, r.offsetHeight - vh)) : 0;
      const y = window.scrollY;
      setSt((s) => {
        const up = y < 120 || y < lastY.current - 2 ? true : y > lastY.current + 2 ? false : s.up;
        lastY.current = y;
        return { pp, vw, up };
      });
    };
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        measure();
      });
    };
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    measure();
    const t = setTimeout(() => setMounted(true), 80);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
      clearTimeout(t);
    };
  }, []);

  const link = useLink(onNavigate);
  const go = (page, section) => (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page, section);
  };
  const jump = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---- "What we stand for" scroll mechanics (same maths as the design) ---- */
  const { pp, vw, up } = st;
  const narrow = vw < 900;
  const raw = pp * 2;
  const k0 = Math.min(1, Math.floor(raw));
  const fr = raw - k0;
  const k = raw >= 2 ? 2 : k0 + ease(cl((fr - 0.35) / 0.3));
  const pi = Math.round(k);

  const show = (fi) => tab === 0 || fi === tab;
  const visible = MEMBERS.filter((m) => show(firmIndex(m.department))).length;

  const submitIntro = (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem("gaa-intro-email", email);
    } catch (err) {
      /* storage unavailable */
    }
    if (onNavigate) onNavigate("contact");
  };

  return (
    <div className="ab">
      {/* ================= HEADER (same GAA Consulting menu as every page) ================= */}
      <div className="gaa-consulting-root gaa-chrome">
        <GaaHeader link={link} active="@about" />
      </div>

      {/* ================= HERO ================= */}
      <section id="top" className="ab-hero">
        <div className="ab-meta">
          <span>About us</span>
          <span>Hirings First · Filings First · GAA Consulting</span>
        </div>
        <h1 className="ab-h1" aria-label="Specialists who work as one.">
          <span className="ab-l1" aria-hidden="true">
            <span style={{ transform: `translateY(${mounted ? 0 : 110}%)` }}>Specialists who</span>
          </span>
          <span className="ab-l2" aria-hidden="true">
            <span style={{ transform: `translateY(${mounted ? 0 : 110}%)`, transitionDelay: ".12s" }}>
              work as <span className="o">one.</span>
            </span>
          </span>
        </h1>
        <div className="ab-hero-g">
          <div className="ab-photo">
            {heroOk ? (
              <img src={HERO_PHOTO} alt="The GAA Group team" onError={() => setHeroOk(false)} />
            ) : (
              <div className="ab-collage" aria-hidden="true">
                {TEAM_MEMBERS.slice(0, 12).map((m) => (
                  <img key={m.id} src={m.image} alt="" loading="lazy" />
                ))}
              </div>
            )}
          </div>
          <div className="ab-hero-tx">
            <p className="lead">
              We are a group of three specialist firms in talent, compliance and corporate advisory, built around one idea: a growing business shouldn't have to coordinate its advisors.
            </p>
            <p>
              Hirings First builds your teams. Filings First keeps your books, taxes and filings on time. GAA Consulting advises on corporate law, transactions and regulation. Together, we give businesses, financial institutions, NBFCs and promoters one accountable partner for the work that keeps a company moving.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE STAND FOR (sticky scroll) ================= */}
      <section id="story" ref={pRef} className={`ab-story${narrow ? " narrow" : ""}`}>
        <div className="ab-sl">
          <div
            className="ab-panel"
            style={{ background: [O, K, "#F3EDE6"][pi], color: pi === 1 ? "#fff" : K }}
          >
            <span className="mono">What we stand for</span>
            <div className="ab-slot">
              <div style={{ transform: `translateY(${-k}em)` }}>
                <span>CLARITY</span>
                <span>RIGOUR</span>
                <span>ONE TEAM</span>
              </div>
            </div>
            <div className="ab-bars">
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ background: pi === 1 ? "#3a3632" : "rgba(18,18,18,.18)" }}>
                  <span style={{ width: `${cl(raw + 1 - i) * 100}%`, background: pi === 0 ? K : O }}></span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="ab-sr">
          {VALUES.map((v) => (
            <article className="ab-art" key={v.label}>
              <span className="mono o2">{v.label}</span>
              <h2>{v.title}</h2>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ================= THE GROUP ================= */}
      <section className="ab-group">
        <div className="ab-wrap">
          <div className="ab-head">
            <div>
              <span className="mono o2">The group</span>
              <h2>Three firms. <span className="o">One partner.</span></h2>
            </div>
            <p>Each firm is led by its own domain specialists and shares one client relationship.</p>
          </div>
          <div className="ab-firms">
            <a className="ab-firm f1" {...link("@hirings-first")}>
              <div className="top">
                <span className="lg"><img src={logoMark} alt="" /></span>
                <span className="mono">01</span>
              </div>
              <div className="sp"></div>
              <h3>Hirings First</h3>
              <p>Talent acquisition and workforce solutions: recruitment across IT and corporate functions, leadership hiring, campus placements and workforce outsourcing.</p>
            </a>
            <a className="ab-firm f2" {...link("@filings-first")}>
              <div className="top">
                <span className="lg"><img src={logoMark} alt="" /></span>
                <span className="mono" style={{ color: O }}>02</span>
              </div>
              <div className="sp"></div>
              <h3>Filings First</h3>
              <p>Comprehensive accounting, bookkeeping, taxation, GST and corporate compliance, with reliable execution and timely filings.</p>
            </a>
            <a className="ab-firm f3" href="/services" onClick={go("gaa-consulting/practices")}>
              <div className="top">
                <img src={logoMain} alt="" className="gl" />
                <span className="mono" style={{ color: "#C25A34" }}>03</span>
              </div>
              <div className="sp"></div>
              <h3>GAA Consulting</h3>
              <p>Corporate law, company secretarial, transactional and regulatory advisory, including restructuring, fundraising and M&amp;A.</p>
            </a>
          </div>
          <div className="ab-serve">
            {["Growing businesses", "Financial institutions", "NBFCs", "Promoters & founders"].map((s) => (
              <div key={s}>
                <span className="mono">WE SERVE</span>
                <span className="v">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section id="team" className="ab-team">
        <div className="ab-head">
          <div>
            <span className="mono o2">Our people</span>
            <h2>The team <span className="o">behind the work.</span></h2>
          </div>
          <div className="ab-tabs" role="group" aria-label="Filter by firm">
            {FIRMS.map((f, i) => (
              <button key={f} type="button" aria-pressed={tab === i} className={tab === i ? "on" : ""} onClick={() => setTab(i)}>
                {i === 0 ? "All" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="ab-blk">
          <div className="ab-rule mono">
            <span>Leadership</span>
            <span className="m">Group</span>
          </div>
          <div className="ab-leads">
            {LEADERS.map((m) => {
              const fi = firmIndex(m.department);
              return (
                <div className="ab-card" key={m.id} style={{ display: show(fi) ? "flex" : "none" }}>
                  <div className="ph lg">
                    <img src={m.image} alt={m.name} loading="lazy" />
                  </div>
                  <div className="bd">
                    <div className="row">
                      <span className="nm big">{m.name}</span>
                      <span className={`tag t${fi}`}>{FIRMS[fi]}</span>
                    </div>
                    <span className="rl">{m.role}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ab-blk">
          <div className="ab-rule mono">
            <span>Practice heads &amp; specialists</span>
            <span className="m">{String(visible).padStart(2, "0")} people</span>
          </div>
          <div className="ab-mems">
            {MEMBERS.map((m) => {
              const fi = firmIndex(m.department);
              return (
                <div className="ab-card sm" key={m.id} style={{ display: show(fi) ? "flex" : "none" }}>
                  <div className="ph">
                    <img src={m.image} alt={m.name} loading="lazy" />
                  </div>
                  <div className="bd">
                    <span className="nm">{m.name}</span>
                    <span className="rl">{m.role}</span>
                    <span className={`tag t${fi}`}>{FIRMS[fi]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CONTACT + FOOTER ================= */}
      <section id="contact" className="ab-contact">
        <div className="ab-ct">
          <div className="l">
            <span className="mono" style={{ color: O }}>Work with us</span>
            <h2>Meet the team <span className="o">in person.</span></h2>
          </div>
          <form className="r" onSubmit={submitIntro}>
            <p>Tell us what you're working on and we'll introduce you to the right specialist across our three firms.</p>
            <div className="ab-form">
              <label className="sr" htmlFor="ab-email">Your work email</label>
              <input
                id="ab-email"
                type="email"
                required
                placeholder="Your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Request an introduction</button>
            </div>
            <span className="car">
              Interested in joining us? <a href="/" onClick={go("home", "careers")}>See careers</a>
            </span>
          </form>
        </div>
      </section>

      <div className="gaa-consulting-root gaa-chrome">
        <GaaFooter link={link} />
      </div>
    </div>
  );
}
