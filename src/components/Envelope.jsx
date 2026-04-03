import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 1500); // Remove burst elements after animation
    }
  };

  const flapVariants = {
    closed: { rotateX: 0, zIndex: 30 },
    open: { 
      rotateX: 180, 
      zIndex: 5, 
      transition: { 
        rotateX: { duration: 0.6, ease: "easeInOut" },
        zIndex: { delay: 0.3 } 
      } 
    }
  };

  const letterVariants = {
    closed: { y: 15, opacity: 0 }, 
    open: { 
      y: -120, 
      opacity: 1, 
      transition: { delay: 0.6, duration: 0.8, type: "spring", bounce: 0.3 } 
    }
  };

  // Generate 12 mini hearts for the burst
  const burstHearts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    angle: (i * 30) * (Math.PI / 180), // Spread evenly in a circle
    distance: Math.random() * 80 + 80, // Shoot out between 80px and 160px
    size: Math.random() * 15 + 10
  }));

  return (
    <motion.div 
      animate={!isOpen ? { y: [0, -10, 0] } : { y: 0 }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="relative w-96 h-64 cursor-pointer z-20 drop-shadow-[0_25px_30px_rgba(0,0,0,0.3)]"
      onClick={handleOpen}
    >
      <div className="absolute inset-0 bg-rose-300 rounded-xl"></div>

      {/* The Heart Burst Animation */}
      <AnimatePresence>
        {showBurst && burstHearts.map((heart) => (
          <motion.div
            key={`burst-${heart.id}`}
            initial={{ opacity: 1, scale: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            animate={{ 
              opacity: 0, 
              scale: 1.5,
              x: `calc(-50% + ${Math.cos(heart.angle) * heart.distance}px)`,
              y: `calc(-50% + ${Math.sin(heart.angle) * heart.distance}px)`,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-pink-500 z-50 pointer-events-none"
          >
            <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div 
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={letterVariants}
        className="absolute left-6 right-6 top-6 bottom-6 bg-white/95 rounded-lg shadow-sm p-8 flex items-center justify-center text-center z-10"
      >
        <p className="text-rose-600 font-bold text-2xl leading-tight">
          Happy Birthday Serra! ❤️
          <br />
          <span className="text-lg text-pink-500 mt-3 block">the prettiest woman with the sweetest smile just like  <br></br> <span className="text-yellow-500">honey</span></span>
        </p>
      </motion.div>

      <div 
        className="absolute inset-0 bg-rose-200 rounded-xl z-20 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%)' }} 
      ></div>

      <motion.div 
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={flapVariants}
        className="absolute top-0 left-0 w-full h-full bg-secondary rounded-xl pointer-events-none" 
        style={{ transformOrigin: 'top', clipPath: 'polygon(0 0, 100% 0, 50% 65%)' }}
      ></motion.div>

      {!isOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none pt-16">
          <span className="text-[#e9d5ff] font-extrabold tracking-widest text-2xl drop-shadow-sm">OPEN ME</span>
        </div>
      )}
    </motion.div>
  );
}