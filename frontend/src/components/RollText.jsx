import { forwardRef } from "react";

const toChars = (text) => [...text].map((c) => (c === " " ? " " : c));

// Each letter has a twin waiting above it; on hover the twin slides in from the top.
//   variant="chars" (default) — letters roll in a soft stagger
//   variant="each"            — every letter flips on its own as the cursor passes (big wordmarks)
//   variant="side"            — the whole phrase slides in from the left
const RollText = forwardRef(function RollText(
  { text, variant = "chars", as: Tag = "span", className, ...rest },
  ref
) {
  const rollAttr = variant === "chars" ? "" : variant;

  if (variant === "side") {
    return (
      <Tag ref={ref} data-roll={rollAttr} className={className} aria-label={text} {...rest}>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
      </Tag>
    );
  }

  const flip = (e) => {
    const ch = e.currentTarget;
    clearTimeout(ch._t);
    ch.classList.add("is-on");
    ch._t = setTimeout(() => ch.classList.remove("is-on"), 700);
  };

  return (
    <Tag ref={ref} data-roll={rollAttr} className={className} aria-label={text} {...rest}>
      {toChars(text).map((c, i) => (
        <span
          key={i}
          className="roll-ch"
          aria-hidden="true"
          style={{ "--i": i }}
          onMouseEnter={variant === "each" ? flip : undefined}
        >
          <span>{c}</span>
          <span>{c}</span>
        </span>
      ))}
    </Tag>
  );
});

export default RollText;
