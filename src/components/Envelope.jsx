import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <motion.div 
      animate={!isOpen ? { y: [0, -10, 0] } : { y: 0 }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="relative w-96 h-64 cursor-pointer z-20 drop-shadow-[0_25px_30px_rgba(0,0,0,0.3)]"
      onClick={() => setIsOpen(true)}
    >
      <div className="absolute inset-0 bg-rose-300 rounded-xl"></div>

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
          {/* Open text */}
          <span className="text-[#e9d5ff] font-extrabold tracking-widest text-2xl drop-shadow-sm">OPEN ME</span>
        </div>
      )}
    </motion.div>
  );
}