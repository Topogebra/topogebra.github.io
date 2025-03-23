import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

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
  
  // Determine the text color based on time left
  const getTextColor = () => {
    if (percentageLeft < 20) return "text-red-600";
    if (percentageLeft < 50) return "text-amber-600";
    return "text-green-600";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1 mb-1">
        <Clock size={20} className="text-[#333]" />
        <h2 className="text-lg font-bold text-[#333]">Tiempo</h2>
      </div>
      <motion.div 
        className={cn(
          "text-2xl font-mono font-bold px-3 py-1 rounded-md shadow-sm",
          "bg-white border-2",
          getTextColor(),
          timeLeft < 10 ? "border-red-500" : "border-[#A3BDC7]"
        )}
        animate={{ 
          scale: timeLeft < 10 && timeLeft % 2 === 0 ? 1.05 : 1 
        }}
        transition={{ duration: 0.2 }}
      >
        {formatTime(timeLeft)}
      </motion.div>
      <div className="w-full h-3 mt-2 relative bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn("h-full absolute left-0 top-0 transition-all", getProgressColor())}
          style={{ width: `${percentageLeft}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
