// ====== EDIT THESE ======
export const WHATSAPP = "+918554070686"; // country code + number, no + or spaces
export const BRAND = "Akash Kandil";
export const PRODUCTS = [
  { id: 1, name: "Classic Paper Kandil", desc: "Traditional pleated lantern in bright festive colours.", price: 199, color: ["#F5A524", "#E0457B"], tag: "Bestseller" },
  { id: 2, name: "Star Kandil", desc: "Five-point star that lights up your balcony.", price: 299, color: ["#FFD27A", "#F5A524"] },
  { id: 3, name: "LED Glow Lantern", desc: "Battery LED included. Safe, bright, reusable.", price: 449, color: ["#FF8A3D", "#E0457B"], tag: "New" },
  { id: 4, name: "Bamboo Handmade Kandil", desc: "Eco-friendly bamboo frame made by local artisans.", price: 549, color: ["#C98A2B", "#7A4A12"] },
  { id: 5, name: "Hanging Combo (Pack of 3)", desc: "Three sizes in one set for doorways and windows.", price: 699, color: ["#E0457B", "#8E2DE2"], tag: "Save 15%" },
  { id: 6, name: "Mini Gift Kandil", desc: "Small table kandil, ideal for return gifts.", price: 99, color: ["#FFB347", "#FF5E62"] },
];
export const wa = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
