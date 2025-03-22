import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMathGame } from "@/lib/stores/useMathGame";
import { cn } from "@/lib/utils";

const GameModes: React.FC = () => {
  const { gameMode, setGameMode, gameModes, gameTime, setGameTime } = useMathGame();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Select Game Mode</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {gameModes.map((mode) => (
          <Card 
            key={mode.id}
            className={cn(
              "cursor-pointer transition-all",
              gameMode.id === mode.id 
                ? "border-4 border-primary" 
                : "hover:border-primary/50"
            )}
            onClick={() => setGameMode(mode)}
          >
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">{mode.label}</h3>
              <p className="text-muted-foreground">{mode.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full">
        <h3 className="text-xl font-bold mb-3 text-center">Game Duration</h3>
        <div className="flex justify-center gap-4">
          {[30, 60, 90, 120].map((seconds) => (
            <Button
              key={seconds}
              variant={gameTime === seconds ? "default" : "outline"}
              className={gameTime === seconds ? "bg-primary" : ""}
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
