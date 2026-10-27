import React, { useEffect, useRef, useState } from "react";
import { gaaPath, go } from "../../site/gaaPaths.js";
import { GaaHeader, useLink } from "./GaaShell";
import logoMain from "../../assets/logo-main.png";
import { GAA_FIRM, OTHER_FIRMS } from "../../data/gaaServices";

/* Shared pieces for the GAA Consulting Services page and the service detail pages,
   built from the "Service Detail" / "GAA Consulting Services" designs. */

// Scroll state used by both pages: header hide/show, scroll position, viewport width, mount flag
export function useScrollState(onMeasure) {
  const lastY = useRef(0);
  const raf = useRef(0);
  const [st, setSt] = useState({ y: 0, up: true, vw: typeof window !== "undefined" ? window.innerWidth : 1400 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const measure = () => {
      const y = window.scrollY;
      setSt((s) => {
        const up = y < 120 || y < lastY.current - 2 ? true : y > lastY.current + 2 ? false : s.up;
        lastY.current = y;
        return { y, up, vw: window.innerWidth };
      });
      if (onMeasure) onMeasure();
    };
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        measure();
      });
    };
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    measure();
    const t = setTimeout(() => setMounted(true), 80);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
      clearTimeout(t);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...st, mounted };
}

// Internal link helper: page names are the ones App.handleNavigate understands
// eslint-disable-next-line no-unused-vars
export function useNav(onNavigate) {
  return (page) => {
    const href = gaaPath(page);
    return {
      href,
      onClick: (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        go(href);
      },
    };
  };
}

export const SERVICES_PAGE = "gaa-consulting/practices";
export const servicePage = (slug) => `gaa-consulting/practices/${slug}`;

export function jumpTo(id) {
  return (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

// Same GAA Consulting menu as every other page: Home, About us, Services, Contact us, Group
// eslint-disable-next-line no-unused-vars
export function SvHeader({ up, nav }) {
  const link = useLink();
  return (
    <div className="gaa-consulting-root gaa-chrome">
      <GaaHeader link={link} active="practices" />
    </div>
  );
}

// Email box shared by the contact sections: keeps the email and opens the full contact form
export function CallbackForm({ onNavigate }) {
  const [email, setEmail] = useState("");
  const submit = (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem("gaa-intro-email", email);
    } catch (err) {
      /* storage unavailable */
    }
    if (onNavigate) onNavigate("contact");
  };
  return (
    <form className="sv-form" onSubmit={submit}>
      <label className="sv-sr" htmlFor="sv-email">Your work email</label>
      <input id="sv-email" type="email" required placeholder="Your work email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Request a callback</button>
    </form>
  );
}

export function SvFootBar({ nav }) {
  return (
    <div className="sv-foot">
      <span className="x-lgw"><img src={logoMain} alt="GAA Consulting" /></span>
      <div>
        {OTHER_FIRMS.map((f) => (
          <a key={f.key} {...nav(f.key === "filings" ? "filings-first" : "hirings-first")}>{f.name}</a>
        ))}
        <a {...nav("home")}>{GAA_FIRM.name}</a>
      </div>
      <span>© 2026 · All rights reserved</span>
    </div>
  );
}
