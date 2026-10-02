import { useEffect } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "./Hero.jsx";
import Products from "./Products.jsx";
import OrderForm from "./OrderForm.jsx";
import { BRAND, wa } from "./data.js";

const WHY = [
  ["Made by hand", "Every kandil is folded and finished by hand, so no two look exactly alike."],
  ["Ready to hang", "Comes assembled with a hook and string. Open the box and light it up."],
  ["Order in minutes", "No sign-up. Send us a WhatsApp message and we confirm price and delivery."],
];

export default function App() {
  // buttery smooth scrolling
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.2, anchors: true });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <header className="nav">
        <div className="wrap">
          <a href="#top" className="logo">🪔 {BRAND}</a>
          <nav>
            <a href="#products">Kandils</a>
            <a href="#why">Why us</a>
            <a href="#order" className="btn cta">Order now</a>
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <Products />
        <section id="why" className="alt">
          <div className="wrap">
            <h2 className="h2" style={{ marginBottom: 32 }}>Why families choose us</h2>
            <div className="why">
              {WHY.map(([t, d], i) => (
                <motion.div key={t} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}>
                  <h3>{t}</h3><p>{d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <OrderForm />
      </main>
      <footer><div className="wrap">🪔 {BRAND} · Happy Diwali!</div></footer>
      <motion.a className="fab" href={wa("Hi! I have a question about your Akash Kandils.")} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2, type: "spring" }} whileHover={{ scale: 1.12, rotate: -8 }}>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.6-.1 1.2z" />
        </svg>
      </motion.a>
    </>
  );
}
