const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Estado atual do journal
  getJournalState: () => ipcRenderer.invoke('journal:getState'),

  // Listeners de eventos do journal
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

  // Rotas (TODO: APIs externas)
  calculateRoute: (from, to, jumpRange) =>
    ipcRenderer.invoke('route:calculate', { from, to, jumpRange }),
  searchSystem: (query) =>
    ipcRenderer.invoke('route:searchSystem', query),

  // Cleanup de listeners
  removeListener: (channel, callback) =>
    ipcRenderer.removeListener(channel, callback),
  removeAllListeners: (channel) =>
    ipcRenderer.removeAllListeners(channel),
});
