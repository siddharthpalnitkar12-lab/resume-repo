export const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <rect x="1" y="1" width="62" height="62" fill="none" stroke="#111113" strokeWidth="2" />
    <text x="11" y="45" fontFamily="Playfair Display, serif" fontSize="34" fontStyle="italic" fill="#111113">S</text>
    <text x="31" y="45" fontFamily="Playfair Display, serif" fontSize="34" fill="#111113">P</text>
    <circle cx="53" cy="44" r="3.5" fill="#B83A24" />
  </svg>
);
