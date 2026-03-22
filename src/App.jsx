import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Gatekeeper from './components/Gatekeeper';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px] text-white/60 drop-shadow-sm"
          initial={{ y: 0, x: `${heart.left}vw`, rotate: 0, opacity: 0 }}
          animate={{
            y: '-120vh',
            rotate: 360,
            opacity: [0, 0.8, 0.8, 0],
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
    </div>
  );
};

const SectionWrapper = ({ id, isUnlocked, isSolved, children }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // ULTRA-AGGRESSIVE FADE: Starts at 100% opacity, completely invisible by 8% scroll depth
  const fadeOutOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative w-full min-h-screen-dvh flex flex-col items-center justify-center p-6 transition-all duration-1000 ease-in-out z-10 ${
        isUnlocked 
          ? 'opacity-100 pointer-events-auto translate-y-0' 
          : 'opacity-0 pointer-events-none translate-y-10 hidden' 
      }`}
    >
      {/* Passing scroll progress to children for the disassembly effect */}
      {typeof children === 'function' ? children({ scrollYProgress }) : children}

      {/* The cinematic black fade and chunky pink arrow */}
      {isSolved && (
        <motion.div 
          style={{ opacity: fadeOutOpacity }}
          className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-0"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end justify-end pb-8 pr-10"
          >
            <motion.svg 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              // rotate-[25deg] tilts it left. text-pink-200 matches the whitish-pink background aesthetic.
              className="w-20 h-20 text-pink-200 rotate-[25deg] drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)]" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Custom chunky, sharp geometric arrow */}
              <polygon points="8,2 16,2 16,11 22,11 12,23 2,11 8,11" />
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

function App() {
  const [unlockedSection, setUnlockedSection] = useState(1);

  return (
    <main className="relative w-full bg-gradient-to-b from-primary to-rose-light font-sans overflow-x-hidden selection:bg-secondary selection:text-black text-gray-800">
      
      <FloatingHearts />
      
      {/* SECTION 1: The Greeting */}
      <SectionWrapper id="section-1" isUnlocked={unlockedSection >= 1} isSolved={unlockedSection > 1}>
        {({ scrollYProgress }) => {
          // DISASSEMBLE EXIT: Maps scroll down to outward movement
          const titleExitX = useTransform(scrollYProgress, [0, 0.4], [0, -300]);
          const textExitX = useTransform(scrollYProgress, [0, 0.4], [0, 300]);
          const formExitY = useTransform(scrollYProgress, [0, 0.4], [0, 250]);
          const cardOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

          return (
            <motion.div 
              style={{ opacity: cardOpacity }}
              className="w-full max-w-md mx-auto bg-white/40 p-8 rounded-3xl backdrop-blur-sm shadow-xl border border-white/50 z-10 relative"
            >
              {/* ASSEMBLE ENTRY: whileInView handles flying in from the sides */}
              <motion.div style={{ x: titleExitX }}>
                <motion.h1 
                  initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, type: "spring" }}
                  className="text-4xl font-bold mb-4 tracking-tight text-gray-800 text-center"
                >
                  Phase 1: Greeting
                </motion.h1>
              </motion.div>

              <motion.div style={{ x: textExitX }}>
                <motion.p 
                  initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
                  className="text-gray-600 mb-8 text-center"
                >
                  (Envelope & Spotify Iframes will go here)
                </motion.p>
              </motion.div>
              
              <motion.div style={{ y: formExitY }}>
                <motion.div 
                  initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                >
                  <Gatekeeper 
                    question="Who is your love?" 
                    correctAnswers={["Chris", "Christian", "Christian Gawriyah"]} 
                    onUnlock={() => setUnlockedSection(2)}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        }}
      </SectionWrapper>

      {/* SECTION 2: Our Story Timeline */}
      <SectionWrapper id="section-2" isUnlocked={unlockedSection >= 2} isSolved={unlockedSection > 2}>
        {({ scrollYProgress }) => {
          const titleExitX = useTransform(scrollYProgress, [0, 0.4], [0, -300]);
          const textExitX = useTransform(scrollYProgress, [0, 0.4], [0, 300]);
          const formExitY = useTransform(scrollYProgress, [0, 0.4], [0, 250]);
          const cardOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

          return (
            <motion.div 
              style={{ opacity: cardOpacity }}
              className="w-full max-w-md mx-auto bg-white/40 p-8 rounded-3xl backdrop-blur-sm shadow-xl border border-white/50 z-10 relative"
            >
              <motion.div style={{ x: titleExitX }}>
                <motion.h1 
                  initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, type: "spring" }}
                  className="text-4xl font-bold mb-4 tracking-tight text-gray-800 text-center"
                >
                  Phase 2: Our Story
                </motion.h1>
              </motion.div>

              <motion.div style={{ x: textExitX }}>
                <motion.p 
                  initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
                  className="text-gray-600 mb-8 text-center"
                >
                  (Framer Motion Timeline goes here)
                </motion.p>
              </motion.div>
              
              <motion.div style={{ y: formExitY }}>
                <motion.div 
                  initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                >
                  <Gatekeeper 
                    question="what is your favourite flower?" 
                    correctAnswers={["Lavender Tulips", "Tulips"]} 
                    onUnlock={() => setUnlockedSection(3)}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        }}
      </SectionWrapper>

      {/* SECTION 3: The Tulip Garden */}
      <SectionWrapper id="section-3" isUnlocked={unlockedSection >= 3} isSolved={false}>
        {({ scrollYProgress }) => {
          const titleExitX = useTransform(scrollYProgress, [0, 0.4], [0, -300]);
          const textExitX = useTransform(scrollYProgress, [0, 0.4], [0, 300]);
          const cardOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

          return (
            <motion.div 
              style={{ opacity: cardOpacity }}
              className="w-full max-w-md mx-auto bg-white/40 p-8 rounded-3xl backdrop-blur-sm shadow-xl border border-white/50 z-10 relative"
            >
              <motion.div style={{ x: titleExitX }}>
                <motion.h1 
                  initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, type: "spring" }}
                  className="text-4xl font-bold mb-4 tracking-tight text-gray-800 text-center"
                >
                  Phase 3: The Garden
                </motion.h1>
              </motion.div>

              <motion.div style={{ x: textExitX }}>
                <motion.p 
                  initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
                  className="text-gray-600 text-center"
                >
                  (Lavender Tulips & Easter Egg go here)
                </motion.p>
              </motion.div>
            </motion.div>
          );
        }}
      </SectionWrapper>

    </main>
  );
}

export default App;