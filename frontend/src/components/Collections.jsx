import { useEffect, useRef, useState } from "react";
import { finePointer, mouse } from "../hooks/mouse";
import Reveal from "./Reveal";
import RollText from "./RollText";

// Big list of collections. Hovering a row shows a photo that trails the cursor.
export default function Collections({ collections = [] }) {
  const previewRef = useRef(null);
  const pos = useRef(null);
  const [active, setActive] = useState(null);
  const isOn = !!active;

  // trail the cursor only while a row is hovered
  useEffect(() => {
    if (!finePointer || !isOn) return;
    const el = previewRef.current;
    const p = (pos.current ??= { x: mouse.x, y: mouse.y });
    let raf;
    const loop = () => {
      p.x += (mouse.x - p.x) * 0.14;
      p.y += (mouse.y - p.y) * 0.14;
      const tilt = Math.max(-6, Math.min(6, (mouse.x - p.x) * 0.04));
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      pos.current = null; // next hover starts right under the cursor
    };
  }, [isOn]);

  return (
    <section className="section" id="collections">
      <div className="section__head">
        <Reveal as="h2" className="h2" text="Collections" />
        <span className="muted">Hover to preview</span>
      </div>

      <ul className="collections" onMouseLeave={() => setActive(null)}>
        {collections.map((c) => (
          <li key={c.no}>
            <a href="#shop" className="collection roll-host" onMouseEnter={() => setActive(c)}>
              <span className="collection__no">{c.no}</span>
              <RollText className="collection__name" text={c.name} />
              <span className="collection__count">{c.count} pieces</span>
            </a>
          </li>
        ))}
      </ul>

      <div ref={previewRef} className={`preview ${active ? "is-on" : ""}`} aria-hidden="true">
        {collections.map((c) => (
          <img key={c.no} src={c.image} alt="" className={active?.no === c.no ? "is-current" : ""} />
        ))}
      </div>
    </section>
  );
}
