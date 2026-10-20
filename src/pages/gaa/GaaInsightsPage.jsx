import React, { useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, Ledger, CtaBand, Ring, useLink } from "./GaaShell";
import { CALENDAR, BRIEFINGS } from "../../data/gaaContent";

const WHO = ["All", "Companies", "LLPs", "FEMA"];
const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

// Next fixed-date filings from today (event-based items such as "AGM + 30 days" are skipped)
function upcoming(n = 4) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return CALENDAR.filter((r) => /^\d{1,2} [A-Z][a-z]{2}$/.test(r.when))
    .map((r) => {
      const [d, m] = r.when.split(" ");
      let dt = new Date(now.getFullYear(), MON[m], +d);
      if (dt < now) dt = new Date(now.getFullYear() + 1, MON[m], +d);
      return { ...r, dt };
    })
    .sort((a, b) => a.dt - b.dt)
    .slice(0, n);
}

export default function GaaInsightsPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Insights & Compliance Calendar | GAA Consulting");
  const [who, setWho] = useState("All");
  const rows = who === "All" ? CALENDAR : CALENDAR.filter((r) => r.who === who);
  const [feat, ...rest] = BRIEFINGS;

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="insights" />
      <GaaSubBar link={link} crumbs={[[null, "Insights"]]} />
      <main>
        <SubHero
          variant="type"
          tag="Insights"
          lines={["Know the deadline", "before it", "finds you."]}
          em={[2]}
          sub="Practical notes from our partners and a yearly compliance calendar for Indian companies, LLPs and foreign-owned businesses. Written for founders, CFOs and boards."
          actions={
            <a className="btn o" href="#calendar" onClick={(e) => { e.preventDefault(); document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" }); }}>
              Open the calendar <span className="ar">↓</span>
            </a>
          }
          facts={upcoming(4).map((r) => [r.when, `${r.form}, ${r.who === "FEMA" ? "FEMA" : r.who}`])}
        />

        <section className="s" id="calendar">
          <div className="w">
            <SectionHead p="Recurring company law and FEMA due dates for a 31 March year end. Filter by type of entity.">
              Your yearly <em>compliance calendar.</em>
            </SectionHead>
            <div className="ftabs" role="group" aria-label="Filter by entity type">
              {WHO.map((w) => (
                <button type="button" key={w} aria-pressed={who === w} onClick={() => setWho(w)}>
                  {w}
                </button>
              ))}
            </div>
            <div className="cal" role="table" aria-label="Compliance calendar">
              <div className="cal-h" role="row">
                <span role="columnheader">Due</span>
                <span role="columnheader">Filing</span>
                <span role="columnheader">What it covers</span>
                <span role="columnheader">Applies to</span>
              </div>
              {rows.map((r) => (
                <div className="cal-r" role="row" key={r.form + r.when}>
                  <b role="cell">{r.when}</b>
                  <span role="cell" className="fm">{r.form}</span>
                  <span role="cell" className="ds">{r.desc}</span>
                  <span role="cell" className="wh">{r.who}</span>
                </div>
              ))}
            </div>
            <p className="gnote">A general guide. Due dates can be extended or changed by MCA or RBI notifications, and some depend on your AGM or allotment date. Retainer clients get a dated calendar for each company.</p>
          </div>
        </section>

        <section className="s alt" id="briefings">
          <div className="w">
            <SectionHead p="Short notes on the questions clients raise most often. Ask for any note and we will email it to you.">
              Notes from <em>our partners.</em>
            </SectionHead>
            <div className="brf">
              <a className="brf-feat" {...link("@contact", { intent: feat.title })}>
                <span className="t">{feat.cat}, {feat.read} read</span>
                <b>{feat.title}</b>
                <p>{feat.desc}</p>
                <span className="tlink">Request this note <span aria-hidden="true">→</span></span>
              </a>
              <Ledger
                link={link}
                items={rest.map((b) => ({
                  key: b.title,
                  to: "@contact",
                  linkExtra: { intent: b.title },
                  title: b.title,
                  desc: b.desc,
                  meta: `${b.cat}, ${b.read}`,
                }))}
              />
            </div>
          </div>
        </section>

        <CtaBand
          link={link}
          title="Hand us your"
          em="compliance calendar."
          p="Retainer clients get a dated calendar for each company, reminders before every due date and a quarterly report for the board."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
