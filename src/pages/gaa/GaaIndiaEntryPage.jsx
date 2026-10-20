import React, { useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, Split, CtaBand, FaqList, Ring, useLink } from "./GaaShell";
import { ENTRY_ROUTES, ENTRY_ROADMAP, INVESTOR_ORIGINS, getPractice } from "../../data/gaaContent";

const INTENT = "FDI, FEMA & Cross-Border India Entry";

export default function GaaIndiaEntryPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Set Up in India | GAA Consulting");
  const [sel, setSel] = useState(0);
  const route = ENTRY_ROUTES[sel];

  const onKey = (e) => {
    let n = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (sel + 1) % ENTRY_ROUTES.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (sel - 1 + ENTRY_ROUTES.length) % ENTRY_ROUTES.length;
    if (n !== null) {
      e.preventDefault();
      setSel(n);
      document.getElementById(`rt-${ENTRY_ROUTES[n].id}`)?.focus();
    }
  };

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="india-entry" />
      <GaaSubBar link={link} crumbs={[["practices", "Services"], [null, "Set Up in India"]]} />
      <main>
        <SubHero
          tag="India Entry Desk"
          lines={["Set up in India", "with the right", "structure."]}
          em={[2]}
          sub="One desk for foreign companies, funds and NRIs. We choose the entry vehicle, incorporate it, bring your capital in under FEMA and keep the company compliant every year after."
          actions={
            <>
              <a className="btn o" {...link("@contact", { intent: INTENT })}>Plan your India entry <span className="ar">→</span></a>
              <a className="btn g" href="#routes" onClick={(e) => { e.preventDefault(); document.getElementById("routes")?.scrollIntoView({ behavior: "smooth" }); }}>Compare options</a>
            </>
          }
          aside={
            <>
              <div className="fh"><span>India entry in numbers</span><span>Inbound desk</span></div>
              <div className="sgrid">
                <div className="st6"><div className="num">6</div><span className="lbl">Ways to enter India</span></div>
                <div className="st6"><div className="num">30<span className="sf">d</span></div><span className="lbl">FC-GPR filing window</span></div>
                <div className="st6"><div className="num">1</div><span className="lbl">Team for set-up and upkeep</span></div>
                <div className="st6"><div className="num">4</div><span className="lbl">Offices incl. GIFT City</span></div>
              </div>
              <p className="fnote">Structuring, incorporation, FEMA reporting and yearly compliance in one engagement.</p>
            </>
          }
          ticker={["Wholly Owned Subsidiary", "Joint Venture", "LLP", "Branch Office", "Liaison Office", "FC-GPR", "FLA Return", "GIFT City IFSC"]}
        />

        <section className="s" id="routes">
          <div className="w">
            <SectionHead p="Each option has different approvals, permitted activities and yearly compliance. Select one to compare.">
              Six ways to <em>enter India.</em>
            </SectionHead>
            <div className="rsel">
              <div className="rtabs" role="tablist" aria-label="Entry options" aria-orientation="vertical" onKeyDown={onKey}>
                {ENTRY_ROUTES.map((r, i) => (
                  <button
                    key={r.id}
                    id={`rt-${r.id}`}
                    role="tab"
                    type="button"
                    aria-selected={sel === i}
                    aria-controls="rt-panel"
                    tabIndex={sel === i ? 0 : -1}
                    onClick={() => setSel(i)}
                    onMouseEnter={() => setSel(i)}
                  >
                    <span>{r.name}</span>
                    <small>{r.tag}</small>
                  </button>
                ))}
              </div>
              <div className="rpanel" id="rt-panel" role="tabpanel" aria-labelledby={`rt-${route.id}`} key={route.id}>
                <span className="t">{route.tag}</span>
                <h3>{route.name}</h3>
                <p className="bf">Best for {route.bestFor.charAt(0).toLowerCase() + route.bestFor.slice(1)}</p>
                <dl>
                  {route.rows.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
                <a className="btn o" {...link("@contact", { intent: INTENT })}>
                  Discuss this option <span className="ar">→</span>
                </a>
              </div>
            </div>
            <p className="gnote">A summary for orientation only. Sector caps, conditions and approval routes change from time to time and depend on your activity. We confirm them against the current FDI policy for every client.</p>
          </div>
        </section>

        <Split
          id="roadmap"
          alt
          title={<>From board approval to <em>first invoice.</em></>}
          p="A typical timeline for a wholly owned subsidiary. Your dated plan depends on overseas documents, bank onboarding and sector approvals, and we share it in week one."
          actions={<a className="btn" {...link("practices/fdi-fema")}>FDI & FEMA Advisory <span className="ar">→</span></a>}
        >
          <ol className="tl draw">
            {ENTRY_ROADMAP.map(([when, t, d]) => (
              <li className="tl-i" key={t}>
                <span className="tl-w">{when}</span>
                <b>{t}</b>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </Split>

        <section className="s" id="origins">
          <div className="w">
            <SectionHead p="We work in your time zone and alongside your global legal, tax and finance teams.">
              Investors we <em>support.</em>
            </SectionHead>
            <ul className="rgn">
              {INVESTOR_ORIGINS.map(([n, d]) => (
                <li key={n}>
                  <b>{n}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="s dk gift">
          <div className="w gift-g">
            <h2>India's international <em>financial centre.</em></h2>
            <div className="tx">
              <p>Our GIFT City desk supports funds, fintechs and global companies setting up in the International Financial Services Centre at Gandhinagar, regulated by IFSCA.</p>
              <p>We handle entity set-up, IFSCA registrations, company law compliance and the FEMA side of moving capital between the IFSC and the rest of India.</p>
              <div className="acts">
                <a className="btn o" {...link("@contact", { intent: INTENT })}>Talk to the GIFT City desk <span className="ar">→</span></a>
              </div>
            </div>
          </div>
        </section>

        <Split id="faq" alt title={<>Before you <em>commit capital.</em></>} p="Common questions from overseas boards. For your sector and structure, book a call with our India Entry Desk.">
          <FaqList items={getPractice("fdi-fema").faqs} />
        </Split>

        <CtaBand
          link={link}
          intent={INTENT}
          title="Get a dated India entry plan"
          em="in 48 hours."
          p="Share your sector, shareholding plan and target go-live date. A senior partner will come back with the recommended option, timeline and fixed fee."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
