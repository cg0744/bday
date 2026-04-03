import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Section3() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Trigger the final message after the flower finishes blooming
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowFinalMessage(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  /* Meadow data generation */
  const clusters = useMemo(() => {
    const numClusters = 7; 
    return Array.from({ length: numClusters }, () => {
      const xOff = 10 + Math.random() * 80;
      const t = xOff / 100;
      const horizonY = 50 * (1 - 2 * t + 2 * t * t);
      const minY = horizonY + 4;
      const maxY = 90;
      const yOff = minY + Math.random() * (maxY - minY); 

      const numBlades = 3 + Math.floor(Math.random() * 2);
      const blades = Array.from({ length: numBlades }, () => {
        const scale = 0.8 + Math.random() * 0.4; 
        const rotate = -25 + Math.random() * 50; 
        const d = "M -1.5 0 Q 1 -6 3 -10 Q 0 -5 1.5 0 Z";
        return { d, scale, rotate };
      });

      return { x: xOff, y: yOff, blades };
    });
  }, []);

  /* Generate Fireflies */
  const fireflies = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // Spread across the width
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: Math.random() * 4 + 2
    }));
  }, []);

  /* Animation variants */
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

  const grassGrow = {
    hidden: { scale: 0 },
    visible: (idx) => ({
      scale: 1,
      transition: { delay: 1.6 + (idx * 0.15), duration: 0.6, ease: "backOut" }
    })
  };

  const swayVariants = {
    hidden: { rotate: 0 },
    visible: {
      rotate: [-1, 1.5, -1],
      transition: { duration: 8, delay: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden pt-24 bg-transparent -mb-8">
      
      {/* Section title & Delayed Final Message */}
      {/* FIXED: Removed absolute positioning so text naturally stacks without overlapping */}
      <div className="text-center z-50 px-6 flex flex-col items-center justify-start min-h-[160px]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Ensures the title doesn't re-animate
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-[#c084fc] drop-shadow-lg mb-6"
        >
          Yes, lavender tulips!
        </motion.h1>
        
        {/* The Final Whisper */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showFinalMessage ? 1 : 0, y: showFinalMessage ? 0 : 10 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-2xl md:text-3xl font-serif italic text-pink-400 drop-shadow-sm"
        >
          I love you so much, Soso.
        </motion.p>
      </div>

      {/* Fireflies Particle System */}
      {isInView && (
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
          {fireflies.map((bug) => (
            <motion.div
              key={bug.id}
              initial={{ opacity: 0, y: "100vh", x: `${bug.x}vw` }}
              animate={{ 
                opacity: [0, 0.8, 1, 0], 
                y: ["80vh", "30vh"],
                x: [`${bug.x}vw`, `${bug.x + (Math.random() * 10 - 5)}vw`]
              }}
              transition={{
                duration: bug.duration,
                repeat: Infinity,
                delay: bug.delay + 3.5, // Start after the flower blooms
                ease: "easeInOut"
              }}
              className="absolute rounded-full bg-yellow-200 blur-[1px] shadow-[0_0_8px_rgba(253,224,71,0.8)]"
              style={{ width: bug.size, height: bug.size }}
            />
          ))}
        </div>
      )}

      {/* Background hill */}
      <div className="absolute inset-x-0 bottom-0 w-full h-[20vh] md:h-[25vh] z-10 pointer-events-none flex items-end translate-y-2 scale-x-105">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14532d" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* FIXED: Added viewport={{ once: true }} so the hill never disappears and re-renders */}
          <motion.path 
            d="M 0 100 L 0 50 Q 50 0 100 50 L 100 100 Z" 
            fill="url(#groundGrad)"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} 
            transition={{ duration: 1.5, ease: "easeOut" }} 
          />

          <g>
            {clusters.map((cluster, cIdx) => (
              <g key={cIdx} transform={`translate(${cluster.x}, ${cluster.y})`}>
                <motion.g
                  custom={cIdx}
                  variants={grassGrow} 
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  {cluster.blades.map((blade, bIdx) => (
                    <path key={bIdx} d={blade.d} fill="#15803d" transform={`scale(${blade.scale}) rotate(${blade.rotate})`} />
                  ))}
                </motion.g>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Foreground flower - Now Interactive! */}
      <div ref={containerRef} className="relative w-full max-w-sm md:max-w-md h-[70vh] md:h-[80vh] mt-auto flex justify-center items-end z-20 pb-[8vh] md:pb-[10vh]">
        <motion.svg 
          viewBox="-50 0 500 700" 
          preserveAspectRatio="xMidYMax meet"
          // FIXED: Tapping makes it grow slightly and gives it a glowing pink aura
          whileTap={{ scale: 1.05, filter: "drop-shadow(0px 0px 20px rgba(232,121,249,0.8)) brightness(1.1)" }}
          className="w-full h-full overflow-visible drop-shadow-2xl cursor-pointer"
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

          {/* Stem and leaves section */}
          <g>
            <motion.path 
              d="M 200 700 Q 185 450 200 240" 
              stroke="url(#stemGrad)" strokeWidth="12" fill="none" strokeLinecap="round"
              variants={stemGrow}
            />

            <motion.path 
              d="M 202 500 C 290 470 380 340 350 180 C 310 290 240 390 202 500 Z" 
              fill="url(#leafGradRight)" 
              variants={leafGrow(1.0)}
              style={{ transformOrigin: "200px 500px", transformBox: "view-box" }}
            />

            <motion.path 
              d="M 198 450 C 100 430 20 300 40 150 C 80 260 140 350 198 450 Z" 
              fill="url(#leafGradLeft)" 
              variants={leafGrow(1.3)}
              style={{ transformOrigin: "200px 450px", transformBox: "view-box" }}
            />
          </g>

          {/* Petals section */}
          <g>
            <motion.path 
              d="M 200 240 C 150 230 140 90 170 60 C 185 45 215 45 230 60 C 260 90 250 230 200 240 Z" 
              fill="url(#petalBack)" 
              variants={bloom(2.5)} style={{ transformOrigin: "200px 240px", transformBox: "view-box" }} 
            />

            <motion.path 
              d="M 200 240 C 100 220 100 80 150 40 C 175 20 190 70 200 130 C 200 170 205 220 200 240 Z" 
              fill="url(#petalSide)" stroke="#fdf4ff" strokeWidth="1.5" strokeLinejoin="round"
              variants={bloom(2.7, -15, 0)} style={{ transformOrigin: "200px 240px", transformBox: "view-box" }} 
            />

            <motion.path 
              d="M 200 240 C 300 220 300 80 250 40 C 225 20 210 70 200 130 C 200 170 195 220 200 240 Z" 
              fill="url(#petalSide)" stroke="#fdf4ff" strokeWidth="1.5" strokeLinejoin="round"
              variants={bloom(2.9, 15, 0)} style={{ transformOrigin: "200px 240px", transformBox: "view-box" }} 
            />

            <motion.path 
              d="M 200 240 C 160 180 160 100 200 60 C 240 100 240 180 200 240 Z" 
              fill="url(#petalFront)" stroke="#fdf4ff" strokeWidth="2" strokeLinejoin="round"
              variants={bloom(3.1)} style={{ transformOrigin: "200px 240px", transformBox: "view-box" }} 
            />
          </g>
        </motion.svg>
      </div>
    </div>
  );
}