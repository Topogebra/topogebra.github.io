import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/lib/stores/useGame";
import { useMathGame } from "@/lib/stores/useMathGame";
import { Volume2, VolumeX, HelpCircle } from "lucide-react";
import { useAudio } from "@/lib/stores/useAudio";

const GameControls: React.FC = () => {
  const { phase, start, restart } = useGame();
  const { toggleInstructions } = useMathGame();
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-4">
      {phase === "ready" && (
        <Button 
          size="lg" 
          onClick={() => start()}
          className="bg-primary hover:bg-primary/90 text-xl px-8 py-6"
        >
          Start Game
        </Button>
      )}

      {phase === "ended" && (
        <Button 
          size="lg" 
          onClick={() => restart()}
          className="bg-primary hover:bg-primary/90 text-xl px-8 py-6"
        >
          Play Again
        </Button>
      )}

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleInstructions}
          title="Instructions"
        >
          <HelpCircle size={24} />
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
