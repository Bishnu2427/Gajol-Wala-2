import Lenis from "lenis";
import { reduceMotion } from "./hooks/mouse";

// Site-wide smooth (inertia) scrolling. Falls back to native scrolling for reduced-motion users.
let lenis = null;
const HEADER_OFFSET = -72;

export function initSmoothScroll() {
  let raf = 0;
  if (!reduceMotion) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    const loop = (time) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }

  // In-page links (#shop, #lookbook …) glide instead of jumping; bare "#" placeholders do nothing.
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute("href");
    e.preventDefault();
    if (hash === "#") return;
    const target = hash === "#top" ? 0 : document.querySelector(hash);
    if (target === null) return;
    scrollTo(target);
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollTo(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: target === 0 ? 0 : HEADER_OFFSET });
    return;
  }
  const top = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}

// Freeze page scroll while a drawer is open.
export function lockScroll(locked) {
  document.documentElement.classList.toggle("is-locked", locked);
  if (lenis) (locked ? lenis.stop() : lenis.start());
}
