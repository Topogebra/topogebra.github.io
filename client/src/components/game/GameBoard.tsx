import React, { useEffect, useState } from "react";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import Mole from "./Mole";
import Score from "./Score";
import Timer from "./Timer";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useMoles } from "@/hooks/useMoles";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

const GameBoard: React.FC = () => {
  const { gameMode, gameTime, goToNextPhase, goToModeSelection, resetGameState } = useMathGame();
  const { moles, resetMoles } = useMoles();
  const { timeLeft, startTimer } = useGameLogic();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    startTimer();
    return () => resetMoles();
  }, [resetMoles, startTimer]);

  useEffect(() => {
    if (timeLeft <= 0) goToNextPhase();
  }, [timeLeft, goToNextPhase]);

  const handleReturnToModeSelection = () => {
    resetMoles();
    resetGameState(); // <-- Esta línea resetea el score
    goToModeSelection();
  };

  return (
    <div
  className="fixed inset-0 flex flex-col justify-start items-center bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/assets/Fondo.png')",
    cursor: 'none'
  }}
>
      {/* Botón para regresar a la selección de modo */}
      <button 
        onClick={handleReturnToModeSelection}
        className="absolute left-4 top-4 z-50 p-2 rounded-full bg-[#3c2f80] text-white hover:bg-[#5d4ba7] transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Cursor personalizado */}
      <div
        style={{
          position: 'fixed',
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: '128px',
          height: '128px',
          backgroundImage: 'url("/assets/Mazo.png")',
          backgroundSize: 'contain',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)'
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full max-w-6xl flex flex-col items-center px-4 mt-0"
      >
        <div className="grid grid-cols-3 gap-4 w-full mb-4">
          <Score />
          <div className="flex justify-center items-center bg-[#F7F9FC] border-2 border-[#A3BDC7] rounded-xl p-4 shadow-md text-[#3c2f80] text-center">
            <div>
              <p className="text-4xl uppercase tracking-wide font-Cleanow">Modo de juego</p>
              <p className="text-3xl text-black font-Cleanow">{gameMode.label}</p>
            </div>
          </div>
          <Timer timeLeft={timeLeft} totalTime={gameTime} />
        </div>

        <div 
          className="grid grid-cols-5 grid-rows-2 gap-y-10 gap-x-10"
          style={{
            width: "100%",
            maxWidth: "1000px",
            height: "calc(100vh - 250px)",
            maxHeight: "500px",
          }}
        >
          {moles.map((mole) => (
            <Mole key={mole.id} mole={mole} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GameBoard;
