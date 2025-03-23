import React from "react";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ModeSelectionPage: React.FC = () => {
  const { gameMode, setGameMode, gameModes, gameTime, setGameTime, goToNextPhase } = useMathGame();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#C5DCD5] rounded-xl p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        {/* Título similar al de la página principal */}
        <div className="w-full mb-6 bg-[#A3BDC7] py-3 px-6 rounded-md shadow-sm">
          <h1 className="text-3xl font-bold text-[#333] text-center">Selecciona un Modo de Juego</h1>
        </div>
        
        {/* Tarjetas de modos de juego */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {gameModes.map((mode) => (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "cursor-pointer rounded-xl shadow-md overflow-hidden transition-all transform",
                gameMode.id === mode.id 
                  ? "border-4 border-[#A3BDC7] bg-white" 
                  : "border border-gray-200 bg-white hover:shadow-lg"
              )}
              onClick={() => setGameMode(mode)}
            >
              <div className={cn(
                "h-3",
                gameMode.id === mode.id ? "bg-[#A3BDC7]" : "bg-blue-100"
              )} />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-[#333]">{mode.label}</h3>
                <p className="text-gray-600 text-sm">{mode.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Selección de duración */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold text-center mb-4 text-[#333]">Duración del Juego</h2>
          <div className="flex justify-center flex-wrap gap-3">
            {[30, 60, 90, 120].map((seconds) => (
              <Button
                key={seconds}
                onClick={() => setGameTime(seconds)}
                className={cn(
                  "px-6 py-3 rounded-md text-lg transition-all",
                  gameTime === seconds 
                    ? "bg-[#A3BDC7] text-white font-bold shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {seconds < 60 ? `${seconds} seg` : `${seconds / 60} min`}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Botón de comenzar */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToNextPhase()}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold text-xl shadow-md"
          >
            ¡COMENZAR!
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModeSelectionPage;