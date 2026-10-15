import RollText from "./RollText";

const COLUMNS = [
  ["Shop", ["New arrivals", "Outerwear", "Essentials", "Gift cards"]],
  ["Help", ["Shipping", "Returns", "Size guide", "Contact"]],
  ["Follow", ["Instagram", "TikTok", "Pinterest"]],
];

export default function Footer({ brand }) {
  return (
    <footer className="footer">
      <div className="footer__cols">
        {COLUMNS.map(([title, links]) => (
          <div key={title}>
            <p className="footer__title">{title}</p>
            {links.map((l) => (
              <RollText key={l} as="a" href="#" text={l} />
            ))}
          </div>
        ))}
        <div>
          <p className="footer__title">Studio</p>
          <p className="muted">
            Open Mon–Sat
            <br />
            10:00 – 19:00
          </p>
        </div>
      </div>
      <RollText className="footer__word" variant="each" text={brand} />
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {brand}</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
