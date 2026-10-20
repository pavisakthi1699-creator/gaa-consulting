import { useEffect } from "react";

// Same motion system as the GAA Consulting home page (GaaConsultingPage.jsx):
// masked word reveal on h2, scroll reveals, header hide/show + progress bar,
// magnetic buttons, hero tilt, card spotlights and the custom cursor ring.
// Extended to cover the new sub-page components.
const REVEAL =
  ".card,.rows>div,.cc,.pc5,.val,.ci,.hub,.ledger>li,.svl>div,.trk>li,.faq-i,.tl-i,.rgn>li,.story,.cal-r,.tier,.stair>li,.lead,.ppl,.statement,.ov-g>*,.legal>*,.brf-feat,.shd>p,.sp-h>p,.sp-h>.acts,.rtabs,.ix-list>button,.why .tx,.gift .tx,.gf-top>*";

export default function useGaaMotion(rootRef, title) {
  useEffect(() => {
    const root = rootRef.current || document;
    const RM = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (RM) document.documentElement.classList.add("rm");
    const cl = (x) => Math.min(1, Math.max(0, x));

    const prevTitle = document.title;
    if (title) document.title = title;
    window.scrollTo({ top: 0, behavior: "instant" });

    const readyTimer = setTimeout(() => document.body.classList.add("ready"), 80);

    // Masked word split for section headings
    function splitWords(el) {
      const out = (n) => {
        [...n.childNodes].forEach((c) => {
          if (c.nodeType === 3) {
            const f = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach((t) => {
              if (!t) return;
              if (/^\s+$/.test(t)) {
                f.appendChild(document.createTextNode(" "));
                return;
              }
              const w = document.createElement("span");
              w.className = "wd";
              const i = document.createElement("i");
              i.textContent = t;
              w.appendChild(i);
              f.appendChild(w);
            });
            c.replaceWith(f);
          } else if (c.nodeType === 1) out(c);
        });
      };
      out(el);
      el.querySelectorAll(".wd>i").forEach((i, k) => {
        i.style.transitionDelay = Math.min(k, 12) * 55 + "ms";
      });
    }
    root.querySelectorAll("h2").forEach((h) => {
      if (h.classList.contains("sp")) return;
      h.classList.add("sp");
      splitWords(h);
    });

    root.querySelectorAll(REVEAL).forEach((e) => e.classList.add("rv"));
    root.querySelectorAll(".draw").forEach((e) => e.classList.add("rvl"));

    const io =
      "IntersectionObserver" in window && !RM
        ? new IntersectionObserver(
            (es) =>
              es.forEach((x) => {
                if (x.isIntersecting) {
                  const t = x.target;
                  t.classList.add("in");
                  io.unobserve(t);
                  // hand control back to the element's own hover transitions once revealed
                  if (t.classList.contains("rv"))
                    setTimeout(() => {
                      t.classList.remove("rv");
                      t.style.transitionDelay = "";
                    }, 1500);
                }
              }),
            { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
          )
        : null;

    root.querySelectorAll(".rv,.sp,.rvl").forEach((e) => {
      if (io) {
        if (e.parentNode && e.classList.contains("rv")) {
          const sib = [...e.parentNode.children].filter((c) => c.classList.contains("rv"));
          e.style.transitionDelay = Math.min(sib.indexOf(e), 5) * 90 + "ms";
        }
        io.observe(e);
      } else {
        e.classList.add("in");
      }
    });

    const sgridTimer = setTimeout(() => {
      root.querySelectorAll(".sgrid").forEach((g) => g.classList.add("go"));
    }, RM ? 0 : 350);

    // Header hide/show + scroll progress
    const hdr = root.querySelector("#hdr");
    const pg = root.querySelector("#pg");
    let lastY = 0;
    function tick() {
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (hdr) {
        hdr.classList.toggle("hide", y > 120 && y > lastY + 2);
        if (y < lastY - 2 || y < 120) hdr.classList.remove("hide");
        document.documentElement.classList.toggle("gaa-hdr-off", hdr.classList.contains("hide"));
        document.documentElement.style.setProperty("--hh", hdr.offsetHeight + "px");
      }
      lastY = y;
      if (pg) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
        pg.style.transform = `scaleX(${cl(y / maxScroll)})`;
      }
    }
    let raf = 0;
    const req = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          tick();
        });
    };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    tick();

    let cancelLoop = () => {};
    if (!RM && window.matchMedia("(pointer:fine)").matches) {
      root.querySelectorAll(".btn,.book").forEach((b) => {
        b.addEventListener("mousemove", (e) => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${
            (e.clientY - r.top - r.height / 2) * 0.28
          }px)`;
        });
        b.addEventListener("mouseleave", () => (b.style.transform = ""));
      });

      const hero = root.querySelector("#top");
      if (hero) {
        hero.addEventListener("mousemove", (e) => {
          const r = hero.getBoundingClientRect();
          hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
          hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        });
      }

      const onSpot = (e) => {
        const c = e.target.closest && e.target.closest(".pc5");
        if (!c || !root.contains(c)) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty("--x", e.clientX - r.left + "px");
        c.style.setProperty("--y", e.clientY - r.top + "px");
      };
      root.addEventListener("mousemove", onSpot);

      const ring = root.querySelector("#gaa-cursor-ring");
      let x = -100,
        y = -100,
        tx = -100,
        ty = -100;
      const onMouseMove = (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (ring) ring.classList.add("on");
      };
      const onMouseLeave = () => ring && ring.classList.remove("on");
      const onMouseOver = (e) => {
        if (ring)
          ring.classList.toggle(
            "big",
            !!e.target.closest("a,button,.pc5,.hub,.val,.story,.ppl,.tier")
          );
      };
      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseover", onMouseOver);
      let loopId = 0;
      const loop = () => {
        x += (tx - x) * 0.18;
        y += (ty - y) * 0.18;
        if (ring) ring.style.transform = `translate(${x}px,${y}px)`;
        loopId = requestAnimationFrame(loop);
      };
      loopId = requestAnimationFrame(loop);
      cancelLoop = () => {
        root.removeEventListener("mousemove", onSpot);
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mouseover", onMouseOver);
        cancelAnimationFrame(loopId);
      };
    }

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(sgridTimer);
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      document.title = prevTitle;
      document.body.classList.remove("ready");
      document.documentElement.classList.remove("gaa-hdr-off");
      if (io) io.disconnect();
      cancelLoop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
