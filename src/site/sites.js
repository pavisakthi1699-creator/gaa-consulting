// ─────────────────────────────────────────────────────────────────────────────
// The three websites in this project and how they link to each other.
//
//  On your computer (npm run dev) and on review links (*.vercel.app) all three
//  sites run on one address:
//      /                      GAA Consulting (the GAA Group home)
//      /gaa-associates/...    GAA Associates (served by the GAA Consulting build)
//      /filings-first/...     Filings First
//      /hirings-first/...     Hirings First
//
//  On the live domains each site sits at the root of its own domain, and links
//  to the other two companies go to their domains.
// ─────────────────────────────────────────────────────────────────────────────
import gaaLogo from "./gaa-logo.png";
import ffLogo from "./ff-logo.png";
import hfLogo from "./hf-logo.png";
import gaLogo from "./ga-logo.png";

export const SITE_KEY = import.meta.env.VITE_SITE || "gaa"; // set by the build mode (.env.gaa / .env.ff / .env.hf)

export const LOCAL =
  import.meta.env.DEV ||
  (typeof window !== "undefined" &&
    (/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) || window.location.hostname.endsWith(".vercel.app")));

// TODO(client): confirm the production domains and contact details.
export const SITES = {
  gaa: { key: "gaa", name: "GAA Consulting", domain: "https://www.gaaconsulting.com", base: "", logo: gaaLogo, email: "enquiries@gaaconsulting.com", line: "The GAA Group home" },
  // GAA Associates lives on the GAA Consulting domain under /gaa-associates (host: "gaa")
  ga: { key: "ga", name: "GAA Associates", domain: "https://www.gaaconsulting.com/gaa-associates", base: "/gaa-associates", host: "gaa", logo: gaLogo, email: "enquiries@gaaconsulting.com", line: "Corporate law, company secretarial and transaction advisory" },
  ff: { key: "ff", name: "Filings First", domain: "https://filingsfirst.com", base: "/filings-first", logo: ffLogo, email: "info@filingsfirst.com", line: "Accounting, taxation, GST and compliance" },
  hf: { key: "hf", name: "Hirings First", domain: "https://www.hiringsfirst.com", base: "/hirings-first", logo: hfLogo, email: "hello@hiringsfirst.in", line: "Pre-screened talent, ready to perform" },
};

// Order used in every "Group" dropdown: the three group companies. GAA Consulting (the group
// home) is reached through the Home and About us links at the start of every site's menu.
export const GROUP_ORDER = ["ga", "ff", "hf"];

/** Path prefix of a site on the current address ("" on its own domain). */
export const baseOf = (key) => (LOCAL || SITES[key].host ? SITES[key].base : "");

/** Link to a page of any site. `path` is the page inside that site, e.g. "/" or "/services/gst". */
export function href(key, path = "/") {
  const p = path === "/" ? "" : path;
  if (LOCAL) return SITES[key].base + p || "/";
  const host = SITES[key].host || key;
  if (host === SITE_KEY) return SITES[key].host ? SITES[key].base + p : p || "/";
  return SITES[key].domain + (p || (SITES[key].host ? "" : "/"));
}

/** Which site a browser path belongs to, and the page path inside that site. */
export function resolve(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const inBase = (k) => clean === SITES[k].base || clean.startsWith(SITES[k].base + "/");
  const strip = (k) => clean.slice(SITES[k].base.length) || "/";
  if (LOCAL) {
    for (const k of ["ff", "hf", "ga"]) if (inBase(k)) return { site: k, path: strip(k) };
    return { site: "gaa", path: clean };
  }
  if (SITE_KEY === "gaa" && inBase("ga")) return { site: "ga", path: strip("ga") };
  return { site: SITE_KEY, path: clean };
}
