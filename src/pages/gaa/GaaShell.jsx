import React, { useEffect, useRef, useState } from "react";
import { GAA_NAV, GA_NAV, GAA_FOOTER_GROUPS } from "../../data/gaaContent";
import { GAA_SERVICES } from "../../data/gaaServices";
import { gaaPath, go } from "../../site/gaaPaths.js";
import { GroupMenu, GroupLinks } from "../../site/GroupMenu.jsx";
import { SITES, href, resolve } from "../../site/sites.js";
import { usePath } from "../../site/router.jsx";
import { GAA_CONTACT } from "../../site/gaaContact.js";
import "./GaaFooter.css";

// Services menu uses the five services from the GAA Consulting Services design
const MENU = GAA_SERVICES.map((s) => ({ slug: s.slug, navName: s.name, navDesc: s.ideal }));

/* Build an href + click handler for internal links.
   `to` is a GAA sub path ("practices", "practices/fdi-fema", "" for GAA home),
   optionally with an in-page anchor ("insights#calendar"),
   or a group page prefixed with "@" ("@home", "@contact", "@about"). */
// eslint-disable-next-line no-unused-vars
export function useLink(onNavigate) {
  return (to, extra = {}) => {
    const href = gaaPath(to);
    return {
      href,
      onClick: (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        if (extra.before) extra.before();
        go(href);
      },
    };
  };
}

/* ------------------------------------------------------------------ */
/* Header: familiar menu labels + Services mega menu + mobile menu     */
/* ------------------------------------------------------------------ */
export function GaaHeader({ link, active = "" }) {
  // GAA Consulting (group home) and GAA Associates share this header with their own menus
  const site = resolve(usePath()).site === "ga" ? "ga" : "gaa";
  const NAV = site === "ga" ? GA_NAV : GAA_NAV;
  const [dd, setDd] = useState(false);
  const [mob, setMob] = useState(false);
  const ddRef = useRef(null);
  const closeT = useRef(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDd(false);
        setMob(false);
      }
    };
    const onDown = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDd(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("gaa-lock", mob);
    return () => document.documentElement.classList.remove("gaa-lock");
  }, [mob]);

  const open = () => {
    clearTimeout(closeT.current);
    setDd(true);
  };
  const close = () => {
    closeT.current = setTimeout(() => setDd(false), 140);
  };
  const isCur = (to) =>
    to === active || (to === "practices" && (active === "practices" || active === "india-entry"));
  const shut = { before: () => { setDd(false); setMob(false); } };

  return (
    <>
      <div id="pg"></div>
      <header id="hdr" className={`gh${dd ? " dd-on" : ""}`}>
        <div className="hd">
          <a {...link("", shut)} aria-label={`${SITES[site].name} home`} className="lg">
            <img src={site === "ga" ? SITES.ga.logo : "/gaa-consulting-logo.png"} alt={SITES[site].name} />
          </a>
          <nav aria-label="Main" className="gnav">
            {NAV.map(([to, label]) =>
              to === "practices" ? (
                <div className="ddw" key={to} ref={ddRef} onMouseEnter={open} onMouseLeave={close}>
                  <a
                    className="ddb"
                    {...link("practices", shut)}
                    aria-expanded={dd}
                    aria-controls="gaa-services-menu"
                    aria-current={isCur(to) ? "page" : undefined}
                    onFocus={open}
                  >
                    {label}
                    <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
                  </a>
                  <div className="mega" id="gaa-services-menu" data-open={dd}>
                    <div className="mega-in">
                      <ul className="mega-list">
                        {MENU.map((p) => (
                          <li key={p.slug}>
                            <a {...link(`practices/${p.slug}`, shut)}>
                              <b>{p.navName}</b>
                              <span>{p.navDesc}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      <div className="mega-side">
                        <a className="mega-feat" {...link("india-entry", shut)}>
                          <span className="k">For foreign companies</span>
                          <b>Set up your business in India</b>
                          <span className="d">Subsidiary, JV, LLP or branch office, incorporated and FEMA compliant.</span>
                          <i aria-hidden="true">↗</i>
                        </a>
                        <a className="mega-all" {...link("practices", shut)}>
                          View all services
                        </a>
                        <a className="mega-all" {...link("how-we-work", shut)}>
                          How we work and our fees
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a key={label} {...link(to, shut)} aria-current={isCur(to) ? "page" : undefined}>
                  {label}
                </a>
              )
            )}
            <GroupMenu current={site} btnClass="ddb" />
          </nav>
          <a className="book" {...link("@contact", shut)}>
            Book a Consultation
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={mob}
            aria-controls="gaa-mobile-menu"
            aria-label={mob ? "Close menu" : "Open menu"}
            onClick={() => setMob((v) => !v)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div className="mnav" id="gaa-mobile-menu" data-open={mob} aria-hidden={!mob}>
        <div className="mnav-in">
          <a {...link("gaa", shut)} tabIndex={mob ? 0 : -1}>Home</a>
          <a {...link("@about", shut)} tabIndex={mob ? 0 : -1}>About Us</a>
          {site === "ga" && (
            <details>
              <summary tabIndex={mob ? 0 : -1}>Services</summary>
              <div>
                {MENU.map((p) => (
                  <a key={p.slug} {...link(`practices/${p.slug}`, shut)} tabIndex={mob ? 0 : -1}>
                    {p.navName}
                  </a>
                ))}
                <a {...link("practices", shut)} tabIndex={mob ? 0 : -1}>All services</a>
              </div>
            </details>
          )}
          <a {...link("@contact", shut)} tabIndex={mob ? 0 : -1}>Contact Us</a>
          <GroupLinks current={site} onPick={() => setMob(false)} tabIndex={mob ? 0 : -1} />
          <a className="btn o" {...link("@contact", shut)} tabIndex={mob ? 0 : -1}>
            Book a Consultation
          </a>
        </div>
      </div>
    </>
  );
}

/* Strip under the header: back to group + breadcrumb */
export function GaaSubBar({ link, crumbs = [] }) {
  return (
    <div className="sbar">
      <div className="w">
        <a className="back" {...link("@home")}>
          <span>←</span>
          <span>Back to home</span>
        </a>
        <nav className="crumbs" aria-label="Breadcrumb">
          <a {...link("")}>Home</a>
          {crumbs.map(([to, label], k) => (
            <React.Fragment key={label}>
              <i aria-hidden="true">/</i>
              {k === crumbs.length - 1 || to == null ? (
                <span aria-current="page">{label}</span>
              ) : (
                <a {...link(to)}>{label}</a>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

// Footer from the "GAA Home v2" design, on every GAA Consulting page
export function GaaFooter({ link }) {
  const own = useLink();
  const L = link || own;
  const site = resolve(usePath()).site === "ga" ? "ga" : "gaa";
  const cos = [
    ["ga", "GAA Associates", "Corporate advisory", href("ga", "/")],
    ["ff", "Filings First", "Accounting, tax & compliance", href("ff", "/")],
    ["hf", "Hirings First", "Talent & workforce", href("hf", "/")],
  ];
  return (
    <footer className="gft">
      <div className="gft-w">
        <div className="gft-top">
          <div className="gft-b">
            <span className="gft-lg"><img src={site === "ga" ? SITES.ga.logo : "/gaa-consulting-logo.png"} alt={SITES[site].name} /></span>
            <p>
              {site === "ga"
                ? "Corporate law, company secretarial, transactional and regulatory advisory for businesses, financial institutions, NBFCs and promoters."
                : "The home of the GAA Group: GAA Associates for corporate advisory, Filings First for compliance and Hirings First for talent."}
            </p>
            <a className="gft-pill" {...L("@contact")}>Book a consultation</a>
          </div>
          <nav className="gft-col" aria-label="Group companies">
            <span className="gft-k">Group companies</span>
            {cos.map(([k, name, line, to]) => (
              <a key={k} className="gft-co" href={to} onClick={(e) => { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); go(to); }}>
                <i><img src={SITES[k].logo} alt="" /></i>
                <span>
                  <b>{name}</b>
                  <small>{line}</small>
                </span>
                <em aria-hidden="true">→</em>
              </a>
            ))}
          </nav>
          <nav className="gft-col" aria-label="Explore">
            <span className="gft-k">Explore</span>
            <a {...L("gaa")}>GAA Consulting</a>
            <a {...L("#gh-why")}>Why GAA</a>
            <a {...L("#gh-lifecycle")}>How we work together</a>
            <a {...L("@about")}>About us</a>
            <a {...L("careers")}>Careers &amp; CS Training</a>
            <a {...L("@contact")}>Contact</a>
          </nav>
          <div className="gft-col">
            <span className="gft-k">Contact</span>
            <span>{GAA_CONTACT.office}</span>
            <a href={`mailto:${GAA_CONTACT.email}`}>{GAA_CONTACT.email}</a>
            <span>{GAA_CONTACT.phone}</span>
            <span style={{ color: "#8a847d" }}>{GAA_CONTACT.hours}</span>
          </div>
        </div>
        <div className="gft-bot">
          <span>{site === "ga" ? "© 2026 GAA Associates · A GAA Group company. All rights reserved." : "© 2026 GAA Consulting. All rights reserved."}</span>
          <div>
            <a {...L("disclaimer")}>Privacy policy</a>
            <a {...L("disclaimer")}>Terms of use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Hero headline with the same line-mask + hover-skew words as the home hero. */
export function HeroTitle({ lines, em = [] }) {
  return (
    <h1 aria-label={lines.join(" ")}>
      {lines.map((ln, i) => {
        const words = ln.split(" ").map((w, k) => (
          <React.Fragment key={k}>
            {k > 0 && " "}
            <span className="hw">{w}</span>
          </React.Fragment>
        ));
        return (
          <span className="ln" key={i} aria-hidden="true">
            <span>{em.includes(i) ? <em>{words}</em> : words}</span>
          </span>
        );
      })}
    </h1>
  );
}

function Ticker({ items }) {
  return (
    <div className="tk" aria-hidden="true">
      <div>
        {[0, 1, 2, 3].flatMap((r) =>
          items.map((t, k) => (
            <React.Fragment key={`${r}-${k}`}>
              <span>{t}</span>
              <span className="s">✦</span>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}

/* Inner-page hero.
   variant "stack": headline left, stacked card right (same device as the GAA home hero).
   variant "type":  oversized headline across the page, intro + actions in a lower band,
                    facts in an open row (no card). */
export function SubHero({ tag, lines, em, sub, actions, aside, facts, ticker, variant = "stack" }) {
  if (variant === "type") {
    return (
      <section className="hero6 hsub htype" id="top">
        <div className="w">
          <span className="tag6 e3" style={{ "--t": ".05s" }}>{tag}</span>
          <HeroTitle lines={lines} em={em} />
          <div className="ht-low e3" style={{ "--t": ".55s" }}>
            <p className="sub6">{sub}</p>
            {actions && <div className="acts">{actions}</div>}
          </div>
          {facts && (
            <dl className="facts e3" style={{ "--t": ".75s" }}>
              {facts.map(([n, l], i) => (
                <div key={`${n}-${l}-${i}`}>
                  <dt>{n}</dt>
                  <dd>{l}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {ticker && <Ticker items={ticker} />}
      </section>
    );
  }
  return (
    <section className="hero6 hsub" id="top">
      <span className="sect" aria-hidden="true">§</span>
      <div className="w h6main">
        <div>
          <span className="tag6 e3" style={{ "--t": ".05s" }}>{tag}</span>
          <HeroTitle lines={lines} em={em} />
          <p className="sub6 e3" style={{ "--t": ".55s" }}>{sub}</p>
          {actions && <div className="acts e3" style={{ "--t": ".7s" }}>{actions}</div>}
        </div>
        {aside && (
          <div className="stackc e3" style={{ "--t": ".4s" }}>
            <div className="lyr l3"></div>
            <div className="lyr l2"></div>
            <div className="front">{aside}</div>
          </div>
        )}
      </div>
      {ticker && <Ticker items={ticker} />}
    </section>
  );
}

export function GlanceCard({ head = "At a glance", rows, note }) {
  return (
    <>
      <div className="fh">
        <span>{head}</span>
        <span>GAA Consulting</span>
      </div>
      <dl className="gl">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="fnote">{note}</p>}
    </>
  );
}

/* Split section: sticky heading column on the left, content on the right */
export function Split({ id, alt, dark, title, p, actions, children, wide }) {
  return (
    <section className={`s split${alt ? " alt" : ""}${dark ? " dk" : ""}`} id={id}>
      <div className={`w sp-g${wide ? " wide" : ""}`}>
        <div className="sp-h">
          <h2>{title}</h2>
          {p && <p>{p}</p>}
          {actions && <div className="acts">{actions}</div>}
        </div>
        <div className="sp-c">{children}</div>
      </div>
    </section>
  );
}

/* Centered-left section heading with intro on the right of the heading */
export function SectionHead({ children, p }) {
  return (
    <div className="shd">
      <h2>{children}</h2>
      {p && <p>{p}</p>}
    </div>
  );
}

/* Ledger rows: full-width typographic list that floods ink on hover.
   items: [{ key, to, title, desc, meta, extra }] */
export function Ledger({ link, items, numbered = false, big = false }) {
  return (
    <ol className={`ledger${big ? " big" : ""}${numbered ? "" : " nn"}`}>
      {items.map((it, i) => (
        <li key={it.key || it.title}>
          <a {...link(it.to, it.linkExtra || {})}>
            {numbered && <span className="lg-n">{String(i + 1).padStart(2, "0")}</span>}
            <span className="lg-t">{it.title}</span>
            <span className="lg-d">
              {it.desc}
              {it.extra && <span className="lg-x">{it.extra}</span>}
            </span>
            {it.meta && <span className="lg-m">{it.meta}</span>}
            <span className="lg-a" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6 18 18 6M9 6h9v9" /></svg>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function CtaBand({ link, title, em, p, intent }) {
  return (
    <section className="s band">
      <span className="orb"></span>
      <span className="orb"></span>
      <div className="w">
        <h2>
          {title} <em>{em}</em>
        </h2>
        <p>{p}</p>
        <div className="acts">
          <a className="btn o" {...link("@contact", { intent })}>
            Book a Consultation <span className="ar">→</span>
          </a>
          <a className="btn g" {...link("practices")}>
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        const id = `faq-${i}-${q.length}`;
        return (
          <div className="faq-i" key={q}>
            <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
              <b>{q}</b>
              <span className="pm" aria-hidden="true"></span>
            </button>
            <div className="fa" id={id} role="region">
              <div>
                <p>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Ring() {
  return <div id="gaa-cursor-ring" aria-hidden="true"></div>;
}
