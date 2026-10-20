import React, { useRef } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, Split, CtaBand, FaqList, Ring, useLink } from "./GaaShell";
import { ENGAGEMENT_MODELS, ENGAGEMENT_STEPS, GENERAL_FAQS } from "../../data/gaaContent";

export default function GaaHowWeWorkPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "How We Work | GAA Consulting");

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="how-we-work" />
      <GaaSubBar link={link} crumbs={[[null, "How We Work"]]} />
      <main>
        <SubHero
          variant="type"
          tag="How We Work"
          lines={["Clear scope.", "Fixed fees.", "No surprises."]}
          em={[1]}
          sub="Fixed fees for defined work and yearly retainers for ongoing compliance. You always know who is working on your file and what it will cost."
          actions={<a className="btn o" {...link("@contact")}>Request a proposal <span className="ar">→</span></a>}
          facts={[["48 hrs", "Written proposal"], ["4 hrs", "Response on urgent matters"], ["1", "Senior partner on every file"], ["NDA", "Signed before we see documents"]]}
        />

        <section className="s" id="models">
          <div className="w">
            <SectionHead p="Many clients combine a yearly retainer with fixed fees for one-off transactions.">
              Three ways to <em>work with us.</em>
            </SectionHead>
            <div className="tiers">
              {ENGAGEMENT_MODELS.map((m) => (
                <div className={`tier${m.hl ? " pop" : ""}`} key={m.name}>
                  <span className="t">{m.t}</span>
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                  <ul>{m.points.map((x) => <li key={x}>{x}</li>)}</ul>
                  <a className={m.hl ? "btn o" : "btn g"} {...link("@contact", { intent: m.name })}>
                    Ask about this <span className="ar">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s alt" id="steps">
          <div className="w">
            <SectionHead p="What happens between your first message and the final handover.">
              From first message <em>to handover.</em>
            </SectionHead>
            <ol className="stair draw">
              {ENGAGEMENT_STEPS.map(([t, d], i) => (
                <li key={t} style={{ "--i": i }}>
                  <span className="sn">{i + 1}</span>
                  <div>
                    <b>{t}</b>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Split
          id="faq"
          title={<>Fees, teams and <em>confidentiality.</em></>}
          p="Service-specific questions are answered on each service page."
          actions={<a className="btn" {...link("practices")}>View services <span className="ar">→</span></a>}
        >
          <FaqList items={GENERAL_FAQS} />
        </Split>

        <CtaBand link={link} title="Get a written scope" em="and fixed fee." p="Share a short brief. We will reply within 48 hours with the team, timeline and fee for your matter." />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
