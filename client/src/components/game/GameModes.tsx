import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMathGame } from "@/lib/stores/useMathGame";
import { cn } from "@/lib/utils";

const GameModes: React.FC = () => {
  const { gameMode, setGameMode, gameModes, gameTime, setGameTime, toggleInstructions } = useMathGame();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold text-center">Selecciona un Modo de Juego</h2>
        <Button
          variant="outline"
          onClick={toggleInstructions}
          className="text-sm px-3 py-1 h-8"
        >
          Instrucciones
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {gameModes.map((mode) => (
          <Card 
            key={mode.id}
            className={cn(
              "cursor-pointer transition-all",
              gameMode.id === mode.id 
                ? "border-4 border-primary shadow-md" 
                : "hover:border-primary/50 hover:shadow"
            )}
            onClick={() => setGameMode(mode)}
          >
            <CardContent className="p-3">
              <h3 className="text-lg sm:text-xl font-bold mb-1">{mode.label}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">{mode.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full">
        <h3 className="text-xl font-bold mb-3 text-center">Duración del Juego</h3>
        <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
          {[30, 60, 90, 120].map((seconds) => (
            <Button
              key={seconds}
              variant={gameTime === seconds ? "default" : "outline"}
              className={cn(
                "min-w-[60px]",
                gameTime === seconds ? "bg-primary shadow-sm" : ""
              )}
              onClick={() => setGameTime(seconds)}
            >
              {seconds < 60 ? `${seconds}s` : `${seconds / 60}m`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameModes;
