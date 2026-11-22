export default function ProductArt({ type, small = false }) {
  return (
    <svg
      className={`product-art ${small ? 'product-art-small' : ''}`}
      viewBox="0 0 220 140"
      role="img"
      aria-label={`${type} illustration`}
    >
      <defs>
        <linearGradient id={`screen-${type}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#383a3d" />
          <stop offset="1" stopColor="#111214" />
        </linearGradient>
        <filter id={`shadow-${type}`} x="-30%" y="-30%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <ellipse cx="110" cy="119" rx="70" ry="6" fill="#141518" opacity=".1" filter={`url(#shadow-${type})`} />
      {type === 'laptop' && (
        <g>
          <rect x="60" y="35" width="100" height="66" rx="5" fill="#d4d5d6" />
          <rect x="65" y="40" width="90" height="55" rx="2" fill={`url(#screen-${type})`} />
          <path d="M75 50h32M75 57h22M75 67h68M75 73h56" stroke="#777b80" strokeWidth="3" opacity=".4" />
          <path d="M48 103h124l-10 10H58z" fill="#dfe0e0" />
          <path d="M94 103h32l-4 3H98z" fill="#b9bbbd" />
        </g>
      )}
      {type === 'mouse' && (
        <g>
          <path d="M110 32c-17 0-28 14-28 34v18c0 20 11 31 28 31s28-11 28-31V66c0-20-11-34-28-34z" fill="#191a1c" />
          <path d="M110 34v34M99 48c4-5 8-7 11-7s7 2 11 7" stroke="#484a4d" strokeWidth="2" fill="none" />
          <rect x="108" y="44" width="4" height="11" rx="2" fill="#777a7d" />
          <path d="M88 74c10 6 34 6 44 0" stroke="#242629" strokeWidth="1" fill="none" opacity=".7" />
        </g>
      )}
      {type === 'keyboard' && (
        <g>
          <rect x="39" y="47" width="142" height="53" rx="8" fill="#17181a" />
          <rect x="45" y="53" width="130" height="41" rx="4" fill="#303236" />
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 14 }, (_, col) => (
              <rect
                key={`${row}-${col}`}
                x={49 + col * 8.8}
                y={57 + row * 8.5}
                width="6.5"
                height="5.5"
                rx="1"
                fill={row === 0 && col === 0 ? '#aaaeb2' : '#777a7e'}
              />
            )),
          )}
          <rect x="78" y="87" width="63" height="3" rx="1.5" fill="#85888c" />
        </g>
      )}
      {type === 'monitor' && (
        <g>
          <rect x="48" y="31" width="124" height="73" rx="6" fill="#d6d7d8" />
          <rect x="53" y="36" width="114" height="63" rx="3" fill={`url(#screen-${type})`} />
          <path d="M61 44h54l-28 48H61z" fill="#fff" opacity=".035" />
          <circle cx="130" cy="67" r="18" fill="#fff" opacity=".035" />
          <path d="M103 104v9M88 114h43" stroke="#a7a9ac" strokeWidth="5" strokeLinecap="round" />
          <path d="M94 112h28l9 5H85z" fill="#d1d2d3" />
        </g>
      )}
    </svg>
  )
}
