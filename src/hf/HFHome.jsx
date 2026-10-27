// Hirings First home page (mockup: "Hirings First.dc.html", v2)
import React, { useEffect, useRef, useState } from "react";
import { Link } from "../site/router.jsx";
import { HFPage, ClosingBand, ContactSection, catHref, useSection } from "./HFLayout.jsx";
import { CATS, ROTATE, DECK, STEPS, POOL, FILTERS } from "./hfData.js";

// Fixed "random" order in which the 120 dots light up (same on every visit)
const RANK = (() => {
  const a = [...Array(120).keys()];
  let s = 7;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const r = [];
  a.forEach((v, i) => (r[v] = i));
  return r;
})();

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** "ready for Finance / HR / Sales ..." rotating word. */
function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const iv = setInterval(() => setI((v) => (v + 1) % ROTATE.length), 2200);
    return () => clearInterval(iv);
  }, []);
  return (
    <span className="hf-rot" aria-live="off">
      <span style={{ transform: `translateY(${-i * 1.3}em)` }}>
        {ROTATE.map((w) => <span key={w}>{w}</span>)}
      </span>
    </span>
  );
}

/** Stack of three candidate cards that fans out on hover. */
function Deck() {
  const [fan, setFan] = useState(false);
  const POS = fan
    ? ["translate(0,0) rotate(0deg)", "translate(-12%,-6%) rotate(-8deg)", "translate(12%,-10%) rotate(8deg)"]
    : ["translate(0,0) rotate(0deg)", "translate(-4%,-5%) rotate(-3.5deg)", "translate(4%,-9%) rotate(4deg)"];
  return (
    <div className="hf-deck" data-hfrv="" onMouseEnter={() => setFan(true)} onMouseLeave={() => setFan(false)}>
      {DECK.map(([id, role, meta, skills, ini], i) => (
        <div key={id} className={`hf-dcard${i === 0 ? " top" : ""}`} style={{ zIndex: 3 - i, transform: POS[i] }} aria-hidden={i > 0}>
          <div className="hf-dcard-h"><span className="id">{id}</span><span className="hf-avail"><i />Available</span></div>
          <div className="hf-anon"><span className="av">{ini}</span><span className="nm"><i /><small>Name on request</small></span></div>
          <div className="hf-dcard-r"><b>{role}</b><span>{meta}</span></div>
          <div className="hf-tags">{skills.map((k) => <span key={k}>{k}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

/** "How it works": sticky section, four stages driven by scroll, with the 120-dot funnel. */
function Process() {
  const ref = useRef(null);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -b.top / Math.max(1, b.height - window.innerHeight)));
      setStage(Math.min(3, Math.floor(p * 4)));
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
      cancelAnimationFrame(raf);
    };
  }, []);
  const S = STEPS[stage], cnt = S[3];
  return (
    <section id="hf-process" ref={ref} className="hf-proc">
      <div className="hf-proc-stick">
        <div className="hf-proc-grid">
          <div className="hf-proc-l">
            <span className="hf-eyebrow">How it works</span>
            <h2>From brief to hire.<br /><span className="g">No guesswork.</span></h2>
            <ol className="hf-rail">
              {STEPS.map(([t, d], i) => {
                const on = i === stage, done = i < stage;
                return (
                  <li key={t} className={`${on ? "on" : ""}${done ? " done" : ""}${on && i === 3 ? " last" : ""}`}>
                    <div className="hf-rhd"><span className="hf-rdot">{done ? "✓" : "0" + (i + 1)}</span><span className="t">{t}</span></div>
                    <span className="d">{d}</span>
                    {i < 3 && <span className="arr" aria-hidden="true">↓</span>}
                  </li>
                );
              })}
            </ol>
            <div className="hf-mstep">
              <div className="hf-mbars">{STEPS.map((s, i) => <span key={s[0]} className={i <= stage ? (i === 3 ? "o" : "k") : ""} />)}</div>
              <b>0{stage + 1} · {S[0]}</b>
              <span>{S[1]}</span>
            </div>
            <div className="hf-72"><b>72h</b><span>Most mandates receive profiles within 72 hours.</span></div>
          </div>
          <div className="hf-funnel">
            <div className="hf-funnel-h">
              <div><span className="hf-mono">0{stage + 1} / 04</span><b>{S[2]}</b></div>
              <span className={`cnt${stage === 3 ? " o" : ""}`}>{cnt}</span>
            </div>
            <div className="hf-dots" aria-hidden="true">
              {RANK.map((r, i) => {
                const on = r < cnt, fin = stage === 3 && on;
                const delay = Math.min(r, 60) * 4;
                return <span key={i} className={fin ? "fin" : on ? "on" : ""} style={{ transitionDelay: `${delay}ms, ${delay}ms, 0ms` }} />;
              })}
            </div>
            <div className="hf-legend">
              <span><i className="k" />In process</span>
              <span><i className="o" />Hired</span>
              <span><i className="g" />Screened out</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const row = Array.from({ length: 8 }, (_, j) => <span key={j}>Client logo</span>);
  return (
    <section className="hf-logos" aria-label="Companies hiring through HF">
      <span className="hf-mono">Companies hiring through HF</span>
      <div className="hf-logos-mask">
        <div className="hf-logos-track">
          <div>{row}</div>
          <div aria-hidden="true">{row}</div>
        </div>
      </div>
    </section>
  );
}

export default function HFHome() {
  const [filter, setFilter] = useState("All");
  const sec = useSection(true);
  const pool = POOL.filter((p) => filter === "All" || p[1] === filter).slice(0, 6);

  return (
    <HFPage home pageKey="home">
      {/* Hero */}
      <section id="hf-top" className="hf-hero">
        <div className="hf-kicker" data-hfrv=""><span />Talent acquisition &amp; workforce solutions</div>
        <h1 data-hfrv="">Great talent.<br /><span className="o">Ready to perform.</span></h1>
        <div className="hf-hero-row">
          <div className="hf-hero-l" data-hfrv="">
            <p>Pre-screened professionals, ready for <Rotator /><br /><span className="g">Profiles within 72 hours.</span></p>
            <div className="hf-btns">
              <a {...sec("hf-contact")} className="hf-btn dark xl">Hire Talent <span aria-hidden="true">→</span></a>
              <a {...sec("hf-pool")} className="hf-btn line xl">Explore Candidates</a>
            </div>
          </div>
          <Deck />
        </div>
      </section>

      <Process />

      {/* Talent categories */}
      <section id="hf-talent" className="hf-cats">
        <div className="hf-head" data-hfrv="">
          <div>
            <span className="hf-eyebrow">Talent categories</span>
            <h2>Find talent<br />by function.</h2>
          </div>
          <span className="hf-head-note">Six practice areas, each with its own screening framework.</span>
        </div>
        <div className="hf-cats-grid">
          {CATS.map((c, i) => (
            <Link key={c.slug} to={catHref(c.slug)} className="hf-tile" data-hfrv="">
              <div className="hf-tile-top"><span className="n">0{i + 1}</span><span className="hf-mono">6 roles</span></div>
              <div className="hf-tile-b">
                <span className="name">{c.name}</span>
                <div className="hf-tile-f"><span className="roles">{c.roles}</span><span className="arr" aria-hidden="true">↗</span></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured talent pool */}
      <section id="hf-pool" className="hf-pool">
        <div className="hf-pool-in">
          <div className="hf-head" data-hfrv="">
            <div>
              <span className="hf-eyebrow o">Featured talent pool</span>
              <h2>Available talent.</h2>
            </div>
            <span className="hf-head-note">Screened and ready to interview. Names are shared once you request profiles.</span>
          </div>
          <div role="tablist" aria-label="Filter by function" className="hf-filters">
            {FILTERS.map((l) => (
              <button key={l} type="button" role="tab" aria-selected={filter === l} className={filter === l ? "on" : ""} onClick={() => setFilter(l)}>{l}</button>
            ))}
          </div>
          <div className="hf-pool-grid">
            {pool.map(([id, c, role, meta, skills]) => (
              <div key={id} className="hf-pcard">
                <div className="hf-dcard-h"><span className="id">{id}</span><span className="hf-avail"><i />Available</span></div>
                <div className="hf-anon"><span className="av">{c[0]}</span><span className="nm"><i /><small>Name on request</small></span></div>
                <div className="hf-dcard-r"><b>{role}</b><span>{meta}</span></div>
                <div className="hf-tags lg">{skills.map((k) => <span key={k}>{k}</span>)}</div>
                <a {...sec("hf-contact")} className="hf-pcard-cta"><span>Request profile</span><span aria-hidden="true">→</span></a>
              </div>
            ))}
          </div>
          <div className="hf-center-row"><a {...sec("hf-contact")} className="hf-btn orange">Request Profiles <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <Logos />
      <ClosingBand home />
      <ContactSection />
    </HFPage>
  );
}
