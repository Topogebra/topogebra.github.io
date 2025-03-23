import React from "react";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion } from "framer-motion";

const Score: React.FC = () => {
  const { score, lastPointsEarned } = useMathGame();

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-xl font-bold">Puntuación</h2>
      <div className="text-3xl font-bold text-primary">{score}</div>
      
      {/* Animated score change indicator */}
      {lastPointsEarned !== 0 && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -20 }}
          exit={{ opacity: 0 }}
          className={`absolute -top-6 font-bold text-lg ${
            lastPointsEarned > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {lastPointsEarned > 0 ? `+${lastPointsEarned}` : lastPointsEarned}
        </motion.div>
      )}
    </div>
  );
};

export default Score;
