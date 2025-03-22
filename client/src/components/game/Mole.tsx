import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMathGame } from "@/lib/stores/useMathGame";
import { useAudio } from "@/lib/stores/useAudio";
import { cn } from "@/lib/utils";

interface MoleProps {
  mole: {
    id: number;
    value: number;
    active: boolean;
    hit: boolean;
  };
}

const Mole: React.FC<MoleProps> = ({ mole }) => {
  const { id, value, active, hit } = mole;
  const [isHit, setIsHit] = useState(false);
  const hitTimeoutRef = useRef<number | null>(null);
  
  const { checkMoleValue, hitMole } = useMathGame();
  const { playHit, playSuccess } = useAudio();

  const handleClick = useCallback(() => {
    if (!active || hit) return;
    
    setIsHit(true);
    
    const isCorrect = checkMoleValue(value);
    if (isCorrect) {
      playSuccess();
    } else {
      playHit();
    }
    
    // Register hit with game state
    hitMole(id, isCorrect);
    
    // Reset hit animation after a short delay
    if (hitTimeoutRef.current) {
      window.clearTimeout(hitTimeoutRef.current);
    }
    
    hitTimeoutRef.current = window.setTimeout(() => {
      setIsHit(false);
    }, 300);
  }, [active, hit, id, value, hitMole, checkMoleValue, playHit, playSuccess]);

  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      {/* Mole hole */}
      <div className="absolute inset-0 bg-brown-900 rounded-full overflow-hidden transform scale-[0.8] shadow-inner">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <ellipse cx="50" cy="90" rx="40" ry="20" className="fill-black/50" />
        </svg>
      </div>
      
      {/* Mole */}
      <AnimatePresence>
        {active && !hit && (
          <motion.div
            className={cn(
              "absolute bottom-0 w-4/5 h-4/5 cursor-pointer",
              isHit && "cursor-default"
            )}
            initial={{ y: "100%" }}
            animate={{ y: "20%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={handleClick}
          >
            <div className="relative w-full h-full">
              {/* Mole body */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" className="fill-amber-700" />
                <circle cx="50" cy="40" r="35" className="fill-amber-600" />
                <circle cx="35" cy="35" r="5" className="fill-black" />
                <circle cx="65" cy="35" r="5" className="fill-black" />
                <path d="M 40 60 Q 50 70 60 60" className="stroke-black stroke-2 fill-none" />
              </svg>
              
              {/* Number display */}
              <div 
                className={cn(
                  "absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                  "bg-white rounded-full w-12 h-12 flex items-center justify-center",
                  "border-4 border-primary font-bold text-2xl"
                )}
              >
                {value}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mole;
