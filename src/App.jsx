import { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import SectionWrapper from './components/SectionWrapper';
import Gatekeeper from './components/Gatekeeper';

function App() {
  const [unlockedSection, setUnlockedSection] = useState(1);

  return (
    <main className="relative w-full bg-gradient-to-b from-primary to-rose-light font-sans overflow-x-hidden selection:bg-secondary selection:text-black text-gray-800">
      
      <FloatingHearts />
      
      {/* SECTION 1: The Greeting */}
      <SectionWrapper id="section-1" isUnlocked={unlockedSection >= 1} isSolved={unlockedSection > 1}>
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