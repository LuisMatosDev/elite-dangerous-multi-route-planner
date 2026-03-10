import React from 'react';
import { useJournal } from '../../hooks/useJournal';
import './StatusBar.css';

export function StatusBar() {
  const { journalReady, journalError, currentSystem, currentShip } = useJournal();

  return (
    <div className="status-bar">
      <div className="status-bar__section">
        <span className="status-bar__label">STATUS</span>
        <span className={`status-bar__indicator ${journalReady ? 'online' : 'offline'}`}>
          {journalReady ? 'ONLINE' : journalError ? 'ERROR' : 'OFFLINE'}
        </span>
      </div>

      <div className="status-bar__section">
        <span className="status-bar__label">SYSTEM</span>
        <span className="status-bar__value">
          {currentSystem ? currentSystem.name : '---'}
        </span>
      </div>

      <div className="status-bar__section">
        <span className="status-bar__label">SHIP</span>
        <span className="status-bar__value">
          {currentShip ? currentShip.shipName : '---'}
        </span>
      </div>

      <div className="status-bar__section">
        <span className="status-bar__label">JUMP RANGE</span>
        <span className="status-bar__value">
          {currentShip ? `${currentShip.jumpRange} LY` : '---'}
        </span>
      </div>

      {journalError && (
        <div className="status-bar__error">
          {journalError}
        </div>
      )}
    </div>
  );
}
