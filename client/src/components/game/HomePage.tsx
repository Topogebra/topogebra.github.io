import React from "react";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  const { start } = useGame();
  const { goToNextPhase } = useMathGame();
  
  const handlePlayClick = () => {
    // Ahora utilizamos el nuevo flujo de fases
    goToNextPhase();
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#C5DCD5] rounded-xl p-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Título como en la captura */}
        <div className="w-full mb-8 bg-[#A3BDC7] py-3 px-6 rounded-md shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333] text-center">¡Bienvenido a Topogebra!</h1>
        </div>
        
        {/* Imagen del topo */}
        <div className="w-52 h-52 relative mb-8">
          <img
            src="/assets/TopoBienvenida.png"
            alt="Topo de bienvenida"
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Botón de jugar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayClick}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold text-xl shadow-md"
        >
          JUGAR
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;