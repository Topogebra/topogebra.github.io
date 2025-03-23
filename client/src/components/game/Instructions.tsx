import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMathGame } from "@/lib/stores/useMathGame";

const Instructions: React.FC = () => {
  const { isInstructionsOpen, toggleInstructions, gameMode, gameModes } = useMathGame();

  return (
    <Dialog open={isInstructionsOpen} onOpenChange={toggleInstructions}>
      <DialogContent className="max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-primary">Cómo Jugar</DialogTitle>
          <DialogDescription className="text-base">
            ¡Topogebra es una forma divertida de practicar tus habilidades matemáticas!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-black max-h-[60vh] overflow-y-auto pr-2">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-xl font-bold text-blue-700">Modos de Juego</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-black">
              {gameModes.map(mode => (
                <li key={mode.id} className="text-base">
                  <span className="font-semibold">{mode.label}</span>: {mode.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-xl font-bold text-green-700">Cómo Puntuar</h3>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-black">
              <li className="text-base">+10 puntos por cada golpe correcto</li>
              <li className="text-base">-5 puntos por cada golpe incorrecto</li>
              <li className="text-base">Los topos desaparecen por sí solos si no son golpeados</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-md">
            <h3 className="text-xl font-bold text-amber-700">Modo Actual</h3>
            <p className="mt-2 text-base">{gameMode.instructionDetail || gameMode.description}</p>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button 
            onClick={toggleInstructions}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2"
          >
            ¡Entendido!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Instructions;
