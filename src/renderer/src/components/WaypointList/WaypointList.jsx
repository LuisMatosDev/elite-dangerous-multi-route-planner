import React from 'react';
import { useRoute } from '../../hooks/useRoute';
import './WaypointList.css';

export function WaypointList() {
  const { waypoints, legs, removeWaypoint, reorderWaypoints } = useRoute();

  if (waypoints.length === 0) {
    return (
      <div className="waypoint-list__empty" role="status">
        <span>NO WAYPOINTS ADDED</span>
        <span className="waypoint-list__empty-hint">Search and add systems above</span>
      </div>
    );
  }

  return (
    <ol className="waypoint-list" aria-label="Route waypoints">
      {waypoints.map((waypoint, index) => {
        const leg = legs[index] || null;

        return (
          <li key={waypoint.id} className="waypoint-list__item">
            <div className="waypoint-list__item-header">
              <div className="waypoint-list__item-left">
                <span className="waypoint-list__index" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="waypoint-list__name">{waypoint.system.name}</span>
              </div>
              <div className="waypoint-list__item-right">
                <div className="waypoint-list__reorder" role="group" aria-label={`Reorder ${waypoint.system.name}`}>
                  <button
                    className="waypoint-list__btn"
                    onClick={() => reorderWaypoints(index, index - 1)}
                    disabled={index === 0}
                    aria-label={`Move ${waypoint.system.name} up`}
                  >▲</button>
                  <button
                    className="waypoint-list__btn"
                    onClick={() => reorderWaypoints(index, index + 1)}
                    disabled={index === waypoints.length - 1}
                    aria-label={`Move ${waypoint.system.name} down`}
                  >▼</button>
                </div>
                <button
                  className="waypoint-list__btn waypoint-list__btn--remove"
                  onClick={() => removeWaypoint(waypoint.id)}
                  aria-label={`Remove ${waypoint.system.name} from route`}
                >✕</button>
              </div>
            </div>

            {waypoint.system.coords && (
              <div className="waypoint-list__coords" aria-label="System coordinates">
                {waypoint.system.coords.x.toFixed(1)} /
                {waypoint.system.coords.y.toFixed(1)} /
                {waypoint.system.coords.z.toFixed(1)}
              </div>
            )}

            {leg && (
              <div className="waypoint-list__leg" aria-label="Distance from previous waypoint">
                <span className="waypoint-list__leg-label">FROM PREV</span>
                {leg.distance !== null ? (
                  <>
                    <span className="waypoint-list__leg-value">{leg.distance} LY</span>
                    {leg.jumps !== null && (
                      <span className="waypoint-list__leg-jumps">~{leg.jumps} jumps</span>
                    )}
                  </>
                ) : (
                  <span className="waypoint-list__leg-unknown">coords unavailable</span>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
