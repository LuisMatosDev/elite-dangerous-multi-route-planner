const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Journal
  getJournalState: () => ipcRenderer.invoke('journal:getState'),
  searchSystems: (query) => ipcRenderer.invoke('journal:searchSystems', query),
  getVisitedSystems: () => ipcRenderer.invoke('journal:getVisitedSystems'),

  // Journal events
  onLocationUpdate: (callback) =>
    ipcRenderer.on('journal:locationUpdate', (_, data) => callback(data)),
  onShipUpdate: (callback) =>
    ipcRenderer.on('journal:shipUpdate', (_, data) => callback(data)),
  onJournalReady: (callback) =>
    ipcRenderer.on('journal:ready', (_, data) => callback(data)),
  onJournalError: (callback) =>
    ipcRenderer.on('journal:error', (_, data) => callback(data)),
  onDocked: (callback) =>
    ipcRenderer.on('journal:docked', (_, data) => callback(data)),
  onUndocked: (callback) =>
    ipcRenderer.on('journal:undocked', (_, data) => callback(data)),

  // Route
  calculateRoute: (waypoints, jumpRange) =>
    ipcRenderer.invoke('route:calculate', { waypoints, jumpRange }),
  optimizeRoute: (waypoints) =>
    ipcRenderer.invoke('route:optimize', { waypoints }),

  // Cleanup
  removeAllListeners: (channel) =>
    ipcRenderer.removeAllListeners(channel),
});
