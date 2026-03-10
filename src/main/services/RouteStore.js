const Store = require("electron-store");

const store = new Store({
  name: "routes",
  defaults: {
    savedRoutes: {},
  },
});

class RouteStore {
  saveRoute(name, routeData) {
    if (!name || !name.trim()) throw new Error("Route name cannot be empty");

    const key = `savedRoutes.${this._sanitizeKey(name)}`;
    const entry = {
      name: name.trim(),
      savedAt: new Date().toISOString(),
      origin: routeData.origin || null,
      waypoints: routeData.waypoints || [],
      jumpRange: routeData.jumpRange || null,
    };

    store.set(key, entry);
    console.log("[RouteStore] Saved route:", name);
    return entry;
  }

  loadRoute(name) {
    const key = `savedRoutes.${this._sanitizeKey(name)}`;
    const route = store.get(key);
    if (!route) throw new Error(`Route "${name}" not found`);
    console.log("[RouteStore] Loaded route:", name);
    return route;
  }

  deleteRoute(name) {
    const key = `savedRoutes.${this._sanitizeKey(name)}`;
    if (!store.has(key)) throw new Error(`Route "${name}" not found`);
    store.delete(key);
    console.log("[RouteStore] Deleted route:", name);
  }

  listRoutes() {
    const all = store.get("savedRoutes") || {};
    return Object.values(all).sort(
      (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
    );
  }

  _sanitizeKey(name) {
    return name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  }
}

module.exports = new RouteStore();