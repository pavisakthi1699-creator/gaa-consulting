import React, { useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, Ledger, CtaBand, Ring, useLink } from "./GaaShell";
import { PRACTICES, LIFECYCLE, getPractice } from "../../data/gaaContent";

export default function GaaPracticesPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Our Services | GAA Consulting");
  const [stage, setStage] = useState(0);
  const cur = LIFECYCLE[stage];
  const curP = getPractice(cur[2]);

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="practices" />
      <GaaSubBar link={link} crumbs={[[null, "Services"]]} />
      <main>
        <SubHero
          variant="type"
          tag="Our Services"
          lines={["Six services.", "One partner for", "your whole company."]}
          em={[2]}
          sub="From the day you incorporate in India to the day you restructure or exit, each service is led by a senior partner and backed by Practising Company Secretaries and corporate lawyers."
          actions={
            <>
              <a className="btn o" {...link("@contact")}>Talk to a Partner <span className="ar">→</span></a>
              <a className="btn g" href="#all" onClick={(e) => { e.preventDefault(); document.getElementById("all")?.scrollIntoView({ behavior: "smooth" }); }}>See all services</a>
            </>
          }
          facts={[["150+", "M&A and diligence mandates"], ["500+", "Board calendars run each year"], ["4", "Offices across India"], ["4 hrs", "Partner response on urgent matters"]]}
        />

        <section className="s" id="all">
          <div className="w">
            <SectionHead p="Pick a service to see what is included, how we work and answers to common questions.">
              What we do <em>for your company.</em>
            </SectionHead>
            <Ledger
              link={link}
              numbered
              big
              items={PRACTICES.map((p) => ({
                key: p.slug,
                to: `practices/${p.slug}`,
                title: p.navName,
                desc: p.summary,
                extra: p.chips.join("  /  "),
              })).concat([
                {
                  key: "india",
                  to: "india-entry",
                  title: "Set Up in India",
                  desc: "Our India Entry Desk for foreign companies: choosing the vehicle, incorporation, bank and capital, and FEMA reporting.",
                  extra: "Subsidiary  /  Joint venture  /  LLP  /  Branch office",
                },
              ])}
            />
          </div>
        </section>

        <section className="s dk journey">
          <div className="w">
            <SectionHead p="Most clients start with one service and add others as the business grows. Select a stage to see where we help.">
              Where we help, <em>stage by stage.</em>
            </SectionHead>
            <div className="jr" role="tablist" aria-label="Company stages">
              <div className="jr-line" style={{ "--p": stage / (LIFECYCLE.length - 1) }}></div>
              {LIFECYCLE.map(([s], i) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={stage === i}
                  className={i <= stage ? "done" : undefined}
                  onClick={() => setStage(i)}
                >
                  <i></i>
                  <span>{s}</span>
                </button>
              ))}
            </div>
            <div className="jr-panel" role="tabpanel" key={stage}>
              <p className="jr-big">{cur[1]}.</p>
              <div>
                <p>{curP.summary}</p>
                <a className="btn o" {...link(`practices/${curP.slug}`)}>
                  {curP.navName} <span className="ar">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          link={link}
          title="Not sure which service"
          em="you need?"
          p="Tell us what is happening in your business. A senior partner will point you to the right service and set out next steps in one call."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
