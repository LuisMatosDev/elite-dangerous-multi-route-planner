const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const JournalWatcher = require('./services/JournalWatcher');
const { registerJournalHandlers } = require('./ipc/journalHandlers');
const { registerRouteHandlers } = require('./ipc/routeHandlers');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;
let journalWatcher = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Elite Dangerous - Multi Route Planner',
    show: false,
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/renderer/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    initJournalWatcher();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function initJournalWatcher() {
  journalWatcher = new JournalWatcher();
  registerJournalHandlers(mainWindow, journalWatcher);
  registerRouteHandlers();

  const success = await journalWatcher.initialize();
  if (!success) {
    console.warn('[Main] JournalWatcher failed to initialize - Elite Dangerous not detected');
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (journalWatcher) {
    journalWatcher.destroy();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
