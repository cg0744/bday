import { motion, useTransform } from 'framer-motion';
import ProfileCard from '../ProfileCard';
import Envelope from '../Envelope';
import Gatekeeper from '../Gatekeeper';

import chrisImg from '../../assets/Chris-profile.jpg';
import serraImg from '../../assets/Serra-profile.png';

export default function Section1({ scrollYProgress, setUnlockedSection }) {
  const leftExitX = useTransform(scrollYProgress, [0.8, 0.95], [0, -350]);
  const rightExitX = useTransform(scrollYProgress, [0.8, 0.95], [0, 350]);
  const centerExitY = useTransform(scrollYProgress, [0.8, 0.95], [0, -300]);
  const sectionOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);
  const gateExitY = useTransform(scrollYProgress, [0.8, 0.95], [0, 250]);

  return (
    <motion.div 
      style={{ opacity: sectionOpacity }}
      className="relative w-full h-full min-h-screen-dvh flex flex-col items-center justify-center py-16"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 w-full max-w-[1500px] mx-auto z-10">
        
        {/* Left profile card */}
        <motion.div style={{ x: leftExitX }} initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}>
          <ProfileCard 
            title="Chris <3" 
            tiltClass="-rotate-6 lg:-rotate-5"
            imageSrc={chrisImg}
            spotifySrc="https://open.spotify.com/embed/track/0AIpGG5dxEgnAymhdJRSZ0?utm_source=generator&theme=0" 
          />
        </motion.div>

        {/* Center envelope */}
        <motion.div 
          style={{ y: centerExitY }} 
          className="mt-40 mb-10 lg:my-0"
          initial={{ y: -100, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          <Envelope />
        </motion.div>

        {/* Right profile card */}
        <motion.div style={{ x: rightExitX }} initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4, type: "spring" }}>
          <ProfileCard 
            title="Serra <3" 
            tiltClass="rotate-6 lg:rotate-5"
            imageSrc={serraImg}
            spotifySrc="https://open.spotify.com/embed/track/0ABY8MEr6OcbhujQHHDxwW?utm_source=generator" 
          />
        </motion.div>

      </div>

      {/* Gatekeeper */}
      <motion.div 
        style={{ y: gateExitY }}
        className="mt-12 lg:mt-0 lg:absolute lg:bottom-16 lg:left-16 w-full lg:w-auto px-6 lg:px-0 z-20 flex justify-center lg:justify-start -rotate-3"
      >
        <Gatekeeper 
          question="Who is your love?" 
          correctAnswers={["Chris", "Christian", "Christian Gawriyah"]} 
          onUnlock={() => setUnlockedSection(2)}
        />
      </motion.div>

    </motion.div>
  );
}