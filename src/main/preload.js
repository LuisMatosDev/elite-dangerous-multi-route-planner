const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Journal
  onJournalUpdate: (callback) => ipcRenderer.on('journal-update', callback),
  onLocationUpdate: (callback) => ipcRenderer.on('location-update', callback),
  onShipUpdate: (callback) => ipcRenderer.on('ship-update', callback),

  // Routes
  calculateRoute: (from, to, jumpRange) =>
    ipcRenderer.invoke('calculate-route', { from, to, jumpRange }),
  searchSystem: (query) =>
    ipcRenderer.invoke('search-system', query),

  // Cleanup
  removeAllListeners: (channel) =>
    ipcRenderer.removeAllListeners(channel),
});
