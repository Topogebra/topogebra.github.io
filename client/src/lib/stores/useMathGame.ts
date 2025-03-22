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

interface MathGameState {
  // Game state
  score: number;
  correctHits: number;
  incorrectHits: number;
  lastPointsEarned: number;
  gameTime: number;
  isInstructionsOpen: boolean;
  
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
}

export const useMathGame = create<MathGameState>((set, get) => {
  // Define all available game modes
  const availableGameModes: GameMode[] = [
    {
      id: "even",
      label: "Even Numbers",
      description: "Whack only moles with even numbers",
      valueRange: { min: 1, max: 20 },
      checkFunction: isEven,
      inverse: false
    },
    {
      id: "odd",
      label: "Odd Numbers",
      description: "Whack only moles with odd numbers",
      valueRange: { min: 1, max: 20 },
      checkFunction: isOdd,
      inverse: false
    },
    {
      id: "prime",
      label: "Prime Numbers",
      description: "Whack only moles with prime numbers",
      instructionDetail: "Prime numbers are numbers greater than 1 that are only divisible by 1 and themselves (e.g., 2, 3, 5, 7, 11, 13, 17, 19)",
      valueRange: { min: 1, max: 30 },
      checkFunction: isPrime,
      inverse: false
    },
    {
      id: "divisible-by-3",
      label: "Divisible by 3",
      description: "Whack only moles with numbers divisible by 3",
      valueRange: { min: 1, max: 30 },
      checkFunction: (n) => isDivisibleBy(n, 3),
      inverse: false
    },
    {
      id: "not-multiples-of-5",
      label: "NOT Multiples of 5",
      description: "Whack moles with numbers that are NOT multiples of 5",
      valueRange: { min: 1, max: 30 },
      checkFunction: (n) => isMultipleOf(n, 5),
      inverse: true
    },
    {
      id: "fibonacci",
      label: "Fibonacci Numbers",
      description: "Whack moles with Fibonacci numbers",
      instructionDetail: "Fibonacci numbers form a sequence where each number is the sum of the two preceding ones (e.g., 1, 1, 2, 3, 5, 8, 13, 21)",
      valueRange: { min: 1, max: 50 },
      checkFunction: isFibonacci,
      inverse: false
    },
  ];

  return {
    // Initial state
    score: 0,
    correctHits: 0,
    incorrectHits: 0,
    lastPointsEarned: 0,
    gameTime: 60, // 60 seconds default game time
    isInstructionsOpen: false,
    
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
    }))
  };
});
