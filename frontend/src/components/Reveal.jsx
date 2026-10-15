import useInView from "../hooks/useInView";

// Words rise out of a mask when the element scrolls into view.
export default function Reveal({ text, as: Tag = "p", className = "" }) {
  const [ref, inView] = useInView();
  const words = text.trim().split(/\s+/);

  return (
    <Tag ref={ref} className={`${className} ${inView ? "is-in" : ""}`.trim()} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="rv-word">
            <span style={{ "--i": i }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
