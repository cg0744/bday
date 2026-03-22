import { motion } from 'framer-motion';

export default function Tulip({ color, delay, duration }) {
  return (
    <motion.div
      className="w-full h-full origin-bottom flex justify-center items-end drop-shadow-md"
      // The wind effect! Swaying back and forth seamlessly.
      animate={{ rotate: [-3, 5, -2, 4, -3] }}
      transition={{
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <svg 
        viewBox="0 0 200 400" 
        className="w-full h-full overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curving Stem */}
        <path d="M100,120 Q95,250 100,400" stroke="#86efac" strokeWidth="6" strokeLinecap="round" />
        
        {/* Sweeping Left Leaf */}
        <path d="M100,350 Q50,280 20,220 Q60,260 100,300" fill="#6ee7b7" />
        
        {/* Sweeping Right Leaf */}
        <path d="M100,320 Q150,250 180,180 Q140,230 100,280" fill="#34d399" />
        
        {/* --- FLOWER HEAD --- */}
        {/* Back Wide Petal */}
        <path d="M40,100 C40,180 160,180 160,100 C160,30 120,50 100,70 C80,50 40,30 40,100 Z" fill={color} />
        
        {/* Left Inner Petal (Adds highlight/depth) */}
        <path d="M60,90 C60,150 100,160 100,160 C100,160 100,90 85,60 C75,70 65,80 60,90 Z" fill="rgba(255,255,255,0.25)" />
        
        {/* Right Inner Petal (Adds shadow/depth) */}
        <path d="M140,90 C140,150 100,160 100,160 C100,160 100,90 115,60 C125,70 135,80 140,90 Z" fill="rgba(0,0,0,0.15)" />
        
        {/* Center Front Petal */}
        <path d="M75,110 C75,160 125,160 125,110 C125,60 100,55 100,55 C100,55 75,60 75,110 Z" fill={color} />
      </svg>
    </motion.div>
  );
}