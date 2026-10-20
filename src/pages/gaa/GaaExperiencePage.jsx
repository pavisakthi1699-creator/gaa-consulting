import React, { useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, CtaBand, Ring, useLink } from "./GaaShell";
import { CASES, PRACTICES, getPractice } from "../../data/gaaContent";

export default function GaaExperiencePage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Case Studies | GAA Consulting");
  const [f, setF] = useState("all");
  const list = f === "all" ? CASES : CASES.filter((c) => c.practice === f);
  const used = PRACTICES.filter((p) => CASES.some((c) => c.practice === p.slug));

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="experience" />
      <GaaSubBar link={link} crumbs={[[null, "Case Studies"]]} />
      <main>
        <SubHero
          variant="type"
          tag="Case Studies"
          lines={["The problem,", "what we did,", "what changed."]}
          em={[2]}
          sub="A selection of recent engagements. Client names are withheld to respect confidentiality; the problems, approach and results are described as they happened."
          actions={<a className="btn o" {...link("@contact")}>Discuss a similar case <span className="ar">→</span></a>}
          facts={[["150+", "M&A and diligence mandates"], ["500+", "Board calendars each year"], ["100%", "Work under mutual NDA"]]}
        />

        <section className="s" id="cases">
          <div className="w">
            <SectionHead p="Filter by service to see the kind of work each team handles.">
              Selected <em>engagements.</em>
            </SectionHead>
            <div className="ftabs" role="group" aria-label="Filter by service">
              <button type="button" aria-pressed={f === "all"} onClick={() => setF("all")}>All</button>
              {used.map((p) => (
                <button type="button" key={p.slug} aria-pressed={f === p.slug} onClick={() => setF(p.slug)}>
                  {p.navName}
                </button>
              ))}
            </div>
            <div className="sty" aria-live="polite">
              {list.map((c) => {
                const pr = getPractice(c.practice);
                return (
                  <article className="story" key={c.title}>
                    <div className="st-m">
                      <b>{c.metric}</b>
                      <span>{c.metricLabel}</span>
                    </div>
                    <div className="st-b">
                      <span className="t">{pr.navName}, {c.sector}</span>
                      <h3>{c.title}</h3>
                      <div className="st-cols">
                        <div><h4>The problem</h4><p>{c.challenge}</p></div>
                        <div><h4>What we did</h4><p>{c.approach}</p></div>
                        <div><h4>The result</h4><p>{c.outcome}</p></div>
                      </div>
                      <a className="tlink" {...link(`practices/${c.practice}`)}>About {pr.navName} <span aria-hidden="true">→</span></a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBand
          link={link}
          title="Facing something"
          em="similar?"
          p="Tell us about it in confidence. We will share how we handled comparable work and what it would take in your case."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
