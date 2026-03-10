const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Journal
  getJournalState: () => ipcRenderer.invoke("journal:getState"),
  searchSystems: (query) => ipcRenderer.invoke("journal:searchSystems", query),
  getVisitedSystems: () => ipcRenderer.invoke("journal:getVisitedSystems"),

  // Route
  calculateRoute: (waypoints, jumpRange) =>
    ipcRenderer.invoke("route:calculate", waypoints, jumpRange),
  optimizeRoute: (waypoints) =>
    ipcRenderer.invoke("route:optimize", waypoints),

  // Elite status
  getEliteStatus: () => ipcRenderer.invoke("elite:getStatus"),
  onEliteRunning: (cb) => ipcRenderer.on("elite:running", cb),
  onEliteStopped: (cb) => ipcRenderer.on("elite:stopped", cb),

  // Journal events
  onLocationUpdate: (cb) => ipcRenderer.on("journal:locationUpdate", cb),
  onShipUpdate: (cb) => ipcRenderer.on("journal:shipUpdate", cb),
  onJournalReady: (cb) => ipcRenderer.on("journal:ready", cb),
  onJournalError: (cb) => ipcRenderer.on("journal:error", cb),
  onDocked: (cb) => ipcRenderer.on("journal:docked", cb),
  onUndocked: (cb) => ipcRenderer.on("journal:undocked", cb),

  // Cleanup
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
});