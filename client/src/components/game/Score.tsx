import React from "react";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion, AnimatePresence } from "framer-motion";
import { Medal } from "lucide-react";

const Score: React.FC = () => {
  const { score, lastPointsEarned } = useMathGame();

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex items-center gap-1 mb-1">
        <Medal size={20} className="text-[#333]" />
        <h2 className="text-lg font-bold text-[#333]">Puntuación</h2>
      </div>
      
      <motion.div 
        className="text-2xl font-mono font-bold px-3 py-1 rounded-md shadow-sm bg-white border-2 border-[#A3BDC7] text-[#333]"
        animate={{ 
          scale: lastPointsEarned !== 0 ? [1, 1.1, 1] : 1 
        }}
        transition={{ duration: 0.3 }}
      >
        {score}
      </motion.div>
      
      {/* Animated score change indicator */}
      <AnimatePresence>
        {lastPointsEarned !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -25 }}
            exit={{ opacity: 0 }}
            className={`absolute top-14 font-bold text-xl px-2 py-0.5 rounded-md ${
              lastPointsEarned > 0 
                ? "text-green-600 bg-green-100 border border-green-300" 
                : "text-red-600 bg-red-100 border border-red-300"
            }`}
          >
            {lastPointsEarned > 0 ? `+${lastPointsEarned}` : lastPointsEarned}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Score;
