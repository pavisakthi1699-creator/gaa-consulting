// Maps the page names used inside the GAA pages ("practices/corporate-law", "@contact", "home", ...)
// to real addresses. GAA Consulting is the group home; GAA Associates (/gaa-associates) owns the
// services. "home" and "@contact" point to the site the visitor is currently on.
import { href, resolve } from "./sites.js";
import { navigate } from "./router.jsx";

const onAssociates = () => typeof window !== "undefined" && resolve(window.location.pathname).site === "ga";

export function gaaPath(page) {
  let [p, anchor] = String(page || "").split("#");
  const tail = anchor ? `#${anchor}` : "";
  p = p.replace(/^\/+/, "").replace(/^@/, "").split("?")[0];
  const ga = onAssociates();
  if (p === "" || p === "home") return (ga && !anchor ? href("ga", "/") : href("gaa", "/")) + tail;
  if (p === "gaa" || p === "gaa-consulting") return href("gaa", "/") + tail;
  if (p === "gaa-associates" || p === "associates") return href("ga", "/") + tail;
  if (p === "filings-first") return href("ff", "/");
  if (p === "hirings-first") return href("hf", "/");
  if (p === "contact") return href(ga ? "ga" : "gaa", "/contact") + tail;
  p = p.replace(/^gaa-consulting\//, "");
  // services belong to GAA Associates
  const m = p.match(/^(practices|services)(\/.*)?$/);
  if (m && m[2]) return href("ga", "/services" + m[2]) + tail;
  if (m) return href("ga", "/") + (tail || "#services"); // the services list on the GAA Associates home
  return href("gaa", "/" + p) + tail;
}

/** Go to a page: internal addresses use the router, other domains load normally. */
export function go(to) {
  if (to.startsWith("/") && !to.startsWith("//")) navigate(to);
  else window.location.href = to;
}
