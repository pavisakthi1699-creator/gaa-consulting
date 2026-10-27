import React, { useEffect } from "react";
import { usePath, navigate } from "./site/router.jsx";
import { resolve, href, SITES } from "./site/sites.js";
import { useSeo } from "./site/seo.js";
import { gaaPath, go } from "./site/gaaPaths.js";
import { seoFor } from "./routes.js";

// GAA Consulting (your existing pages)
import GaaHomeV2 from "./pages/gaa/GaaHomeV2";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GaaSite from "./pages/gaa/GaaSite";
import { GaaHeader, GaaFooter, useLink } from "./pages/gaa/GaaShell";
// Filings First (from the mockups)
import FFHome from "./ff/FFHome.jsx";
import FFService from "./ff/FFService.jsx";
import { isPage } from "./ff/ffData.js";
// Hirings First
import HFHome from "./hf/HFHome.jsx";
import HFCategory from "./hf/HFCategory.jsx";
import { getCategory, getService } from "./hf/hfData.js";

/* One project, three websites, all linked to each other.

   GAA Consulting   /                  Home (the GAA Group home)
   GAA Associates   /gaa-associates    Home (services overview), /gaa-associates/services/<service>, /gaa-associates/contact
                    /about             About us
                    /services          Services (+ /services/corporate-law and the other 4 services)
                    /contact           Contact us
                    /industries, /insights, /people, /how-we-work, /india-entry, /experience, /disclaimer
   Filings First    /filings-first                        Home
                    /filings-first/services/<service>      25 service pages
   Hirings First    /hirings-first                         Home
                    /hirings-first/talent/<category>       6 talent category pages
                    /hirings-first/services/<service>      4 service pages

   On the live domains Filings First and Hirings First sit at the root of their own domains. */

const GAA_SUB = ["india-entry", "industries", "experience", "insights", "people", "how-we-work", "disclaimer", "careers"];

// Old #/ links (earlier review links) go to the new addresses
function useLegacyHashRedirect() {
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith("#/")) navigate(gaaPath(h.slice(2).split("?")[0]), { replace: true });
  }, []);
}

const onNavigate = (page, section) => go(gaaPath(section ? `${page}#${section}` : page));

// GAA header and footer around pages that don't include them
function GaaChrome({ active, children }) {
  const link = useLink();
  return (
    <div className="app-root">
      <div className="gaa-consulting-root gaa-chrome">
        <GaaHeader link={link} active={active} />
      </div>
      <main id="main-content">{children}</main>
      <div className="gaa-consulting-root gaa-chrome">
        <GaaFooter link={link} />
      </div>
    </div>
  );
}

function NotFound({ site }) {
  return (
    <GaaChrome>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "180px 24px 120px" }}>
        <p className="gm" style={{ color: "var(--od)" }}>Page not found</p>
        <h1 style={{ fontSize: "clamp(40px,6vw,72px)", letterSpacing: "-.04em", lineHeight: 1, margin: "16px 0 20px" }}>This page has moved.</h1>
        <p style={{ fontSize: 18, color: "#4d4842", marginBottom: 28 }}>The link may be old. Continue to {SITES[site].name}.</p>
        <a className="btn o" href={href(site, "/")} onClick={(e) => { e.preventDefault(); go(href(site, "/")); }} style={{ display: "inline-flex", padding: "14px 22px", background: "#121212", color: "#fff", borderRadius: 999 }}>
          Go to the home page →
        </a>
      </section>
    </GaaChrome>
  );
}

function Gaa({ path }) {
  if (path === "/") return <GaaHomeV2 />;
  // services moved to GAA Associates
  if (path === "/services" || path === "/practices") return <Redirect to={`${href("ga", "/")}#services`} />;
  const sv = path.match(/^\/(?:services|practices)\/(.+)$/);
  if (sv) return <Redirect to={href("ga", `/services/${sv[1]}`)} />;
  if (path === "/about") return <main id="main-content"><AboutPage onNavigate={onNavigate} /></main>;
  if (path === "/contact") return <GaaChrome active="@contact"><ContactPage onNavigate={onNavigate} /></GaaChrome>;
  const [first] = path.slice(1).split("/");
  if (GAA_SUB.includes(first)) {
    const sub = path.slice(1).replace(/^services(\/|$)/, "practices$1");
    return <GaaSite path={sub} onNavigate={onNavigate} />;
  }
  return <NotFound site="gaa" />;
}

// GAA Associates: home (services overview), the five service pages and contact
function GA({ path }) {
  if (path === "/") return <GaaSite path="practices" onNavigate={onNavigate} />;
  if (path === "/services") return <Redirect to={`${href("ga", "/")}#services`} />;
  if (path.startsWith("/services/")) return <GaaSite path={"practices" + path.slice("/services".length)} onNavigate={onNavigate} />;
  if (path === "/contact") return <GaaChrome active="@contact"><ContactPage onNavigate={onNavigate} brand="gaa" /></GaaChrome>;
  return <NotFound site="ga" />;
}

function FF({ path }) {
  if (path === "/") return <FFHome />;
  const m = path.match(/^\/services\/([a-z0-9-]+)$/);
  if (m && isPage(m[1])) return <FFService key={m[1]} slug={m[1]} />;
  return <NotFound site="ff" />;
}

function HF({ path }) {
  if (path === "/") return <HFHome />;
  const m = path.match(/^\/talent\/([a-z-]+)$/);
  if (m && getCategory(m[1])) return <HFCategory key={m[1]} slug={m[1]} />;
  const sv = path.match(/^\/services\/([a-z-]+)$/);
  if (sv && getService(sv[1])) return <HFCategory key={"s-" + sv[1]} slug={sv[1]} kind="svc" />;
  // older addresses go to the matching home page section
  const old = { "/talent": "hf-talent", "/hire": "hf-contact", "/talent/sales-business-development": "" };
  if (path in old) return <Redirect to={old[path] ? `${href("hf", "/")}#${old[path]}` : href("hf", "/talent/sales-and-business-development")} />;
  return <NotFound site="hf" />;
}

function Redirect({ to }) {
  useEffect(() => navigate(to, { replace: true }), [to]);
  return null;
}

export default function App() {
  useLegacyHashRedirect();
  const { site, path } = resolve(usePath());
  useSeo(seoFor(site, path));
  if (site === "ff") return <FF path={path} />;
  if (site === "hf") return <HF path={path} />;
  if (site === "ga") return <GA path={path} />;
  return <Gaa path={path} />;
}
