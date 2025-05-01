import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMathGame } from "@/lib/stores/useMathGame";
import { cn } from "@/lib/utils";

interface MoleProps {
  mole: {
    id: number;
    value: number;
    active: boolean;
    hit: boolean;
    type: 'normal' | 'bad';
  };
}

const Mole: React.FC<MoleProps> = ({ mole }) => {
  const { id, value, active, hit, type } = mole;
  const [isHit, setIsHit] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const hitTimeoutRef = useRef<number | null>(null);
  const deadTimeoutRef = useRef<number | null>(null);

  const { hitMole } = useMathGame();

  useEffect(() => {
    if (!active) {
      setIsDead(false);
      setIsHit(false);
      if (hitTimeoutRef.current) clearTimeout(hitTimeoutRef.current);
      if (deadTimeoutRef.current) clearTimeout(deadTimeoutRef.current);
    }
  }, [active]);

  const handleClick = useCallback(() => {
    if (!active || hit) return;
  
    setIsHit(true);
    hitMole(id, type === 'bad', value);

    hitTimeoutRef.current = window.setTimeout(() => {
      setIsHit(false);
      setIsDead(true);
      
      deadTimeoutRef.current = window.setTimeout(() => {
        setIsDead(false);
      }, 700);
    }, 300);

    return () => {
      if (hitTimeoutRef.current) clearTimeout(hitTimeoutRef.current);
      if (deadTimeoutRef.current) clearTimeout(deadTimeoutRef.current);
    };
  }, [active, hit, id, type, value, hitMole]);

  const getMoleImage = () => {
    if (isDead) return "/assets/TopoMuerto.png";
    if (isHit) return "/assets/Topochillón.png";
    if (type === 'bad') return "/assets/TopoMalo.png";

    const moleVariants = [
      "/assets/Topotarjeta.png",
      "/assets/Topotarjeta2.png",
      "/assets/Topotarjeta3.png",
      "/assets/Topotarjeta4.png"
    ];
    return moleVariants[Math.floor(id % moleVariants.length)];
  };

  return (
    <div
      className="relative w-full bottom-4 aspect-square flex items-center justify-center overflow-hidden"
      style={{ 
        pointerEvents: active ? 'auto' : 'none'
      }}
    >
      {/* Hoyo de fondo */}
      <div className="absolute w-full z-0 pointer-events-none top-3 px-2">
      <img
  src="/assets/Hoyo.png"
  alt="Hoyo fondo"
  className="w-full h-full object-contain scale-[1.5]"
/>

      </div>

      <AnimatePresence>
        {active && !hit && (
          <motion.div
            className={cn(
              "absolute bottom-0 w-[85%] h-[85%] z-10"
            )}
            initial={{ y: "100%" }}
            animate={{ y: isDead ? "100%" : "18%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={handleClick}
          >
            <div className="relative w-full h-full flex items-center justify-center scale-[1.22] origin-bottom">
              <img
                src={getMoleImage()}
                alt="Topo"
                className="w-full h-full object-contain"
                draggable={false}
              />
              {type === 'normal' && !isHit && !isDead && (
                <div className="absolute top-2 left-19 text-black font-Cleanow text-2xl">
                  {value}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tierra encima del topo */}
      <div className="absolute w-full z-20 pointer-events-none transform translate-y-[6%]">
        <img
          src="/assets/Hoyos.png"
          alt="Hoyos"
          className="w-full h-full object-contain px-2 py-14 rounded-full"
        />
      </div>
    </div>
  );
};

export default Mole;