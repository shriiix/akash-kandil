import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, wa } from "./data.js";

export default function OrderForm() {
  const [f, setF] = useState({ name: "", product: PRODUCTS[0].name, qty: 1, note: "" });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Please enter your name.");
    if (!(f.qty >= 1)) return setErr("Quantity must be at least 1.");
    setErr("");
    const msg = `Hi! I'm ${f.name.trim()}. I'm interested in buying ${f.qty} × ${f.product}.` + (f.note.trim() ? `\n${f.note.trim()}` : "");
    window.open(wa(msg), "_blank", "noopener");
    setSent(true);
  };

  return (
    <section id="order">
      <div className="wrap">
        <h2 className="h2">Place your order</h2>
        <p className="sub">Fill this in and WhatsApp opens with your message ready to send.</p>
        <motion.form className="form" onSubmit={submit} initial={{ opacity: 0, y: 50, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} style={{ transformPerspective: 900 }}>
          <div className="row">
            <label>Your name<input value={f.name} onChange={set("name")} placeholder="e.g. Priya Sharma" autoComplete="name" /></label>
            <label>Quantity<input type="number" min="1" value={f.qty} onChange={set("qty")} /></label>
          </div>
          <label>Kandil
            <select value={f.product} onChange={set("product")}>
              {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name} – ₹{p.price}</option>)}
            </select>
          </label>
          <label>Note (optional)<textarea rows="3" value={f.note} onChange={set("note")} placeholder="Delivery area, colour choice, gift message…" /></label>
          <AnimatePresence>{err && <motion.div className="err" role="alert" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>{err}</motion.div>}</AnimatePresence>
          <motion.button className="btn wa" type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>Send order on WhatsApp</motion.button>
          <AnimatePresence>{sent && <motion.div className="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>WhatsApp opened. Press send there to place your order.</motion.div>}</AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
