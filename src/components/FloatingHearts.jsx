import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);
  
  // Hook into scroll position for Parallax Effect
  const { scrollYProgress } = useScroll();
  
  // As the user scrolls to the bottom (1), move the hearts container up by 350px
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -350]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => {
      const size = Math.random() * 20 + 10;
      // Hearts smaller than 16px are "in the background"
      const isBackground = size < 16; 
      
      return {
        id: i,
        left: Math.random() * 100,
        size: size,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        // Background hearts get blurred and are more transparent
        blur: isBackground ? Math.random() * 3 + 1 : 0,
        opacity: isBackground ? 0.3 : 0.6,
      };
    });
    setHearts(newHearts);
  }, []);

  return (
    <motion.div 
      style={{ y: parallaxY }} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px] text-white"
          style={{ 
            opacity: heart.opacity,
            filter: `blur(${heart.blur}px)` 
          }}
          initial={{ y: 0, x: `${heart.left}vw`, rotate: 0 }}
          animate={{
            y: '-120vh',
            rotate: 360,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}