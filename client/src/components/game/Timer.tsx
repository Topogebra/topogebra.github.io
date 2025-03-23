import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

  // Determine the color based on time left
  const getProgressColor = () => {
    if (percentageLeft < 20) return "bg-red-500";
    if (percentageLeft < 50) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-1">Tiempo</h2>
      <div className="text-2xl font-mono">{formatTime(timeLeft)}</div>
      <div className="w-24 h-2 mt-1 relative bg-primary/20 rounded-full overflow-hidden">
        <div 
          className={cn("h-full absolute left-0 top-0 transition-all", getProgressColor())}
          style={{ width: `${percentageLeft}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
