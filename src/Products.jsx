import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lantern from "./Lantern.jsx";
import { PRODUCTS, wa } from "./data.js";

// 3D tilt card with moving glare
function TiltCard({ p, i }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 });
  const glare = useTransform([x, y], ([a, b]) => `radial-gradient(circle at ${(a + 0.5) * 100}% ${(b + 0.5) * 100}%, rgba(255,210,122,.28), transparent 55%)`);
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.div initial={{ opacity: 0, y: 60, rotateX: 25 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.2, 0.8, 0.2, 1] }} style={{ perspective: 900 }}>
      <motion.a
        className="card"
        href={wa(`Hi! I'm interested in buying the ${p.name} (₹${p.price}). Is it available?`)}
        target="_blank" rel="noopener" aria-label={`Order ${p.name} on WhatsApp`}
        onPointerMove={move} onPointerLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.div className="glare" style={{ background: glare }} />
        {p.tag && <span className="tag" style={{ transform: "translateZ(50px)" }}>{p.tag}</span>}
        <div className="art" style={{ transform: "translateZ(70px)" }}><Lantern c={p.color} size={72} /></div>
        <h3 style={{ transform: "translateZ(40px)" }}>{p.name}</h3>
        <p className="d" style={{ transform: "translateZ(25px)" }}>{p.desc}</p>
        <span className="price" style={{ transform: "translateZ(40px)" }}>₹{p.price}</span>
        <span className="go" style={{ transform: "translateZ(30px)" }}>I want this on WhatsApp</span>
      </motion.a>
    </motion.div>
  );
}

export default function Products() {
  return (
    <section id="products">
      <div className="wrap">
        <motion.h2 className="h2" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Our Akash Kandils</motion.h2>
        <motion.p className="sub" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Tap any kandil and WhatsApp opens with the message ready to send.
        </motion.p>
        <div className="grid">{PRODUCTS.map((p, i) => <TiltCard key={p.id} p={p} i={i} />)}</div>
      </div>
    </section>
  );
}
