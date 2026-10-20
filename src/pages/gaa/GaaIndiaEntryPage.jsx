import React, { useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import {
  GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, CtaBand, FaqList, Ring, useLink,
} from "./GaaShell";
import { ENTRY_ROUTES, ENTRY_ROADMAP, INVESTOR_ORIGINS, getPractice } from "../../data/gaaContent";

const INTENT = "FDI, FEMA & Cross-Border India Entry";

export default function GaaIndiaEntryPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "India Entry Desk | GAA Consulting");
  const [sel, setSel] = useState(ENTRY_ROUTES[0].id);
  const route = ENTRY_ROUTES.find((r) => r.id === sel);

  const onKey = (e) => {
    const i = ENTRY_ROUTES.findIndex((r) => r.id === sel);
    let n = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % ENTRY_ROUTES.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + ENTRY_ROUTES.length) % ENTRY_ROUTES.length;
    if (n !== null) {
      e.preventDefault();
      setSel(ENTRY_ROUTES[n].id);
      document.getElementById(`rt-${ENTRY_ROUTES[n].id}`)?.focus();
    }
  };

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="india-entry" />
      <GaaSubBar link={link} crumbs={[[null, "India Entry Desk"]]} />
      <main>
        <SubHero
          tag="India Entry Desk · Inbound FDI"
          lines={["Enter India", "with the right", "structure."]}
          em={[2]}
          sub="A single desk for foreign companies, funds and NRIs setting up in India. We choose the entry vehicle, incorporate it, bring your capital in under FEMA and keep the entity compliant every year after."
          actions={
            <>
              <a className="btn o" {...link("@contact", { intent: INTENT })}>
                Plan Your India Entry <span className="ar">→</span>
              </a>
              <a className="btn g" href="#routes" onClick={(e) => { e.preventDefault(); document.getElementById("routes")?.scrollIntoView({ behavior: "smooth" }); }}>
                Compare Entry Routes ↓
              </a>
            </>
          }
          aside={
            <>
              <div className="fh"><span>Entry Benchmarks</span><span>Inbound Desk</span></div>
              <div className="sgrid">
                <div className="st6"><div className="num">06</div><span className="lbl">Entry vehicles compared</span></div>
                <div className="st6"><div className="num">30<span className="sf">d</span></div><span className="lbl">FC-GPR filing window</span></div>
                <div className="st6"><div className="num">01</div><span className="lbl">Desk for set-up & run</span></div>
                <div className="st6"><div className="num">04</div><span className="lbl">Hubs incl. GIFT City</span></div>
              </div>
              <p className="fnote">Entry structuring, incorporation, FEMA reporting and annual compliance under one engagement.</p>
            </>
          }
          ticker={["Wholly Owned Subsidiary", "Joint Venture", "LLP", "Branch Office", "Liaison Office", "FC-GPR", "FLA Return", "GIFT City IFSC"]}
        />

        <section className="s" id="routes">
          <div className="w">
            <SectionHead eb="Entry Vehicles" p="Each vehicle has different approvals, permitted activities and ongoing compliance. Select one to compare. We confirm the right fit for your sector and plans on our first call.">
              Choose how you <em>enter India.</em>
            </SectionHead>
            <div className="rsel">
              <div className="rtabs" role="tablist" aria-label="Entry vehicles" aria-orientation="vertical" onKeyDown={onKey}>
                {ENTRY_ROUTES.map((r, i) => (
                  <button
                    key={r.id}
                    id={`rt-${r.id}`}
                    role="tab"
                    type="button"
                    aria-selected={sel === r.id}
                    aria-controls="rt-panel"
                    tabIndex={sel === r.id ? 0 : -1}
                    onClick={() => setSel(r.id)}
                  >
                    <i className="gm">{String(i + 1).padStart(2, "0")}</i>
                    <span>{r.name}</span>
                    <small className="gm">{r.tag}</small>
                  </button>
                ))}
              </div>
              <div className="rpanel" id="rt-panel" role="tabpanel" aria-labelledby={`rt-${route.id}`} key={route.id}>
                <span className="gm t">{route.tag}</span>
                <h3>{route.name}</h3>
                <p className="bf"><b>Best for:</b> {route.bestFor}</p>
                <dl>
                  {route.rows.map(([k, v]) => (
                    <div key={k}><dt className="gm">{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
                <a className="btn o" {...link("@contact", { intent: INTENT })}>
                  <span>Discuss a {route.name}</span><span className="ar">→</span>
                </a>
              </div>
            </div>
            <p className="note">Summary for orientation only. Sectoral caps, conditions and approval routes change from time to time and depend on your activity. We confirm them against the current FDI policy for every mandate.</p>
          </div>
        </section>

        <section className="s alt" id="roadmap">
          <div className="w ag">
            <div>
              <span className="gm eb">Set-up Roadmap</span>
              <h2 style={{ marginTop: "14px" }}>From board approval to <em>first invoice.</em></h2>
              <p className="ap">A typical timeline for a wholly owned subsidiary. Your dated plan depends on document readiness overseas, bank onboarding and sector approvals, and we share it in week one.</p>
              <div className="acts">
                <a className="btn" {...link(`practices/fdi-fema`)}>FDI & FEMA Practice <span className="ar">→</span></a>
              </div>
            </div>
            <ol className="tl draw">
              {ENTRY_ROADMAP.map(([when, t, d]) => (
                <li className="tl-i" key={t}>
                  <span className="gm">{when}</span>
                  <b>{t}</b>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="s" id="origins">
          <div className="w">
            <SectionHead eb="Who We Support" p="We act for inbound investors across regions, working in your time zone and coordinating with your global legal, tax and finance teams.">
              Inbound investors from <em>around the world.</em>
            </SectionHead>
            <div className="hubs">
              {INVESTOR_ORIGINS.map(([n, d], i) => (
                <div className="hub ori" key={n}>
                  <span className="tg">Inbound · {String(i + 1).padStart(2, "0")}</span>
                  <b>{n}</b>
                  <span className="ad">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s dk gift">
          <div className="w two">
            <div>
              <span className="gm eb">GIFT City IFSC</span>
              <h2 style={{ marginTop: "14px" }}>India's international <em>financial centre.</em></h2>
            </div>
            <div className="tx">
              <p>Our GIFT City desk supports funds, fintechs and global companies setting up in the International Financial Services Centre at Gandhinagar, regulated by IFSCA.</p>
              <p>We assist with entity set-up, IFSCA registrations, company law compliance and the FEMA aspects of moving capital between the IFSC and the domestic tariff area.</p>
              <div className="acts">
                <a className="btn o" {...link("@contact", { intent: INTENT })}>Talk to the GIFT City Desk <span className="ar">→</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="s alt" id="faq">
          <div className="w ag">
            <div>
              <span className="gm eb">India Entry FAQs</span>
              <h2 style={{ marginTop: "14px" }}>Before you <em>commit capital.</em></h2>
              <p className="ap">Common questions from overseas boards. For your sector and structure, book a call with our India Entry Desk.</p>
            </div>
            <FaqList items={getPractice("fdi-fema").faqs} />
          </div>
        </section>

        <CtaBand
          link={link}
          intent={INTENT}
          eb="Start your India entry"
          title="Get a dated India entry plan"
          em="in 48 hours."
          p="Share your sector, shareholding plan and target go-live date. A senior partner will come back with the recommended vehicle, timeline and fixed fee."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
