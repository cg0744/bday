import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Section3() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });

  // --- Animation Variants ---
  const stemGrow = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2.5, ease: "easeInOut" } }
  };

  const leafGrow = (delay) => ({
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { delay, duration: 1.8, ease: "easeOut" } }
  });

  const bloom = (delay, startRotation = 0, endRotation = 0) => ({
    hidden: { scale: 0, rotate: startRotation },
    visible: { scale: 1, rotate: endRotation, transition: { delay, duration: 1.8, ease: [0.22, 1, 0.36, 1] } }
  });

  const swayVariants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: [-1, 1.5, -1],
      transition: { duration: 8, delay: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden pt-24 pb-0 bg-transparent">
      
      {/* Title */}
      <motion.div 
        className="text-center z-50 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#c084fc] drop-shadow-lg mb-4">
          Yes, lavender tulips!
        </h1>
      </motion.div>

      {/* --- BACKGROUND HILL --- */}
      <div className="absolute inset-x-0 bottom-0 w-full h-[20vh] md:h-[25vh] z-10 pointer-events-none flex items-end translate-y-1">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14532d" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <motion.path 
            d="M 0 100 L 0 50 Q 50 0 100 50 L 100 100 Z" 
            fill="url(#groundGrad)"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* --- FOREGROUND FLOWER --- */}
      <div ref={containerRef} className="relative w-full max-w-sm md:max-w-md h-[70vh] md:h-[80vh] mt-auto flex justify-center items-end z-20 pb-[8vh] md:pb-[10vh]">
  
        <motion.svg 
          viewBox="-50 0 500 700" 
          preserveAspectRatio="xMidYMax meet" /* <--- ADD THIS LINE */
          className="w-full h-full overflow-visible drop-shadow-2xl"
          variants={swayVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ transformOrigin: "200px 700px" }}
        >
          <defs>
            <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            <linearGradient id="leafGradLeft" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>

            <linearGradient id="leafGradRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            
            <linearGradient id="petalBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" /> 
              <stop offset="100%" stopColor="#7e22ce" /> 
            </linearGradient>

            <linearGradient id="petalSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" /> 
              <stop offset="100%" stopColor="#9333ea" /> 
            </linearGradient>

            <linearGradient id="petalFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e879f9" /> 
              <stop offset="100%" stopColor="#a855f7" /> 
            </linearGradient>
          </defs>

          {/* === STEM & LEAVES === */}
          <g>
            {/* Stem ending exactly at 200, 240 */}
            <motion.path 
              d="M 200 700 Q 185 450 200 240" 
              stroke="url(#stemGrad)" 
              strokeWidth="12" 
              fill="none"
              strokeLinecap="round"
              variants={stemGrow}
            />

            {/* Right Leaf */}
            <motion.path 
              d="M 202 500 C 290 470 380 340 350 180 C 310 290 240 390 202 500 Z" 
              fill="url(#leafGradRight)" 
              variants={leafGrow(1.0)}
              style={{ transformOrigin: "200px 500px", transformBox: "view-box" }}
            />

            {/* Left Leaf */}
            <motion.path 
              d="M 198 450 C 100 430 20 300 40 150 C 80 260 140 350 198 450 Z" 
              fill="url(#leafGradLeft)" 
              variants={leafGrow(1.3)}
              style={{ transformOrigin: "200px 450px", transformBox: "view-box" }}
            />
          </g>

          {/* === TULIP PETALS === */}
          <g>
            {/* Back Petal */}
            <motion.path 
              d="M 200 240 C 150 230 140 90 170 60 C 185 45 215 45 230 60 C 260 90 250 230 200 240 Z" 
              fill="url(#petalBack)" 
              variants={bloom(2.5)} 
              style={{ transformOrigin: "200px 240px", transformBox: "view-box" }} 
            />

            {/* Left Outer Petal */}
            <motion.path 
              d="M 200 240 C 100 220 100 80 150 40 C 175 20 190 70 200 130 C 200 170 205 220 200 240 Z" 
              fill="url(#petalSide)" 
              stroke="#fdf4ff" strokeWidth="1.5" strokeLinejoin="round"
              variants={bloom(2.7, -15, 0)} 
              style={{ transformOrigin: "200px 240px", transformBox: "view-box" }} 
            />

            {/* Right Outer Petal */}
            <motion.path 
              d="M 200 240 C 300 220 300 80 250 40 C 225 20 210 70 200 130 C 200 170 195 220 200 240 Z" 
              fill="url(#petalSide)" 
              stroke="#fdf4ff" strokeWidth="1.5" strokeLinejoin="round"
              variants={bloom(2.9, 15, 0)} 
              style={{ transformOrigin: "200px 240px", transformBox: "view-box" }} 
            />

            {/* Center Front Petal */}
            <motion.path 
              d="M 200 240 C 160 180 160 100 200 60 C 240 100 240 180 200 240 Z" 
              fill="url(#petalFront)" 
              stroke="#fdf4ff" strokeWidth="2" strokeLinejoin="round"
              variants={bloom(3.1)} 
              style={{ transformOrigin: "200px 240px", transformBox: "view-box" }} 
            />
          </g>
        </motion.svg>
      </div>
    </div>
  );
}