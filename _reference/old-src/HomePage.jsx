import React, { useEffect, useState } from "react";
import logoMain from "../assets/logo-main.png";
import logoMark from "../assets/logo-mark.png";

const CONFIG = { ENDPOINT: "", EMAIL: "enquiries@gaaconsulting.com" };
const O = "#DC6A40";
const K = "#121212";
const P = "#F3EDE6";

const FIRMS = ["GAA Consulting", "Filings First", "Hirings First"];
const FC = ["#ffffff", "#F0A98A", O];
const ROLE = [
  "Compliance & Advisory",
  "Accounting & Taxation",
  "Talent Acquisition & Workforce Management"
];

// 6 stages, 2 per company
const J = [
  [
    "Start",
    0,
    "Incorporate the right structure",
    "Company formation, constitutional documents and secretarial setup from day one.",
    ["Corporate law", "Company secretarial"],
    "Works with Filings First and Hirings First as you set up."
  ],
  [
    "Set up",
    1,
    "Books, tax and GST in order",
    "Bookkeeping, registrations and a filing calendar that never slips.",
    ["Bookkeeping", "GST", "Taxation"],
    "Works with GAA Consulting on records and registrations."
  ],
  [
    "Build",
    2,
    "Hire the first team",
    "IT and corporate recruitment, plus campus drives for early talent.",
    ["IT & corporate hiring", "Campus placements"],
    "Works with Filings First and GAA Consulting as the team forms."
  ],
  [
    "Raise",
    1,
    "Fund the next stage",
    "Investor-ready accounts, tax and filings, ahead of the round.",
    ["Accounting", "Taxation", "Compliance"],
    "Works with GAA Consulting on fundraising and transactions."
  ],
  [
    "Scale",
    2,
    "Bring in leadership",
    "Leadership hiring and workforce outsourcing to grow without friction.",
    ["Leadership hiring", "Outsourcing"],
    "Works with GAA Consulting and Filings First as you grow."
  ],
  [
    "Transform",
    0,
    "Merge, acquire, restructure",
    "M&A, restructuring and regulatory advisory, with compliance handled throughout.",
    ["M&A", "Restructuring", "Regulatory"],
    "Works with Filings First and Hirings First through the change."
  ]
];

const PAIRS = [
  [0, 5],
  [1, 3],
  [2, 4]
];

const BG = [P, O, K, "#fff"];
const CAP = [
  "One group, three ways in",
  "GAA Consulting — Corporate advisory",
  "Filings First — Compliance & finance",
  "Hirings First — Talent & workforce"
];

const TOPICS = {
  gaa: [
    "Corporate law & company secretarial",
    "M&A & restructuring",
    "Fundraising & transactions",
    "NBFC / regulatory advisory",
    "Other"
  ],
  filings: [
    "Accounting & bookkeeping",
    "Taxation",
    "GST",
    "Corporate compliance",
    "Other"
  ],
  hirings: [
    "Hire talent",
    "Find opportunities",
    "Leadership hiring",
    "Campus placements",
    "Workforce outsourcing"
  ],
  careers: [
    "Apply for CS training",
    "Trainee experience / mentorship",
    "Other"
  ]
};

export default function HomePage({ onNavigate }) {
  const [selectedBrand, setSelectedBrand] = useState("gaa");
  const [selectedIntent, setSelectedIntent] = useState(TOPICS.gaa[0]);
  const [activeStage, setActiveStage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    website: ""
  });
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [isSending, setIsSending] = useState(false);

  const handleBrandSelect = (brand, intent) => {
    setSelectedBrand(brand);
    const available = TOPICS[brand] || [];
    if (intent && available.includes(intent)) {
      setSelectedIntent(intent);
    } else {
      setSelectedIntent(available[0] || "");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const RM = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (RM) document.documentElement.classList.add("rm");
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.add("nj");
    }

    const cl = (x) => Math.min(1, Math.max(0, x));
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const L = (a, b, t) => a + (b - a) * t;
    const seg = (a, b, x) => cl((x - a) / (b - a));
    const prog = (el, vh) => {
      if (!el) return 0;
      const b = el.getBoundingClientRect();
      return cl(-b.top / Math.max(1, b.height - vh));
    };

    // IntersectionObserver for stage cards
    let io = null;
    const scEls = document.querySelectorAll(".sc");
    if ("IntersectionObserver" in window && !RM) {
      io = new IntersectionObserver(
        (es) => {
          es.forEach((x) => {
            if (x.isIntersecting) {
              x.target.classList.add("in");
              io.unobserve(x.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      scEls.forEach((c, i) => {
        c.style.transitionDelay = (i % 3) * 90 + "ms";
        io.observe(c);
      });
    } else {
      scEls.forEach((c) => c.classList.add("in"));
    }

    const heroEl = document.getElementById("top");
    const la = document.getElementById("la");
    const lb = document.getElementById("lb");
    const lbi = document.getElementById("lbi");
    const hint = document.getElementById("hint");
    const hdr = document.getElementById("hdr");
    const ch = document.getElementById("chapters");
    const li = document.getElementById("li");
    const col = document.getElementById("col");
    const bars = [...document.querySelectorAll(".bars i")];
    const lc = document.getElementById("lifecycle");
    const lgB = document.getElementById("lgB");
    const lgA = document.getElementById("lgA");
    const cnt = document.getElementById("cnt");
    const cap = document.getElementById("cap");
    const ring = document.getElementById("lc-ring");
    const arc = document.getElementById("arc");
    const svg = document.getElementById("svg");
    const cn = document.getElementById("cn");
    const ofl = document.getElementById("ofl");
    const sbx = document.getElementById("sb");
    const sdot = document.getElementById("sdot");
    const sfirm = document.getElementById("sfirm");
    const sv = document.getElementById("sv");
    const stt = document.getElementById("stt");
    const sds = document.getElementById("sds");
    const stg = document.getElementById("stg");
    const swi = document.getElementById("swi");
    const marks = document.getElementById("marks");
    const dots = marks ? [...marks.querySelectorAll(".d")] : [];
    const lbls = marks ? [...marks.querySelectorAll(".lbl")] : [];

    let raf = 0;
    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const narrow = vw < 900;

      if (hdr) {
        document.documentElement.style.setProperty(
          "--hh",
          hdr.offsetHeight + "px"
        );
      }
      const stat = narrow || RM;
      document.documentElement.classList.toggle("st", stat);

      // Hero animation (v7)
      if (heroEl && la && lb && lbi && hint) {
        const p = prog(heroEl, vh);
        const ox = vw < 900 ? 82 : 84;
        const oy = vw < 900 ? 50 : 56;
        const maxR = Math.hypot(vw, vh) * 1.05;
        const r = L(30, maxR, ease(seg(0.04, 0.55, p)));
        const inT = seg(0.38, 0.6, p);
        const inS = ease(seg(0.3, 0.75, p));

        if (RM) {
          la.style.cssText = "";
        } else {
          la.style.transform = `scale(${L(1, 0.94, seg(0, 0.5, p))})`;
          la.style.opacity = 1 - seg(0.3, 0.5, p);
          la.style.transformOrigin = `${ox}% ${oy}%`;
          la.style.pointerEvents = p > 0.4 ? "none" : "auto";
        }

        hint.style.cssText = `left:${ox}%;top:${oy}%;transform:translate(-50%,-64px);opacity:${
          1 - seg(0, 0.05, p)
        }`;
        lb.style.clipPath = `circle(${r}px at ${ox}% ${oy}%)`;
        lb.style.pointerEvents = p > 0.3 ? "auto" : "none";
        lbi.style.opacity = inT;
        lbi.style.transform = `scale(${L(1.18, 1, inS)})`;

        [0, 1, 2].forEach((i) => {
          const t = ease(seg(0.55 + i * 0.07, 0.8 + i * 0.07, p));
          const e = document.getElementById("b" + i);
          if (e) {
            e.style.opacity = t;
            e.style.transform = `translateY(${(1 - t) * 40}px)`;
          }
        });
      }

      // Chapters animation (v10)
      if (ch && li && col) {
        const b = ch.getBoundingClientRect();
        const cp = cl(-b.top / Math.max(1, b.height - vh));
        const raw = cp * 3;
        const k0 = Math.min(2, Math.floor(raw));
        const fr = raw - k0;
        const k = raw >= 3 ? 3 : k0 + ease(cl((fr - 0.35) / 0.3));
        const c = Math.round(k);

        li.style.background = BG[c];
        li.style.color = c === 2 ? "#fff" : K;

        if (lgB) lgB.style.display = c < 2 ? "block" : "none";
        if (lgA) lgA.style.display = c >= 2 ? "block" : "none";

        if (cnt) cnt.textContent = "0" + c + " / 03";
        if (cap) cap.textContent = CAP[c];
        col.style.transform = `translateY(${-k}em)`;

        bars.forEach((e, i) => {
          e.style.width = cl(raw + 1 - i) * 100 + "%";
          e.style.background = c === 2 ? "#fff" : c === 1 ? K : O;
          if (e.parentNode) {
            e.parentNode.style.background =
              c === 2 ? "#3a3632" : "rgba(18,18,18,.25)";
          }
        });
      }

      // Lifecycle dial animation (v7 dial, 2 dots per company)
      if (lc && ring && arc && svg && cn && ofl && sbx) {
        const dp = prog(lc, vh);
        const rw = stat ? 0 : Math.min(1, dp * 1.08) * 5;
        const kk = Math.min(4, Math.floor(rw));
        const f2 = rw - kk;
        const pos = rw >= 5 ? 5 : kk + ease(f2);
        const ji = Math.round(pos);
        const cur = J[ji];

        const Sz = Math.max(
          140,
          narrow
            ? Math.min(vw - 150, vh * 0.34)
            : Math.min(vh * 0.56, vw * 0.34, vh - 136 - 2 * (46 + 34) - 40)
        );
        const R = Sz / 2;
        const mg = narrow ? 30 : 80;

        ring.style.cssText = `position:relative;flex:none;opacity:1;visibility:visible;width:${Sz}px;height:${Sz}px;margin:${mg}px`;
        arc.style.cssText = `inset:-1px;border-radius:50%;background:conic-gradient(from ${
          -pos * 60
        }deg,${O} 0deg ${pos * 60}deg,transparent ${
          pos * 60
        }deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 2px));mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 2px))`;
        svg.setAttribute("width", Sz);
        svg.setAttribute("height", Sz);

        cn.textContent = stat ? "06" : "0" + (ji + 1);
        ofl.textContent = stat ? "STAGES" : "OF 06";
        cn.style.fontSize = Sz * 0.3 + "px";

        const xy = (i) => {
          const a = ((-90 + (i - pos) * 60) * Math.PI) / 180;
          return [R + R * Math.cos(a), R + R * Math.sin(a), a];
        };

        svg.innerHTML = PAIRS.map((pr, fi) => {
          const a = xy(pr[0]);
          const b2 = xy(pr[1]);
          const on = stat || cur[1] === fi;
          return `<line x1="${a[0]}" y1="${a[1]}" x2="${b2[0]}" y2="${
            b2[1]
          }" stroke="${FC[fi]}" stroke-width="${on ? 2 : 1}" stroke-opacity="${
            on ? 0.9 : 0.3
          }" stroke-dasharray="${on ? "" : "4 5"}"/>`;
        }).join("");

        J.forEach((j, i) => {
          const [x, y, a] = xy(i);
          const on = !stat && i === ji;
          const lr = R + (narrow ? 26 : 46);
          const col2 = FC[j[1]];
          const d = dots[i];
          const l = lbls[i];
          if (d) {
            d.style.cssText = `border-radius:50%;transform:translate(-50%,-50%);transition:width .3s,height .3s,box-shadow .3s;position:absolute;left:${x}px;top:${y}px;width:${
              on ? 22 : 12
            }px;height:${on ? 22 : 12}px;background:${
              i < pos - 0.5 || on || stat ? col2 : K
            };border:2px solid ${col2};box-shadow:${
              on ? `0 0 0 8px ${col2}2e,0 0 30px ${col2}` : "none"
            }`;
          }
          if (l) {
            l.textContent = on ? j[0] : `0${i + 1} ${j[0]}`;
            l.style.cssText =
              `white-space:nowrap;transform:translate(-50%,-50%);position:absolute;left:${
                R + lr * Math.cos(a)
              }px;top:${R + lr * Math.sin(a)}px;` +
              (on
                ? `font-family:var(--pj);font-style:italic;font-size:${
                    narrow ? 20 : 30
                  }px;color:${col2}`
                : `font:500 11px var(--gm);letter-spacing:.08em;text-transform:uppercase;color:${
                    i < pos - 0.5 || stat ? "#a39c94" : "#5c5650"
                  }`);
          }
        });

        sbx.style.opacity = 1 - cl(Math.abs(pos - ji) * 2.2);
        sbx.style.transform = `translateY(${(pos - ji) * -40}px)`;

        if (sdot) sdot.style.background = FC[cur[1]];
        if (sfirm) sfirm.textContent = FIRMS[cur[1]] + " · " + ROLE[cur[1]];
        if (sv) {
          sv.textContent = cur[0];
          sv.style.color = FC[cur[1]];
        }
        if (stt) stt.textContent = cur[2];
        if (sds) sds.textContent = cur[3];
        if (stg) {
          stg.innerHTML = cur[4].map((t) => `<span>${t}</span>`).join("");
        }
        if (swi) swi.textContent = cur[5];
      }
    };

    const req = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    measure();

    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      if (raf) cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return; // honeypot

    const trimmedName = formData.name.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const phoneDigits = formData.phone.replace(/\D/g, "");

    const badField = !trimmedName
      ? "name"
      : !formData.email || !emailValid
      ? "email"
      : phoneDigits.length < 8
      ? "phone"
      : null;

    if (badField) {
      setStatusMsg({
        type: "er",
        text: "Please enter your name, a valid email and a phone number."
      });
      const targetEl = document.getElementById(
        badField === "name" ? "nm" : badField === "email" ? "em" : "ph"
      );
      if (targetEl) targetEl.focus();
      return;
    }

    setIsSending(true);
    const payload = {
      brand: selectedBrand,
      intent: selectedIntent,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      page: window.location.href
    };

    try {
      if (CONFIG.ENDPOINT) {
        const r = await fetch(CONFIG.ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (!r.ok) throw new Error();
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
          website: ""
        });
        setSelectedBrand("gaa");
        setSelectedIntent(TOPICS.gaa[0]);
        setStatusMsg({
          type: "ok",
          text: "Thank you. We'll contact you shortly."
        });
      } else {
        const subject = encodeURIComponent(
          `Enquiry: ${payload.brand} – ${payload.intent}`
        );
        const bodyLines = Object.entries(payload)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        window.location.href = `mailto:${CONFIG.EMAIL}?subject=${subject}&body=${encodeURIComponent(
          bodyLines
        )}`;
        setStatusMsg({
          type: "ok",
          text: "Your email app should open with the details filled in. Please press send there."
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({
        type: "er",
        text: "Something went wrong. Please try again or email us directly."
      });
    } finally {
      setIsSending(false);
    }
  };

  const goToContact = (brand, intent) => {
    if (onNavigate) {
      onNavigate("contact");
    } else {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    if (brand) handleBrandSelect(brand, intent);
  };

  return (
    <div className="home-page">
      {/* Hero (v7) */}
      <section id="top" className="hero-v7">
        <div className="stk">
          <div className="la" id="la">
            <div className="lai">
              <div className="tr gm">
                <div>
                  <span>Talent · Compliance · Corporate advisory</span>
                  <p className="sub">
                    Corporate advisory, compliance execution and recruitment for
                    businesses establishing, operating and growing in India.
                  </p>
                </div>
                <span>Est. for growing businesses</span>
              </div>
              <h1>
                Business,
                <br />
                <em>first.</em>
              </h1>
              <div className="bot">
                <div className="fr">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onNavigate && onNavigate("gaa-consulting")}
                    title="Click to visit dedicated GAA Consulting practice"
                  >
                    <b style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      GAA Consulting <span style={{ color: "var(--o)", fontSize: "13px" }}>↗</span>
                    </b>
                    <span>Corporate &amp; strategic advisory</span>
                  </div>
                  <div>
                    <b>Filings First</b>
                    <span>Accounting &amp; taxation</span>
                  </div>
                  <div>
                    <b>Hirings First</b>
                    <span>Talent &amp; workforce</span>
                  </div>
                </div>
                <div className="hb">
                  <a className="pill o" href="#chapters">
                    Explore services
                  </a>
                  <button
                    type="button"
                    className="pill g"
                    onClick={() => goToContact("gaa")}
                  >
                    Discuss your requirements
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="hint" className="gm">
            Scroll to open
          </div>
          <div className="lb" id="lb">
            <div className="lbi" id="lbi">
              <span className="gm">The group</span>
              <h2>
                One group.
                <br />
                <em>One partner.</em>
              </h2>
              <div className="bc">
                <div id="b0">
                  <span className="lg">
                    <img src={logoMain} alt="" />
                  </span>
                  <div>
                    <b>GAA Consulting</b>
                    <small>We advise your next move</small>
                  </div>
                </div>
                <div id="b1">
                  <span className="lg">
                    <img src={logoMark} alt="" />
                  </span>
                  <div>
                    <b>Filings First</b>
                    <small>We keep you compliant</small>
                  </div>
                </div>
                <div id="b2">
                  <span className="lg">
                    <img src={logoMark} alt="" />
                  </span>
                  <div>
                    <b>Hirings First</b>
                    <small>We find your people</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Why GAA */}
      <section id="proof">
        <span className="gm" style={{ color: "var(--od)" }}>
          Why GAA
        </span>
        <h2>
          Evidence, <em>not just promises.</em>
        </h2>
        <div className="pg">
          <div className="pc">
            <span className="gm">Credentials</span>
            <h3>Verified credentials</h3>
            <p>
              Empanelled regulatory advisors, chartered accountants, and company
              secretaries with 18+ years of corporate advisory standing.
            </p>
          </div>
          <div className="pc">
            <span className="gm">Leadership</span>
            <h3>Direct Partner Oversight</h3>
            <p>
              Every transaction, restructuring, and audit defense is directed
              personally by credentialed practice heads with proven deal acumen.
            </p>
          </div>
          <div className="pc">
            <span className="gm">Clients</span>
            <h3>Enterprise Trust</h3>
            <p>
              Serving 250+ active enterprise retainers, high-growth venture-backed
              startups, and institutional financial entities across India.
            </p>
          </div>
          <div className="pc">
            <span className="gm">Ecosystem</span>
            <h3>Three Integrated Desks</h3>
            <p>
              Eliminates the friction of managing separate lawyers, accountants,
              and staffing agents through one accountable partnership.
            </p>
          </div>
        </div>
      </section>

      {/* Chapters (v10) */}
      <section id="chapters">
        <div className="left">
          <div className="li" id="li">
            <div className="lgw">
              <span className="l">
                <img id="lgB" src={logoMain} alt="" />
                <img id="lgA" src={logoMark} alt="" />
              </span>
              <span className="pm" id="cnt">
                00 / 03
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                minWidth: 0
              }}
            >
              <div className="slot" aria-hidden="true">
                <div id="col">
                  <span>ONE</span>
                  <span>GROW</span>
                  <span>FILE</span>
                  <span>HIRE</span>
                </div>
              </div>
              <div className="cap">
                <b id="cap">One group, three ways in</b>
                <div className="bars">
                  <span>
                    <i></i>
                  </span>
                  <span>
                    <i></i>
                  </span>
                  <span>
                    <i></i>
                  </span>
                  <span>
                    <i></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <article id="ch0" className="chap">
            <span className="pm" style={{ color: "#6b655e" }}>
              00 — The group
            </span>
            <h2
              style={{
                fontSize: "clamp(36px,3.8vw,64px)",
                lineHeight: 1,
                letterSpacing: "-.035em"
              }}
            >
              One advisory group.{" "}
              <span style={{ color: "var(--o)" }}>Two specialist desks.</span>
            </h2>
            <p className="t">
              GAA Consulting is the established advisory practice. Filings First
              is its Compliance &amp; Filings Execution Desk, and Hirings First
              is its recruitment and workforce arm. Hiring, compliance and
              strategy move in step.
            </p>
            <div style={{ borderTop: "1px solid #e6e0d8" }}>
              <a className="lnk" href="#ch1">
                <span>Decisions that stand up</span>
                <span>GAA Consulting →</span>
              </a>
              <a className="lnk" href="#ch2">
                <span>Numbers you can trust</span>
                <span>Filings First →</span>
              </a>
              <a className="lnk" href="#ch3">
                <span>People you need</span>
                <span>Hirings First →</span>
              </a>
            </div>
          </article>

          <article id="ch1" className="chap">
            <span className="pm" style={{ color: "var(--od)" }}>
              01 — Corporate &amp; strategic advisory
            </span>
            <h2>GAA Consulting</h2>
            <p className="t">
              Corporate law, company secretarial, transactional and regulatory
              advisory for businesses, financial institutions, NBFCs and
              promoters.
            </p>
            <div className="rows">
              <div>
                <b>01</b>
                <span>Corporate law &amp; company secretarial</span>
              </div>
              <div>
                <b>02</b>
                <span>Mergers, acquisitions &amp; restructuring</span>
              </div>
              <div>
                <b>03</b>
                <span>Fundraising &amp; transactions</span>
              </div>
              <div>
                <b>04</b>
                <span>Regulatory advisory for NBFCs &amp; institutions</span>
              </div>
            </div>
            <div className="ca">
              <button
                type="button"
                className="cb o"
                onClick={() => onNavigate && onNavigate("gaa-consulting")}
              >
                Explore GAA Consulting Practice →
              </button>
              <button
                type="button"
                className="cb"
                onClick={() => goToContact("gaa")}
              >
                Speak to Practice Partner →
              </button>
            </div>
          </article>

          <article id="ch2" className="chap">
            <span className="pm" style={{ color: "var(--od)" }}>
              02 — Compliance &amp; finance
            </span>
            <h2>Filings First</h2>
            <p className="t">
              The Compliance &amp; Filings Execution Desk of GAA Consulting.
              Accounting, bookkeeping, taxation, GST and corporate compliance,
              with timely filings so obligations never become emergencies.
            </p>
            <div className="rows">
              <div>
                <b>01</b>
                <span>Accounting &amp; bookkeeping</span>
              </div>
              <div>
                <b>02</b>
                <span>Taxation</span>
              </div>
              <div>
                <b>03</b>
                <span>GST</span>
              </div>
              <div>
                <b>04</b>
                <span>Corporate compliance</span>
              </div>
            </div>
            <div className="ca">
              <button
                type="button"
                className="cb"
                onClick={() => goToContact("filings")}
              >
                Get compliant with Filings First →
              </button>
            </div>
          </article>

          <article id="ch3" className="chap">
            <span className="pm" style={{ color: "var(--od)" }}>
              03 — Talent &amp; workforce
            </span>
            <h2>Hirings First</h2>
            <p className="t">
              Connecting businesses with the right talent, from first engineers
              to the leadership team, and helping candidates find the right
              opportunity.
            </p>
            <div className="rows">
              <div>
                <b>01</b>
                <span>IT &amp; corporate recruitment</span>
              </div>
              <div>
                <b>02</b>
                <span>Leadership hiring</span>
              </div>
              <div>
                <b>03</b>
                <span>Campus placements</span>
              </div>
              <div>
                <b>04</b>
                <span>Workforce outsourcing</span>
              </div>
            </div>
            <div className="ca">
              <button
                type="button"
                className="cb o"
                onClick={() => goToContact("hirings", "Hire talent")}
              >
                Hire Talent →
              </button>
              <button
                type="button"
                className="cb"
                onClick={() => goToContact("hirings", "Find opportunities")}
              >
                Find Opportunities →
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Careers & CS Training */}
      <section id="careers">
        <div className="cw2">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px"
            }}
          >
            <span className="gm" style={{ color: "var(--od)" }}>
              Careers &amp; CS Training
            </span>
            <h2>
              Learn on <em>real files.</em>
            </h2>
            <p
              className="t"
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                color: "#4d4842",
                maxWidth: "520px"
              }}
            >
              Practical exposure in company secretarial and compliance work,
              guided by mentors at GAA Consulting.
            </p>
            <div className="ca">
              <button
                type="button"
                className="cb o"
                onClick={() => goToContact("careers", "Apply for CS training")}
              >
                Apply for training →
              </button>
              <button
                type="button"
                className="cb"
                onClick={() => goToContact("hirings", "Find opportunities")}
              >
                Find job opportunities →
              </button>
            </div>
          </div>
          <div className="rows">
            <div>
              <b>01</b>
              <span>
                Practical exposure
                <small>Work on live corporate and compliance matters.</small>
              </span>
            </div>
            <div>
              <b>02</b>
              <span>
                Mentorship
                <small>Regular guidance from practising professionals.</small>
              </span>
            </div>
            <div>
              <b>03</b>
              <span>
                Trainee experiences
                <small>Comprehensive exposure to M&amp;A due diligence and MCA secretarial filings.</small>
              </span>
            </div>
            <div>
              <b>04</b>
              <span>
                Applications
                <small>
                  Share your qualification and interests through the enquiry form.
                </small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle (v7 circle dial) */}
      <section id="lifecycle">
        <div className="stk">
          <div className="dg">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                minWidth: 0
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px"
                }}
              >
                <span className="gm" style={{ color: "var(--o)" }}>
                  The lifecycle
                </span>
                <h2>
                  From incorporation <em>to acquisition.</em>
                </h2>
              </div>
              <div className="sb" id="sb">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}
                >
                  <span
                    id="sdot"
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      display: "block"
                    }}
                  ></span>
                  <span
                    className="gm"
                    id="sfirm"
                    style={{ color: "#ffffff", fontWeight: 600, letterSpacing: "0.06em" }}
                  ></span>
                </div>
                <div className="sv" id="sv"></div>
                <div
                  id="stt"
                  style={{
                    fontSize: "clamp(22px,2vw,30px)",
                    fontWeight: 700,
                    letterSpacing: "-.015em",
                    color: "#ffffff"
                  }}
                ></div>
                <div
                  className="dsc"
                  id="sds"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.65",
                    color: "#ffffff",
                    maxWidth: "500px",
                    opacity: 0.96
                  }}
                ></div>
                <div className="tg" id="stg"></div>
                <div
                  className="gm"
                  id="swi"
                  style={{
                    color: "#ffc2a6",
                    textTransform: "none",
                    letterSpacing: ".02em",
                    fontSize: "14px",
                    fontWeight: 500
                  }}
                ></div>
              </div>
            </div>

            <div className="ringw">
              <div className="ring" id="lc-ring">
                <div
                  style={{
                    inset: 0,
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 0 25px rgba(0, 0, 0, 0.4)"
                  }}
                ></div>
                <div
                  style={{
                    inset: "16%",
                    borderRadius: "50%",
                    border: "1px dashed rgba(255, 255, 255, 0.12)"
                  }}
                ></div>
                <div
                  id="arc"
                  style={{ inset: "-1px", borderRadius: "50%" }}
                ></div>
                <svg
                  id="svg"
                  style={{
                    left: 0,
                    top: 0,
                    overflow: "visible",
                    pointerEvents: "none"
                  }}
                ></svg>
                <div
                  style={{
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <span
                    id="cn"
                    style={{
                      fontFamily: "var(--pj)",
                      fontWeight: 600,
                      fontStyle: "italic",
                      lineHeight: 1,
                      letterSpacing: "-.04em",
                      color: "#ffffff"
                    }}
                  ></span>
                  <span className="gm" id="ofl" style={{ color: "#ffffff", fontWeight: 600 }}>
                    OF 06
                  </span>
                </div>
                <div id="marks" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                  {J.map((_, i) => (
                    <React.Fragment key={i}>
                      <span
                        className="d"
                        style={{
                          borderRadius: "50%",
                          transform: "translate(-50%,-50%)",
                          transition: "width .3s,height .3s,box-shadow .3s"
                        }}
                      ></span>
                      <span
                        className="lbl"
                        style={{
                          whiteSpace: "nowrap",
                          transform: "translate(-50%,-50%)"
                        }}
                      ></span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Home Contact Section */}
      <section id="contact">
        <div className="cw">
          <h2>
            Let's build
            <br />
            what's <em>next.</em>
          </h2>
          <div className="cg">
            <form id="f" noValidate onSubmit={handleSubmit}>
              <fieldset>
                <legend>I need help with</legend>
                <label className="ch">
                  <input
                    type="radio"
                    name="brand"
                    value="gaa"
                    checked={selectedBrand === "gaa"}
                    onChange={() => handleBrandSelect("gaa")}
                  />
                  <span>Corporate advisory</span>
                </label>
                <label className="ch">
                  <input
                    type="radio"
                    name="brand"
                    value="filings"
                    checked={selectedBrand === "filings"}
                    onChange={() => handleBrandSelect("filings")}
                  />
                  <span>Accounting &amp; compliance</span>
                </label>
                <label className="ch">
                  <input
                    type="radio"
                    name="brand"
                    value="hirings"
                    checked={selectedBrand === "hirings"}
                    onChange={() => handleBrandSelect("hirings")}
                  />
                  <span>Hiring / jobs</span>
                </label>
                <label className="ch">
                  <input
                    type="radio"
                    name="brand"
                    value="careers"
                    checked={selectedBrand === "careers"}
                    onChange={() => handleBrandSelect("careers")}
                  />
                  <span>CS training</span>
                </label>
              </fieldset>

              <div>
                <label className="fl" htmlFor="intent">
                  Topic
                </label>
                <select
                  id="intent"
                  name="intent"
                  value={selectedIntent}
                  onChange={(e) => setSelectedIntent(e.target.value)}
                >
                  {(TOPICS[selectedBrand] || []).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row">
                <div>
                  <label className="fl" htmlFor="nm">
                    Name
                  </label>
                  <input
                    className="in"
                    id="nm"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label className="fl" htmlFor="co">
                    Company (optional)
                  </label>
                  <input
                    className="in"
                    id="co"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="row">
                <div>
                  <label className="fl" htmlFor="em">
                    Work email
                  </label>
                  <input
                    className="in"
                    id="em"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label className="fl" htmlFor="ph">
                    Phone
                  </label>
                  <input
                    className="in"
                    id="ph"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="fl" htmlFor="ms">
                  How can we help?
                </label>
                <textarea
                  id="ms"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <input
                className="hp"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />

              <div
                id="st"
                className={`msg ${statusMsg.type}`}
                role="status"
                aria-live="polite"
              >
                {statusMsg.text}
              </div>

              <button
                className="pill o"
                type="submit"
                id="sb2"
                disabled={isSending}
                style={{ alignSelf: "flex-start", padding: "17px 28px" }}
              >
                {isSending ? "Sending…" : "Send enquiry"}
              </button>

              <span style={{ fontSize: "14px", color: "#ffffff", opacity: 0.95 }}>
                One conversation — we'll route you to the right firm.
              </span>
            </form>

            <div className="cols">
              <div>
                <span className="gm" style={{ fontSize: "11px", color: "var(--o)", fontWeight: 600 }}>
                  Advisory
                </span>
                <b style={{ color: "#ffffff" }}>GAA Consulting</b>
              </div>
              <div>
                <span className="gm" style={{ fontSize: "11px", color: "var(--o)", fontWeight: 600 }}>
                  Accounting &amp; tax
                </span>
                <b style={{ color: "#ffffff" }}>Filings First</b>
              </div>
              <div>
                <span className="gm" style={{ fontSize: "11px", color: "var(--o)", fontWeight: 600 }}>
                  Hiring
                </span>
                <b style={{ color: "#ffffff" }}>Hirings First</b>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
