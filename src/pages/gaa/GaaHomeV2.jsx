// GAA Consulting home page (the GAA Group home), built from the "GAA Home v2" design.
// Header and footer are the shared GAA Consulting ones (GaaShell.jsx).
import React, { useEffect, useRef, useState } from "react";
import { GaaHeader, GaaFooter, useLink } from "./GaaShell";
import { SITES, href } from "../../site/sites.js";
import { go } from "../../site/gaaPaths.js";
import { GAA_CONTACT } from "../../site/gaaContact.js";
import "./GaaHomeV2.css";

const O = "#DC6A40", K = "#121212";
const cl = (x) => Math.min(1, Math.max(0, x));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const prog = (el, vh) => { const b = el.getBoundingClientRect(); return cl(-b.top / Math.max(1, b.height - vh)); };

const LOGO = { gaa: SITES.gaa.logo, ga: SITES.ga.logo, ff: SITES.ff.logo, hf: SITES.hf.logo };
const SITE_URL = { gaa: href("gaa", "/"), ga: href("ga", "/"), ff: href("ff", "/"), hf: href("hf", "/") };

// chapters
const BG = [O, K, "#fff"];
const CAP = ["Corporate & strategic advisory", "Accounting, taxation & compliance", "Talent & workforce"];
const NM = ["GAA Associates", "Filings First", "Hirings First"];
const CH_LOGO = ["ga", "ff", "hf"];
const WORDS = ["GROW", "FILE", "HIRE"];

// lifecycle ring
const FIRMS = ["GAA Associates", "Filings First", "Hirings First"];
const FKEY = ["ga", "ff", "hf"];
const FC = ["#ffffff", "#F0A98A", O];
const ROLE = ["Corporate & strategic advisory", "Accounting, taxation & compliance", "Talent acquisition & workforce"];
const W = [["Advise", "Structure"], ["Account", "Comply"], ["Recruit", "Staff"]];

// contact form
const TOPICS = {
  gaa: ["Corporate law & company secretarial", "M&A & restructuring", "Fundraising & transactions", "NBFC / regulatory advisory", "Other"],
  filings: ["Accounting & bookkeeping", "Taxation", "GST", "Corporate compliance", "Other"],
  hirings: ["Hire talent", "Find opportunities", "Leadership hiring", "Campus placements", "Workforce outsourcing"],
  careers: ["Apply for CS training", "Trainee experience / mentorship", "Other"],
};
const BRANDS = [["gaa", "Corporate advisory"], ["filings", "Accounting & compliance"], ["hirings", "Hiring / jobs"], ["careers", "CS training"]];
const BRAND_EMAIL = { gaa: SITES.gaa.email, filings: SITES.ff.email, hirings: SITES.hf.email, careers: SITES.gaa.email };
const BRAND_NAME = { gaa: "GAA Associates", filings: "Filings First", hirings: "Hirings First", careers: "GAA Associates (CS training)" };

// The three group companies (hero links use the order GAA Associates, Hirings First, Filings First)
const HERO_COS = [
  ["ga", "GAA Associates", "Corporate law & advisory"],
  ["hf", "Hirings First", "Talent & workforce"],
  ["ff", "Filings First", "Accounting, tax & compliance"],
];
const COMPANIES = [
  ["ga", "GAA Associates", "Corporate advisory"],
  ["ff", "Filings First", "Accounting & compliance"],
  ["hf", "Hirings First", "Talent & workforce"],
];

/** Link to another group website (internal router locally, full page load on live domains). */
function siteLink(key) {
  const to = SITE_URL[key];
  return {
    href: to,
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
      e.preventDefault();
      go(to);
    },
  };
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function GaaHomeV2() {
  const link = useLink();
  const root = useRef(null);
  const [form, setForm] = useState({ brand: "gaa", intent: TOPICS.gaa[0] });
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);

  // pick a brand (and topic) in the form, then scroll to it
  const toContact = (brand, intent) => (e) => {
    e.preventDefault();
    setForm({ brand, intent: intent && TOPICS[brand].includes(intent) ? intent : TOPICS[brand][0] });
    scrollToId("gh-contact");
  };

  /* ---------- scroll effects (chapters + lifecycle), ported from the design ---------- */
  useEffect(() => {
    const el = root.current;
    const $ = (s) => el.querySelector(s);
    const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const hdr = document.getElementById("hdr");
    const ch = $("#gh-chapters"), li = $(".gh-li"), col = $(".gh-slot>div"), lc = $("#gh-lifecycle");
    const bars = [...el.querySelectorAll(".gh-bars i")];
    const lgImg = $(".gh-lgw img"), lgn = $(".gh-lgn"), cnt = $(".gh-cnt"), cap = $(".gh-cap b");
    const ring = $(".gh-ring"), arc = $(".gh-arc"), svg = $(".gh-ring svg"), cn = $(".gh-cn");
    const dots = [...el.querySelectorAll(".gh-marks .d")], lbls = [...el.querySelectorAll(".gh-marks .lbl")];
    const sb = $(".gh-sb"), slg = $(".gh-sb img"), sfirm = $(".gh-sfirm"), srole = $(".gh-srole"), sv = $(".gh-sv");
    const legs = [...el.querySelectorAll(".gh-leg span")];
    let raf = 0, lastC = -1, lastCi = -1;

    function measure() {
      raf = 0;
      const vh = innerHeight, vw = innerWidth, narrow = vw < 900;
      if (hdr) el.style.setProperty("--hh", hdr.offsetHeight + "px");
      const stat = narrow || RM;
      el.classList.toggle("gh-st", stat);

      // chapters: left panel follows the article in view
      const b = ch.getBoundingClientRect(), cp = cl(-b.top / Math.max(1, b.height - vh)), raw = cp * 2;
      const k0 = Math.min(1, Math.floor(raw)), fr = raw - k0;
      const k = raw >= 2 ? 2 : k0 + ease(cl((fr - 0.35) / 0.3)), c = Math.round(k);
      if (c !== lastC) {
        lastC = c;
        li.style.background = BG[c];
        li.style.color = c === 1 ? "#fff" : K;
        lgImg.src = LOGO[CH_LOGO[c]];
        lgImg.alt = NM[c];
        lgn.textContent = NM[c];
        cnt.textContent = "0" + (c + 1) + " / 03";
        cap.textContent = CAP[c];
      }
      col.style.transform = `translateY(${-k}em)`;
      bars.forEach((e, i) => {
        e.style.width = cl(raw + 1 - i) * 100 + "%";
        e.style.background = c === 1 ? "#fff" : c === 0 ? K : O;
        e.parentNode.style.background = c === 1 ? "#3a3632" : "rgba(18,18,18,.25)";
      });
      if (stat) return;

      // lifecycle ring
      const dp = prog(lc, vh), rw = Math.min(1, dp * 1.1) * 2, kk = Math.min(1, Math.floor(rw)), f2 = rw - kk;
      const pos = rw >= 2 ? 2 : kk + ease(cl((f2 - 0.3) / 0.4)), ci = Math.round(pos), rot = pos * 120 + 30;
      const Sz = Math.max(160, Math.min(vh * 0.52, vw * 0.34, vh - 360)), R = Sz / 2;
      ring.style.cssText = `width:${Sz}px;height:${Sz}px;margin:64px`;
      const fill = (pos + 1) * 120;
      let st = "";
      for (let q = 0; q < 3; q++) { const a = q * 120, e = Math.min((q + 1) * 120, fill); if (e > a) st += `${FC[q]} ${a}deg ${e}deg,`; }
      arc.style.background = `conic-gradient(from ${-rot - 30}deg,${st}transparent ${fill}deg)`;
      svg.setAttribute("width", Sz);
      svg.setAttribute("height", Sz);
      cn.textContent = "0" + (ci + 1);
      cn.style.fontSize = Sz * 0.3 + "px";
      cn.style.color = FC[ci];
      const xy = (i) => { const a = ((-90 + i * 60 - rot) * Math.PI) / 180; return [R + R * Math.cos(a), R + R * Math.sin(a), a]; };
      svg.innerHTML = [0, 1, 2].map((fi) => {
        const a = xy(fi * 2), b2 = xy(fi * 2 + 1), on = ci === fi;
        return `<line x1="${a[0]}" y1="${a[1]}" x2="${b2[0]}" y2="${b2[1]}" stroke="${FC[fi]}" stroke-width="${on ? 2 : 1}" stroke-opacity="${on ? 0.9 : 0.3}" stroke-dasharray="${on ? "" : "4 5"}"/>`;
      }).join("");
      for (let i = 0; i < 6; i++) {
        const fi = Math.floor(i / 2), [x, y, a] = xy(i), on = fi === ci, lr = R + 46, c2 = FC[fi], d = dots[i], l = lbls[i];
        d.style.cssText = `left:${x}px;top:${y}px;width:${on ? 20 : 11}px;height:${on ? 20 : 11}px;background:${fi <= pos + 0.5 ? c2 : K};border:2px solid ${c2};box-shadow:${on ? `0 0 0 8px ${c2}2e,0 0 30px ${c2}` : "none"}`;
        l.textContent = W[fi][i % 2];
        l.style.cssText = `left:${R + lr * Math.cos(a)}px;top:${R + lr * Math.sin(a)}px;` +
          (on ? `font-family:var(--pj);font-style:italic;font-weight:600;font-size:28px;color:${c2}` : `font:500 11px var(--gm);letter-spacing:.08em;text-transform:uppercase;color:#6b655e`);
      }
      sb.style.opacity = 1 - cl(Math.abs(pos - ci) * 2.2);
      sb.style.transform = `translateY(${(pos - ci) * -40}px)`;
      if (ci !== lastCi) {
        lastCi = ci;
        slg.src = LOGO[FKEY[ci]];
        sfirm.textContent = FIRMS[ci];
        srole.textContent = ROLE[ci];
        sv.textContent = W[ci].join(" · ");
        sv.style.color = FC[ci];
        legs.forEach((s, j) => s.classList.toggle("on", j === ci));
      }
    }
    const req = () => { if (!raf) raf = requestAnimationFrame(measure); };
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    measure();
    // arriving with /#gh-why etc.
    const h = location.hash.slice(1);
    if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView(), 60);
    return () => {
      removeEventListener("scroll", req);
      removeEventListener("resize", req);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------- group companies: one scroll = one chapter (desktop) ----------
     Each wheel / key step inside the section glides to the next (or previous) chapter, so the
     left panel and the article on the right change together. Phones keep normal scrolling. */
  useEffect(() => {
    const el = root.current;
    const sec = el.querySelector("#gh-chapters");
    const arts = [...sec.querySelectorAll(".gh-chap")];
    const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let enabled = false, anim = 0, busy = false, quiet = false, lastWheel = 0;

    const check = () => {
      enabled = !RM && innerWidth >= 900 && innerHeight >= 600;
      el.classList.toggle("gh-snap", enabled);
      // never hide content: if a chapter does not fit the screen, fall back to normal scrolling
      if (enabled && arts.some((a) => a.scrollHeight > a.clientHeight + 2)) {
        enabled = false;
        el.classList.remove("gh-snap");
      }
    };
    const tops = () => arts.map((a) => Math.round(a.getBoundingClientRect().top + scrollY));
    const glide = (y) => {
      cancelAnimationFrame(anim);
      busy = true;
      const y0 = scrollY, d = y - y0, t0 = performance.now(), T = 850;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / T);
        window.scrollTo({ top: y0 + d * ease(p), behavior: "instant" });
        if (p < 1) anim = requestAnimationFrame(step);
        else {
          busy = false;
          quiet = true;
        }
      };
      anim = requestAnimationFrame(step);
    };
    // where one step in direction `dir` should go, or null to let the page scroll normally
    const targetFor = (dir) => {
      const T = tops(), y = scrollY, vh = innerHeight, first = T[0], last = T[T.length - 1];
      if (y < first - 2) return dir > 0 && first - y < vh * 0.6 ? first : null; // entering from above
      if (y > last + 2) return dir < 0 && y - last < vh * 0.6 ? last : null; // entering from below
      const to = dir > 0 ? T.find((t) => t > y + 2) : [...T].reverse().find((t) => t < y - 2);
      return to === undefined ? null : to;
    };
    const onWheel = (e) => {
      if (!enabled || e.ctrlKey || Math.abs(e.deltaY) < 2) return;
      const now = performance.now(), gap = now - lastWheel;
      lastWheel = now;
      const to = targetFor(Math.sign(e.deltaY));
      if (busy) {
        if (to !== null || targetFor(-Math.sign(e.deltaY)) !== null) e.preventDefault();
        return;
      }
      // swallow the tail of a trackpad swipe that already moved one chapter
      if (quiet && gap < 180 && to !== null) {
        e.preventDefault();
        return;
      }
      quiet = false;
      if (to === null) return;
      e.preventDefault();
      glide(to);
    };
    const onKey = (e) => {
      if (!enabled || busy || e.altKey || e.ctrlKey || e.metaKey) return;
      if (/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(document.activeElement?.tagName || "")) return;
      const dir = { ArrowDown: 1, PageDown: 1, " ": e.shiftKey ? -1 : 1, ArrowUp: -1, PageUp: -1 }[e.key];
      if (!dir) return;
      const to = targetFor(dir);
      if (to === null) return;
      e.preventDefault();
      glide(to);
    };
    check();
    addEventListener("wheel", onWheel, { passive: false });
    addEventListener("keydown", onKey);
    addEventListener("resize", check);
    return () => {
      removeEventListener("wheel", onWheel);
      removeEventListener("keydown", onKey);
      removeEventListener("resize", check);
      cancelAnimationFrame(anim);
    };
  }, []);

  /* ---------- form ---------- */
  const onSubmit = (e) => {
    e.preventDefault();
    const f = formRef.current;
    if (f.website.value) return;
    const bad = !f.name.value.trim() ? f.name : !f.email.value || !f.email.validity.valid ? f.email : f.phone.value.replace(/\D/g, "").length < 8 ? f.phone : null;
    if (bad) {
      setStatus(["er", "Please enter your name, a valid email and a phone number."]);
      bad.focus();
      return;
    }
    const d = Object.fromEntries(new FormData(f));
    delete d.website;
    const body = [
      `For: ${BRAND_NAME[d.brand]}`, `Topic: ${d.intent}`, `Name: ${d.name}`, `Company: ${d.company || "-"}`,
      `Email: ${d.email}`, `Phone: ${d.phone}`, "", d.message || "",
    ].join("\n");
    window.location.href = `mailto:${BRAND_EMAIL[d.brand]}?subject=${encodeURIComponent(`Enquiry: ${d.intent}`)}&body=${encodeURIComponent(body)}`;
    setStatus(["ok", "Your email app should open with the details filled in. Please press send there."]);
  };

  return (
    <div className="app-root">
      <div className="gaa-consulting-root gaa-chrome">
        <GaaHeader link={link} active="" />
      </div>
      <main id="main-content" className="gh2" ref={root}>
        {/* 1. Hero: fits one screen */}
        <section className="gh-top" id="gh-top">
          <div className="gh-lai">
            <div className="gh-tr gh-gm">
              <span>GAA Consulting · Corporate &amp; strategic advisory</span>
              <span>Part of the GAA Group</span>
            </div>
            <h1>
              <span className="gh-w"><span style={{ "--d": ".15s" }}>Business,</span></span>
              <br />
              <span className="gh-w"><span style={{ "--d": ".35s" }}><em>first.</em></span></span>
            </h1>
            <div className="gh-bot">
              <nav className="gh-fr" aria-label="Group companies">
                {HERO_COS.map(([k, name, line], i) => (
                  <a key={k} className="gh-hco" {...siteLink(k)} style={{ "--d": `${0.7 + i * 0.15}s` }} aria-label={`Visit the ${name} website`}>
                    <span className="gh-hco-tx">
                      <b>{name}</b>
                      <span>{line}</span>
                    </span>
                    <i aria-hidden="true">→</i>
                  </a>
                ))}
              </nav>
              <div className="gh-hb">
                <a className="gh-pill o" href="#gh-chapters" onClick={(e) => { e.preventDefault(); scrollToId("gh-chapters"); }}>Explore the group</a>
                <a className="gh-pill g" href="#gh-contact" onClick={toContact("gaa")}>Book a consultation</a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Why GAA */}
        <section className="gh-why" id="gh-why">
          <div className="gh-sh">
            <span className="gh-gm" style={{ color: "var(--od)" }}>Why GAA</span>
            <h2>Advice that holds up.<br /><em>Execution that follows through.</em></h2>
            <p>What clients get when they work with the GAA Group.</p>
          </div>
          <div className="gh-wg">
            {[
              ["Practitioner-led", "Matters are handled directly by qualified company secretaries and legal professionals."],
              ["Regulatory depth", "Focused experience with NBFCs, financial institutions and promoter groups."],
              ["Strategy to execution", "Advice is carried through to documentation, filings and closure."],
              ["One accountable partner", "A single point of contact across advisory, compliance and hiring within the group."],
            ].map(([h, p], i) => (
              <div className="gh-wc" key={h}>
                <b>0{i + 1}</b>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Group companies, one chapter per scroll */}
        <section className="gh-ch" id="gh-chapters">
          <div className="gh-left">
            <div className="gh-li">
              <div className="gh-lgw">
                <span className="gh-l"><img src={LOGO.ga} alt="GAA Associates" /></span>
                <span className="gh-lgn">GAA Associates</span>
                <span className="gh-cnt gh-gm">01 / 03</span>
              </div>
              <div className="gh-slot" aria-hidden="true">
                <div>{WORDS.map((w) => <span key={w}>{w}</span>)}</div>
              </div>
              <div className="gh-cap">
                <b>Corporate &amp; strategic advisory</b>
                <div className="gh-bars">{[0, 1, 2].map((i) => <span key={i}><i /></span>)}</div>
              </div>
            </div>
          </div>
          <div>
            <article className="gh-chap">
              <div className="gh-bp"><span className="gh-bl"><img src={LOGO.ga} alt="GAA Associates logo" /></span><h2>GAA Associates</h2></div>
              <span className="gh-pm" style={{ color: "var(--od)" }}>01 · Corporate &amp; strategic advisory</span>
              <p className="gh-t">Corporate law, company secretarial, transactional and regulatory advisory for businesses, financial institutions, NBFCs and promoters.</p>
              <Rows items={["Corporate law & company secretarial", "Mergers, acquisitions & restructuring", "Fundraising & transactions", "Regulatory advisory for NBFCs & institutions"]} />
              <div className="gh-ca">
                <a className="gh-cb" href="#gh-contact" onClick={toContact("gaa")}>Speak to GAA Associates →</a>
                <a className="gh-cb line" {...siteLink("ga")}>Visit GAA Associates</a>
              </div>
            </article>

            <article className="gh-chap">
              <div className="gh-bp"><span className="gh-bl"><img src={LOGO.ff} alt="Filings First logo" /></span><h2>Filings First</h2></div>
              <span className="gh-pm" style={{ color: "var(--od)" }}>02 · Accounting, taxation &amp; compliance</span>
              <p className="gh-t">The Compliance &amp; Filings Execution Desk of GAA Associates. Accounting, bookkeeping, taxation, GST and corporate compliance, filed on time.</p>
              <Rows items={["Accounting & bookkeeping", "Taxation", "GST", "Corporate compliance"]} />
              <div className="gh-ca">
                <a className="gh-cb" href="#gh-contact" onClick={toContact("filings")}>Get compliant with Filings First →</a>
                <a className="gh-cb line" {...siteLink("ff")}>Visit Filings First</a>
              </div>
            </article>

            <article className="gh-chap">
              <div className="gh-bp"><span className="gh-bl"><img src={LOGO.hf} alt="Hirings First logo" /></span><h2>Hirings First</h2></div>
              <span className="gh-pm" style={{ color: "var(--od)" }}>03 · Talent &amp; workforce</span>
              <p className="gh-t">Connecting businesses with the right talent, from first engineers to the leadership team.</p>
              <Rows items={["IT & corporate recruitment", "Leadership hiring", "Campus placements", "Workforce outsourcing"]} />
              <div className="gh-ca">
                <a className="gh-cb o" href="#gh-contact" onClick={toContact("hirings", "Hire talent")}>Hire Talent →</a>
                <a className="gh-cb" href="#gh-contact" onClick={toContact("hirings", "Find opportunities")}>Find Opportunities →</a>
                <a className="gh-cb line" {...siteLink("hf")}>Visit Hirings First</a>
              </div>
            </article>
          </div>
        </section>

        {/* 4. Lifecycle ring */}
        <section className="gh-lc" id="gh-lifecycle">
          <div className="gh-stk">
            <div className="gh-dg">
              <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <span className="gh-gm" style={{ color: "var(--o)" }}>How we work together</span>
                  <h2>Three firms.<br /><em>One business journey.</em></h2>
                </div>
                <div className="gh-sb">
                  <div className="gh-fh">
                    <span className="gh-l"><img src={LOGO.ga} alt="" /></span>
                    <div>
                      <b className="gh-sfirm">GAA Associates</b>
                      <span className="gh-gm gh-srole" style={{ color: "#a39c94" }}>Corporate &amp; strategic advisory</span>
                    </div>
                  </div>
                  <div className="gh-sv">Advise · Structure</div>
                </div>
                <div className="gh-lgm">
                  {FIRMS.map((f, i) => (
                    <a key={f} style={{ "--c": FC[i] }} {...siteLink(FKEY[i])}>
                      <span className="gh-l"><img src={LOGO[FKEY[i]]} alt="" /></span>
                      <div><b>{f}</b><em>{W[i].join(" · ")}</em></div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="gh-ringw" aria-hidden="true">
                <div className="gh-ring">
                  <div style={{ inset: 0, borderRadius: "50%", border: "1px solid #34302c" }} />
                  <div style={{ inset: "16%", borderRadius: "50%", border: "1px dashed #2c2926" }} />
                  <div className="gh-arc" />
                  <svg />
                  <div style={{ inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <span className="gh-cn">01</span>
                    <span className="gh-gm" style={{ color: "#8a847d" }}>OF 03</span>
                  </div>
                  <div className="gh-marks">
                    {[0, 1, 2, 3, 4, 5].map((i) => <React.Fragment key={i}><span className="d" /><span className="lbl" /></React.Fragment>)}
                  </div>
                </div>
                <div className="gh-leg">
                  {FIRMS.map((f, i) => <span key={f} className={i === 0 ? "on" : ""}><i style={{ background: FC[i] }} />{f}: {W[i].join(" · ")}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Contact */}
        <section className="gh-contact" id="gh-contact">
          <div className="gh-cw">
            <span className="gh-gm" style={{ color: "var(--od)" }}>Contact us</span>
            <div className="gh-cg">
              <div className="gh-ci">
                <h2>Let's build<br />what's <em>next.</em></h2>
                <p className="gh-t">Tell us what you need. One conversation, and we'll route you to the right firm in the group.</p>
                <div className="gh-cd">
                  <div><span className="gh-gm">Office</span><span>{GAA_CONTACT.office}</span></div>
                  <div><span className="gh-gm">Email</span><a href={`mailto:${GAA_CONTACT.email}`}>{GAA_CONTACT.email}</a></div>
                  <div><span className="gh-gm">Phone</span><span>{GAA_CONTACT.phone}</span></div>
                  <div><span className="gh-gm">Hours</span><span>{GAA_CONTACT.hours}</span></div>
                </div>
                <div className="gh-cf">
                  {COMPANIES.map(([k, name, line]) => (
                    <a key={k} {...siteLink(k)} aria-label={`Visit the ${name} website`}>
                      <img src={LOGO[k]} alt="" />
                      <b>{name}</b>
                      <small>{line}</small>
                      <em aria-hidden="true">↗</em>
                    </a>
                  ))}
                </div>
              </div>

              <form className="gh-fc" ref={formRef} onSubmit={onSubmit} noValidate>
                <span>Send an enquiry</span>
                <fieldset className="gh-fs">
                  <legend className="gh-fl">I need help with</legend>
                  {BRANDS.map(([v, l]) => (
                    <label className="gh-chx" key={v}>
                      <input type="radio" name="brand" value={v} checked={form.brand === v} onChange={() => setForm({ brand: v, intent: TOPICS[v][0] })} />
                      <span>{l}</span>
                    </label>
                  ))}
                </fieldset>
                <label>
                  <span className="gh-fl">Topic</span>
                  <select name="intent" value={form.intent} onChange={(e) => setForm({ ...form, intent: e.target.value })}>
                    {TOPICS[form.brand].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <div className="gh-row">
                  <label><span className="gh-fl">Name</span><input className="gh-in" name="name" autoComplete="name" required /></label>
                  <label><span className="gh-fl">Company (optional)</span><input className="gh-in" name="company" autoComplete="organization" /></label>
                </div>
                <div className="gh-row">
                  <label><span className="gh-fl">Work email</span><input className="gh-in" name="email" type="email" autoComplete="email" required /></label>
                  <label><span className="gh-fl">Phone</span><input className="gh-in" name="phone" type="tel" autoComplete="tel" required /></label>
                </div>
                <label><span className="gh-fl">How can we help?</span><textarea name="message" rows={4} /></label>
                <input className="gh-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                {status && <div className={`gh-msg ${status[0]}`} role="status">{status[1]}</div>}
                <div><button className="gh-pill o" type="submit">Send enquiry</button></div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <div className="gaa-consulting-root gaa-chrome">
        <GaaFooter link={link} />
      </div>
    </div>
  );
}

function Rows({ items }) {
  return (
    <div className="gh-rows">
      {items.map((t, i) => (
        <div key={t}><b>0{i + 1}</b><span>{t}</span></div>
      ))}
    </div>
  );
}
