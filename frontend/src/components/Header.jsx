import { useEffect, useState } from "react";
import RollText from "./RollText";

const NAV = [
  ["Shop", "#shop"],
  ["Collections", "#collections"],
  ["Lookbook", "#lookbook"],
  ["About", "#about"],
];

export default function Header({ brand, bagCount, onBag }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (Math.abs(y - lastY) > 4) setHidden(y > lastY && y > 400);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""}`}>
      <RollText as="a" href="#top" className="logo" text={brand} />
      <nav className="nav" aria-label="Main">
        {NAV.map(([label, href]) => (
          <RollText key={href} as="a" href={href} text={label} />
        ))}
      </nav>
      <div className="header__right">
        <button type="button" className="bag-btn roll-host" onClick={onBag}>
          <RollText text="Bag" />
          <span className="bag-btn__count" key={bagCount}>{bagCount}</span>
        </button>
      </div>
    </header>
  );
}
