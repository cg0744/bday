import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Gatekeeper from '../Gatekeeper';

import chrisMem1 from '../../assets/section-2-chris.jpg';
import serraMem1 from '../../assets/section-2-serra.jpg';
import minecraftImg from '../../assets/minecraft.jpeg';
import pinquinsImg from '../../assets/pinquins.png';
import kamisamaImg from '../../assets/kamisama-kiss.jpg';
import aoharuImg from '../../assets/ao-haru-ride.jpg';

const timelineData = [
  {
    id: 1,
    title: "our first face reveals.",
    text: "Soso was so bold asking Koko for his face reveal first and you were so cute asking about it <3",
    align: "left", 
    images: [chrisMem1, serraMem1] 
  },
  {
    id: 2,
    title: "our minecraft empire",
    text: "Playing minecraft with you is one of my favourite way of spending time with you, you're always so cute how you kiss my cheek koko feels like eating you",
    align: "right", 
    images: [minecraftImg] 
  },
  {
    id: 3,
    title: "roblox",
    text: "we always have fun on roblox and you always make me laugh, we slap eachother, carry eachother, even kill eachother and the next second we sit together as pinquins near a campfire",
    align: "left",
    images: [pinquinsImg]
  },
  {
    id: 4,
    title: "movies",
    text: "I always look forward to watching another one of your movies they're all amazing",
    align: "right",
    images: [kamisamaImg, aoharuImg] 
  }
];

export default function Section2({ setUnlockedSection }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end bottom"] 
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen py-32 flex flex-col items-center overflow-hidden">
      
      {/* Title & Date Section */}
      <div className="text-center mb-24 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, type: "spring" }}
          className="text-5xl font-extrabold text-[#c084fc] drop-shadow-lg"
        >
          Our Story
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="text-2xl font-bold text-pink-300 mt-4 tracking-widest drop-shadow-sm"
        >
          11-23-2025
        </motion.p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col gap-40 pb-32">
        
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-full pointer-events-none z-0 drop-shadow-[0_4px_6px_rgba(192,132,252,0.4)]">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M100 0 C220 100, -20 200, 100 300 C220 400, -20 500, 100 600 C220 700, -20 800, 100 900 C220 1000, -20 1000, 100 1000"
              stroke="#c084fc" 
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="20 20" 
              style={{ pathLength }} 
            />
          </svg>
        </div>

        {timelineData.map((item) => {
          const isLeft = item.align === "left";
          const tiltClass = isLeft ? "rotate-3 hover:rotate-6" : "-rotate-3 hover:-rotate-6";

          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4, once: false }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className={`relative flex items-center w-full z-10 ${isLeft ? "justify-start" : "justify-end"}`}
            >
              <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full lg:w-[55%] ${isLeft ? "lg:pr-12" : "lg:pl-12 lg:flex-row-reverse"}`}>
                
                {/* WIDER CONTAINER TO SPREAD IMAGES */}
                <div className="relative w-80 h-80 md:w-[360px] md:h-[360px] flex-shrink-0 z-20">
                  {item.images.length > 1 ? (
                    <>
                      {/* Back Image (Pushed top-left and tilted more) */}
                      <div className="absolute top-0 left-0 w-48 h-56 md:w-56 md:h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-pink-200 -rotate-12 transition-transform duration-300 hover:-rotate-6 z-10 bg-pink-100/50">
                        <img src={item.images[0]} alt="Memory Back" className="w-full h-full object-cover" />
                      </div>
                      {/* Front Image (Pushed bottom-right) */}
                      <div className="absolute bottom-0 right-0 w-48 h-56 md:w-56 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-200 rotate-6 transition-transform duration-300 hover:rotate-12 z-20 bg-pink-100/50">
                        <img src={item.images[1]} alt="Memory Front" className="w-full h-full object-cover" />
                      </div>
                    </>
                  ) : (
                    <div className="w-64 h-64 md:w-72 md:h-72 mx-auto mt-4 rounded-3xl bg-pink-100/80 shadow-[0_15px_30px_rgba(0,0,0,0.15)] border-4 border-pink-200 flex items-center justify-center overflow-hidden -rotate-2 hover:rotate-0 transition-transform duration-300">
                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className={`relative w-full max-w-[300px] transition-transform duration-300 drop-shadow-[0_0_6px_#fbcfe8] drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] ${tiltClass} ${isLeft ? "lg:-ml-8" : "lg:-mr-8"}`}>
                  
                  <div className="absolute -top-8 left-6 w-28 h-28 bg-white/95 rounded-full z-0"></div>
                  <div className="absolute -top-10 right-12 w-32 h-32 bg-white/95 rounded-full z-0"></div>
                  <div className="absolute -top-4 -right-2 w-20 h-20 bg-white/95 rounded-full z-0"></div>
                  <div className="absolute -bottom-6 left-10 w-24 h-24 bg-white/95 rounded-full z-0"></div>
                  <div className="absolute -bottom-8 right-8 w-28 h-28 bg-white/95 rounded-full z-0"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-16 h-16 bg-white/95 rounded-full z-0"></div>

                  <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-0 h-0 z-0
                    border-y-[16px] border-y-transparent
                    ${isLeft ? "border-r-[24px] border-r-white/95 right-[98%]" : "border-l-[24px] border-l-white/95 left-[98%]"}
                  `}></div>

                  <div className="bg-white/95 p-8 rounded-[3rem] relative z-10">
                    <h3 className="text-2xl font-extrabold text-pink-400 mb-2">{item.title}</h3>
                    {/* Updated text color to match the pink border! */}
                    <p className="text-pink-300 font-semibold leading-relaxed text-base">{item.text}</p>
                  </div>

                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-32 w-full max-w-md p-8 z-20 rotate-2 hover:rotate-0 transition-transform">
        <Gatekeeper 
          question="what is your favourite flower?" 
          correctAnswers={["Lavender Tulips", "Tulips"]} 
          onUnlock={() => setUnlockedSection(3)}
        />
      </div>

    </div>
  );
}