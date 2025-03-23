import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import { Volume2, VolumeX, HelpCircle, ChevronLeft } from "lucide-react";
import { useAudio } from "@/lib/stores/useAudio";

const GameControls: React.FC = () => {
  const { phase, start, restart } = useGame();
  const { toggleInstructions, setShowHome } = useMathGame();
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-4">
      {phase === "ready" && (
        <>
          <Button 
            size="lg" 
            onClick={() => start()}
            className="bg-primary hover:bg-primary/90 text-xl px-8 py-6"
          >
            Iniciar Juego
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowHome(true)}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Volver al Inicio
          </Button>
        </>
      )}

      {phase === "ended" && (
        <>
          <Button 
            size="lg" 
            onClick={() => restart()}
            className="bg-primary hover:bg-primary/90 text-xl px-8 py-6"
          >
            Jugar de Nuevo
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowHome(true)}
          >
            Volver al Inicio
          </Button>
        </>
      )}

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          title={isMuted ? "Activar Sonido" : "Silenciar"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleInstructions}
          title="Instrucciones"
        >
          <HelpCircle size={24} />
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
