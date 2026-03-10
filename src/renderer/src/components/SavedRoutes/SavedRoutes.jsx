import React, { useEffect, useState } from "react";
import { useSavedRoutes } from "../../hooks/useSavedRoutes";
import { useRoute } from "../../hooks/useRoute";
import { useAppContext } from "../../store/AppContext";
import "./SavedRoutes.css";

export function SavedRoutes({ onClose }) {
  const { savedRoutes, isLoading, error, fetchRoutes, saveRoute, deleteRoute, loadRoute } = useSavedRoutes();
  const { waypoints, jumpRange, clearWaypoints, loadSavedRoute } = useRoute();
  const { state } = useAppContext();
  const [saveName, setSaveName] = useState("");
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  const handleSave = async () => {
    if (!saveName.trim()) {
      setSaveError("Please enter a route name");
      return;
    }
    if (waypoints.length === 0) {
      setSaveError("No waypoints to save");
      return;
    }

    setSaveError(null);
    const routeData = {
      origin: state.currentSystem,
      waypoints: waypoints.map(wp => ({
        id: wp.id,
        system: wp.system,
        label: wp.label,
      })),
      jumpRange: state.jumpRange,
    };

    const ok = await saveRoute(saveName, routeData);
    if (ok) {
      setSaveSuccess(true);
      setSaveName("");
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleLoad = async (name) => {
    const route = await loadRoute(name);
    if (route && loadSavedRoute) {
      loadSavedRoute(route);
      onClose();
    }
  };

  const handleDelete = async (name) => {
    await deleteRoute(name);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="saved-routes" role="dialog" aria-label="Saved routes" aria-modal="true">
      <div className="saved-routes__header">
        <span className="saved-routes__title">SAVED ROUTES</span>
        <button
          className="saved-routes__btn-close"
          onClick={onClose}
          aria-label="Close saved routes"
        >✕</button>
      </div>

      {/* Save current route */}
      <div className="saved-routes__save">
        <span className="saved-routes__label">SAVE CURRENT ROUTE</span>
        <div className="saved-routes__save-row">
          <input
            className="saved-routes__input"
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="Route name..."
            aria-label="Route name to save"
            maxLength={40}
          />
          <button
            className="saved-routes__btn-save"
            onClick={handleSave}
            disabled={waypoints.length === 0}
            aria-label="Save current route"
          >SAVE</button>
        </div>
        {saveError && <span className="saved-routes__error">{saveError}</span>}
        {saveSuccess && <span className="saved-routes__success">✓ Route saved</span>}
      </div>

      {/* Route list */}
      <div className="saved-routes__list" role="list" aria-label="Saved routes list">
        {isLoading && (
          <div className="saved-routes__empty">Loading...</div>
        )}
        {!isLoading && savedRoutes.length === 0 && (
          <div className="saved-routes__empty">No saved routes yet</div>
        )}
        {!isLoading && savedRoutes.map((route) => (
          <div key={route.name} className="saved-routes__item" role="listitem">
            <div className="saved-routes__item-info">
              <span className="saved-routes__item-name">{route.name}</span>
              <span className="saved-routes__item-meta">
                {route.waypoints.length} waypoints · {formatDate(route.savedAt)}
              </span>
              {route.origin && (
                <span className="saved-routes__item-origin">FROM {route.origin}</span>
              )}
            </div>
            <div className="saved-routes__item-actions">
              <button
                className="saved-routes__btn-load"
                onClick={() => handleLoad(route.name)}
                aria-label={`Load route ${route.name}`}
              >LOAD</button>
              <button
                className="saved-routes__btn-delete"
                onClick={() => handleDelete(route.name)}
                aria-label={`Delete route ${route.name}`}
              >✕</button>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="saved-routes__error-bar" role="alert">{error}</div>
      )}
    </div>
  );
}