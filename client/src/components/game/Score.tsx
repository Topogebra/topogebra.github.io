import React from "react";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion, AnimatePresence } from "framer-motion";
import { Medal } from "lucide-react";

const Score: React.FC = () => {
  const { score, lastPointsEarned, gameMode } = useMathGame();

  const getScoreColor = () => score >= 0 ? "text-[#257551]" : "text-[#911818]";

  return (
<div className="bg-[#F7F9FC] border-[#A3BDC7] rounded-xl p-2 shadow-md w-full h-full flex flex-col justify-between">
  {/* Modo de juego */}
  <div className="relative flex flex-col items-center justify-center flex-grow">
    <div className="flex items-center gap-2 text-[#3c2f80]">
      <Medal size={40} />
      <span className="font-Cleanow text-4xl uppercase">SCORE</span>
    </div>
  </div>
  
  {/* Score */}
<div className="relative flex flex-col items-center justify-center flex-grow">
  <motion.div
    className=" text-black font-Cleanow text-4xl" // Asegúrate de usar font-cleanow
    animate={{ scale: lastPointsEarned !== 0 ? [1, 1.1, 1] : 1 }}
    transition={{ duration: 0.3 }}
  >
    {score} pts
  </motion.div>
    
    {/* Animación de puntos */}
    <AnimatePresence>
      {lastPointsEarned !== 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`
            absolute mt-2 px-3 py-1 rounded-full text-3xl font-Cleanow
            ${lastPointsEarned > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
          `}
        >
          {lastPointsEarned > 0 ? `+${lastPointsEarned}` : lastPointsEarned}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>

  );
};

export default Score;