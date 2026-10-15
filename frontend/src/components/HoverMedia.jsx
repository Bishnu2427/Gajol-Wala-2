import { useEffect, useRef } from "react";
import { finePointer } from "../hooks/mouse";
import Img from "./Img";

// Offsets (in %) for each edge the cursor can cross: top, right, bottom, left.
const EDGE = [
  [0, -100],
  [100, 0],
  [0, 100],
  [-100, 0],
];

// Which edge of `el` is the pointer closest to? 0 top · 1 right · 2 bottom · 3 left
function edgeOf(el, e) {
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width / 2) * (r.width > r.height ? r.height / r.width : 1);
  const y = (e.clientY - r.top - r.height / 2) * (r.height > r.width ? r.width / r.height : 1);
  return Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
}

// Image tile with a direction-aware hover:
//   · the second image wipes in from the side the cursor entered, and out through the side it left
//   · a "View more" pill trails the (normal) cursor
export default function HoverMedia({ images, alt, label = "View more", className = "", eager, onOpen }) {
  const rootRef = useRef(null);
  const revealRef = useRef(null);
  const innerRef = useRef(null);
  const pillRef = useRef(null);
  const state = useRef({ x: 0, y: 0, px: 0, py: 0, raf: 0, on: false });
  const [base, second] = images;

  useEffect(() => () => cancelAnimationFrame(state.current.raf), []);

  const place = (edge, animate) => {
    const reveal = revealRef.current;
    const inner = innerRef.current;
    if (!reveal) return;
    const [x, y] = edge === null ? [0, 0] : EDGE[edge];
    reveal.style.transition = animate ? "" : "none";
    inner.style.transition = animate ? "" : "none";
    reveal.style.transform = `translate3d(${x}%, ${y}%, 0)`;
    inner.style.transform = `translate3d(${-x}%, ${-y}%, 0)`;
  };

  const followPill = () => {
    const s = state.current;
    s.px += (s.x - s.px) * 0.18;
    s.py += (s.y - s.py) * 0.18;
    pillRef.current.style.transform = `translate3d(${s.px}px, ${s.py}px, 0) translate(-50%, -50%)`;
    if (s.on || Math.abs(s.x - s.px) > 0.5) s.raf = requestAnimationFrame(followPill);
  };

  const setPointer = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    state.current.x = e.clientX - r.left;
    state.current.y = e.clientY - r.top;
  };

  const onEnter = (e) => {
    const s = state.current;
    setPointer(e);
    s.px = s.x;
    s.py = s.y;
    s.on = true;
    rootRef.current.classList.add("is-hover");

    // park the second image just outside the entry edge, then slide it in
    place(edgeOf(rootRef.current, e), false);
    void revealRef.current?.offsetWidth;
    place(null, true);

    cancelAnimationFrame(s.raf);
    if (finePointer) followPill();
  };

  const onLeave = (e) => {
    state.current.on = false;
    rootRef.current.classList.remove("is-hover");
    place(edgeOf(rootRef.current, e), true);
  };

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`hm ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${alt}`}
      onMouseEnter={onEnter}
      onMouseMove={setPointer}
      onMouseLeave={onLeave}
      onClick={onOpen}
      onKeyDown={onKey}
    >
      <Img className="hm__base" src={base} alt={alt} loading={eager ? "eager" : "lazy"} />

      {second && (
        <div ref={revealRef} className="hm__reveal" aria-hidden="true">
          <div ref={innerRef} className="hm__reveal-inner">
            <Img src={second} alt="" />
          </div>
        </div>
      )}

      <span ref={pillRef} className="hm__pill" aria-hidden="true">
        <span className="hm__pill-text">{label}</span>
        <svg viewBox="0 0 16 16" width="12" height="12">
          <path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </div>
  );
}
