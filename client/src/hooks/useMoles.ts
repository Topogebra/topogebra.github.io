import { useState, useEffect, useCallback } from "react";
import { useMathGame } from "@/lib/stores/useMathGame";
import { useGame } from "@/lib/stores/useGame";

export interface Mole {
  id: number;
  value: number;
  active: boolean;
  hit: boolean;
}

// Number of moles to show on the game board
const MOLE_COUNT = 10;

// Time ranges for mole appearances (in milliseconds)
const MIN_ACTIVE_TIME = 2000; // Cuánto tiempo permanece el topo activo como mínimo
const MAX_ACTIVE_TIME = 3500; // Cuánto tiempo permanece el topo activo como máximo

// Tiempos entre apariciones (5-7 segundos según requisito)
const MIN_INACTIVE_TIME = 5000; // 5 segundos
const MAX_INACTIVE_TIME = 7000; // 7 segundos

export function useMoles() {
  const { gamePhase, valueRange } = useMathGame();
  const [moles, setMoles] = useState<Mole[]>([]);

  // Initialize moles
  useEffect(() => {
    const initialMoles = Array.from({ length: MOLE_COUNT }, (_, index) => ({
      id: index,
      value: getRandomValue(valueRange.min, valueRange.max),
      active: false,
      hit: false,
    }));
    
    setMoles(initialMoles);
  }, [valueRange]);

  // Handle mole activation
  useEffect(() => {
    if (gamePhase !== "playing") return;

    const timers: number[] = [];

    // Function to randomly activate moles
    const activateMoles = () => {
      // Choose a random mole to activate
      const inactiveMoles = moles.filter(mole => !mole.active && !mole.hit);
      
      if (inactiveMoles.length === 0) return;
      
      const moleToActivate = inactiveMoles[Math.floor(Math.random() * inactiveMoles.length)];
      
      // Update mole's state to active
      setMoles(prevMoles => 
        prevMoles.map(mole => 
          mole.id === moleToActivate.id 
            ? { ...mole, active: true, value: getRandomValue(valueRange.min, valueRange.max) } 
            : mole
        )
      );
      
      // Set a timer to deactivate the mole
      const activeTime = Math.random() * (MAX_ACTIVE_TIME - MIN_ACTIVE_TIME) + MIN_ACTIVE_TIME;
      const timerId = window.setTimeout(() => {
        setMoles(prevMoles => 
          prevMoles.map(mole => 
            mole.id === moleToActivate.id ? { ...mole, active: false } : mole
          )
        );
      }, activeTime);
      
      timers.push(timerId);
    };
    
    // Schedule regular mole activations
    const scheduleMoleActivation = () => {
      const inactiveTime = Math.random() * (MAX_INACTIVE_TIME - MIN_INACTIVE_TIME) + MIN_INACTIVE_TIME;
      const timerId = window.setTimeout(() => {
        activateMoles();
        scheduleMoleActivation();
      }, inactiveTime);
      
      timers.push(timerId);
    };
    
    // Activar algunos topos inicialmente para que el juego no empiece vacío
    for (let i = 0; i < 3; i++) {
      setTimeout(() => activateMoles(), i * 500);
    }
    
    // Start scheduling mole activations
    scheduleMoleActivation();
    
    // Clean up all timers when component unmounts or game phase changes
    return () => {
      timers.forEach(timerId => window.clearTimeout(timerId));
    };
  }, [moles, gamePhase, valueRange]);

  // Function to update a mole when it's hit
  const hitMole = useCallback((id: number) => {
    setMoles(prevMoles => 
      prevMoles.map(mole => 
        mole.id === id ? { ...mole, hit: true, active: false } : mole
      )
    );
    
    // Reset the hit status after a short delay
    window.setTimeout(() => {
      setMoles(prevMoles => 
        prevMoles.map(mole => 
          mole.id === id ? { ...mole, hit: false } : mole
        )
      );
    }, 300);
  }, []);

  // Reset all moles
  const resetMoles = useCallback(() => {
    setMoles(prevMoles => 
      prevMoles.map(mole => ({
        ...mole,
        active: false,
        hit: false,
        value: getRandomValue(valueRange.min, valueRange.max)
      }))
    );
  }, [valueRange]);

  return { moles, hitMole, resetMoles };
}

// Helper function to generate random values for moles
function getRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
