import { motion } from 'framer-motion';

/**
 * A glossy, layered "coin" illustration built from gradients + highlights
 * to read as a dimensional 3D object without external model assets.
 */
export default function FloatingCoin({ size = 120, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        animate={{ y: [0, -10, 0], rotate: [0, 3, 0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.35))' }}
      >
        <defs>
          <radialGradient id="coinFace" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#eaffdf" />
            <stop offset="35%" stopColor="#2dd4a7" />
            <stop offset="100%" stopColor="#0e7a5f" />
          </radialGradient>
          <linearGradient id="coinRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1fa483" />
            <stop offset="100%" stopColor="#0b5a45" />
          </linearGradient>
          <linearGradient id="coinShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="112" rx="72" ry="70" fill="url(#coinRim)" />
        <circle cx="100" cy="98" r="72" fill="url(#coinFace)" />
        <circle cx="100" cy="98" r="72" fill="none" stroke="#0b5a45" strokeOpacity="0.25" strokeWidth="3" />
        <circle cx="100" cy="98" r="56" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 6" />
        <ellipse cx="72" cy="66" rx="30" ry="16" fill="url(#coinShine)" opacity="0.55" />
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="46"
          fontWeight="700"
          fill="#06120f"
          opacity="0.85"
        >
          $
        </text>
      </motion.svg>
    </motion.div>
  );
}
