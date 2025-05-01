import React from "react";
import { motion } from "framer-motion";
import { useMathGame } from "@/lib/stores/useMathGame";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const InstructionsPage: React.FC = () => {
  const { goToNextPhase, goToPreviousPhase } = useMathGame();

  return (
    <div 
      className="fixed inset-0 flex justify-center items-start bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/Fondo.png')" }}
    >
      <button 
        onClick={goToPreviousPhase}
        className="absolute left-4 top-4 z-50 p-2 rounded-full bg-[#3c2f80] text-white hover:bg-[#5d4ba7] transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-[#A3BDC7] mt-4 scale-[0.9]"
      >
        <div className="p-3">
          <h1 className="text-3xl font-Cleanow font-bold text-center text-[#000000] mb-1">
            ¡Instrucciones de <span className="text-[#3c2f80]">TOPOGEBRA</span>!
          </h1>

          <p className="text-2xl text-[#000] font-ShineTypewriter font-bold text-center leading-snug mb-2">
            Tu objetivo es golpear los topos correctos según el modo de juego que elijas
          </p>
          <p className="text-[#000] font-ShineTypewriter font-bold text-center leading-snug mb-2">
            (´-ω-`)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1 mb-1">
            <ul className="space-y-2 pl-4 list-disc text-[#000]">
              <li className="text-2xl font-ShineTypewriter font-bold">
                <span className="font-Cleanow text-[#3c2f80]">Números Pares:</span> Golpea solo los topos con números pares 
              </li>
              <li className="text-2xl font-ShineTypewriter font-bold">
                <span className="font-Cleanow text-[#3c2f80]">Números Impares:</span> Golpea solo los topos con números impares 
              </li>
              <li className="text-2xl font-ShineTypewriter font-bold">
                <span className="font-Cleanow text-[#3c2f80]">Números Primos:</span> Golpea solo los topos con números primos
              </li>
            </ul>
            <ul className="space-y-2 pl-6 list-disc text-[#000]">
              <li className="text-2xl font-ShineTypewriter font-bold">
                <span className="font-Cleanow text-[#3c2f80]">Múltiplos de 5:</span> Golpea solo los topos con múltiplos de 5 
              </li>
              <li className="text-2xl font-ShineTypewriter font-bold">
                <span className="font-Cleanow text-[#3c2f80]">Múltiplos de 7:</span> Golpea solo los topos con múltiplos de 7 
              </li>
              <div className="bg-[#E8F4FB] border border-[#A3BDC7] rounded-xl p-3 mb-2">
                <p className="text-base font-Cleanow text-center text-[#3c2f80] mb-1">
                  ¡CUIDADO CON LOS TOPOS ROJOS, TE QUITAN 10 PUNTOS!
                </p>
              </div>
            </ul>
          </div>

          <div className="bg-[#E8F4FB] border border-[#A3BDC7] rounded-xl p-3 mb-2">
            <h2 className="text-2xl font-Cleanow text-[#000000]">Puntuación:</h2>
            <ul className="pl-4 list-disc text-gray-800">
              <li className="text-base font-ShineTypewriter text-[#257551]">+10 puntos por cada acierto</li>
              <li className="text-base font-ShineTypewriter text-[#911818]">-5 puntos por cada error</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={goToNextPhase}
              className="text-base px-8 py-8 bg-[#b1e5ff] hover:bg-[#8df19c] text-[#3c2f80] font-Cleanow font-bold rounded-xl shadow-md uppercase transition-colors"
            >
              Entendido
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InstructionsPage;