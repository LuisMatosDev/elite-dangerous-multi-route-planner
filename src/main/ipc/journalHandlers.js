const { ipcMain } = require('electron');

function registerJournalHandlers(mainWindow, journalWatcher) {
  // Quando o renderer pede o estado atual
  ipcMain.handle('journal:getState', () => {
    return journalWatcher.getState();
  });

  // Reencaminhar eventos do JournalWatcher para o renderer
  journalWatcher.on('locationUpdate', (system) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('journal:locationUpdate', system);
    }
  });

  journalWatcher.on('shipUpdate', (ship) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('journal:shipUpdate', ship);
    }
  });

  journalWatcher.on('ready', (info) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('journal:ready', info);
    }
  });

  journalWatcher.on('error', (err) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('journal:error', { message: err.message });
    }
  });

  journalWatcher.on('docked', (entry) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('journal:docked', entry);
    }
  });

  journalWatcher.on('undocked', (entry) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('journal:undocked', entry);
    }
  });
}

module.exports = { registerJournalHandlers };
