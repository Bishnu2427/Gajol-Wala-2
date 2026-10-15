import { useEffect, useState } from "react";
import { reduceMotion } from "../hooks/mouse";

// Full-screen curtain: the name rises letter by letter, then the curtain lifts.
export default function Intro({ name }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduceMotion ? 0 : 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`intro ${done ? "is-done" : ""}`} aria-hidden="true">
      <div className="intro__word">
        {[...name].map((c, i) => (
          <span key={i} style={{ "--i": i }}>{c}</span>
        ))}
      </div>
    </div>
  );
}
