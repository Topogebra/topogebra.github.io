import React from "react";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

const ModeSelectionPage: React.FC = () => {
  const {
    gameMode,
    setGameMode,
    gameModes,
    gameTime,
    setGameTime,
    goToNextPhase,
    goToPreviousPhase
  } = useMathGame();

  const handleNext = () => {
    goToNextPhase();
  };

  const getModeExplanation = (modeId: string) => {
    switch (modeId) {
      case "pares":
        return `
          Números Pares
          Son todos los números enteros divisibles entre 2.  
          Siempre terminan en 0, 2, 4, 6 u 8.  
          Ejemplos: 2, 4, 10, 16, 20.  
          Si puedes dividir el número en mitades iguales, es par.
        `;
      case "impares":
        return `
          Números Impares
          No son divisibles entre 2 (siempre sobra 1).  
          Terminan en 1, 3, 5, 7 o 9.  
          Ejemplos: 1, 3, 7, 15, 21.   
          Si al dividirlo entre 2 queda un residuo, es impar.
        `;
      case "primos":
        return `
          Números Primos
          Son números mayores que 1 que solo se pueden dividir entre 1 y ellos mismos.  
          Ejemplos:  
          5 es primo (solo divisible por 1 y 5).  
          6 no es primo (se divide entre 2 y 3).  
        `;
      case "multiplos5":
        return `
          Múltiplos de 5
          Son números que al dividirlos entre 5 dan un resultado exacto (sin residuo).  
          Siempre terminan en 0 o 5.  
          Ejemplos: 5, 10, 15, 20, 25.  
          Cuenta de 5 en 5:
          5→10→15→20→...
        `;
      case "multiplos7":
        return `
          Múltiplos de 7
          Son números que resultan de multiplicar 7 por otro número entero.  
          Ejemplos: 7, 14, 21, 28, 35.  
          Cuenta de 7 en 7: 
          7→14→21→28→...
        `;
      default:
        return "Selecciona un modo para ver una explicación detallada.";
    }
  };

  return (
    <div
      className="fixed inset-0 flex text-center justify-center items-start bg-cover bg-center bg-no-repeat p-10"
      style={{ backgroundImage: "url('/assets/Fondo.png')" }}
    >
         {/* Logo izquierdo */}
    <img
      src="/assets/logo.png"
      alt="Logo"
      className="absolute top-4 left-4 w-20 sm:w-28 md:w-32 z-30"
    />

    {/* Logo derecho */}
    <img
      src="/assets/logo-itiguala.png"
      alt="Logo ITI"
      className="absolute top-4 right-4 w-20 sm:w-28 md:w-32 z-30"
    />
       {/* Texto de autores arriba en el centro */}
<p className="absolute bottom-[20px] left-40 transform -translate-x-1/2 text-white text-center text-xs font-ShineTypewriter bg-[#3b0f35] bg-opacity-80 py-1 px-4 rounded-md z-30">
  Creado por:<br />
  Ilse Rocío Cuevas Adame<br />
  Jenifer Brito Salazar
</p>
      <button 
        onClick={goToPreviousPhase}
        className="absolute left-4 top-4 z-50 p-2 rounded-full bg-[#3c2f80] text-white hover:bg-[#5d4ba7] transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <h1 className="text-4xl font-Cleanow mb-4 text-[#3c2f80] text-center">
            Modos de Juego
          </h1>
          <ul className="space-y-4">
            {gameModes.map((mode) => (
              <li
                key={mode.id}
                onClick={() => setGameMode(mode)}
                className={cn(
                  "p-4 text-2xl rounded-md transition-all border-4 font-ShineTypewriter font-bold",
                  gameMode?.id === mode.id
                    ? "text-black border-[#3c2f80] rounded-2xl"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-[#3c2f80]"
                )}
              >
                {mode.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-4xl font-Cleanow text-[#3c2f80] text-center mb-2">
              Explicación
            </h2>
            <div className="bg-[#f8f9fa] p-3 rounded-lg border border-gray-300">
              <p className="text-[#000000] text-xl leading-tight whitespace-pre-line font-ShineTypewriter">
                {gameMode?.id ? getModeExplanation(gameMode.id) : "Selecciona un modo para ver una explicación detallada."}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <h2 className="text-4xl text-center font-Cleanow text-[#3c2f80] mb-2">
              Selecciona la Duración
            </h2>
            <h2 className="text-xl text-center font-Cleanow text-[#000000] mb-6"> Si no seleccionas una, la duración será de 60 segundos.</h2>
            <div className="flex justify-center flex-wrap gap-3 mb-6">
              {[20, 30, 40].map((seconds) => (
                <Button
                  key={seconds}
                  onClick={() => setGameTime(seconds)}
                  className={cn(
                    "px-6 py-2 text-lg rounded-lg font-ShineTypewriter font-bold",
                    gameTime === seconds
                      ? "bg-[#8df19c] text-[#3c2f80] hover:bg-[#8df19c]"
                      : "bg-[#bed6e2] text-[#3c2f80] hover:bg-[#8df19c]"
                  )}
                >
                  {seconds < 60 ? `${seconds} seg` : `${seconds / 60} min`}
                </Button>
              ))}
            </div>
            <div className="flex justify-center">
              <motion.button
                whileHover={gameMode?.id && gameTime ? { scale: 1.05 } : {}}
                whileTap={gameMode?.id && gameTime ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (gameMode?.id && gameTime) {
                    handleNext();
                  }
                }}
                disabled={!gameMode?.id || !gameTime}
                className={cn(
                  "text-lg px-10 py-5 text-[#3c2f80] font-Cleanow font-bold rounded-xl shadow-md uppercase transition-colors",
                  gameMode?.id && gameTime
                    ? "bg-[#bed6e2] hover:bg-[#8df19c] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                )}
              >
                Entendido
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModeSelectionPage;