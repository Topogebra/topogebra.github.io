import { useState, useEffect, useCallback } from "react";
import { useMathGame } from "@/lib/stores/useMathGame";
import { useGame } from "@/lib/stores/useGame";

export function useGameLogic() {
  const { phase } = useGame();
  const { gameTime } = useMathGame();
  const [timeLeft, setTimeLeft] = useState(gameTime);

  // Start timer for the game
  const startTimer = useCallback(() => {
    setTimeLeft(gameTime);
  }, [gameTime]);

  // Update timer every second
  useEffect(() => {
    if (phase !== "playing") return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [phase]);

  return {
    timeLeft,
    startTimer
  };
}
