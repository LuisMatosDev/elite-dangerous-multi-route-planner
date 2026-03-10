import { useEffect } from "react";
import { useAppContext } from "../store/AppContext";

export function useJournal() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (!window.electronAPI) return;

    // Estado inicial ao arrancar
    window.electronAPI.getJournalState().then((journalState) => {
      if (journalState.system) {
        dispatch({
          type: "LOCATION_UPDATE",
          payload: journalState.system,
        });
      }
      if (journalState.ship) {
        dispatch({
          type: "SHIP_UPDATE",
          payload: {
            ship: journalState.ship.shipName || journalState.ship.name || journalState.ship,
            jumpRange: journalState.ship.jumpRange || null,
          },
        });
      }
      if (journalState.system || journalState.ship) {
        dispatch({ type: "JOURNAL_READY" });
      }
    });

    // Eventos em tempo real
    window.electronAPI.onJournalReady(() => {
      dispatch({ type: "JOURNAL_READY" });
    });

    window.electronAPI.onJournalError((_event, data) => {
      dispatch({ type: "JOURNAL_ERROR", payload: data?.message || "Journal error" });
    });

    window.electronAPI.onLocationUpdate((_event, system) => {
      dispatch({ type: "LOCATION_UPDATE", payload: system });
    });

    window.electronAPI.onShipUpdate((_event, data) => {
      dispatch({
        type: "SHIP_UPDATE",
        payload: {
          ship: data?.shipName || data?.name || data,
          jumpRange: data?.jumpRange || null,
        },
      });
    });

    return () => {
      window.electronAPI.removeAllListeners("journal:ready");
      window.electronAPI.removeAllListeners("journal:error");
      window.electronAPI.removeAllListeners("journal:locationUpdate");
      window.electronAPI.removeAllListeners("journal:shipUpdate");
    };
  }, []);

  return {
    journalReady: state.journalReady,
    journalError: state.journalError,
    currentSystem: state.currentSystem,
    currentCoords: state.currentCoords,
    currentShip: state.currentShip,
    jumpRange: state.jumpRange,
  };
}