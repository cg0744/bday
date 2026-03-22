import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tulip from '../Tulip';

// The new, larger swaying grass component with natural, darker greens!
const SwayingGrass = ({ delay, duration, scale = 1, className }) => (
  <motion.div
    className={`origin-bottom drop-shadow-sm absolute ${className}`}
    style={{ width: `${40 * scale}px`, height: `${64 * scale}px` }}
    animate={{ rotate: [-10, 15, -12, 10, -10] }}
    transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 50 100" fill="none" className="w-full h-full overflow-visible">
      <path d="M25,100 Q10,50 0,20 Q15,60 25,100" fill="#6b8a62" />
      <path d="M25,100 Q40,40 50,10 Q35,60 25,100" fill="#527359" />
      <path d="M25,100 Q25,40 20,10" stroke="#3d5c43" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  </motion.div>
);

// Back Layer Tulips (Plunged deep behind the back hill so they never float!)
const backTulips = [
  { id: 1, color: "#d8b4e2", left: "15%", scale: 0.6, delay: 0, duration: 6.5, bottom: "24vh" },
  { id: 2, color: "#c4b5fd", left: "35%", scale: 0.65, delay: 1.2, duration: 7, bottom: "16vh" },
  { id: 3, color: "#e9d5ff", left: "65%", scale: 0.55, delay: 0.5, duration: 6, bottom: "12vh" },
  { id: 4, color: "#c084fc", left: "85%", scale: 0.6, delay: 2.1, duration: 7.5, bottom: "22vh" },
];

// Front Layer Tulips (Plunged deep behind the front hill)
const frontTulips = [
  { id: 5, color: "#a855f7", left: "10%", scale: 0.8, delay: 0.3, duration: 5, bottom: "4vh" },
  { id: 6, color: "#c084fc", left: "30%", scale: 0.9, delay: 1.5, duration: 5.5, bottom: "5vh" },
  { id: 7, color: "#e9d5ff", left: "55%", scale: 0.85, delay: 0.7, duration: 4.8, bottom: "14vh" },
  { id: 8, color: "#c4b5fd", left: "75%", scale: 0.95, delay: 1.8, duration: 5.2, bottom: "20vh" },
  { id: 9, color: "#d8b4e2", left: "90%", scale: 0.8, delay: 0.1, duration: 4.9, bottom: "14vh" },
];

export default function Section3({ scrollYProgress }) {
  const containerRef = useRef(null);
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    // Changed to min-h-[100dvh] to ensure it covers the screen properly
    <div ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col items-center overflow-hidden bg-gradient-to-b from-transparent to-pink-50">
      
      {/* Title */}
      <motion.div style={{ opacity: titleOpacity, y: titleY }} className="mt-24 text-center z-50 relative">
        <h1 className="text-5xl font-extrabold text-[#c084fc] drop-shadow-lg mb-4">
          The Garden
        </h1>
        <p className="text-pink-400 font-medium text-xl tracking-wide drop-shadow-sm">
          A field of lavender, just for you.
        </p>
      </motion.div>

      {/* --- LAYER 1: BACK TULIPS & GRASS (z-10) --- */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-10">
        {backTulips.map((tulip) => (
          <div key={tulip.id} className="absolute origin-bottom" style={{ left: tulip.left, bottom: tulip.bottom, width: `${100 * tulip.scale}px`, height: `${250 * tulip.scale}px`, marginLeft: `-${50 * tulip.scale}px` }}>
            <Tulip color={tulip.color} delay={tulip.delay} duration={tulip.duration} />
          </div>
        ))}
        {/* Back Grass scattered perfectly */}
        <SwayingGrass delay={0.2} duration={3.5} scale={1} className="bottom-[20vh] left-[20%]" />
        <SwayingGrass delay={1.1} duration={4} scale={0.8} className="bottom-[18vh] left-[45%]" />
        <SwayingGrass delay={0.7} duration={3.2} scale={1.2} className="bottom-[15vh] left-[70%]" />
      </div>

      {/* --- LAYER 2: ORGANIC BACK HILL (z-20) --- */}
      {/* Using a natural sage green: #a3b899 */}
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none z-20 drop-shadow-sm">
        <path d="M0,100 C300,-50 500,150 1000,50 L1000,200 L0,200 Z" fill="#a3b899" />
      </svg>

      {/* --- LAYER 3: FRONT TULIPS & GRASS (z-30) --- */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-30">
        {frontTulips.map((tulip) => (
          <div key={tulip.id} className="absolute origin-bottom" style={{ left: tulip.left, bottom: tulip.bottom, width: `${100 * tulip.scale}px`, height: `${250 * tulip.scale}px`, marginLeft: `-${50 * tulip.scale}px` }}>
            <Tulip color={tulip.color} delay={tulip.delay} duration={tulip.duration} />
          </div>
        ))}
        {/* Front Grass */}
        <SwayingGrass delay={0} duration={3} scale={1.1} className="bottom-[4vh] left-[15%]" />
        <SwayingGrass delay={1.5} duration={4.5} scale={1.3} className="bottom-[8vh] left-[38%]" />
        <SwayingGrass delay={0.8} duration={3.8} scale={0.9} className="bottom-[12vh] left-[65%]" />
        <SwayingGrass delay={2.1} duration={3.4} scale={1} className="bottom-[18vh] left-[85%]" />
      </div>

      {/* --- LAYER 4: ORGANIC FRONT HILL (z-40) --- */}
      {/* Using a slightly darker natural sage green: #849e7a */}
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[30vh] pointer-events-none z-40 drop-shadow-md">
        <path d="M0,150 C250,250 600,-50 1000,100 L1000,200 L0,200 Z" fill="#849e7a" />
      </svg>

      {/* --- LAYER 5: OVERSCROLL COVER (z-40) --- */}
      {/* This solid block stretches down infinitely to cover the pink background if she scrolls past the bottom! */}
      <div className="absolute top-full left-0 w-full h-[50vh] bg-[#849e7a] z-40"></div>

    </div>
  );
}