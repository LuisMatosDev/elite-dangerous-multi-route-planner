import { useState, useEffect } from "react";

export function useEliteStatus() {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Estado inicial
    window.electronAPI.getEliteStatus().then(({ running }) => {
      setIsRunning(running);
    });

    // Eventos em tempo real
    const handleRunning = () => setIsRunning(true);
    const handleStopped = () => setIsRunning(false);

    window.electronAPI.onEliteRunning(handleRunning);
    window.electronAPI.onEliteStopped(handleStopped);

    return () => {
      window.electronAPI.removeAllListeners("elite:running");
      window.electronAPI.removeAllListeners("elite:stopped");
    };
  }, []);

  return { isRunning };
}