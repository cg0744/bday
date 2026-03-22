import { motion, useTransform } from 'framer-motion';

export default function Section3({ scrollYProgress }) {
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
}