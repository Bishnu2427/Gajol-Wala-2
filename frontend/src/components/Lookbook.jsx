import { scrollTo } from "../smooth";
import HoverMedia from "./HoverMedia";
import Reveal from "./Reveal";
import RollText from "./RollText";

const goToShop = () => {
  const el = document.getElementById("shop");
  if (el) scrollTo(el);
};

export default function Lookbook({ lookbook }) {
  if (!lookbook) return null;

  return (
    <section className="lookbook" id="lookbook">
      <div className="lookbook__text">
        <Reveal className="eyebrow" text={lookbook.eyebrow} />
        <Reveal as="h2" className="h2 h2--xl" text={lookbook.title} />
        <Reveal className="muted" text={lookbook.text} />
        <RollText as="a" href="#shop" className="btn" text="Shop the look" />
      </div>
      <div className="lookbook__imgs">
        {lookbook.images.map((im) => (
          <HoverMedia key={im.images[0]} className="lookbook__img" images={im.images} alt={im.alt} onOpen={goToShop} />
        ))}
      </div>
    </section>
  );
}
