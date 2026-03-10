import React from 'react';
import { useRoute } from '../../hooks/useRoute';
import { SystemSearch } from '../SystemSearch/SystemSearch';
import { WaypointList } from '../WaypointList/WaypointList';
import './RoutePanel.css';

export function RoutePanel() {
  const {
    waypoints,
    totalDistance,
    totalJumps,
    totalTime,
    currentSystem,
    currentShip,
    addWaypoint,
    clearWaypoints,
    calculateDistances,
    optimizeOrder,
  } = useRoute();

  const handleSystemSelect = async (system) => {
    addWaypoint(system);
    await calculateDistances();
  };

  return (
    <div className="route-panel">
      <div className="route-panel__header">
        <span className="route-panel__title">ROUTE PLANNER</span>
        {waypoints.length > 0 && (
          <button className="route-panel__btn-clear" onClick={clearWaypoints}>
            CLEAR ALL
          </button>
        )}
      </div>

      <div className="route-panel__origin">
        <span className="route-panel__origin-label">ORIGIN</span>
        <span className="route-panel__origin-value">
          {currentSystem ? currentSystem.name : 'Unknown — launch Elite Dangerous'}
        </span>
      </div>

      <div className="route-panel__search">
        <SystemSearch
          onSelect={handleSystemSelect}
          placeholder="Search visited system to add waypoint..."
        />
      </div>

      <div className="route-panel__waypoints">
        <WaypointList />
      </div>

      {waypoints.length > 0 && (
        <>
          <div className="route-panel__summary">
            <div className="route-panel__summary-item">
              <span className="route-panel__summary-label">DISTANCE</span>
              <span className="route-panel__summary-value">
                {totalDistance > 0 ? `${totalDistance} LY` : '---'}
              </span>
            </div>
            <div className="route-panel__summary-item">
              <span className="route-panel__summary-label">EST. JUMPS</span>
              <span className="route-panel__summary-value">
                {totalJumps > 0 ? totalJumps : '---'}
              </span>
            </div>
            <div className="route-panel__summary-item">
              <span className="route-panel__summary-label">EST. TIME</span>
              <span className="route-panel__summary-value">
                {totalTime || '---'}
              </span>
            </div>
            <div className="route-panel__summary-item">
              <span className="route-panel__summary-label">JUMP RANGE</span>
              <span className="route-panel__summary-value">
                {currentShip ? `${currentShip.jumpRange} LY` : '---'}
              </span>
            </div>
          </div>

          <div className="route-panel__actions">
            <button
              className="route-panel__btn-calculate"
              onClick={calculateDistances}
            >
              RECALCULATE
            </button>
            {waypoints.length >= 3 && (
              <button
                className="route-panel__btn-optimize"
                onClick={optimizeOrder}
              >
                OPTIMIZE ORDER
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
