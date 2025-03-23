import React, { useEffect } from "react";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import Mole from "./Mole";
import Score from "./Score";
import Timer from "./Timer";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useMoles } from "@/hooks/useMoles";
import { motion } from "framer-motion";

const GameBoard: React.FC = () => {
  const { end } = useGame();
  const { gameMode, gameTime, resetGameState, goToNextPhase } = useMathGame();
  const { moles, resetMoles } = useMoles();
  const { timeLeft, startTimer } = useGameLogic();

  // Initialize the game when component mounts
  useEffect(() => {
    startTimer();
    
    // Clean up when component unmounts
    return () => {
      resetGameState();
      resetMoles();
    };
  }, [resetGameState, resetMoles, startTimer]);

  // Manejo del fin del tiempo
  useEffect(() => {
    if (timeLeft <= 0) {
      // Usamos el nuevo sistema de fases
      goToNextPhase(); // De "playing" a "game-over"
    }
  }, [timeLeft, goToNextPhase]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-5xl mx-auto flex flex-col items-center game-container"
    >
      <div className="w-full flex justify-between items-center mb-2 px-4">
        <Score />
        <div className="px-3 py-1 bg-[#A3BDC7] rounded-md shadow-sm text-[#333]">
          <span className="font-medium">Modo: </span>
          <span className="font-bold">{gameMode.label}</span>
        </div>
        <Timer timeLeft={timeLeft} totalTime={gameTime} />
      </div>

      <div 
        className="w-full bg-[#e2f0ea] rounded-lg p-4 grid grid-cols-5 grid-rows-2 gap-3"
        style={{ 
          maxHeight: 'calc(100vh - 150px)',
          minHeight: '450px'
        }}
      >
        {moles.map((mole) => (
          <Mole 
            key={mole.id} 
            mole={mole}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GameBoard;
