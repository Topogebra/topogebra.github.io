import React from "react";
import { useMathGame } from "@/lib/stores/useMathGame";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const InstructionsPage: React.FC = () => {
  const { goToNextPhase, gameModes } = useMathGame();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#C5DCD5] rounded-xl p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8"
      >
        {/* Título similar al de la página principal */}
        <div className="w-full mb-6 bg-[#A3BDC7] py-3 px-6 rounded-md shadow-sm">
          <h1 className="text-3xl font-bold text-[#333] text-center">Instrucciones del Juego</h1>
        </div>
        
        <div className="space-y-6 text-black max-h-[50vh] overflow-y-auto pr-2">
          <div className="bg-blue-50 p-5 rounded-md border border-blue-100">
            <h2 className="text-xl font-bold text-blue-700 mb-3">¡Bienvenido a Topogebra!</h2>
            <p className="text-base">
              En este juego pondrás a prueba tus habilidades matemáticas mientras golpeas topos.
              Cada topo mostrará un número y tendrás que golpear solo aquellos que cumplen
              con la regla matemática del modo de juego seleccionado.
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-md border border-green-100">
            <h2 className="text-xl font-bold text-green-700 mb-3">Modos de Juego</h2>
            <ul className="list-disc pl-6 space-y-2">
              {gameModes.map(mode => (
                <li key={mode.id} className="text-base">
                  <span className="font-semibold">{mode.label}</span>: {mode.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 p-5 rounded-md border border-amber-100">
            <h2 className="text-xl font-bold text-amber-700 mb-3">Cómo Puntuar</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-base">+10 puntos por cada golpe correcto</li>
              <li className="text-base">-5 puntos por cada golpe incorrecto</li>
              <li className="text-base">Los topos desaparecen solos si no son golpeados</li>
              <li className="text-base">¡Trata de obtener la puntuación más alta posible!</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => goToNextPhase()}
            size="lg"
            className="bg-[#A3BDC7] hover:bg-[#8CADBF] text-[#333] font-bold px-8 py-3 text-lg rounded-lg shadow-md transition-all"
          >
            ¡Entendido! Seleccionar Modo
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default InstructionsPage;