import React, { useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, CtaBand, Ring, useLink } from "./GaaShell";
import { CASES, PRACTICES, getPractice } from "../../data/gaaContent";

export default function GaaExperiencePage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Experience & Representative Mandates | GAA Consulting");
  const [f, setF] = useState("all");
  const list = f === "all" ? CASES : CASES.filter((c) => c.practice === f);
  const used = PRACTICES.filter((p) => CASES.some((c) => c.practice === p.slug));

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="experience" />
      <GaaSubBar link={link} crumbs={[[null, "Experience"]]} />
      <main>
        <SubHero
          tag="Experience · Representative Mandates"
          lines={["Work that", "speaks for", "itself."]}
          em={[2]}
          sub="A selection of representative mandates across our practices. Client names are withheld to respect confidentiality, but the problems, approach and outcomes are described as they happened."
          actions={
            <a className="btn o" {...link("@contact")}>
              Discuss a Similar Mandate <span className="ar">→</span>
            </a>
          }
          aside={
            <>
              <div className="fh"><span>Practice Benchmarks</span><span>Est. for Growth</span></div>
              <div className="sgrid">
                <div className="st6"><div className="num">150<span className="sf">+</span></div><span className="lbl">M&amp;A &amp; Diligence Mandates</span></div>
                <div className="st6"><div className="num">500<span className="sf">+</span></div><span className="lbl">Annual Board Calendars</span></div>
                <div className="st6"><div className="num">100<span className="sf">%</span></div><span className="lbl">ICSI Fiduciary Standard</span></div>
                <div className="st6"><div className="num">4</div><span className="lbl">Physical Desks in India</span></div>
              </div>
              <p className="fnote">All mandates handled under mutual NDA. Details shared with client consent only.</p>
            </>
          }
          ticker={used.map((p) => p.short)}
        />

        <section className="s">
          <div className="w">
            <SectionHead eb="Representative Mandates" p="Filter by practice to see the kind of work each team handles.">
              Problems solved, <em>outcomes delivered.</em>
            </SectionHead>
            <div className="ftabs" role="group" aria-label="Filter by practice">
              <button type="button" aria-pressed={f === "all"} onClick={() => setF("all")}>All <sup>{CASES.length}</sup></button>
              {used.map((p) => (
                <button type="button" key={p.slug} aria-pressed={f === p.slug} onClick={() => setF(p.slug)}>
                  {p.short} <sup>{CASES.filter((c) => c.practice === p.slug).length}</sup>
                </button>
              ))}
            </div>
            <div className="cases" aria-live="polite">
              {list.map((c) => {
                const pr = getPractice(c.practice);
                return (
                  <article className="case" key={c.title}>
                    <div className="ch">
                      <div>
                        <span className="gm t">{pr.short} · {c.sector}</span>
                        <h3>{c.title}</h3>
                      </div>
                      <div className="met">
                        <b>{c.metric}</b>
                        <span className="gm">{c.metricLabel}</span>
                      </div>
                    </div>
                    <dl>
                      <div><dt className="gm">Challenge</dt><dd>{c.challenge}</dd></div>
                      <div><dt className="gm">Approach</dt><dd>{c.approach}</dd></div>
                      <div><dt className="gm">Outcome</dt><dd>{c.outcome}</dd></div>
                    </dl>
                    <a className="lk gm" {...link(`practices/${c.practice}`)}>Explore {pr.short} practice →</a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBand
          link={link}
          title="Facing a similar"
          em="situation?"
          p="Tell us about it in confidence. We will share how we handled comparable mandates and what it would take in your case."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
