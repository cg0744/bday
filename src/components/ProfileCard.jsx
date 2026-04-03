import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfileCard({ title, spotifySrc, imageSrc, tiltClass }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -15, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`w-full max-w-[320px] flex flex-col items-center gap-6 ${tiltClass} z-10 group`}
    >
      {/* Profile image with Glassmorphism */}
      <div className="w-64 h-80 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(244,114,182,0.2)] border-[3px] border-white/50 bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(244,114,182,0.4)] group-hover:border-white/80">
        {!imgError ? (
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-pink-400 font-bold p-10 text-xl text-center">Missing Image</span>
        )}
      </div>
      
      {/* Profile name using the new Serif font */}
      <div className="text-center">
        <h2 className="text-5xl font-serif italic font-extrabold text-purple-light drop-shadow-md">
          {title}
        </h2>
      </div>

      {/* Spotify embed */}
      <div className="w-full h-[80px] rounded-2xl overflow-hidden shadow-xl border border-white/40 bg-white/30 backdrop-blur-sm transition-all group-hover:border-white/60">
        {spotifySrc ? (
          <iframe 
            src={spotifySrc} 
            width="100%" 
            height="80" 
            frameBorder="0" 
            allow="encrypted-media"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-purple-400 font-medium">
            Spotify Placeholder
          </div>
        )}
      </div>
    </motion.div>
  );
}