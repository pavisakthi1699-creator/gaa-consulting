import React, { useRef } from "react";
import useGaaMotion from "./useGaaMotion";
import {
  GaaHeader, GaaSubBar, GaaFooter, SubHero, GlanceCard, SectionHead, CtaBand, FaqList, Ring, useLink,
} from "./GaaShell";
import { ENGAGEMENT_MODELS, ENGAGEMENT_STEPS, GENERAL_FAQS } from "../../data/gaaContent";

export default function GaaHowWeWorkPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "How We Work | GAA Consulting");

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} />
      <GaaSubBar link={link} crumbs={[[null, "How We Work"]]} />
      <main>
        <SubHero
          tag="Engagement Model · Fees · Confidentiality"
          lines={["Clear scope.", "Fixed fees.", "No surprises."]}
          em={[1]}
          sub="We price work the way clients budget for it: fixed fees for defined mandates and annual retainers for ongoing compliance. You always know who is working on your file and what it will cost."
          actions={
            <a className="btn o" {...link("@contact")}>
              Request a Proposal <span className="ar">→</span>
            </a>
          }
          aside={
            <GlanceCard
              head="Our Commitments"
              rows={[
                ["Proposal", "Written scope and fee within 48 hours"],
                ["Response", "Under 4 hours on urgent matters"],
                ["Leadership", "Senior partner on every file"],
                ["Confidentiality", "Mutual NDA before document review"],
              ]}
            />
          }
          ticker={["Fixed-Fee Mandates", "Annual Retainers", "Partner Advisory", "Mutual NDA", "48-Hour Proposals"]}
        />

        <section className="s" id="models">
          <div className="w">
            <SectionHead eb="Engagement Models" p="Choose the model that matches the work. Many clients combine an annual retainer with fixed-fee mandates for transactions.">
              Three ways to <em>work with us.</em>
            </SectionHead>
            <div className="cmp">
              {ENGAGEMENT_MODELS.map((m) => (
                <div className={`cc${m.hl ? " hl" : ""}`} key={m.name}>
                  <span className="t">{m.t}</span>
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                  <ul>{m.points.map((x) => <li key={x}><b>✓</b>{x}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s alt" id="steps">
          <div className="w">
            <SectionHead eb="Engagement Process" p="What happens between your first message and the final handover.">
              Five steps, <em>one partner.</em>
            </SectionHead>
            <ol className="steps s5 draw">
              {ENGAGEMENT_STEPS.map(([t, d], i) => (
                <li className="step" key={t}>
                  <span className="no">{String(i + 1).padStart(2, "0")}</span>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="s" id="faq">
          <div className="w ag">
            <div>
              <span className="gm eb">General FAQs</span>
              <h2 style={{ marginTop: "14px" }}>Fees, teams and <em>confidentiality.</em></h2>
              <p className="ap">Answers to what clients usually ask before they engage us. Practice-specific FAQs are on each practice page.</p>
              <div className="acts">
                <a className="btn" {...link("practices")}>Browse Practices <span className="ar">→</span></a>
              </div>
            </div>
            <FaqList items={GENERAL_FAQS} />
          </div>
        </section>

        <CtaBand
          link={link}
          title="Get a written scope"
          em="and fixed fee."
          p="Share a short brief. We will reply within 48 hours with the team, timeline and fee for your matter."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
