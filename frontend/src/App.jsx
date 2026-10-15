import { useCallback, useEffect, useState } from "react";
import { getSite } from "./api";
import { initSmoothScroll } from "./smooth";
import BagDrawer from "./components/BagDrawer";
import Collections from "./components/Collections";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Lookbook from "./components/Lookbook";
import Marquee from "./components/Marquee";
import Newsletter from "./components/Newsletter";
import Products from "./components/Products";
import QuickView from "./components/QuickView";
import Statement from "./components/Statement";

// Change the brand name here once it's final.
const BRAND = "DemoSite";
const BAG_KEY = "demosite-bag";

const loadBag = () => {
  try {
    return JSON.parse(localStorage.getItem(BAG_KEY)) || [];
  } catch {
    return [];
  }
};

export default function App() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState("");
  const [bag, setBag] = useState(loadBag);
  const [bagOpen, setBagOpen] = useState(false);
  const [quick, setQuick] = useState(null); // product shown in quick view
  const [quickOpen, setQuickOpen] = useState(false);

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    getSite()
      .then(setSite)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(BAG_KEY, JSON.stringify(bag));
    } catch {
      /* storage unavailable — bag just won't persist */
    }
  }, [bag]);

  const openQuick = useCallback((product) => {
    setQuick(product);
    setQuickOpen(true);
  }, []);
  const closeQuick = useCallback(() => setQuickOpen(false), []);
  const openBag = useCallback(() => setBagOpen(true), []);
  const closeBag = useCallback(() => setBagOpen(false), []);

  const addToBag = useCallback((product, size) => {
    const key = `${product.slug}-${size}`;
    setBag((items) => {
      const existing = items.find((it) => it.key === key);
      if (existing) return items.map((it) => (it.key === key ? { ...it, qty: it.qty + 1 } : it));
      return [...items, { key, size, qty: 1, name: product.name, price: product.price, image: product.images[0] }];
    });
  }, []);

  const removeFromBag = useCallback((key) => setBag((items) => items.filter((it) => it.key !== key)), []);

  const bagCount = bag.reduce((n, it) => n + it.qty, 0);

  return (
    <>
      <Intro name={BRAND} />
      <Header brand={BRAND} bagCount={bagCount} onBag={openBag} />

      <main id="top">
        {error && (
          <p className="api-error">
            Couldn't reach the API ({error}). Is the Flask server running on port 5000?
          </p>
        )}
        <Hero brand={BRAND} hero={site?.hero} />
        <Marquee items={site?.marquee} />
        <Products products={site?.products} onOpen={openQuick} />
        <Statement brand={BRAND} />
        <Collections collections={site?.collections} />
        <Lookbook lookbook={site?.lookbook} />
        <Newsletter />
      </main>

      <Footer brand={BRAND} />

      <QuickView product={quick} open={quickOpen} onClose={closeQuick} onAdd={addToBag} />
      <BagDrawer open={bagOpen} onClose={closeBag} items={bag} onRemove={removeFromBag} />
    </>
  );
}
