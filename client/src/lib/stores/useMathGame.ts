import { create } from "zustand";
import { 
  isEven, 
  isOdd, 
  isPrime, 
  isDivisibleBy, 
  isMultipleOf,
  isFibonacci
} from "../math";

// Game mode type definitions
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

// Definir los estados del juego
export type GamePhase = "home" | "instructions" | "mode-selection" | "playing" | "game-over";

interface MathGameState {
  // Game state
  score: number;
  correctHits: number;
  incorrectHits: number;
  lastPointsEarned: number;
  gameTime: number;
  isInstructionsOpen: boolean;
  showHome: boolean;
  
  // Nueva propiedad para el flujo del juego
  gamePhase: GamePhase;
  
  // Game mode
  gameMode: GameMode;
  gameModes: GameMode[];
  valueRange: {
    min: number;
    max: number;
  };
  
  // Actions
  setGameMode: (mode: GameMode) => void;
  setGameTime: (seconds: number) => void;
  checkMoleValue: (value: number) => boolean;
  hitMole: (id: number, correct: boolean) => void;
  resetGameState: () => void;
  toggleInstructions: () => void;
  setShowHome: (show: boolean) => void;
  setGamePhase: (phase: GamePhase) => void;
  goToNextPhase: () => void;
}

export const useMathGame = create<MathGameState>((set, get) => {
  // Define all available game modes
  const availableGameModes: GameMode[] = [
    {
      id: "even",
      label: "Números Pares",
      description: "Golpea solo topos con números pares",
      valueRange: { min: 1, max: 20 },
      checkFunction: isEven,
      inverse: false
    },
    {
      id: "odd",
      label: "Números Impares",
      description: "Golpea solo topos con números impares",
      valueRange: { min: 1, max: 20 },
      checkFunction: isOdd,
      inverse: false
    },
    {
      id: "prime",
      label: "Números Primos",
      description: "Golpea solo topos con números primos",
      instructionDetail: "Los números primos son números mayores que 1 que solo son divisibles por 1 y por sí mismos (ej. 2, 3, 5, 7, 11, 13, 17, 19)",
      valueRange: { min: 1, max: 30 },
      checkFunction: isPrime,
      inverse: false
    },
    {
      id: "multiples-of-5",
      label: "Múltiplos de 5",
      description: "Golpea solo topos con números múltiplos de 5",
      valueRange: { min: 1, max: 50 },
      checkFunction: (n) => isMultipleOf(n, 5),
      inverse: false
    },
    {
      id: "multiples-of-7",
      label: "Múltiplos de 7",
      description: "Golpea solo topos con números múltiplos de 7",
      valueRange: { min: 1, max: 50 },
      checkFunction: (n) => isMultipleOf(n, 7),
      inverse: false
    }
  ];

  return {
    // Initial state
    score: 0,
    correctHits: 0,
    incorrectHits: 0,
    lastPointsEarned: 0,
    gameTime: 60, // 60 seconds default game time
    isInstructionsOpen: false,
    showHome: true,
    gamePhase: "home",
    
    // Default game mode
    gameMode: availableGameModes[0],
    gameModes: availableGameModes,
    valueRange: availableGameModes[0].valueRange,
    
    // Set the game mode
    setGameMode: (mode) => set({ 
      gameMode: mode,
      valueRange: mode.valueRange
    }),
    
    // Set the game time in seconds
    setGameTime: (seconds) => set({ gameTime: seconds }),
    
    // Check if a mole's value matches the current mode's criteria
    checkMoleValue: (value) => {
      const { gameMode } = get();
      const result = gameMode.checkFunction(value);
      
      // If the mode is inverse, we want the opposite result
      return gameMode.inverse ? !result : result;
    },
    
    // Handle when a mole is hit
    hitMole: (id, correct) => {
      if (correct) {
        set(state => ({
          score: state.score + 10,
          correctHits: state.correctHits + 1,
          lastPointsEarned: 10
        }));
      } else {
        set(state => ({
          score: Math.max(0, state.score - 5), // Don't go below 0
          incorrectHits: state.incorrectHits + 1,
          lastPointsEarned: -5
        }));
      }
      
      // Reset points counter after a delay
      setTimeout(() => {
        set({ lastPointsEarned: 0 });
      }, 1000);
    },
    
    // Reset the game state
    resetGameState: () => set({
      score: 0,
      correctHits: 0,
      incorrectHits: 0,
      lastPointsEarned: 0
    }),
    
    // Toggle instructions modal
    toggleInstructions: () => set(state => ({
      isInstructionsOpen: !state.isInstructionsOpen
    })),
    
    // Set show home state
    setShowHome: (show) => set({ showHome: show }),
    
    // Set game phase directly
    setGamePhase: (phase) => set({ gamePhase: phase }),
    
    // Avanzar a la siguiente fase del juego
    goToNextPhase: () => {
      const { gamePhase } = get();
      
      switch (gamePhase) {
        case "home":
          set({ gamePhase: "instructions" });
          break;
        case "instructions":
          set({ gamePhase: "mode-selection" });
          break;
        case "mode-selection":
          set({ gamePhase: "playing" });
          break;
        case "playing":
          set({ gamePhase: "game-over" });
          break;
        case "game-over":
          set({ 
            gamePhase: "home",
            showHome: true
          });
          break;
      }
    }
  };
});
