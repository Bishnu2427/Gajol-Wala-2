import { scrollTo } from "../smooth";
import HoverMedia from "./HoverMedia";
import Reveal from "./Reveal";
import RollText from "./RollText";

const goToShop = () => {
  const el = document.getElementById("shop");
  if (el) scrollTo(el);
};

export default function Hero({ brand, hero }) {
  return (
    <section className="hero">
      <div className="hero__top">
        {hero && <Reveal className="eyebrow" text={hero.eyebrow} />}
        {hero && <Reveal className="hero__intro" text={hero.intro} />}
      </div>

      <RollText as="h1" className="wordmark" variant="each" text={brand} />

      <div className="hero__grid">
        {(hero?.images ?? [{}, { tall: true }, {}]).map((im, i) => (
          <figure key={i} className={`hero__img ${im.tall ? "hero__img--tall" : ""}`}>
            {im.images ? (
              <HoverMedia className="hero__frame" images={im.images} alt={im.alt} eager onOpen={goToShop} />
            ) : (
              <div className="hero__frame hero__frame--empty" />
            )}
            <figcaption>
              <span>{im.no ?? "—"}</span> {im.title ?? ""}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="hero__cta">
        <RollText as="a" href="#shop" className="btn" text="Shop the season" />
        <RollText as="a" href="#lookbook" className="link-arrow" variant="side" text="View lookbook →" />
      </div>
    </section>
  );
}
