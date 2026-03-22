import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Tulip from '../Tulip';

// Our robust data array for the garden. 
// Fly-in values (x, y) control where they assemble from.
// Popup styles control how the bubble appears when clicked!
const tulipData = [
  { id: 1, color: "#d8b4e2", text: "Placeholder message 1", flyX: -200, flyY: 100, popup: "up" },
  { id: 2, color: "#c084fc", text: "Placeholder message 2", flyX: 0, flyY: -200, popup: "center" },
  { id: 3, color: "#e9d5ff", text: "Placeholder message 3", flyX: 200, flyY: 150, popup: "right" },
  { id: 4, color: "#a855f7", text: "Placeholder message 4", flyX: -150, flyY: -150, popup: "left" },
  { id: 5, color: "#c4b5fd", text: "Placeholder message 5", flyX: 100, flyY: -250, popup: "down" },
  { id: 6, color: "#d8b4e2", text: "Placeholder message 6", flyX: -250, flyY: 0, popup: "center" },
  { id: 7, color: "#c084fc", text: "Placeholder message 7", flyX: 150, flyY: 200, popup: "up" },
  { id: 8, color: "#e9d5ff", text: "Placeholder message 8", flyX: 0, flyY: 250, popup: "right" },
];

// Map the string commands to actual Framer Motion coordinates
const popupAnimations = {
  up: { initial: { opacity: 0, y: 30, scale: 0.8 }, animate: { opacity: 1, y: -60, scale: 1 } },
  down: { initial: { opacity: 0, y: -30, scale: 0.8 }, animate: { opacity: 1, y: 60, scale: 1 } },
  left: { initial: { opacity: 0, x: 30, scale: 0.8 }, animate: { opacity: 1, x: -80, scale: 1 } },
  right: { initial: { opacity: 0, x: -30, scale: 0.8 }, animate: { opacity: 1, x: 80, scale: 1 } },
  center: { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1, y: -40 } }
};

export default function Section3({ scrollYProgress }) {
  const containerRef = useRef(null);
  const [activeTulip, setActiveTulip] = useState(null);
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const handleTulipClick = (id) => {
    // Toggles the bubble open and closed
    setActiveTulip(activeTulip === id ? null : id);
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen pt-32 pb-48 flex flex-col items-center overflow-hidden">
      
      {/* Title */}
      <motion.div style={{ opacity: titleOpacity, y: titleY }} className="text-center mb-16 z-10">
        <h1 className="text-5xl font-extrabold text-[#c084fc] drop-shadow-lg mb-4">
          The Garden
        </h1>
        <p className="text-pink-400 font-medium text-lg tracking-wide drop-shadow-sm">
          Tap the tulips to see what they hold.
        </p>
      </motion.div>

      {/* The Field (Flex container that wraps the tulips organically) */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-wrap justify-center items-end gap-x-8 gap-y-12 md:gap-x-16 px-6 mt-16 z-10">
        
        {tulipData.map((tulip) => {
          const isActive = activeTulip === tulip.id;
          const anim = popupAnimations[tulip.popup];

          return (
            // The chaotic entry animation happens here!
            <motion.div 
              key={tulip.id}
              initial={{ opacity: 0, x: tulip.flyX, y: tulip.flyY, rotate: Math.random() * 40 - 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
              className="relative flex justify-center"
            >
              
              <Tulip color={tulip.color} onClick={() => handleTulipClick(tulip.id)} />

              {/* The Bubble Popup */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={anim.initial}
                    animate={anim.animate}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    // Matches the pinkish-white borders of Section 2
                    className="absolute z-50 min-w-[200px] w-max max-w-[280px] bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border-2 border-pink-200 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-center pointer-events-none"
                  >
                    <p className="text-gray-700 font-semibold text-sm md:text-base leading-relaxed">
                      {tulip.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}

      </div>

      {/* A soft grassy/field gradient at the bottom to ground the tulips */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-pink-200/40 to-transparent pointer-events-none z-0"></div>

    </div>
  );
}