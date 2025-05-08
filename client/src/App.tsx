import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { useAudio } from "./lib/stores/useAudio";
import { useGame } from "./lib/stores/useGame";
import "@fontsource/inter";
import "./index.css";

// Import game components
import GameBoard from "./components/game/GameBoard";
import GameControls from "./components/game/GameControls";
import HomePage from "./components/game/HomePage";
import InstructionsPage from "./components/game/InstructionsPage";
import ModeSelectionPage from "./components/game/ModeSelectionPage";
import { useMathGame } from "./lib/stores/useMathGame";
import { motion } from "framer-motion";

function App() {
  const { phase } = useGame();
  const { isInstructionsOpen, gamePhase } = useMathGame();

  // Initialize audio elements
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const { setBackgroundMusic, setHitSound, setSuccessSound, toggleMute } = useAudio();

  useEffect(() => {
    const backgroundMusicElement = new Audio("/sounds/background.mp3");
    backgroundMusicElement.loop = true;
    backgroundMusicElement.volume = 0.4;
    setBackgroundMusic(backgroundMusicElement);

    const hitSoundElement = new Audio("/sounds/hit.mp3");
    setHitSound(hitSoundElement);

    const successSoundElement = new Audio("/sounds/success.mp3");
    setSuccessSound(successSoundElement);

    setIsAudioInitialized(true);

    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
    const handleResize = () => {
      document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  useEffect(() => {
    if (isAudioInitialized && phase === "playing") {
      toggleMute();
    }
  }, [isAudioInitialized, phase, toggleMute]);

  const renderGamePhase = () => {
    const { correctHits, incorrectHits, score } = useMathGame();
  
    switch (gamePhase) {
      case "home":
        return <HomePage />;
      case "instructions":
        return <InstructionsPage />;
      case "mode-selection":
        return <ModeSelectionPage />;
      case "playing":
        return (
          <div className="w-full flex-1 flex flex-col items-center">
            <GameBoard />
          </div>
        );
      case "game-over":
        return (
          <div className="w-full flex flex-col items-center -mt-2">
            {/* Contenedor para imagen y recuadro (pegados) */}
            <div className="flex flex-col items-center">
              {/* Imagen de trofeo con rebote */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [-10, -20, -10],
                  transition: {
                    y: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 1.8,
                      ease: "easeInOut"
                    },
                    opacity: { duration: 0.6 },
                    scale: { duration: 0.6 }
                  }
                }}
                className="w-40 h-40 md:w-96 md:h-96"
              >
                <img 
  src={score > 0 ? "/assets/win.png" : "/assets/nowin.png"} 
  alt={score > 0 ? "¡Ganaste!" : "Sigue intentando"} 
  className="w-full h-full object-contain drop-shadow-xl"
/>

              </motion.div>
              
              {/* Recuadro de resultados (pegado a la imagen) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-[#E8F4FB] border-2 border-[#A3BDC7] rounded-2xl p-2 w-[500px] shadow-md -mt-9"              >
                <h2 className="text-2xl font-Cleanow text-center text-[#3c2f80]">
                  ¡Resultado Final!
                </h2>
                <div className="text-center text-lg font-ShineTypewriter text-[#000000] space-y-1">
                  <p>
                    🎯 <span className="text-2xl font-bold text-[#257551]">Aciertos:</span> {correctHits}
                  </p>
                  <p>
                    ❌ <span className="text-2xl font-bold text-[#911818]">Errores:</span> {incorrectHits}
                  </p>
                  <p className="text-2xl font-bold text-[#3c2f80] mt-4">
                    🏆 Puntuación: <span className="text-[#000] text-2xl">{score} pts</span>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Espacio antes de los botones */}
            <div className="mt-4 w-full">
              <GameControls />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div
 className="fixed inset-0 flex justify-center items-start bg-cover bg-center bg-no-repeat"
 style={{ backgroundImage: "url('/assets/Fondo.png')" }}
>
        <div className="w-full h-full max-w-2xl p-4 flex flex-col items-center">
          {renderGamePhase()}
        </div>

        {isInstructionsOpen && <InstructionsPage />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
