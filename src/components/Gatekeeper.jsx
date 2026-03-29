import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Gatekeeper({ question, correctAnswers, onUnlock }) {
  const [input, setInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = input.trim().toLowerCase();
    const isCorrect = correctAnswers.some(ans => ans.toLowerCase() === cleanInput);

    if (isCorrect) {
      setIsError(false);
      setIsSuccess(true);
      onUnlock();
    } else {
      setIsError(true);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5 z-20">
      <p className="text-2xl font-bold text-pink-400 drop-shadow-md text-center tracking-wide">
        {question}
      </p>
      
      <div className="relative w-full max-w-[250px]">
        {/* Input styling */}
        <motion.input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsError(false);
          }}
          placeholder="Your answer..."
          disabled={isSuccess}
          className={`w-full px-5 py-3 rounded-2xl border-2 outline-none transition-all shadow-lg font-medium bg-white/50 backdrop-blur-md ${
            isError 
              ? 'border-rose-400 placeholder-rose-300 text-rose-600'
              : isSuccess
              ? 'border-pink-300 text-pink-500 bg-white/80 placeholder-pink-300'
              : 'border-pink-200 placeholder-pink-300 text-gray-700 focus:border-pink-400 focus:bg-white/80'
          }`}
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        />
      </div>

      {!isSuccess && (
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-pink-300 to-rose-300 text-white rounded-full font-bold tracking-wide shadow-xl hover:shadow-rose-300/50 transition-all active:scale-95 disabled:opacity-50"
          disabled={!input.trim()}
        >
          Unlock
        </button>
      )}
    </form>
  );
}