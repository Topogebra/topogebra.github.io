import React from "react";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion } from "framer-motion";

const floatingTextVariants = {
  initial: {
    y: 0,
    opacity: 0,
    scale: 1,
  },
  animate: {
    y: [-20, 10, -10],
    opacity: [0, 1, 0],
    scale: [1, 1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const randomPositions = [
  { bottom: "56%", right: "66%" },
  { top: "20%", left: "5%" },
  { bottom: "10%", right: "5%" },
  { top: "40%", right: "20%" },
  { bottom: "10%", left: "20%" },
  { top: "55%", left: "5%" },
  { bottom: "15%", left: "50%" },
  { top: "10%", left: "80%" },
];

const HomePage: React.FC = () => {
  const { start } = useGame();
  const { goToNextPhase } = useMathGame();

  const handleTopoClick = () => {
    goToNextPhase(); // Avanza a la siguiente fase al hacer clic en el topo
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/assets/Fondo.png')",
        cursor: "url('/assets/Mazo.png') 64 64, auto",
      }}
    >
      {/* Frases flotantes */}
      {randomPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute text-[#3b0f35] font-Cleanow text-xl sm:text-2xl md:text-3xl select-none pointer-events-none"
          style={{
            ...pos,
            zIndex: 10,
          }}
          variants={floatingTextVariants}
          initial="initial"
          animate="animate"
        >
          ¡Golpea al topo!
        </motion.div>
      ))}

      {/* Contenedor principal */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center max-w-screen-md w-full px-4 sm:px-20"
      >
        {/* Título */}
        <div className="w-full mb-8 z-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-Cleanow font-bold text-white text-center bg-[#3b0f35] py-2 sm:py-4 px-4 sm:px-10 rounded-xl shadow-sm">
            ¡Bienvenido a Topogebra!
          </h1>
        </div>

        {/* Imagen del topo con rebote */}
        <motion.div
          whileHover={{ scale: 1}}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 sm:w-40 md:w-80 mb-2 z-10 cursor-pointer"
          onClick={handleTopoClick}
          style={{ cursor: "url('/assets/Mazo.png') 64 64, auto" }}
        >
          <img
            src="/assets/TopoBienvenida2.png"
            alt="Topo de bienvenida"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
