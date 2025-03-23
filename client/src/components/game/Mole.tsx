import React, { useState, useCallback, useRef, useEffect } from "react";
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

  // Reset isDead state when mole becomes inactive
  useEffect(() => {
    if (!active) {
      setIsDead(false);
    }
  }, [active]);

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
    if (isDead) return "/assets/TopoMuerto.png";
    if (isHit) return "/assets/Topo3.png";
    
    // Para números con un solo dígito usamos una imagen, para números con 2 dígitos otra
    return value < 10 ? "/assets/Topotarjeta.png" : "/assets/Topo1cartel.png";
  };

  // Determine number position and size based on value
  const getNumberStyles = () => {
    if (value < 10) {
      return "top-[26%] text-3xl";
    } else if (value < 100) {
      return "top-[28%] text-2xl";
    } else {
      return "top-[30%] text-xl";
    }
  };

  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      {/* Mole hole */}
      <div className="absolute inset-0 rounded-full overflow-hidden transform scale-[0.85] shadow-md">
        <img 
          src="/assets/Hoyo.png" 
          alt="Agujero" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Mole */}
      <AnimatePresence>
        {active && !hit && (
          <motion.div
            className={cn(
              "absolute bottom-0 w-[85%] h-[85%] cursor-pointer",
              isHit && "cursor-default"
            )}
            initial={{ y: "100%" }}
            animate={{ y: "18%" }}
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
                draggable={false}
              />
              
              {/* Number display */}
              <div 
                className={cn(
                  "absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                  "flex items-center justify-center",
                  "text-black font-bold font-mono",
                  "bg-white rounded-full px-3 py-1 shadow-md border-2 border-[#007bff]",
                  getNumberStyles()
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
