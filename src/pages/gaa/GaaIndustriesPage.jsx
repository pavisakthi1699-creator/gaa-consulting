import React, { useRef } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, CtaBand, Ring, useLink } from "./GaaShell";
import { INDUSTRIES, getPractice } from "../../data/gaaContent";

export default function GaaIndustriesPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Industries | GAA Consulting");

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="industries" />
      <GaaSubBar link={link} crumbs={[[null, "Industries"]]} />
      <main>
        <SubHero
          tag="Industries · Sector Experience"
          lines={["Counsel that", "knows your", "industry."]}
          em={[2]}
          sub="Company law is the same for everyone. The way it hits your business is not. Our teams bring sector context to every mandate, from regulated lenders to capability centres and promoter-led manufacturers."
          actions={
            <a className="btn o" {...link("@contact")}>
              Talk to a Sector Partner <span className="ar">→</span>
            </a>
          }
          aside={
            <>
              <div className="fh"><span>Sectors Served</span><span>{String(INDUSTRIES.length).padStart(2, "0")} Industries</span></div>
              <ul className="pidx">
                {INDUSTRIES.slice(0, 6).map((ind, i) => (
                  <li key={ind.name}>
                    <a href={`#ind-${i}`} onClick={(e) => { e.preventDefault(); document.getElementById(`ind-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>
                      <i>{String(i + 1).padStart(2, "0")}</i>
                      <span>{ind.name}</span>
                      <b aria-hidden="true">↓</b>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          }
          ticker={INDUSTRIES.map((i) => i.name)}
        />

        <section className="s">
          <div className="w">
            <SectionHead eb="Sectors" p="A snapshot of the sectors we advise most often and the mandates that come up again and again in each.">
              Where our work <em>runs deepest.</em>
            </SectionHead>
            <div className="inds">
              {INDUSTRIES.map((ind, i) => {
                const pr = getPractice(ind.practice);
                return (
                  <a className="hub ind" id={`ind-${i}`} key={ind.name} {...link(`practices/${ind.practice}`)}>
                    <span className="tg">{String(i + 1).padStart(2, "0")} · {ind.tag}</span>
                    <b>{ind.name}</b>
                    <span className="ad">{ind.desc}</span>
                    <div className="chips">
                      {ind.mandates.map((m) => <span key={m}>{m}</span>)}
                    </div>
                    <span className="lk gm">Lead practice: {pr.short} →</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="s alt">
          <div className="w two">
            <div>
              <span className="gm eb">Sector Know-how</span>
              <h2 style={{ marginTop: "14px" }}>Why sector context <em>matters.</em></h2>
            </div>
            <div className="tx">
              <p>An NBFC's board calendar is shaped by RBI returns. A capability centre's compliance is driven by its parent's global close. A promoter group's restructuring is shaped by family succession.</p>
              <p>We staff each engagement with people who have seen your type of business before, so you spend less time explaining and more time deciding.</p>
              <div className="acts">
                <a className="btn" {...link("experience")}>See Representative Mandates <span className="ar">→</span></a>
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          link={link}
          title="Don't see your"
          em="sector here?"
          p="We regularly advise businesses outside these sectors. Share a short brief and a partner will tell you honestly whether we are the right fit."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
