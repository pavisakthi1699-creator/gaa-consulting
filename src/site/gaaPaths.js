// Maps the page names used inside the GAA Consulting pages ("practices/corporate-law",
// "@contact", "home", ...) to real addresses on the GAA Consulting website.
import { href } from "./sites.js";
import { navigate } from "./router.jsx";

export function gaaPath(page) {
  let [p, anchor] = String(page || "").split("#");
  const tail = anchor ? `#${anchor}` : "";
  p = p.replace(/^\/+/, "").replace(/^@/, "").split("?")[0];
  if (p === "" || p === "home" || p === "gaa" || p === "gaa-consulting") return href("gaa", "/") + tail;
  if (p === "filings-first") return href("ff", "/");
  if (p === "hirings-first") return href("hf", "/");
  p = p.replace(/^gaa-consulting\//, "");
  p = p.replace(/^practices(\/|$)/, "services$1");
  return href("gaa", "/" + p) + tail;
}

/** Go to a page: internal addresses use the router, other domains load normally. */
export function go(to) {
  if (to.startsWith("/") && !to.startsWith("//")) navigate(to);
  else window.location.href = to;
}
