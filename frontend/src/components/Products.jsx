import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import RollText from "./RollText";

export default function Products({ products, onOpen }) {
  return (
    <section className="section" id="shop">
      <div className="section__head">
        <Reveal as="h2" className="h2" text="New arrivals" />
        <RollText as="a" href="#collections" className="link-arrow" variant="side" text="Shop by collection →" />
      </div>

      <div className="products">
        {products
          ? products.map((p) => <ProductCard key={p.id} product={p} onOpen={onOpen} />)
          : Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="product product--skeleton">
                <div className="product__media" />
                <div className="skeleton-line" />
              </div>
            ))}
      </div>
    </section>
  );
}
