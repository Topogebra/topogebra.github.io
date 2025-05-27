import { useState, useEffect, useCallback, useRef } from "react";
import { useMathGame } from "@/lib/stores/useMathGame";

export interface Mole {
  id: number;
  value: number;
  active: boolean;
  hit: boolean;
  type: 'normal' | 'bad';
}

const MOLE_COUNT = 10;
const MIN_ACTIVE_TIME = 1000;
const MAX_ACTIVE_TIME = 2000;
const MIN_INACTIVE_TIME = 2000;
const MAX_INACTIVE_TIME = 3000;
const BAD_MOLE_PROBABILITY = 0.15;

export function useMoles() {
  const { gamePhase, valueRange } = useMathGame();
  const [moles, setMoles] = useState<Mole[]>([]);
  const timersRef = useRef<number[]>([]);

  const determineMoleType = (): 'normal' | 'bad' => {
    return Math.random() < BAD_MOLE_PROBABILITY ? 'bad' : 'normal';
  };

  useEffect(() => {
    const initialMoles = Array.from({ length: MOLE_COUNT }, (_, index) => ({
      id: index,
      value: getRandomValue(valueRange.min, valueRange.max),
      active: false,
      hit: false,
      type: determineMoleType(),
    }));
    setMoles(initialMoles);
  }, [valueRange]);

  useEffect(() => {
    if (gamePhase !== "playing") return;

    const activateRandomMoles = () => {
      const molesToActivate = Math.floor(Math.random() * 5) + 4; // entre 4 y 8 topos

      setMoles(prev => {
        const updated = [...prev];
        const inactiveMoles = updated.filter(m => !m.hit);
        const chosenMoles = inactiveMoles
          .sort(() => Math.random() - 0.5)
          .slice(0, molesToActivate);

        for (const mole of chosenMoles) {
          // Paso 1: Desactivar brevemente
          setMoles(curr =>
            curr.map(m =>
              m.id === mole.id ? { ...m, active: false } : m
            )
          );

          // Paso 2: Reactivar luego de una pausa
          window.setTimeout(() => {
            setMoles(curr =>
              curr.map(m =>
                m.id === mole.id
                  ? {
                      ...m,
                      active: true,
                      value: getRandomValue(valueRange.min, valueRange.max),
                      type: determineMoleType(),
                    }
                  : m
              )
            );
          }, 200); // <- ajusta este valor según la animación

          const activeTime = getRandomTime(MIN_ACTIVE_TIME, MAX_ACTIVE_TIME);
          timersRef.current.push(
            window.setTimeout(() => {
              setMoles(current =>
                current.map(m =>
                  m.id === mole.id ? { ...m, active: false } : m
                )
              );
            }, activeTime + 200) // Suma 200ms de delay previo
          );
        }

        return updated;
      });
    };

    const scheduleNextActivation = () => {
      const inactiveTime = getRandomTime(MIN_INACTIVE_TIME, MAX_INACTIVE_TIME);
      const timer = window.setTimeout(() => {
        activateRandomMoles();
        scheduleNextActivation();
      }, inactiveTime);
      timersRef.current.push(timer);
    };

    const initialTimer = window.setTimeout(() => {
      activateRandomMoles();
      scheduleNextActivation();
    }, 1000);
    timersRef.current.push(initialTimer);

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [gamePhase, valueRange]);

  const hitMole = useCallback((id: number, isBad: boolean) => {
    if (isBad) {
      console.log("¡Topo malo golpeado! -10 puntos");
    }

    setMoles(prev =>
      prev.map(m =>
        m.id === id ? { ...m, hit: true, active: false } : m
      )
    );

    window.setTimeout(() => {
      setMoles(prev =>
        prev.map(m =>
          m.id === id ? { ...m, hit: false } : m
        )
      );
    }, 300);
  }, []);

  const resetMoles = useCallback(() => {
    setMoles(prev =>
      prev.map(mole => ({
        ...mole,
        active: false,
        hit: false,
        value: getRandomValue(valueRange.min, valueRange.max),
        type: determineMoleType()
      }))
    );
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  }, [valueRange]);

  return { moles, hitMole, resetMoles };
}

function getRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTime(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

