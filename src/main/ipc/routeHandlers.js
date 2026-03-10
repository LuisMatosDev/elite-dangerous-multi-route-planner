const { ipcMain } = require('electron');
const RouteCalculator = require('../services/RouteCalculator');

const calculator = new RouteCalculator();

function registerRouteHandlers(journalWatcher) {
  ipcMain.handle('route:calculate', async (_, { waypoints, jumpRange }) => {
    const state = journalWatcher.getState();
    const result = calculator.calculateMultiRoute(
      waypoints,
      state.system,
      jumpRange || parseFloat(state.ship?.jumpRange || 0)
    );
    return result;
  });

  ipcMain.handle('route:optimize', async (_, { waypoints }) => {
    const state = journalWatcher.getState();
    const optimized = calculator.optimizeWaypointOrder(waypoints, state.system);
    return optimized;
  });

  ipcMain.handle('route:searchSystem', async (_, query) => {
    // TODO: EDSM/Spansh API integration
    return { status: 'TODO', message: 'API integration pending' };
  });
}

module.exports = { registerRouteHandlers };
