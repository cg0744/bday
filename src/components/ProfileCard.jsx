import { motion } from 'framer-motion';

export default function ProfileCard({ title, spotifySrc, imageSrc, tiltClass }) {
  return (
    <motion.div
      whileHover={{ y: -15, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`w-full max-w-[320px] flex flex-col items-center gap-6 ${tiltClass} z-10`}
    >
      {/* Massive Floating Rectangular Image */}
      <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-4 border-white/40 bg-pink-100/50">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = `<span class="text-pink-400 font-bold p-10 text-xl text-center">Missing Image</span>`;
          }}
        />
      </div>
      
      {/* Name in Lavender */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-[#c084fc] drop-shadow-md">{title}</h2>
      </div>

      {/* Sleek Spotify */}
      <div className="w-full h-[80px] rounded-xl overflow-hidden shadow-2xl border border-white/30">
        {spotifySrc ? (
          <iframe 
            src={spotifySrc} 
            width="100%" 
            height="80" 
            frameBorder="0" 
            allow="encrypted-media"
          ></iframe>
        ) : (
          <div className="w-full h-full bg-black/10 flex items-center justify-center text-sm text-gray-500 backdrop-blur-sm">
            Spotify Placeholder
          </div>
        )}
      </div>
    </motion.div>
  );
}