// SEO data for the three sites (plain JavaScript: also read by scripts/seo-pages.mjs).
import * as gaa from "./seo/gaa.js";
import * as ff from "./seo/ff.js";
import * as hf from "./seo/hf.js";
import * as ga from "./seo/ga.js";

export const SITES_SEO = { gaa, ff, hf, ga };

/** Title, description and canonical address for a page (`path` = page inside that site). */
export function seoFor(site, path) {
  const s = SITES_SEO[site];
  const r = s.ROUTES.find((x) => x.path === path);
  if (r) return { ...r, canonical: r.path === "/" ? s.HOME_CANONICAL || s.SITE + "/" : s.SITE + r.path };
  return { path, title: `Page not found | ${s.BRAND}`, description: "This page could not be found.", canonical: s.SITE + path };
}
