import React, { useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, CtaBand, Ring, useLink } from "./GaaShell";
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

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="insights" />
      <GaaSubBar link={link} crumbs={[[null, "Insights"]]} />
      <main>
        <SubHero
          tag="Insights · Knowledge Hub"
          lines={["Know the", "deadline before", "it finds you."]}
          em={[2]}
          sub="Practical briefing notes from our partners and an annual compliance calendar for Indian companies, LLPs and foreign-owned entities. Written for founders, CFOs and boards, not just lawyers."
          actions={
            <>
              <a className="btn o" href="#calendar" onClick={(e) => { e.preventDefault(); document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" }); }}>
                Open Compliance Calendar <span className="ar">↓</span>
              </a>
              <a className="btn g" href="#briefings" onClick={(e) => { e.preventDefault(); document.getElementById("briefings")?.scrollIntoView({ behavior: "smooth" }); }}>
                Briefing Notes
              </a>
            </>
          }
          aside={
            <>
              <div className="fh"><span>Next Key Dates</span><span>FY Calendar</span></div>
              <ul className="kd">
                {upcoming().map((r) => (
                  <li key={r.form + r.when}>
                    <b>{r.when}</b>
                    <span><em className="gm">{r.form}</em>{r.desc}</span>
                  </li>
                ))}
              </ul>
              <p className="fnote">For companies with a 31 March year end. Event-based filings follow the trigger date.</p>
            </>
          }
          ticker={CALENDAR.map((r) => `${r.form} · ${r.when}`)}
        />

        <section className="s" id="calendar">
          <div className="w">
            <SectionHead eb="Compliance Calendar" p="The recurring company law and FEMA due dates most Indian entities face in a financial year. Filter by entity type.">
              Your annual <em>statutory calendar.</em>
            </SectionHead>
            <div className="ftabs" role="group" aria-label="Filter by entity type">
              {WHO.map((w) => (
                <button type="button" key={w} aria-pressed={who === w} onClick={() => setWho(w)}>
                  {w} <sup>{w === "All" ? CALENDAR.length : CALENDAR.filter((r) => r.who === w).length}</sup>
                </button>
              ))}
            </div>
            <div className="cal" role="table" aria-label="Compliance calendar">
              <div className="cal-h gm" role="row">
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
                  <span role="cell" className="wh gm">{r.who}</span>
                </div>
              ))}
            </div>
            <p className="note">General guide only. Due dates can be extended or changed by MCA or RBI notifications, and some depend on your AGM or allotment date. Our retainer clients receive a dated calendar for each entity.</p>
          </div>
        </section>

        <section className="s alt" id="briefings">
          <div className="w">
            <SectionHead eb="Briefing Notes" p="Short, practical notes from our partners on the questions clients raise most often. Request any note and we will send it to your inbox.">
              Partner briefings on <em>what changed.</em>
            </SectionHead>
            <div className="pgrid">
              {BRIEFINGS.map((b) => (
                <a className="pc5 bnote" key={b.title} {...link("@contact", { intent: b.title })}>
                  <div className="top">
                    <span className="n">{b.cat} · {b.read}</span>
                    <span className="go2">↗</span>
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                  <div className="chips"><span>Request this note</span></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          link={link}
          eb="Never miss a deadline"
          title="Hand us your"
          em="statutory calendar."
          p="Our annual retainer clients get a dated calendar for each entity, reminders ahead of every due date and a quarterly compliance report for the board."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
