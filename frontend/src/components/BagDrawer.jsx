import { scrollTo } from "../smooth";
import Drawer from "./Drawer";
import Img from "./Img";
import RollText from "./RollText";

export default function BagDrawer({ open, onClose, items, onRemove }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={`Bag (${items.reduce((n, it) => n + it.qty, 0)})`}
      footer={
        items.length > 0 && (
          <>
            <div className="bag__total">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <button type="button" className="btn btn--block">
              <RollText text="Checkout" />
            </button>
          </>
        )
      }
    >
      {items.length === 0 ? (
        <div className="bag__empty">
          <p>Your bag is empty.</p>
          <RollText
            as="button"
            type="button"
            className="link-arrow"
            variant="side"
            text="Continue shopping →"
            onClick={() => {
              onClose();
              // wait for the drawer to slide away and scrolling to unlock
              setTimeout(() => {
                const shop = document.getElementById("shop");
                if (shop) scrollTo(shop);
              }, 450);
            }}
          />
        </div>
      ) : (
        <ul className="bag__list">
          {items.map((it) => (
            <li key={it.key} className="bag__item">
              <div className="bag__thumb">
                <Img src={it.image} alt={it.name} />
              </div>
              <div className="bag__info">
                <span>{it.name}</span>
                <span className="muted">
                  Size {it.size} · Qty {it.qty}
                </span>
                <RollText as="button" type="button" className="bag__remove" text="Remove" onClick={() => onRemove(it.key)} />
              </div>
              <span>${it.price * it.qty}</span>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
