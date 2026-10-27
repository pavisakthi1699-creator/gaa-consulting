// Hirings First: header (Talent mega menu + Group dropdown), footer, contact form and shared bands.
// Built from the "Hirings First Site" mockups.
import React, { useEffect, useRef, useState } from "react";
import { Link, navigate } from "../site/router.jsx";
import { href, SITES } from "../site/sites.js";
import { GroupMenu, GroupLinks } from "../site/GroupMenu.jsx";
import { CATS, HF_CONTACT } from "./hfData.js";

export const hfHref = (path = "/") => href("hf", path);
export const catHref = (slug) => hfHref(`/talent/${slug}`);
const logo = SITES.hf.logo;

/** Link to a section: scrolls on the same page, otherwise opens the home page at that section. */
export function useSection(home) {
  return (id, after) => ({
    href: home ? `#${id}` : `${hfHref("/")}#${id}`,
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      after && after();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else navigate(`${hfHref("/")}#${id}`);
    },
  });
}

/** Scroll reveal for [data-hfrv] blocks (home page). */
export function useReveal(key) {
  useEffect(() => {
    const els = [...document.querySelectorAll(".hfx [data-hfrv]:not(.hf-in)")];
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("hf-in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("hf-in"), io.unobserve(e.target))),
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    const t = setTimeout(() => els.forEach((e) => e.classList.add("hf-in")), 2500);
    return () => (io.disconnect(), clearTimeout(t));
  }, [key]);
}

function Header({ home }) {
  const [hide, setHide] = useState(false);
  const [mega, setMega] = useState(false);
  const [mob, setMob] = useState(false);
  const last = useRef(0);
  const t = useRef(0);
  const sec = useSection(home);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      if (y < 80 || y < last.current - 4) setHide(false);
      else if (y > last.current + 4) (setHide(true), setMega(false));
      last.current = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    const key = (e) => e.key === "Escape" && (setMega(false), setMob(false));
    document.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", on);
      document.removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("hf-lock", mob);
    return () => document.documentElement.classList.remove("hf-lock");
  }, [mob]);

  const open = () => (clearTimeout(t.current), setMega(true));
  const close = () => (t.current = setTimeout(() => setMega(false), 150));
  const shut = () => (setMob(false), setMega(false));
  const contact = home ? sec("hf-contact", shut) : { href: "#hf-contact", onClick: (e) => (e.preventDefault(), shut(), document.getElementById("hf-contact")?.scrollIntoView({ behavior: "smooth" })) };

  return (
    <header className={`hf-hdr${hide && !mob && !mega ? " hide" : ""}`} onMouseLeave={close}>
      <div className="hf-topbar">
        <div className="hf-topbar-in">
          <span className="hf-mono">A GAA Group company</span>
          <nav aria-label="Group companies">
            <Link to={href("gaa", "/")}>GAA Consulting</Link>
            <Link to={href("ga", "/")}>GAA Associates</Link>
            <Link to={href("ff", "/")}>Filings First</Link>
            <Link to={hfHref("/")} aria-current="page" className="here">Hirings First</Link>
          </nav>
        </div>
      </div>
      <div className="hf-bar">
        <Link to={hfHref("/")} className="hf-brand" aria-label="Hirings First home" onClick={shut}>
          <img src={logo} alt="" />
          <span>Hirings <em>First</em></span>
        </Link>
        <nav className="hf-nav" aria-label="Main">
          <span className="hf-mega-wrap" onMouseEnter={open}>
            <button type="button" className={`hf-mega-btn${mega ? " on" : ""}`} aria-expanded={mega} aria-controls="hf-mega" onClick={() => setMega((v) => !v)}>
              Talent <i aria-hidden="true">▾</i>
            </button>
          </span>
          <a {...sec("hf-pool")} onMouseEnter={close}>Talent pool</a>
          <a {...sec("hf-process")} onMouseEnter={close}>How it works</a>
          <a {...sec("hf-candidates")} onMouseEnter={close}>For candidates</a>
          <a {...contact} onMouseEnter={close}>Contact</a>
          <span onMouseEnter={close} style={{ display: "flex" }}>
            <GroupMenu current="hf" />
          </span>
        </nav>
        <a className="hf-cta" {...contact}>Hire Talent</a>
        <button type="button" className="hf-burger" aria-label={mob ? "Close menu" : "Open menu"} aria-expanded={mob} aria-controls="hf-mob" onClick={() => setMob((v) => !v)}>
          {mob ? "✕" : "☰"}
        </button>
      </div>

      <div className="hf-mega" id="hf-mega" data-open={mega} onMouseEnter={open} onMouseLeave={close}>
        <div className="hf-mega-in">
          {CATS.map((c, i) => (
            <Link key={c.slug} to={catHref(c.slug)} className="hf-mega-item" onClick={shut}>
              <span className="hf-mega-n">0{i + 1}</span>
              <span className="hf-mega-tx"><b>{c.name}</b><small>{c.roles}</small></span>
            </Link>
          ))}
        </div>
      </div>

      <div className="hf-mob" id="hf-mob" data-open={mob}>
        <span className="hf-mono hf-mob-k">Talent categories</span>
        {CATS.map((c) => (
          <Link key={c.slug} to={catHref(c.slug)} className="hf-mob-cat" onClick={shut}>
            <span>{c.name}</span>
            <span className="o">→</span>
          </Link>
        ))}
        <a className="hf-mob-a" {...sec("hf-pool", shut)}>Talent pool</a>
        <a className="hf-mob-a" {...sec("hf-process", shut)}>How it works</a>
        <a className="hf-mob-a" {...sec("hf-candidates", shut)}>For candidates</a>
        <GroupLinks current="hf" onPick={shut} />
        <a className="hf-mob-cta" {...contact}>Hire Talent</a>
      </div>
    </header>
  );
}

function Footer({ tone }) {
  return (
    <footer className={`hf-foot ${tone}`}>
      <div className="hf-foot-top">
        <div className="hf-foot-brand">
          <div>
            <img src={logo} alt="Hirings First" />
            <span>Hirings <em>First</em></span>
          </div>
          <p>Talent acquisition and workforce solutions. Part of the GAA Group.</p>
        </div>
        <nav className="hf-foot-col" aria-label="Talent">
          <span className="hf-mono">Talent</span>
          {CATS.map((c) => <Link key={c.slug} to={catHref(c.slug)}>{c.name}</Link>)}
        </nav>
        <nav className="hf-foot-col" aria-label="Group companies">
          <span className="hf-mono">Group companies</span>
          <Link to={href("gaa", "/")}>GAA Consulting</Link>
          <Link to={href("ga", "/")}>GAA Associates</Link>
          <Link to={href("ff", "/")}>Filings First</Link>
          <Link to={hfHref("/")}>Hirings First</Link>
          <Link to={href("gaa", "/about")}>About the group</Link>
        </nav>
        <div className="hf-foot-col">
          <span className="hf-mono">Contact</span>
          <a href={`mailto:${HF_CONTACT.email}`}>{HF_CONTACT.email}</a>
          <a href={`tel:${HF_CONTACT.phone.replace(/\s/g, "")}`}>{HF_CONTACT.phone}</a>
          <span>{HF_CONTACT.office}</span>
        </div>
      </div>
      <div className="hf-foot-bot">
        <div>
          <span>© 2026 Hirings First · A GAA Group company</span>
          <nav aria-label="Legal">
            <Link to={href("gaa", "/disclaimer")}>Privacy policy</Link>
            <Link to={href("gaa", "/disclaimer")}>Terms of use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function HFPage({ home = false, pageKey, children }) {
  useReveal(pageKey);
  // arriving with /#hf-pool etc.
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView(), 80);
  }, [pageKey]);
  return (
    <div className={`hfx${home ? " home" : " cat"}`}>
      <a className="hf-skip" href="#hf-main">Skip to content</a>
      <Header home={home} />
      <main id="hf-main">{children}</main>
      <Footer tone={home ? "warm" : "light"} />
    </div>
  );
}

/* ---------------- "Hiring shouldn't be complicated." band ---------------- */
export function ClosingBand() {
  const go = (e) => (e.preventDefault(), document.getElementById("hf-contact")?.scrollIntoView({ behavior: "smooth" }));
  return (
    <section className="hf-close">
      <div className="hf-close-in" data-hfrv="">
        <h2>Hiring shouldn't be complicated.</h2>
        <p>Find the right person. <span>Faster.</span></p>
        <a href="#hf-contact" onClick={go} className="hf-btn white lg">Start Hiring</a>
      </div>
    </section>
  );
}

/** Switch the contact form to "I'm looking for a job" (used by "Find Opportunities"). */
export const asCandidate = () => window.dispatchEvent(new CustomEvent("hf-mode", { detail: 1 }));

/* ---------------- contact section + form ---------------- */
export function ContactSection({ dark = false }) {
  const [mode, setMode] = useState(0);
  const [funcs, setFuncs] = useState([]);
  const [f, setF] = useState({ name: "", org: "", email: "", phone: "", hp: "" });
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const on = (e) => (setMode(e.detail), setFuncs([]), setStatus(null));
    window.addEventListener("hf-mode", on);
    return () => window.removeEventListener("hf-mode", on);
  }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const pick = (m) => (setMode(m), setFuncs([]), setStatus(null));
  const toggle = (l) => setFuncs(funcs.includes(l) ? funcs.filter((x) => x !== l) : [...funcs, l]);

  const submit = (e) => {
    e.preventDefault();
    if (f.hp) return;
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || f.phone.replace(/\D/g, "").length < 8) {
      setStatus({ t: "er", m: "Please enter your name, a valid email and a phone number." });
      return;
    }
    const lines = [
      `Enquiry: ${mode ? "Looking for a job" : "Wants to hire"}`,
      `Name: ${f.name}`,
      `${mode ? "Current role" : "Company"}: ${f.org || "-"}`,
      `Email: ${f.email}`,
      `Phone: ${f.phone}`,
      `${mode ? "Functions" : "Roles hiring for"}: ${funcs.join(", ") || "-"}`,
      `Page: ${window.location.href}`,
    ];
    const subject = mode ? "Join the talent pool" : "Hiring enquiry";
    window.location.href = `mailto:${HF_CONTACT.email}?subject=${encodeURIComponent(`${subject}: ${f.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus({ t: "ok", m: `Your email app should open with the details addressed to ${HF_CONTACT.email}. Please press send there.` });
  };
  const sent = status?.t === "ok";

  return (
    <section id="hf-contact" className={`hf-contact${dark ? " dark" : ""}`}>
      <div className="hf-contact-in">
        <div className="hf-contact-l">
          <span className="hf-eyebrow">Contact</span>
          <h2>Tell us who you {dark ? <span className="o">need.</span> : "need."}</h2>
          <p>Share the role and we'll come back with a plan, usually the same day.</p>
          <div className="hf-cd">
            <div><span className="hf-mono">Email</span><a href={`mailto:${HF_CONTACT.email}`}>{HF_CONTACT.email}</a></div>
            <div><span className="hf-mono">Phone</span><a href={`tel:${HF_CONTACT.phone.replace(/\s/g, "")}`}>{HF_CONTACT.phone}</a></div>
            <div><span className="hf-mono">Office</span><span>{HF_CONTACT.office}</span></div>
          </div>
        </div>
        <form className="hf-form" onSubmit={submit} noValidate>
          <div role="tablist" aria-label="I am" className="hf-modes">
            {["I want to hire", "I'm looking for a job"].map((l, i) => (
              <button key={l} type="button" role="tab" aria-selected={mode === i} className={mode === i ? "on" : ""} onClick={() => pick(i)}>{l}</button>
            ))}
          </div>
          <div className="hf-frow">
            <label className="hf-fld"><span>Full name</span><input name="name" required autoComplete="name" placeholder="Your name" value={f.name} onChange={set("name")} /></label>
            <label className="hf-fld"><span>{mode ? "Current role" : "Company"}</span><input name="org" placeholder={mode ? "e.g. Accounts Executive" : "Company name"} value={f.org} onChange={set("org")} /></label>
          </div>
          <div className="hf-frow">
            <label className="hf-fld"><span>Email</span><input name="email" type="email" required autoComplete="email" placeholder="name@company.com" value={f.email} onChange={set("email")} /></label>
            <label className="hf-fld"><span>Phone</span><input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" value={f.phone} onChange={set("phone")} /></label>
          </div>
          <input className="hf-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.hp} onChange={set("hp")} />
          <div className="hf-funcs">
            <span>{mode ? "Functions you work in" : "Roles you are hiring for"}</span>
            <div>
              {CATS.map((c) => (
                <button key={c.short} type="button" aria-pressed={funcs.includes(c.short)} className={funcs.includes(c.short) ? "on" : ""} onClick={() => toggle(c.short)}>{c.short}</button>
              ))}
            </div>
          </div>
          {status && <div className={`hf-msg ${status.t}`} role="status">{status.m}</div>}
          <button type="submit" className={`hf-submit${sent ? " sent" : ""}`}>
            <span>{sent ? "Thanks, we'll be in touch shortly" : mode ? "Join the talent pool" : "Start hiring"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
