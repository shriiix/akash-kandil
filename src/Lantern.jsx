export default function Lantern({ c, size = 100 }) {
  const [a, b] = c;
  const id = "g" + a.slice(1) + b.slice(1);
  return (
    <svg viewBox="0 0 100 150" width={size} height={size * 1.5} className="lamp" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <line x1="50" y1="0" x2="50" y2="18" stroke="#FFD27A" strokeWidth="2" />
      <rect x="34" y="18" width="32" height="10" rx="3" fill="#7A4A12" />
      <path d="M30 28 H70 Q96 62 70 104 H30 Q4 62 30 28Z" fill={`url(#${id})`} />
      <path d="M50 28 V104 M40 28 Q24 66 40 104 M60 28 Q76 66 60 104" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" fill="none" />
      <rect x="34" y="104" width="32" height="9" rx="3" fill="#7A4A12" />
      <path d="M42 113 V140 M50 113 V146 M58 113 V140" stroke="#FFD27A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
