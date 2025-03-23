import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import { Volume2, VolumeX, HelpCircle, ChevronLeft, Home, RefreshCw } from "lucide-react";
import { useAudio } from "@/lib/stores/useAudio";

const GameControls: React.FC = () => {
  const { start, restart } = useGame();
  const { resetGameState, setGamePhase, toggleInstructions } = useMathGame();
  const { isMuted, toggleMute } = useAudio();

  // Función para reiniciar el juego
  const handleRestart = () => {
    // Reiniciamos el estado del juego
    resetGameState();
    // Reiniciamos también el juego actual
    restart();
    // Volvemos a la fase de selección de modo
    setGamePhase("mode-selection");
  };

  // Volver a la pantalla de inicio
  const handleGoHome = () => {
    // Reiniciamos todo el estado
    resetGameState();
    // Volvemos a la fase inicial
    setGamePhase("home");
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-4">
      {/* En la pantalla de fin de juego mostramos estos controles */}
      <Button 
        size="lg" 
        onClick={handleRestart}
        className="bg-[#A3BDC7] hover:bg-[#8CADBF] text-[#333] font-bold px-8 py-3 text-lg rounded-lg shadow-md transition-all flex items-center gap-2"
      >
        <RefreshCw size={20} />
        Jugar de Nuevo
      </Button>
      
      <Button
        variant="outline"
        onClick={handleGoHome}
        className="bg-white hover:bg-gray-100 text-[#333] px-6 py-2 rounded-lg shadow-sm flex items-center gap-2"
      >
        <Home size={18} />
        Volver al Inicio
      </Button>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          title={isMuted ? "Activar Sonido" : "Silenciar"}
          className="bg-white hover:bg-gray-100"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleInstructions}
          title="Instrucciones"
          className="bg-white hover:bg-gray-100"
        >
          <HelpCircle size={24} />
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
