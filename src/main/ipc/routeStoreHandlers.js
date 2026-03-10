const { ipcMain } = require("electron");
const routeStore = require("../services/RouteStore");

function registerRouteStoreHandlers() {
  ipcMain.handle("routeStore:save", (_event, name, routeData) => {
    try {
      return { success: true, data: routeStore.saveRoute(name, routeData) };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle("routeStore:load", (_event, name) => {
    try {
      return { success: true, data: routeStore.loadRoute(name) };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle("routeStore:delete", (_event, name) => {
    try {
      routeStore.deleteRoute(name);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle("routeStore:list", () => {
    try {
      return { success: true, data: routeStore.listRoutes() };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });
}

module.exports = { registerRouteStoreHandlers };