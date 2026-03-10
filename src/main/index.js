const { app, BrowserWindow, screen } = require("electron");
const path = require("path");
const JournalWatcher = require("./services/JournalWatcher");
const EliteDetector = require("./services/EliteDetector");
const { registerJournalHandlers } = require("./ipc/journalHandlers");
const { registerRouteHandlers } = require("./ipc/routeHandlers");
const { registerEliteHandlers } = require("./ipc/eliteHandlers");

const isDev = process.env.NODE_ENV === "development";
const showDevTools = process.env.DEVTOOLS === "true";

let mainWindow = null;
let journalWatcher = null;
let eliteDetector = null;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: Math.min(600, width),
    height: Math.min(900, height),
    minWidth: 480,
    minHeight: 400,
    maxWidth: width,
    maxHeight: height,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    title: "Elite Dangerous - Multi Route Planner",
    show: false,
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../dist/renderer/index.html"));
  }

  if (showDevTools) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    initServices();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

async function initServices() {
  // JournalWatcher
  journalWatcher = new JournalWatcher();
  registerJournalHandlers(mainWindow, journalWatcher);
  registerRouteHandlers(journalWatcher);

  const success = await journalWatcher.initialize();
  if (!success) {
    console.warn("[Main] JournalWatcher failed — Elite Dangerous not detected");
  }

  // EliteDetector
  eliteDetector = new EliteDetector(5000);
  registerEliteHandlers(mainWindow, eliteDetector);
  eliteDetector.start();
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (journalWatcher) journalWatcher.destroy();
  if (eliteDetector) eliteDetector.destroy();
  if (process.platform !== "darwin") app.quit();
});