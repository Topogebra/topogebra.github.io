import { create } from "zustand";
import {
  isEven,
  isOdd,
  isPrime,
  isMultipleOf,
} from "../math";

export interface GameMode {
  id: string;
  label: string;
  description: string;
  instructionDetail?: string;
  valueRange: {
    min: number;
    max: number;
  };
  checkFunction: (value: number) => boolean;
  inverse: boolean;
}

export type GamePhase = "home" | "instructions" | "mode-selection" | "playing" | "game-over";

interface MathGameState {
  score: number;
  correctHits: number;
  incorrectHits: number;
  lastPointsEarned: number;
  gameTime: number;
  isInstructionsOpen: boolean;
  showHome: boolean;
  gamePhase: GamePhase;
  gameMode: GameMode;
  gameModes: GameMode[];
  valueRange: {
    min: number;
    max: number;
  };
  setGameMode: (mode: GameMode) => void;
  setGameTime: (seconds: number) => void;
  checkMoleValue: (value: number) => boolean;
  hitMole: (id: number, isBad: boolean, value: number) => void;
  resetGameState: () => void;
  toggleInstructions: () => void;
  setShowHome: (show: boolean) => void;
  setGamePhase: (phase: GamePhase) => void;
  goToNextPhase: () => void;
  goToPreviousPhase: () => void;
  goToModeSelection: () => void;
}

export const useMathGame = create<MathGameState>((set, get) => {
  const availableGameModes: GameMode[] = [
    {
      id: "pares",
      label: "Números Pares",
      description: "Golpea solo topos con números pares",
      valueRange: { min: 1, max: 40 },
      checkFunction: isEven,
      inverse: false,
    },
    {
      id: "impares",
      label: "Números Impares",
      description: "Golpea solo topos con números impares",
      valueRange: { min: 1, max: 40 },
      checkFunction: isOdd,
      inverse: false,
    },
    {
      id: "primos",
      label: "Números Primos",
      description: "Golpea solo topos con números primos",
      instructionDetail: "Los números primos son mayores que 1 y solo divisibles por 1 y por sí mismos (ej. 2, 3, 5, 7, 11...)",
      valueRange: { min: 1, max: 90 },
      checkFunction: isPrime,
      inverse: false,
    },
    {
      id: "multiplos5",
      label: "Múltiplos de 5",
      description: "Golpea solo topos con números múltiplos de 5",
      valueRange: { min: 1, max: 40 },
      checkFunction: (n) => isMultipleOf(n, 5),
      inverse: false,
    },
    {
      id: "multiplos7",
      label: "Múltiplos de 7",
      description: "Golpea solo topos con números múltiplos de 7",
      valueRange: { min: 1, max: 40 },
      checkFunction: (n) => isMultipleOf(n, 7),
      inverse: false,
    },
  ];

  return {
    score: 0,
    correctHits: 0,
    incorrectHits: 0,
    lastPointsEarned: 0,
    gameTime: 60,
    isInstructionsOpen: false,
    showHome: true,
    gamePhase: "home",
    gameMode: availableGameModes[0],
    gameModes: availableGameModes,
    valueRange: availableGameModes[0].valueRange,

    setGameMode: (mode) => {
      if (!mode?.valueRange) return;
      set({
        gameMode: mode,
        valueRange: mode.valueRange,
      });
    },

    setGameTime: (seconds) => set({ gameTime: seconds }),

    checkMoleValue: (value) => {
      const { gameMode } = get();
      const result = gameMode.checkFunction(value);
      return gameMode.inverse ? !result : result;
    },

    hitMole: (id, isBad, value) => {
      const { gameMode } = get();
      let points = 0;
      let correct = false;

      if (isBad) {
        points = -10;
        correct = false;
      } else {
        correct = gameMode.checkFunction(value);
        points = correct ? 10 : -5;
      }

      set((state) => ({
        score: state.score + points,
        correctHits: correct ? state.correctHits + 1 : state.correctHits,
        incorrectHits: !correct ? state.incorrectHits + 1 : state.incorrectHits,
        lastPointsEarned: points,
      }));

      setTimeout(() => {
        set({ lastPointsEarned: 0 });
      }, 1000);
    },

    resetGameState: () =>
      set({
        score: 0,
        correctHits: 0,
        incorrectHits: 0,
        lastPointsEarned: 0,
      }),

    toggleInstructions: () =>
      set((state) => ({ isInstructionsOpen: !state.isInstructionsOpen })),

    setShowHome: (show) => set({ showHome: show }),

    setGamePhase: (phase) => set({ gamePhase: phase }),

    goToModeSelection: () => {
      set({ gamePhase: "mode-selection" });
    },

    goToNextPhase: () => {
      const { gamePhase } = get();
      const nextPhases: Record<GamePhase, GamePhase> = {
        home: "instructions",
        instructions: "mode-selection",
        "mode-selection": "playing",
        playing: "game-over",
        "game-over": "home",
      };
      set({ gamePhase: nextPhases[gamePhase] });
    },

    goToPreviousPhase: () => {
      const { gamePhase } = get();
      const previousPhases: Record<GamePhase, GamePhase> = {
        home: "home",
        instructions: "home",
        "mode-selection": "instructions",
        playing: "mode-selection",
        "game-over": "playing",
      };
      set({ gamePhase: previousPhases[gamePhase] });
    },
  };
});