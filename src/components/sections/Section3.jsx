import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Section3() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });

  const stemGrow = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 3, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const leafRightGrow = {
    hidden: { scale: 0.2, rotate: -40, opacity: 0 }, 
    visible: { scale: 1, rotate: 0, opacity: 0.95, transition: { delay: 1.2, duration: 2.5, ease: "circOut" } }
  };

  const leafLeftGrow = {
    hidden: { scale: 0.2, rotate: 40, opacity: 0 }, 
    visible: { scale: 1, rotate: 0, opacity: 0.9, transition: { delay: 1.6, duration: 2.5, ease: "circOut" } }
  };

  const bloomBack = {
    hidden: { scale: 0.3, opacity: 0, y: 20 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { delay: 3.0, duration: 3, ease: [0.22, 1, 0.36, 1] } }
  };

  const bloomLeft = {
    hidden: { scale: 0.3, rotate: 35, opacity: 0, x: 10, y: 15 },
    visible: { scale: 1, rotate: 0, opacity: 1, x: 0, y: 0, transition: { delay: 3.4, duration: 2.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const bloomRight = {
    hidden: { scale: 0.3, rotate: -35, opacity: 0, x: -10, y: 15 },
    visible: { scale: 1, rotate: 0, opacity: 1, x: 0, y: 0, transition: { delay: 3.6, duration: 2.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const bloomCenter = {
    hidden: { scale: 0.2, opacity: 0, y: 10 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { delay: 4.0, duration: 2.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const swayVariants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: [-1.2, 1.8, -1.5, 1.2, -1.2],
      transition: { duration: 12, delay: 5.5, repeat: Infinity, ease: "easeInOut" }
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
          Yes, tulips!
        </h1>
      </motion.div>

      {/* === BACKGROUND: THE SEAMLESS HILL (z-10) === */}
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

      {/* === FOREGROUND: THE FLOWER (z-20) === */}
      <div ref={containerRef} className="relative w-full max-w-sm md:max-w-md h-[70vh] md:h-[80vh] mt-auto flex justify-center items-end z-20 pb-[8vh] md:pb-[10vh]">
        
        <motion.svg 
          viewBox="0 0 400 700" 
          className="w-full h-full overflow-visible drop-shadow-xl"
          variants={swayVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ originX: "200px", originY: "700px" }}
        >
          <defs>
            {/* Tapered Stem Gradient: Fades to transparent at the base to blend into the hill without a shadow */}
            <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="85%" stopColor="#166534" stopOpacity="1" />
              <stop offset="100%" stopColor="#166534" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            
            <linearGradient id="petalPrimary" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#af8cf2" /> 
              <stop offset="100%" stopColor="#c2a7f6" /> 
            </linearGradient>

            <linearGradient id="petalSecondary" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#af8cf2" /> 
              <stop offset="100%" stopColor="#d8c7fa" /> 
            </linearGradient>
          </defs>

          {/* GROENE PLANT */}
          <g>
            <motion.path 
              d="M 200 700 Q 170 475 200 250" 
              stroke="url(#stemGrad)" 
              strokeWidth="10" 
              fill="none"
              strokeLinecap="round"
              variants={stemGrow}
            />

            <motion.path 
              d="M 195 530 C 280 500 360 380 340 230 C 310 330 250 430 195 530 Z" 
              fill="url(#leafGrad)" 
              variants={leafRightGrow}
              style={{ originX: "195px", originY: "530px" }}
            />

            <motion.path 
              d="M 185 500 C 100 480 30 350 50 220 C 80 320 140 420 185 500 Z" 
              fill="url(#leafGrad)" 
              variants={leafLeftGrow}
              style={{ originX: "185px", originY: "500px" }}
            />
          </g>

          {/* DE BLOEM */}
          <g>
            <motion.path d="M 200 260 C 120 220 130 80 200 50 C 270 80 280 220 200 260 Z" fill="url(#petalSecondary)" variants={bloomBack} style={{ originX: "200px", originY: "260px" }} />
            <motion.path d="M 195 260 C 100 220 70 80 140 40 C 170 90 180 170 195 260 Z" fill="url(#petalPrimary)" stroke="#fdf4ff" strokeWidth="2.5" strokeLinejoin="round" variants={bloomLeft} style={{ originX: "195px", originY: "260px" }} />
            <motion.path d="M 205 260 C 300 220 330 80 260 40 C 230 90 220 170 205 260 Z" fill="url(#petalPrimary)" stroke="#fdf4ff" strokeWidth="2.5" strokeLinejoin="round" variants={bloomRight} style={{ originX: "205px", originY: "260px" }} />
            <motion.path d="M 200 265 C 160 210 165 90 200 60 C 235 90 240 210 200 265 Z" fill="url(#petalSecondary)" stroke="#fdf4ff" strokeWidth="2" strokeLinejoin="round" variants={bloomCenter} style={{ originX: "200px", originY: "265px" }} />
          </g>
        </motion.svg>
      </div>
    </div>
  );
}