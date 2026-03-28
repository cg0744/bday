import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Magische zwevende deeltjes
const Particles = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            bottom: `${Math.random() * 40 + 20}%`,
            width: Math.random() * 3 + 1.5,
            height: Math.random() * 3 + 1.5,
            backgroundColor: Math.random() > 0.6 ? '#fcd34d' : '#e9d5ff',
            boxShadow: `0 0 10px ${Math.random() > 0.6 ? '#fcd34d' : '#e9d5ff'}`,
          }}
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0], 
            y: -60 - Math.random() * 100, 
            scale: [0, 1, 0.5] 
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function Section3() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });

  // 1. STAM GROEIT: Van bodem naar top
  const stemGrow = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2, ease: "easeInOut" } }
  };

  // 2. RECHTER BLAD (Laagste punt)
  const leafRightGrow = {
    hidden: { scale: 0, rotate: -25 }, 
    visible: { 
      scale: 1, rotate: 0, 
      transition: { delay: 0.8, duration: 1.2, type: "spring", bounce: 0.2 } 
    }
  };

  // 3. LINKER BLAD (Hoger punt)
  const leafLeftGrow = {
    hidden: { scale: 0, rotate: 25 }, 
    visible: { 
      scale: 1, rotate: 0, 
      transition: { delay: 1.1, duration: 1.2, type: "spring", bounce: 0.2 } 
    }
  };

  // 4. BLOEI EFFECT: De individuele kroonbladeren barsten UIT de top
  const bloomBack = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { delay: 2.4, duration: 1.5, type: "spring", bounce: 0.3 } }
  };

  const bloomLeft = {
    hidden: { scale: 0, rotate: 25 },
    visible: { scale: 1, rotate: 0, transition: { delay: 2.6, duration: 1.5, type: "spring", bounce: 0.3 } }
  };

  const bloomRight = {
    hidden: { scale: 0, rotate: -25 },
    visible: { scale: 1, rotate: 0, transition: { delay: 2.6, duration: 1.5, type: "spring", bounce: 0.3 } }
  };

  const bloomCenter = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { delay: 2.8, duration: 1.2, type: "spring", bounce: 0.2 } }
  };

  // 5. Deinen in de wind
  const swayVariants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: [-1.5, 1.5, -1.5],
      transition: { duration: 6, delay: 4.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden pt-24 pb-0 bg-transparent">
      
      {/* Title */}
      <motion.div 
        className="text-center z-50 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#c084fc] drop-shadow-lg mb-4">
          The Garden
        </h1>
        <p className="text-pink-400 font-medium text-lg md:text-xl tracking-wide drop-shadow-sm">
          A single lavender tulip, blooming just for you.
        </p>
      </motion.div>

      {/* Flower Container */}
      <div ref={containerRef} className="relative w-full max-w-sm md:max-w-md h-[65vh] md:h-[75vh] mt-auto flex justify-center items-end z-30">
        
        <Particles isActive={isInView} />

        <motion.svg 
          viewBox="0 0 400 700" 
          className="w-full h-full overflow-visible drop-shadow-xl"
          variants={swayVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ originX: "200px", originY: "700px" }}
        >
          <defs>
            {/* GROENE PLANT GRADIËNTEN */}
            <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>

            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            {/* JOUW SPECIFIEKE BLOEMBLAADJES GRADIËNTEN */}
            {/* y1="1" is de bodem (aan de steel), y2="0" is de top van het blad */}
            
            {/* Primaire gradiënt (Voor de zijkanten: Links & Rechts) */}
            <linearGradient id="petalPrimary" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#af8cf2" /> 
              <stop offset="100%" stopColor="#c2a7f6" /> 
            </linearGradient>

            {/* Secundaire gradiënt (Voor de Achterkant & het Midden) */}
            <linearGradient id="petalSecondary" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#af8cf2" /> 
              <stop offset="100%" stopColor="#d8c7fa" /> 
            </linearGradient>
          </defs>

          {/* === GROENE PLANT === */}
          <g>
            {/* DE STEEL */}
            <motion.path 
              d="M 200 700 Q 170 475 200 250" 
              stroke="url(#stemGrad)" 
              strokeWidth="10" 
              fill="none"
              strokeLinecap="round"
              variants={stemGrow}
            />

            {/* RECHTER BLAD */}
            <motion.path 
              d="M 195 530 C 280 500 360 380 340 230 C 310 330 250 430 195 530 Z" 
              fill="url(#leafGrad)" 
              opacity="0.95"
              variants={leafRightGrow}
              style={{ originX: "195px", originY: "530px" }}
            />

            {/* LINKER BLAD */}
            <motion.path 
              d="M 185 500 C 100 480 30 350 50 220 C 80 320 140 420 185 500 Z" 
              fill="url(#leafGrad)" 
              opacity="0.9"
              variants={leafLeftGrow}
              style={{ originX: "185px", originY: "500px" }}
            />
          </g>

          {/* === DE BLOEM (Met de juiste kleurenverdeling) === */}
          <g>
            {/* Achterste kroonblad (SECUNDAIR) */}
            <motion.path 
              d="M 200 260 C 120 220 130 80 200 50 C 270 80 280 220 200 260 Z" 
              fill="url(#petalSecondary)" 
              variants={bloomBack}
              style={{ originX: "200px", originY: "260px" }}
            />

            {/* Linker kroonblad (PRIMAIR - Zijkant) */}
            <motion.path 
              d="M 195 260 C 100 220 70 80 140 40 C 170 90 180 170 195 260 Z" 
              fill="url(#petalPrimary)" 
              stroke="#fdf4ff" strokeWidth="2.5" strokeLinejoin="round"
              variants={bloomLeft}
              style={{ originX: "195px", originY: "260px" }}
            />

            {/* Rechter kroonblad (PRIMAIR - Zijkant) */}
            <motion.path 
              d="M 205 260 C 300 220 330 80 260 40 C 230 90 220 170 205 260 Z" 
              fill="url(#petalPrimary)" 
              stroke="#fdf4ff" strokeWidth="2.5" strokeLinejoin="round"
              variants={bloomRight}
              style={{ originX: "205px", originY: "260px" }}
            />

            {/* Middelste kroonblad (SECUNDAIR - Midden) */}
            <motion.path 
              d="M 200 265 C 160 210 165 90 200 60 C 235 90 240 210 200 265 Z" 
              fill="url(#petalSecondary)" 
              stroke="#fdf4ff" strokeWidth="2" strokeLinejoin="round"
              variants={bloomCenter}
              style={{ originX: "200px", originY: "265px" }}
            />
          </g>

        </motion.svg>
      </div>
    </div>
  );
}