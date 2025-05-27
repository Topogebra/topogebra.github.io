import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import { Volume2, VolumeX, HelpCircle, Home, RefreshCw } from "lucide-react";
import { useAudio } from "@/lib/stores/useAudio";

const GameControls: React.FC = () => {
  const { start, restart } = useGame();
  const { resetGameState, setGamePhase, toggleInstructions } = useMathGame();
  const { isMuted, toggleMute } = useAudio();

 const handleRestart = () => {
  resetGameState(); // Esto reinicia los contadores
  restart(); // Reinicia el juego
  setGamePhase("mode-selection"); // Vuelve a la selección de modo
};

  const handleGoHome = () => {
    resetGameState();
    setGamePhase("home");
  };

  // Estos valores se pueden reemplazar por variables reales del estado
  const { correctHits, incorrectHits, score } = useMathGame();

  // Reemplaza estos valores hardcodeados:
  const aciertos = correctHits;
  const errores = incorrectHits;
  const puntuacion = score;

  return (
    <div className="w-full flex flex-col items-center gap-6">
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
    <p className="absolute bottom-[20px] left-40 transform -translate-x-1/2 text-white text-center text-xs font-ShineTypewriter bg-[#3b0f35] bg-opacity-80 py-1 px-4 rounded-md z-30">
  Creado por:<br />
  Ilse Rocío Cuevas Adame<br />
  Jenifer Brito Salazar
</p>
      {/* Botones de control */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
         variant="outline"
          size="lg" 
          onClick={handleRestart}
          className="text-lg px-10 py-5 bg-[#bed6e2] hover:bg-[#8df19c] text-[#3c2f80] font-Cleanow font-bold rounded-xl shadow-md uppercase transition-colors"
          >
          <RefreshCw size={40}  />
          Jugar de Nuevo
        </Button>

        <Button
          variant="outline"
          onClick={handleGoHome}
          className="text-lg px-10 py-5 bg-[#bed6e2] hover:bg-[#8df19c] text-[#3c2f80] font-Cleanow font-bold rounded-xl shadow-md uppercase transition-colors"
        >
          <Home size={18} />
          Volver al Inicio
        </Button>

        </div>
      </div>
  );
};

export default GameControls;