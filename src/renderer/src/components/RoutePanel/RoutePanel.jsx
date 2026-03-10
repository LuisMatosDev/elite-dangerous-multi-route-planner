import React, { useState } from "react";
import { useRoute } from "../../hooks/useRoute";
import { useAppContext } from "../../store/AppContext";
import { SystemSearch } from "../SystemSearch/SystemSearch";
import { WaypointList } from "../WaypointList/WaypointList";
import { SavedRoutes } from "../SavedRoutes/SavedRoutes";
import "./RoutePanel.css";

export function RoutePanel() {
  const { state } = useAppContext();
  const {
    waypoints, legs, routeSummary,
    addWaypoint, clearWaypoints,
    calculateRoute, optimizeRoute,
    jumpRange,
  } = useRoute();

  const [showSaved, setShowSaved] = useState(false);

  const summary = routeSummary || {
    totalDistance: legs.reduce((sum, l) => sum + (l.distance || 0), 0).toFixed(2),
    totalJumps: legs.reduce((sum, l) => sum + (l.jumps || 0), 0),
    estimatedTime: formatTime(legs.reduce((sum, l) => sum + (l.jumps || 0), 0) * 45),
  };

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }

  const handleAddCurrentSystem = () => {
    if (!state.currentSystem) return;
    const system = {
      name: state.currentSystem,
      coords: state.currentCoords || null,
    };
    addWaypoint(system);
  };

  const canAddCurrent =
    state.currentSystem &&
    !waypoints.find((wp) => wp.system.name === state.currentSystem);

  if (showSaved) {
    return <SavedRoutes onClose={() => setShowSaved(false)} />;
  }

  return (
    <div className="route-panel" role="main">
      <div className="route-panel__header">
        <span className="route-panel__title">ROUTE PLANNER</span>
        <div className="route-panel__header-actions">
          <button
            className="route-panel__btn-routes"
            onClick={() => setShowSaved(true)}
            aria-label="View saved routes"
          >ROUTES</button>
          {waypoints.length > 0 && (
            <button
              className="route-panel__btn-clear"
              onClick={clearWaypoints}
              aria-label="Clear all waypoints"
            >CLEAR ALL</button>
          )}
        </div>
      </div>

      <div className="route-panel__origin" aria-label="Origin system">
        <span className="route-panel__origin-label">ORIGIN</span>
        <span className="route-panel__origin-value">
          {state.currentSystem || "Unknown — launch Elite Dangerous"}
        </span>
        {canAddCurrent && (
          <button
            className="route-panel__btn-add-current"
            onClick={handleAddCurrentSystem}
            aria-label={`Add ${state.currentSystem} as waypoint`}
          >+ ADD</button>
        )}
      </div>

      <div className="route-panel__search">
        <SystemSearch onSelect={addWaypoint} />
      </div>

      <div className="route-panel__waypoints">
        <WaypointList />
      </div>

      {waypoints.length > 0 && (
        <>
          <div className="route-panel__summary" aria-label="Route summary">
            <div className="route-panel__summary-item">
              <span className="route-panel__summary-label">DISTANCE</span>
              <span className="route-panel__summary-value">
                {summary.totalDistance} LY
              </span>
            </div>
            <div className="route-panel__summary-item">
              <span className="route-panel__summary-label">EST. JUMPS</span>
              <span className="route-panel__summary-value">
                {summary.totalJumps}
              </span>
            </div>
            <div className="route-panel__summary-item">
              <span className="route-panel__summary-label">EST. TIME</span>
              <span className="route-panel__summary-value">
                {summary.estimatedTime}
              </span>
            </div>
            <div className="route-panel__summary-item">
              <span className="route-panel__summary-label">JUMP RANGE</span>
              <span className="route-panel__summary-value">
                {jumpRange ? `${jumpRange} LY` : "—"}
              </span>
            </div>
          </div>

          <div className="route-panel__actions">
            <button
              className="route-panel__btn-calculate"
              onClick={calculateRoute}
              aria-label="Recalculate route"
            >RECALCULATE</button>
            {waypoints.length >= 3 && (
              <button
                className="route-panel__btn-optimize"
                onClick={optimizeRoute}
                aria-label="Optimize waypoint order"
              >OPTIMIZE ORDER</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}