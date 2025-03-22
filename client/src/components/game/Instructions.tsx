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
          <DialogTitle className="text-2xl">How to Play</DialogTitle>
          <DialogDescription>
            Math Mole Madness is a fun way to practice your math skills!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">Game Modes</h3>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {gameModes.map(mode => (
                <li key={mode.id}>
                  <span className="font-semibold">{mode.label}</span>: {mode.description}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">How to Score</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>+10 points for each correct hit</li>
              <li>-5 points for each incorrect hit</li>
              <li>Moles disappear on their own if not hit</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Current Mode</h3>
            <p>{gameMode.instructionDetail || gameMode.description}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={toggleInstructions}>Got it!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Instructions;
