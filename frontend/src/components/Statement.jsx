import Reveal from "./Reveal";
import RollText from "./RollText";

export default function Statement({ brand }) {
  return (
    <section className="statement" id="about">
      <Reveal
        className="statement__text"
        text={`We make fewer things, better. Every ${brand} piece is cut from honest fabrics, sewn in small batches and designed to outlast the season it was made for.`}
      />
      <RollText as="a" href="#" className="link-arrow" variant="side" text="Our story →" />
    </section>
  );
}
