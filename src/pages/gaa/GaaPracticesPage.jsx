import React, { useRef } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, CtaBand, Ring, useLink } from "./GaaShell";
import { PRACTICES, LIFECYCLE, getPractice } from "../../data/gaaContent";

export default function GaaPracticesPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Practice Areas | GAA Consulting");

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="practices" />
      <GaaSubBar link={link} crumbs={[[null, "Practice Areas"]]} />
      <main>
        <SubHero
          tag="Practice Areas · 06 Verticals"
          lines={["Six practices.", "One corporate", "lifecycle."]}
          em={[2]}
          sub="From the day you incorporate in India to the day you restructure or exit, GAA Consulting covers each stage of the corporate lifecycle with a dedicated, partner-led practice."
          actions={
            <>
              <a className="btn o" {...link("@contact")}>
                Talk to a Practice Partner <span className="ar">→</span>
              </a>
              <a className="btn g" href="#all" onClick={(e) => { e.preventDefault(); document.getElementById("all")?.scrollIntoView({ behavior: "smooth" }); }}>
                View All Practices ↓
              </a>
            </>
          }
          aside={
            <>
              <div className="fh"><span>Practice Index</span><span>06 Verticals</span></div>
              <ol className="pidx">
                {PRACTICES.map((p) => (
                  <li key={p.slug}>
                    <a {...link(`practices/${p.slug}`)}>
                      <i>{p.no}</i>
                      <span>{p.short}</span>
                      <b aria-hidden="true">→</b>
                    </a>
                  </li>
                ))}
              </ol>
            </>
          }
          ticker={PRACTICES.map((p) => p.short)}
        />

        <section className="s" id="all">
          <div className="w">
            <SectionHead
              eb="Core Practice Areas"
              p="Each practice is led by a senior partner and backed by Practising Company Secretaries, corporate lawyers and transaction specialists. Select a practice to see services, process and FAQs."
            >
              Precision counsel across the <em>corporate lifecycle.</em>
            </SectionHead>
            <div className="pgrid">
              {PRACTICES.map((p) => (
                <a className="pc5" key={p.slug} {...link(`practices/${p.slug}`)}>
                  <div className="top">
                    <span className="n">{p.no} · Practice</span>
                    <span className="go2">→</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="chips">
                    {p.chips.map((c) => <span key={c}>{c}</span>)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="s alt">
          <div className="w">
            <SectionHead
              eb="Where We Fit"
              p="Most clients start with one practice and grow into others as the business matures. This is how our practices map to the stages a company goes through."
            >
              One partner from <em>entry to exit.</em>
            </SectionHead>
            <ol className="lc draw">
              {LIFECYCLE.map(([stage, line, slug], i) => {
                const p = getPractice(slug);
                return (
                  <li className="lc-i" key={stage}>
                    <a {...link(`practices/${slug}`)}>
                      <span className="gm">Stage {String(i + 1).padStart(2, "0")}</span>
                      <b>{stage}</b>
                      <span className="d">{line}</span>
                      <span className="pr">{p.short} →</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <CtaBand
          link={link}
          title="Not sure which practice"
          em="you need?"
          p="Tell us what is happening in your business. A senior partner will route your matter to the right practice and set out next steps in a single call."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
