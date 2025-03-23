import React from "react";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  const { start } = useGame();
  const { setShowHome } = useMathGame();
  
  const handlePlayClick = () => {
    setShowHome(false);
  };
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-secondary/30 rounded-xl p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Locura de Topos Matemáticos</h1>
        
        <div className="w-64 h-64 relative mb-8">
          <img
            src="/images/TopoBienvenida.png"
            alt="Topo de bienvenida"
            className="w-full h-full object-contain"
          />
        </div>
        
        <p className="text-xl text-center mb-8 max-w-lg">
          ¡Bienvenido al juego de topos matemáticos! Golpea los topos según las reglas matemáticas
          y obtén la puntuación más alta.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayClick}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-xl shadow-lg"
        >
          JUGAR
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;