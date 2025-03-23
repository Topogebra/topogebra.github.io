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
  const [isDead, setIsDead] = useState(false);
  const hitTimeoutRef = useRef<number | null>(null);
  
  const { checkMoleValue, hitMole } = useMathGame();
  const { playHit, playSuccess } = useAudio();

  const handleClick = useCallback(() => {
    if (!active || hit) return;
    
    setIsHit(true);
    
    const isCorrect = checkMoleValue(value);
    if (isCorrect) {
      playSuccess();
      setIsDead(true);
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

  // Determine which mole image to use
  const getMoleImage = () => {
    if (isDead) return "/images/TopoMuerto.png";
    if (isHit) return "/images/Topo3.png";
    
    // Show mole with number on sign
    if (value < 10) {
      return "/images/Topotarjeta.png";
    } else {
      return "/images/Topo2.png";
    }
  };

  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      {/* Mole hole */}
      <div className="absolute inset-0 rounded-full overflow-hidden transform scale-[0.8] shadow-inner">
        <img 
          src="/images/Hoyo.png" 
          alt="Agujero" 
          className="w-full h-full object-contain"
        />
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
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Mole image */}
              <img 
                src={getMoleImage()} 
                alt="Topo" 
                className="w-full h-full object-contain"
              />
              
              {/* Number display - only added if using the mole without number card */}
              {value >= 10 && (
                <div 
                  className={cn(
                    "absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    "bg-[#CDDC39] rounded-sm min-w-[2.5rem] min-h-[2.5rem] flex items-center justify-center",
                    "text-black font-bold text-2xl"
                  )}
                >
                  {value}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mole;
