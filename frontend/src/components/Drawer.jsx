import { useEffect, useRef } from "react";
import { lockScroll } from "../smooth";
import RollText from "./RollText";

// Side panel that slides in from the right. Closes on Esc, the overlay, or the close button.
export default function Drawer({ open, onClose, title, children, footer }) {
  const closeRef = useRef(null);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const prev = document.activeElement;
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      prev?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer__overlay" onClick={onClose} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label={title}>
        <div className="drawer__head">
          <span className="drawer__title">{title}</span>
          <RollText as="button" type="button" text="Close" onClick={onClose} ref={closeRef} />
        </div>
        <div className="drawer__body" data-lenis-prevent>
          {children}
        </div>
        {footer && <div className="drawer__foot">{footer}</div>}
      </aside>
    </div>
  );
}
