import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function SectionWrapper({ id, isUnlocked, isSolved, children }) {
  const containerRef = useRef(null);
  
  // State to track if she has scrolled past and seen the hint
  const [hintDismissed, setHintDismissed] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"]
  });

  // Listen to her scrolling. Once she scrolls 90% past this section,
  // we permanently dismiss the hint so it doesn't reappear on scroll up.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.9 && !hintDismissed) {
      setHintDismissed(true);
    }
  });

  const fadeOutOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative w-full min-h-screen-dvh flex flex-col items-center justify-center p-6 z-10 ${
        isUnlocked ? 'block' : 'hidden' 
      }`}
    >
      {typeof children === 'function' ? children({ scrollYProgress }) : children}

      <AnimatePresence>
        {isSolved && !hintDismissed && (
          <motion.div 
            exit={{ opacity: 0 }} // Smoothly fades out if she scrolls fast
            style={{ opacity: fadeOutOpacity }}
            className="fixed bottom-0 left-0 w-full h-[35vh] pointer-events-none z-50"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end justify-end pb-10 pr-10"
            >
              <motion.svg 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-20 h-20 text-pink-200 rotate-[25deg] drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)]" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="8,2 16,2 16,11 22,11 12,23 2,11 8,11" />
              </motion.svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}