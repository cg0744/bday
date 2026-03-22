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
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 mt-6 z-20">
      <p className="text-lg font-medium text-gray-700 text-center">{question}</p>
      
      <div className="relative w-full max-w-[250px]">
        <motion.input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsError(false);
          }}
          placeholder="Your answer..."
          disabled={isSuccess}
          className={`w-full px-4 py-3 rounded-2xl border-2 outline-none transition-colors bg-white/80 backdrop-blur-sm ${
            isError 
              ? 'border-pink-500 placeholder-pink-400 text-pink-600'
              : isSuccess
              ? 'border-green-400 text-green-600 bg-green-50'
              : 'border-secondary focus:border-purple-400'
          }`}
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        />
      </div>

      {!isSuccess && (
        <button
          type="submit"
          className="px-8 py-3 bg-secondary text-gray-900 rounded-full font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
          disabled={!input.trim()}
        >
          Unlock
        </button>
      )}
    </form>
  );
}