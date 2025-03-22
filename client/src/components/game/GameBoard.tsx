import React, { useEffect } from "react";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import Mole from "./Mole";
import Score from "./Score";
import Timer from "./Timer";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useMoles } from "@/hooks/useMoles";

const GameBoard: React.FC = () => {
  const { end } = useGame();
  const { gameMode, gameTime, resetGameState } = useMathGame();
  const { moles, resetMoles } = useMoles();
  const { timeLeft, startTimer } = useGameLogic();

  // Initialize the game when component mounts
  useEffect(() => {
    startTimer();
    
    // End game when timer reaches 0
    if (timeLeft <= 0) {
      end();
    }
    
    return () => {
      // Clean up when component unmounts
      resetGameState();
      resetMoles();
    };
  }, [timeLeft, end, resetGameState, resetMoles, startTimer]);

  return (
    <div className="w-full h-full flex flex-col items-center game-container">
      <div className="w-full flex justify-between items-center mb-2 px-2">
        <Score />
        <div className="px-3 py-1 bg-accent rounded-md">
          <span className="font-medium">Mode: </span>
          <span className="font-bold">{gameMode.label}</span>
        </div>
        <Timer timeLeft={timeLeft} totalTime={gameTime} />
      </div>

      <div 
        className="w-full h-full bg-primary/10 rounded-lg p-4 grid grid-cols-4 grid-rows-3 gap-3"
        style={{ maxHeight: 'calc(768px - 120px)' }}
      >
        {moles.map((mole) => (
          <Mole 
            key={mole.id} 
            mole={mole}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
