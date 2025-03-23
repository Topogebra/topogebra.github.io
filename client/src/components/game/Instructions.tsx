import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMathGame } from "@/lib/stores/useMathGame";

const Instructions: React.FC = () => {
  const { isInstructionsOpen, toggleInstructions, gameMode, gameModes } = useMathGame();

  return (
    <Dialog open={isInstructionsOpen} onOpenChange={toggleInstructions}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Cómo Jugar</DialogTitle>
          <DialogDescription>
            ¡Topo Matemático es una forma divertida de practicar tus habilidades matemáticas!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">Modos de Juego</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {gameModes.map(mode => (
                <li key={mode.id}>
                  <span className="font-semibold">{mode.label}</span>: {mode.description}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Cómo Puntuar</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>+10 puntos por cada golpe correcto</li>
              <li>-5 puntos por cada golpe incorrecto</li>
              <li>Los topos desaparecen por sí solos si no son golpeados</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Modo Actual</h3>
            <p>{gameMode.instructionDetail || gameMode.description}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={toggleInstructions}>¡Entendido!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Instructions;
