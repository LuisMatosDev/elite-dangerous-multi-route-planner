import React from "react";
import { useAppContext } from "../../store/AppContext";
import { useEliteStatus } from "../../hooks/useEliteStatus";
import "./StatusBar.css";

export function StatusBar() {
  const { state } = useAppContext();
  const { isRunning } = useEliteStatus();

  const { currentSystem, ship, jumpRange, journalError } = state;

  const statusLabel = isRunning ? "ONLINE" : "OFFLINE";
  const statusClass = isRunning ? "online" : "offline";

  return (
    <header className="status-bar" role="banner" aria-label="Ship status">
      <div className="status-bar__section">
        <span className="status-bar__label">STATUS</span>
        <span
          className={`status-bar__indicator ${statusClass}`}
          role="status"
          aria-live="polite"
          aria-label={`Elite Dangerous is ${statusLabel}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="status-bar__section">
        <span className="status-bar__label">SYSTEM</span>
        <span className="status-bar__value">
          {currentSystem || "UNKNOWN"}
        </span>
      </div>

      <div className="status-bar__section">
        <span className="status-bar__label">SHIP</span>
        <span className="status-bar__value">
          {ship || "—"}
        </span>
      </div>

      <div className="status-bar__section">
        <span className="status-bar__label">JUMP RANGE</span>
        <span className="status-bar__value">
          {jumpRange ? `${jumpRange} LY` : "—"}
        </span>
      </div>

      {journalError && (
        <div className="status-bar__error" role="alert">
          {journalError}
        </div>
      )}
    </header>
  );
}