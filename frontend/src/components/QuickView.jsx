import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import Img from "./Img";
import RollText from "./RollText";

// "View more" panel for a single product: gallery, sizes and add-to-bag.
export default function QuickView({ product, open, onClose, onAdd }) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);

  // reset whenever a different product is opened
  useEffect(() => {
    setActive(0);
    setSize(null);
    setAdded(false);
  }, [product?.slug]);

  const add = () => {
    if (!size) return;
    onAdd(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Quick view"
      footer={
        product && (
          <button type="button" className={`btn btn--block ${size ? "" : "is-muted"}`} onClick={add} disabled={!size}>
            <RollText
              key={added ? "added" : size ? "add" : "pick"}
              text={added ? "Added to bag ✓" : size ? `Add to bag — $${product.price}` : "Select a size"}
            />
          </button>
        )
      }
    >
      {product && (
        <div className="qv">
          <div className="qv__gallery">
            {product.images.map((src, i) => (
              <Img key={src} src={src} alt={product.alt} className={i === active ? "is-active" : ""} />
            ))}
          </div>
          <div className="qv__thumbs">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={i === active ? "is-active" : ""}
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
              >
                <Img src={src} alt="" />
              </button>
            ))}
          </div>

          <div className="qv__head">
            <h3 className="qv__name">{product.name}</h3>
            <span className="qv__price">${product.price}</span>
          </div>
          <p className="muted">{product.meta}</p>
          <p className="qv__desc">{product.description}</p>

          <p className="qv__label">Size</p>
          <div className="qv__sizes" role="radiogroup" aria-label="Size">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                className={size === s ? "is-active" : ""}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <ul className="qv__details">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
