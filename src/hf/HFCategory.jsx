// Hirings First talent and service pages (mockups: "Hirings First - <Category>.dc.html" and
// "HF Service - <Service>.dc.html"; one shared layout, as in the design).
import React, { useState } from "react";
import { Link } from "../site/router.jsx";
import { HFPage, ClosingBand, hfHref, catHref, svcHref, useSection } from "./HFLayout.jsx";
import { CATS, SVCS, getCategory, getService, FAQ_CAT, FAQ_SVC } from "./hfData.js";

const n2 = (i) => "0" + (i + 1);
const jump = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function HFCategory({ slug, kind = "cat" }) {
  const isCat = kind === "cat";
  const P = isCat ? getCategory(slug) : getService(slug);
  const sec = useSection(false);
  const [open, setOpen] = useState(0);

  const p = isCat
    ? {
        group: "Talent", groupTo: "hf-talent", label: "Talent by function", cta: "Request Profiles", cta2: "See roles",
        facts: [["Roles we place", "6 role types"], ["Screening", "3-step"], ["First profiles", "72 hours"]],
        gridLabel: "Roles we place", gridTitle: "From first hire to team lead.", grid: P.roleList,
        listLabel: "How we screen", listTitle: "Tested before", listSub: "you meet them.", list: P.screen,
        cardsLabel: "Available now", cardsTitle: "Sample profiles.",
        cards: P.profiles.map(([id, t, m, skills]) => ({ id, t, m, skills, tag: "Available" })),
        othersLabel: "Other talent categories", others: CATS.filter((c) => c.slug !== slug).map((c) => [c.name, catHref(c.slug)]),
        faqs: FAQ_CAT,
      }
    : {
        group: "Services", groupTo: null, label: "Hirings First service", cta: "Start Hiring", cta2: "What's included",
        facts: P.facts,
        gridLabel: "What's included", gridTitle: "End to end, handled.", grid: P.incl,
        listLabel: "How it works", listTitle: "Four steps.", listSub: "No guesswork.", list: P.steps.map(([t, d]) => [t, d, []]),
        cardsLabel: "Who it's for", cardsTitle: "Built for your stage.",
        cards: P.cards.map(([t, m, skills], i) => ({ id: n2(i), t, m, skills, tag: P.name.split(" ")[0] })),
        othersLabel: "Other services", others: SVCS.filter((s) => s.slug !== slug).map((s) => [s.name, svcHref(s.slug)]),
        faqs: FAQ_SVC,
      };

  return (
    <HFPage pageKey={`${kind}-${slug}`}>
      {/* Hero */}
      <section id="hf-top" className="hf-dhero">
        <nav aria-label="Breadcrumb" className="hf-crumbs">
          <Link to={hfHref("/")}>Hirings First</Link><span>/</span>
          {p.groupTo ? <a {...sec(p.groupTo)}>{p.group}</a> : <span>{p.group}</span>}<span>/</span>
          <span className="here" aria-current="page">{P.name}</span>
        </nav>
        <div className="hf-kicker" data-hfrv=""><span />{p.label}</div>
        <h1 data-hfrv="">{P.name}<span className="o">.</span></h1>
        <div className="hf-dhero-row">
          <div className="hf-dhero-l" data-hfrv="">
            <p>{P.hero}</p>
            <div className="hf-btns">
              <a {...sec("hf-contact")} className="hf-btn dark xl">{p.cta} <span aria-hidden="true">→</span></a>
              <a href="#hf-detail" onClick={jump("hf-detail")} className="hf-btn line xl">{p.cta2}</a>
            </div>
          </div>
          <div className="hf-facts" data-hfrv="">
            {p.facts.map(([k, v]) => (
              <div key={k}><span className="hf-mono">{k}</span><b>{v}</b></div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles / what's included */}
      <section id="hf-detail" className="hf-grid-sec">
        <div className="hf-grid-in">
          <div className="hf-head" data-hfrv="">
            <div>
              <span className="hf-eyebrow">{p.gridLabel}</span>
              <h2>{p.gridTitle}</h2>
            </div>
          </div>
          <div className="hf-gcards">
            {p.grid.map(([t, d], i) => (
              <div key={t} className="hf-gcard" data-hfrv="">
                <span className="n">{n2(i)}</span>
                <div><b>{t}</b><span>{d}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we screen / how it works */}
      <section className="hf-list-sec">
        <div className="hf-list-l" data-hfrv="">
          <span className="hf-eyebrow">{p.listLabel}</span>
          <h2>{p.listTitle}<br /><span className="g">{p.listSub}</span></h2>
        </div>
        <ol className="hf-list">
          {p.list.map(([t, d, tags], i) => (
            <li key={t} data-hfrv="">
              <span className="n">{n2(i)}</span>
              <div>
                <b>{t}</b>
                <span>{d}</span>
                <div className="hf-tags lg">{(tags || []).map((k) => <span key={k}>{k}</span>)}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Sample profiles / who it's for */}
      <section className="hf-dark-sec">
        <div className="hf-dark-in">
          <div className="hf-head" data-hfrv="">
            <div>
              <span className="hf-eyebrow o">{p.cardsLabel}</span>
              <h2>{p.cardsTitle}</h2>
            </div>
            <a {...sec("hf-contact")} className="hf-btn orange">{p.cta} <span aria-hidden="true">→</span></a>
          </div>
          <div className="hf-scards">
            {p.cards.map((c) => (
              <div key={c.t} className="hf-scard" data-hfrv="">
                <div className="hf-dcard-h">
                  <span className="id">{c.id}</span>
                  {isCat ? <span className="hf-avail"><i />Available</span> : <span className="hf-mono tag">{c.tag}</span>}
                </div>
                <div className="hf-dcard-r"><b>{c.t}</b><span>{c.m}</span></div>
                <div className="hf-tags lg">{c.skills.map((k) => <span key={k}>{k}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="hf-faq-sec">
        <div className="hf-list-l" data-hfrv="">
          <span className="hf-eyebrow">FAQs</span>
          <h2>Good<br />questions.</h2>
        </div>
        <div className="hf-faqs">
          {p.faqs.map(([q, a], i) => (
            <div key={q} className={open === i ? "open" : ""}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{q}</span>
                <i aria-hidden="true">+</i>
              </button>
              <div className="a" hidden={open !== i}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Other categories / services */}
      <section className="hf-others">
        <div className="hf-others-in">
          <span className="hf-mono">{p.othersLabel}</span>
          <div className="hf-others-grid">
            {p.others.map(([name, to]) => (
              <Link key={to} to={to} className="hf-other">
                <span>{name}</span>
                <span className="o" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingBand />
    </HFPage>
  );
}
