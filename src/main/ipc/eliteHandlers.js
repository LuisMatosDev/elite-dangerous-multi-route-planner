const { ipcMain } = require("electron");

function registerEliteHandlers(mainWindow, eliteDetector) {
  // Renderer pede estado atual
  ipcMain.handle("elite:getStatus", () => {
    return { running: eliteDetector.isRunning };
  });

  // Emite eventos em tempo real para o renderer
  eliteDetector.on("elite:running", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("elite:running");
    }
  });

  eliteDetector.on("elite:stopped", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("elite:stopped");
    }
  });
}

module.exports = { registerEliteHandlers };