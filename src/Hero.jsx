import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lantern from "./Lantern.jsx";
import { PRODUCTS } from "./data.js";

// one lantern that floats in 3D depending on mouse position
function Lamp({ p, i, mx, my }) {
  const depth = [0.6, 1, 1.6, 1, 0.6][i];
  const x = useTransform(mx, [-1, 1], [-depth * 28, depth * 28]);
  const y = useTransform(my, [-1, 1], [-depth * 16, depth * 16]);
  const ry = useTransform(mx, [-1, 1], [-18, 18]);
  return (
    <motion.div
      style={{ x, y, rotateY: ry, z: depth * 60, marginTop: (i % 2) * 34 }}
      initial={{ opacity: 0, y: -160 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 + i * 0.15, duration: 1.1, type: "spring", bounce: 0.35 }}
    >
      <div className="sway" style={{ animationDelay: `${i * 0.5}s` }}>
        <Lantern c={p.color} size={36 + depth * 26} />
      </div>
    </motion.div>
  );
}

const words = "Light up this Diwali".split(" ");

export default function Hero() {
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 14 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 14 });
  useEffect(() => {
    const f = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", f);
    return () => window.removeEventListener("pointermove", f);
  }, [mx, my]);

  const embers = useMemo(
    () => Array.from({ length: 22 }, () => ({ l: Math.random() * 100, d: 6 + Math.random() * 8, s: 2 + Math.random() * 4, w: Math.random() * 6 })),
    []
  );

  return (
    <section className="hero" id="top">
      {embers.map((e, i) => (
        <span key={i} className="ember" style={{ left: `${e.l}%`, width: e.s, height: e.s, animationDuration: `${e.d}s`, animationDelay: `${e.w}s` }} />
      ))}
      <div className="wrap">
        <div className="string">{PRODUCTS.slice(0, 5).map((p, i) => <Lamp key={p.id} p={p} i={i} mx={mx} my={my} />)}</div>
        <h1>
          {words.map((w, i) => (
            <span key={i} className="mask">
              <motion.span initial={{ y: "110%", rotateX: -70 }} animate={{ y: 0, rotateX: 0 }} transition={{ delay: 0.9 + i * 0.12, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }}>
          Handmade Akash Kandils for balconies, doorways and gifting. Pick one you love and message us on WhatsApp.
        </motion.p>
        <motion.a href="#products" className="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
          See all kandils
        </motion.a>
      </div>
    </section>
  );
}
