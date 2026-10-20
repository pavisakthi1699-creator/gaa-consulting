import React, { useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, SubHero, SectionHead, CtaBand, Ring, useLink } from "./GaaShell";
import { TEAM_MEMBERS } from "../../data/teamData";

const GAA = TEAM_MEMBERS.filter((m) => m.department === "GAA Consulting");
const GROUPS = [
  ["all", "Everyone"],
  ["senior", "Senior Associates"],
  ["specialist", "Legal"],
  ["trainee", "CS Trainees"],
];

export default function GaaPeoplePage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Our People | GAA Consulting");
  const [g, setG] = useState("all");
  const leaders = GAA.filter((m) => m.category === "leadership");
  const team = GAA.filter((m) => m.category !== "leadership");
  const shown = g === "all" ? team : team.filter((m) => m.category === g);
  const count = (c) => (c === "all" ? team.length : team.filter((m) => m.category === c).length);

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="people" />
      <GaaSubBar link={link} crumbs={[[null, "Our People"]]} />
      <main>
        <SubHero
          tag="Our People · GAA Consulting"
          lines={["Partner-led.", "Practitioner", "staffed."]}
          em={[2]}
          sub="Company Secretaries, corporate lawyers and finance professionals who handle your file personally. Every engagement is led by a senior partner and supported by a dedicated secretarial team."
          actions={
            <a className="btn o" {...link("@contact")}>
              Speak With Our Team <span className="ar">→</span>
            </a>
          }
          aside={
            <>
              <div className="fh"><span>Practice Team</span><span>GAA Consulting</span></div>
              <div className="sgrid">
                <div className="st6"><div className="num">{GAA.length}</div><span className="lbl">Professionals</span></div>
                <div className="st6"><div className="num">{String(leaders.length).padStart(2, "0")}</div><span className="lbl">Practice Leaders</span></div>
                <div className="st6"><div className="num">{String(count("senior")).padStart(2, "0")}</div><span className="lbl">Senior Associates</span></div>
                <div className="st6"><div className="num">{count("trainee")}</div><span className="lbl">CS Trainees</span></div>
              </div>
              <p className="fnote">Group-wide team across all three practices is on the GAA Group About page.</p>
            </>
          }
          ticker={["Practising Company Secretaries", "Corporate Lawyers", "Finance & Accounts", "Secretarial Associates", "CS Trainees"]}
        />

        <section className="s" id="leadership">
          <div className="w">
            <SectionHead eb="Practice Leadership" p="The partners and leads accountable for every GAA Consulting engagement.">
              Leaders on <em>every file.</em>
            </SectionHead>
            <div className="leads">
              {leaders.map((m) => (
                <article className="lead" key={m.id}>
                  <div className="ph"><img src={m.image} alt={m.name} loading="lazy" /></div>
                  <div className="bd">
                    <span className="gm t">{m.badge}</span>
                    <h3>{m.name}</h3>
                    <span className="rl">{m.role}</span>
                    <p>{m.bio}</p>
                    <div className="chips">{m.skills.map((s) => <span key={s}>{s}</span>)}</div>
                    <div className="lnk">
                      {m.email && <a href={`mailto:${m.email}`} className="gm">Email ↗</a>}
                      {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="gm">LinkedIn ↗</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="s alt" id="team">
          <div className="w">
            <SectionHead eb="The Practice Team" p="The associates and trainees who prepare, track and file your work under partner review.">
              The team behind <em>the filings.</em>
            </SectionHead>
            <div className="ftabs" role="group" aria-label="Filter team">
              {GROUPS.filter(([c]) => count(c) > 0).map(([c, l]) => (
                <button type="button" key={c} aria-pressed={g === c} onClick={() => setG(c)}>
                  {l} <sup>{count(c)}</sup>
                </button>
              ))}
            </div>
            <div className="ppls" aria-live="polite">
              {shown.map((m) => (
                <article className="ppl" key={m.id}>
                  <div className="ph"><img src={m.image} alt={m.name} loading="lazy" /></div>
                  <span className="gm t">{m.badge}</span>
                  <h3>{m.name}</h3>
                  <span className="rl">{m.role}</span>
                  {m.linkedin && (
                    <a className="li gm" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>in ↗</a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="s">
          <div className="w two">
            <div>
              <span className="gm eb">Careers</span>
              <h2 style={{ marginTop: "14px" }}>Build your practice <em>with us.</em></h2>
            </div>
            <div className="tx">
              <p>We train CS students and young professionals on live mandates from day one, with partner mentoring and exposure to M&amp;A, FEMA and governance work.</p>
              <div className="acts">
                <a className="btn" {...link("@hirings-first")}>Open Roles via Hirings First <span className="ar">→</span></a>
                <a className="btn g" {...link("@about")}>Meet the Group Team</a>
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          link={link}
          title="Work directly with"
          em="our partners."
          p="Book a confidential briefing. You will speak with a senior partner, not a sales team."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}
