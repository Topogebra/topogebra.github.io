import React from "react";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  // Calculate percentage of time remaining
  const percentageLeft = (timeLeft / totalTime) * 100;
  
  // Format time as minutes:seconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-1">Tiempo</h2>
      <div className="text-2xl font-mono">{formatTime(timeLeft)}</div>
      <Progress 
        value={percentageLeft} 
        className="w-24 h-2 mt-1"
        indicatorClassName={`${
          percentageLeft < 20
            ? "bg-red-500"
            : percentageLeft < 50
            ? "bg-amber-500"
            : "bg-green-500"
        }`}
      />
    </div>
  );
};

export default Timer;
