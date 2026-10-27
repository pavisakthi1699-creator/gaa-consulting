// Hirings First home page (mockup: "Hirings First.dc.html")
import React, { useEffect, useState } from "react";
import { Link } from "../site/router.jsx";
import { HFPage, ClosingBand, ContactSection, asCandidate, catHref } from "./HFLayout.jsx";
import { CATS, POOL, FILTERS, STEPS, DIFF, SHORTLIST, TICKER } from "./hfData.js";

const STAGES = ["Brief", "Screened", "Assessed", "Shortlisted"];
const CHECKS = ["Technical", "Communication", "Role fit"];
const LOGOS = 6;

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

/** Animated "Your shortlist" card in the hero. */
function Shortlist() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(4);
      return;
    }
    const iv = setInterval(() => setTick((t) => (t + 1) % 5), 1600);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="hf-sl" data-tick={tick}>
      <span className="hf-sl-back" aria-hidden="true" />
      <div className="hf-sl-card">
        <div className="hf-sl-head">
          <span className="hf-mono">Your shortlist</span>
          <b>Finance Executive · Bengaluru</b>
        </div>
        <div className="hf-sl-stages">
          {STAGES.map((l, i) => (
            <span key={l} className={tick > i ? "done" : tick === i ? "now" : ""}>{tick > i ? "✓ " : ""}{l}</span>
          ))}
        </div>
        <div>
          {SHORTLIST.map(([id, exp, skills, sc], i) => (
            <div key={id} className={`hf-sl-row${tick >= 3 && i === 0 ? " top" : ""}${tick >= 1 || i === 0 ? "" : " dim"}`}>
              <span className={`hf-sl-av${tick >= 3 ? " on" : ""}`}>{id.slice(-1)}</span>
              <div className="hf-sl-mid">
                <div className="hf-sl-id"><b>{id}</b><span>{exp}</span></div>
                <div className="hf-sl-sk">{skills.map((k) => <span key={k}>{k}</span>)}</div>
                <div className="hf-sl-ck">
                  {CHECKS.map((l, j) => (
                    <span key={l}>
                      {l}
                      <span className="bar"><span style={{ width: tick >= 2 ? `${sc[j]}%` : "8%", background: j === 0 ? "#DC6A40" : "#121212", transitionDelay: `${j * 0.1}s` }} /></span>
                    </span>
                  ))}
                </div>
              </div>
              <span className={`hf-sl-st${tick >= 3 ? " ok" : ""}`}>{tick >= 3 ? "Shortlisted" : tick >= 1 ? "Screening" : "In review"}</span>
            </div>
          ))}
        </div>
        <div className="hf-sl-foot">Illustrative shortlist. Names are shared once you request profiles.</div>
      </div>
    </div>
  );
}

function Ticker() {
  const row = TICKER.flatMap((w) => [<span key={w} className="w">{w}</span>, <span key={w + "-d"} className="d" aria-hidden="true" />]);
  return (
    <div className="hf-ticker" aria-label="Hiring areas">
      <div className="hf-ticker-track">
        <div>{row}</div>
        <div aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}

const BAR_H = [30, 48, 62, 80, 100];

export default function HFHome() {
  const [filter, setFilter] = useState("All");
  const [step, setStep] = useState(0);
  const pool = POOL.filter((p) => filter === "All" || p[0] === filter).slice(0, 6);

  return (
    <HFPage home pageKey="home">
      {/* Hero */}
      <section id="hf-top" className="hf-hero">
        <div className="hf-hero-l" data-hfrv="">
          <div className="hf-kicker"><span />Recruitment · Leadership · Campus · Workforce</div>
          <h1>Great talent.<br /><span className="o">Ready to perform.</span></h1>
          <p>Pre-screened professionals across Finance, HR, Sales, Marketing, Operations and Technology, shortlisted within 72 hours.</p>
          <div className="hf-btns">
            <a href="#hf-contact" onClick={scrollTo("hf-contact")} className="hf-btn dark">Hire Talent →</a>
            <a href="#hf-pool" onClick={scrollTo("hf-pool")} className="hf-btn line">Explore Candidates</a>
          </div>
          <div className="hf-stats">
            <div><b>72h</b><span className="hf-mono">To first profiles</span></div>
            <div><b>3-step</b><span className="hf-mono">Screening</span></div>
            <div><b>6</b><span className="hf-mono">Functions</span></div>
          </div>
        </div>
        <div className="hf-hero-r" data-hfrv="">
          <Shortlist />
        </div>
      </section>

      <Ticker />

      {/* What makes HF different */}
      <section className="hf-diff">
        <div className="hf-center" data-hfrv="">
          <span className="hf-eyebrow">What makes HF different</span>
          <h2 className="hf-h2 xl bal">We don't send resumes.<br /><span className="g">We send people ready to contribute.</span></h2>
        </div>
        <div className="hf-diff-grid">
          {DIFF.map(([t, d, stat], i) => (
            <div key={t} className={`hf-diff-box b${i}`} data-hfrv="">
              <div className="hf-diff-vis">
                {BAR_H.map((h, j) => <span key={j} className={`${j === 4 ? "o" : ""}${j >= 3 && i === 0 ? " half" : ""}`} style={{ height: `${h}%` }} />)}
                <span className="hf-diff-big">{stat}</span>
              </div>
              <div className="hf-diff-tx">
                <span className="t">{t}</span>
                <span className="d">{d}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Talent categories */}
      <section id="hf-talent" className="hf-cats">
        <div className="hf-cats-in">
          <div className="hf-cats-head" data-hfrv="">
            <div>
              <span className="hf-eyebrow">Talent categories</span>
              <h2 className="hf-h2 bal">Find talent by function.</h2>
            </div>
            <span className="hf-cats-note">Six practice areas, each with its own screening framework.</span>
          </div>
          <div className="hf-cats-grid">
            {CATS.map((c, i) => (
              <Link key={c.slug} to={catHref(c.slug)} className={`hf-tile${i === 0 ? " first" : ""}`}>
                <div className="hf-tile-top">
                  <span className="n">0{i + 1}</span>
                  <span className="arr" aria-hidden="true">→</span>
                </div>
                <span className="glyph" aria-hidden="true">{c.glyph}</span>
                <div className="hf-tile-tx">
                  <span className="name">{c.name}</span>
                  <span className="roles">{c.roles}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured talent pool */}
      <section id="hf-pool" className="hf-pool">
        <div className="hf-center" data-hfrv="">
          <span className="hf-eyebrow">Featured talent pool</span>
          <h2 className="hf-h2">Available talent.</h2>
          <p>Screened and ready to interview. Names are shared on request.</p>
        </div>
        <div role="tablist" aria-label="Filter by function" className="hf-filters">
          {FILTERS.map((l) => (
            <button key={l} type="button" role="tab" aria-selected={filter === l} className={filter === l ? "on" : ""} onClick={() => setFilter(l)}>{l}</button>
          ))}
        </div>
        <div className="hf-pool-grid">
          {pool.map(([cat, role, meta, skills]) => (
            <div key={role} className="hf-prof hov">
              <div className="hf-prof-top">
                <span className="cat">{cat}</span>
                <span className="hf-avail"><i />Available</span>
              </div>
              <div className="hf-prof-id"><b>{role}</b><span>{meta}</span></div>
              <div className="hf-chips">{skills.map((k) => <span key={k}>{k}</span>)}</div>
            </div>
          ))}
        </div>
        <div className="hf-center-row"><a href="#hf-contact" onClick={scrollTo("hf-contact")} className="hf-btn dark lg">Request Profiles →</a></div>
      </section>

      {/* How it works */}
      <section id="hf-process" className="hf-process">
        <div className="hf-process-in">
          <div className="hf-process-l">
            <span className="hf-eyebrow">How it works</span>
            <h2 className="hf-h2">Four steps.<br /><span className="g">No guesswork.</span></h2>
            <div className="hf-72"><b>72h</b><span>Most mandates receive profiles within 72 hours.</span></div>
          </div>
          <ol className="hf-steps">
            {STEPS.map(([t, d], i) => {
              const on = i === step;
              return (
                <li key={t}>
                  <button type="button" className={`hf-step${on ? " on" : ""}${on && i === 3 ? " last" : ""}`} aria-expanded={on} onClick={() => setStep(i)}>
                    <span className="hf-sdot">0{i + 1}</span>
                    <span className="hf-stx">
                      <span className="t">{t}</span>
                      <span className="d">{d}</span>
                    </span>
                  </button>
                  {i < 3 && <span className={`hf-step-arr${i < step ? " past" : ""}`} aria-hidden="true">↓</span>}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Client logos */}
      <section className="hf-logos" aria-label="Companies hiring through HF">
        <span className="hf-mono">Companies hiring through HF</span>
        <div>{Array.from({ length: LOGOS }, (_, i) => <div key={i}>Client logo</div>)}</div>
      </section>

      {/* For candidates */}
      <section id="hf-candidates" className="hf-cand-wrap">
        <div className="hf-cand">
          <div>
            <span className="hf-eyebrow hf-eb-dk">For candidates</span>
            <span className="hf-cand-h">Looking for your next role?</span>
            <span className="hf-cand-p">Join the Hirings First talent pool. Get screened once and be considered for roles that fit.</span>
          </div>
          <a href="#hf-contact" onClick={(e) => (asCandidate(), scrollTo("hf-contact")(e))} className="hf-btn dark lg">Find Opportunities →</a>
        </div>
      </section>

      <ClosingBand />
      <ContactSection dark />
    </HFPage>
  );
}
