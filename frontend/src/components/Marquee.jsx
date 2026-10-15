export default function Marquee({ items = [] }) {
  if (!items.length) return <div className="marquee marquee--empty" aria-hidden="true" />;
  const loop = [...items, ...items]; // doubled so the -50% scroll loops seamlessly

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((text, i) => (
          <span key={i} className="marquee__item">
            <span>{text}</span>
            <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
