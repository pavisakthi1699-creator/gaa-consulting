// Hirings First talent category page (mockups: "Hirings First - <Category>.dc.html")
import React from "react";
import { Link } from "../site/router.jsx";
import { HFPage, ClosingBand, ContactSection, hfHref, catHref, useSection } from "./HFLayout.jsx";
import { CATS, getCategory } from "./hfData.js";

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function HFCategory({ slug }) {
  const c = getCategory(slug);
  const n = "0" + (CATS.indexOf(c) + 1);
  const others = CATS.filter((x) => x.slug !== slug);
  const sec = useSection(false);

  return (
    <HFPage pageKey={slug}>
      <section id="hf-top" className="hf-cat-hero">
        <nav aria-label="Breadcrumb" className="hf-crumbs">
          <Link to={hfHref("/")}>Hirings First</Link><span>/</span>
          <a {...sec("hf-talent")}>Talent</a><span>/</span>
          <span className="here" aria-current="page">{c.name}</span>
        </nav>
        <span className="hf-eyebrow">Talent category · {n}</span>
        <h1>{c.name}<span className="o">.</span></h1>
        <p>{c.hero}</p>
        <div className="hf-btns">
          <a href="#hf-contact" onClick={scrollTo("hf-contact")} className="hf-btn dark lg">Request Profiles</a>
          <a href="#hf-roles" onClick={scrollTo("hf-roles")} className="hf-btn soft lg">See roles</a>
        </div>
      </section>

      <section id="hf-roles" className="hf-roles">
        <div className="hf-roles-in">
          <div className="hf-head">
            <span className="hf-eyebrow">Roles we place</span>
            <h2 className="hf-h2">From first hire to team lead.</h2>
          </div>
          <div className="hf-roles-grid">
            {c.roleList.map(([t, lvl], i) => (
              <div key={t} className="hf-role">
                <span className="n">0{i + 1}</span>
                <span className="t">{t}</span>
                <span className="l">{lvl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hf-screen">
        <div className="hf-screen-l">
          <span className="hf-eyebrow">How we screen</span>
          <h2 className="hf-h2">Tested before<br /><span className="g">you meet them.</span></h2>
        </div>
        <div className="hf-screen-r">
          {c.screen.map(([t, d, tags]) => (
            <div key={t} className="hf-scr">
              <div><b>{t}</b><span>{d}</span></div>
              <div className="hf-chips white">{tags.map((k) => <span key={k}>{k}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="hf-samples">
        <div className="hf-samples-head">
          <div>
            <span className="hf-eyebrow">Available now</span>
            <h2 className="hf-h2 sm">Sample profiles</h2>
          </div>
          <a href="#hf-contact" onClick={scrollTo("hf-contact")} className="hf-ul">Request profiles →</a>
        </div>
        <div className="hf-samples-grid">
          {c.profiles.map(([role, meta, skills]) => (
            <div key={role} className="hf-prof">
              <span className="hf-avail"><i />Available</span>
              <div className="hf-prof-id"><b>{role}</b><span>{meta}</span></div>
              <div className="hf-chips">{skills.map((k) => <span key={k}>{k}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="hf-others">
        <div className="hf-others-in">
          <span className="hf-mono">Other talent categories</span>
          <div className="hf-others-grid">
            {others.map((o) => (
              <Link key={o.slug} to={catHref(o.slug)} className="hf-other">
                <span>{o.name}</span>
                <span className="o" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingBand />
      <ContactSection />
    </HFPage>
  );
}
