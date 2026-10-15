import HoverMedia from "./HoverMedia";
import RollText from "./RollText";

export default function ProductCard({ product, onOpen }) {
  return (
    <article className="product roll-host">
      <HoverMedia
        className="product__media"
        images={product.images}
        alt={product.alt}
        onOpen={() => onOpen(product)}
      />
      <div className="product__info">
        <RollText as="h3" text={product.name} />
        <span>${product.price}</span>
      </div>
      <p className="product__meta">{product.meta}</p>
    </article>
  );
}
