const { ipcMain } = require('electron');

function registerRouteHandlers() {
  // TODO: implementar quando tivermos acesso às APIs
  ipcMain.handle('route:calculate', async (event, { from, to, jumpRange }) => {
    console.log(`[RouteHandlers] Calculate route: ${from} -> ${to} @ ${jumpRange}LY`);
    return { status: 'TODO', message: 'API integration pending' };
  });

  ipcMain.handle('route:searchSystem', async (event, query) => {
    console.log(`[RouteHandlers] Search system: ${query}`);
    return { status: 'TODO', message: 'API integration pending' };
  });
}

module.exports = { registerRouteHandlers };
