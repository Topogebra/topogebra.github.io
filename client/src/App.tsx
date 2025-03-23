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
import Instructions from "./components/game/Instructions";
import HomePage from "./components/game/HomePage";
import InstructionsPage from "./components/game/InstructionsPage";
import ModeSelectionPage from "./components/game/ModeSelectionPage";
import { useMathGame } from "./lib/stores/useMathGame";

function App() {
  const { phase } = useGame();
  const { isInstructionsOpen, gamePhase } = useMathGame();
  
  // Initialize audio elements
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const { setBackgroundMusic, setHitSound, setSuccessSound, toggleMute } = useAudio();

  useEffect(() => {
    // Create audio elements on mount
    const backgroundMusicElement = new Audio("/sounds/background.mp3");
    backgroundMusicElement.loop = true;
    backgroundMusicElement.volume = 0.4;
    setBackgroundMusic(backgroundMusicElement);

    const hitSoundElement = new Audio("/sounds/hit.mp3");
    setHitSound(hitSoundElement);

    const successSoundElement = new Audio("/sounds/success.mp3");
    setSuccessSound(successSoundElement);

    setIsAudioInitialized(true);
    
    // Set viewport height to ensure proper scaling for 1366x768
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    
    const handleResize = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  // Initialize background music when audio is ready
  useEffect(() => {
    if (isAudioInitialized && phase === "playing") {
      // Unmute and play background music when game starts
      toggleMute();
    }
  }, [isAudioInitialized, phase, toggleMute]);

  // Renderizar la página correspondiente según la fase del juego
  const renderGamePhase = () => {
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
          <div className="w-full flex flex-col items-center gap-6 p-6 bg-[#A3BDC7] rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white">¡Juego Terminado!</h2>
            <div className="text-xl bg-white p-6 rounded-lg shadow-md">
              <p>Puntuación Final: <span className="font-bold text-primary">{useMathGame.getState().score}</span></p>
              <p className="mt-2">Aciertos: <span className="font-bold text-green-500">{useMathGame.getState().correctHits}</span></p>
              <p>Fallos: <span className="font-bold text-red-500">{useMathGame.getState().incorrectHits}</span></p>
            </div>
            <GameControls />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div 
        className="w-screen h-screen flex flex-col items-center justify-center bg-[#C5DCD5] text-foreground overflow-auto"
        style={{ maxWidth: '1366px', maxHeight: '768px', margin: '0 auto' }}
      >
        <div className="w-full h-full max-w-6xl p-4 flex flex-col items-center">
          {renderGamePhase()}
        </div>

        {isInstructionsOpen && <Instructions />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
