const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getJournalState: () => ipcRenderer.invoke('journal:getState'),
  searchSystems: (query) => ipcRenderer.invoke('journal:searchSystems', query),
  getVisitedSystems: () => ipcRenderer.invoke('journal:getVisitedSystems'),

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

  calculateRoute: (from, to, jumpRange) =>
    ipcRenderer.invoke('route:calculate', { from, to, jumpRange }),

  removeAllListeners: (channel) =>
    ipcRenderer.removeAllListeners(channel),
});
