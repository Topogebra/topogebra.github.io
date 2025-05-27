import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const percentageLeft = (timeLeft / totalTime) * 100;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getColor = () => {
    if (percentageLeft < 20) return "bg-red-500 text-red-600";
    if (percentageLeft < 50) return "bg-amber-500 text-amber-600";
    return "bg-[#3c2f80] text-[#3c2f80]";
  };

  return (
    <div className="bg-[#F7F9FC] rounded-xl p-4 shadow-md w-full h-full flex flex-col justify-between">
  <div className="relative flex flex-col items-center justify-center flex-grow">
  <div className="flex items-center gap-2 text-[#3c2f80]">
  <Clock size={40} />
  <span className="font-Cleanow text-4xl uppercase">Tiempo</span>
    </div>
    <motion.span 
      className={cn(
        "font-Cleanow text-3xl",
        percentageLeft < 20 ? "text-red-600" : "text-[#000000]"
      )}
      animate={{ 
        scale: timeLeft < 10 && timeLeft % 2 === 0 ? 1.05 : 1 
      }}
    >
      {formatTime(timeLeft)}
    </motion.span>
  </div>

  {/* Barra de progreso */}
  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
    <div 
      className={cn("h-full transition-all duration-1000", getColor())}
      style={{ width: `${percentageLeft}%` }}
    />
  </div>
</div>
  );
};

export default Timer;