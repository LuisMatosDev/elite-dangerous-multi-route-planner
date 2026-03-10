import { useEffect } from 'react';
import { useAppContext } from '../store/AppContext';

export function useJournal() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (!window.electronAPI) return;

    // Pedir estado atual ao arrancar
    window.electronAPI.getJournalState().then((journalState) => {
      if (journalState.system) {
        dispatch({ type: 'LOCATION_UPDATE', payload: journalState.system });
      }
      if (journalState.ship) {
        dispatch({ type: 'SHIP_UPDATE', payload: journalState.ship });
      }
      if (journalState.system || journalState.ship) {
        dispatch({ type: 'JOURNAL_READY' });
      }
    });

    // Listeners de eventos em tempo real
    window.electronAPI.onJournalReady((data) => {
      dispatch({ type: 'JOURNAL_READY' });
    });

    window.electronAPI.onJournalError((data) => {
      dispatch({ type: 'JOURNAL_ERROR', payload: data.message });
    });

    window.electronAPI.onLocationUpdate((system) => {
      dispatch({ type: 'LOCATION_UPDATE', payload: system });
    });

    window.electronAPI.onShipUpdate((ship) => {
      dispatch({ type: 'SHIP_UPDATE', payload: ship });
    });

    // Cleanup ao desmontar
    return () => {
      window.electronAPI.removeAllListeners('journal:ready');
      window.electronAPI.removeAllListeners('journal:error');
      window.electronAPI.removeAllListeners('journal:locationUpdate');
      window.electronAPI.removeAllListeners('journal:shipUpdate');
    };
  }, []);

  return {
    journalReady: state.journalReady,
    journalError: state.journalError,
    currentSystem: state.currentSystem,
    currentShip: state.currentShip,
  };
}
