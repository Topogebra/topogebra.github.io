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
import GameModes from "./components/game/GameModes";
import Instructions from "./components/game/Instructions";
import { useMathGame } from "./lib/stores/useMathGame";

function App() {
  const { phase } = useGame();
  const { gameMode, isInstructionsOpen } = useMathGame();
  
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

  return (
    <QueryClientProvider client={queryClient}>
      <div 
        className="w-screen h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-auto"
        style={{ maxWidth: '1366px', maxHeight: '768px', margin: '0 auto' }}
      >
        <div className="w-full h-full max-w-6xl p-4 flex flex-col items-center">
          <header className="w-full text-center mb-2">
            <h1 className="text-4xl font-bold text-primary mb-1">Math Mole Madness</h1>
            <p className="text-lg text-muted-foreground">
              Whack moles based on mathematical rules!
            </p>
          </header>

          {phase === "ready" && (
            <div className="w-full flex flex-col items-center gap-6">
              <GameModes />
              <GameControls />
            </div>
          )}

          {phase === "playing" && (
            <div className="w-full flex-1 flex flex-col items-center">
              <GameBoard />
            </div>
          )}

          {phase === "ended" && (
            <div className="w-full flex flex-col items-center gap-6 p-6 bg-card rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold">Game Over!</h2>
              <div className="text-xl">
                <p>Final Score: <span className="font-bold text-primary">{useMathGame.getState().score}</span></p>
                <p className="mt-2">Correct Hits: <span className="font-bold text-green-500">{useMathGame.getState().correctHits}</span></p>
                <p>Incorrect Hits: <span className="font-bold text-red-500">{useMathGame.getState().incorrectHits}</span></p>
              </div>
              <GameControls />
            </div>
          )}
        </div>

        {isInstructionsOpen && <Instructions />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
