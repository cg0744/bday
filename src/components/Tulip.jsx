import { motion } from 'framer-motion';

export default function Tulip({ color, onClick }) {
  return (
    <motion.svg
      // Wiggle on hover, squish slightly when clicked!
      whileHover={{ scale: 1.1, rotate: [-3, 3, -3], transition: { repeat: Infinity, duration: 0.8 } }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-16 h-24 md:w-20 md:h-32 cursor-pointer drop-shadow-md origin-bottom z-20 relative"
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <path d="M50 70 V 140" stroke="#a7f3d0" strokeWidth="6" strokeLinecap="round" />
      
      {/* Left Leaf */}
      <path d="M50 120 C 30 120 10 90 20 70 C 25 85 40 105 50 110" fill="#a7f3d0" />
      
      {/* Right Leaf */}
      <path d="M50 110 C 70 110 90 80 80 60 C 75 75 60 95 50 100" fill="#a7f3d0" />
      
      {/* Main Back Petal Base */}
      <path d="M25 40 C 25 80 75 80 75 40 C 75 10 50 20 50 20 C 50 20 25 10 25 40 Z" fill={color} />
      
      {/* Front Center Petal Overlay (Creates depth!) */}
      <path d="M38 30 C 38 70 62 70 62 30 C 62 15 50 10 50 10 C 50 10 38 15 38 30 Z" fill="rgba(255,255,255,0.25)" />
    </motion.svg>
  );
}