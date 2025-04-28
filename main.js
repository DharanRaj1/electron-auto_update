const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const MainScreen = require("./screens/main/mainScreen");
const Globals = require("./globals");
const { autoUpdater, AppUpdater } = require("electron-updater");
let curWindow;

// Configure for full reinstallation
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Add this line to force full package replacement
autoUpdater.forceDevUpdateConfig = true;

// Set allowDowngrade to true if you want to ensure any version can replace the current one
autoUpdater.allowDowngrade = true;

function createWindow() {
  curWindow = new MainScreen();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });
  autoUpdater.checkForUpdatesAndNotify();
  curWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
  curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
  let pth = autoUpdater.downloadUpdate();
  curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
  // Force reinstall with isForceRunAfter set to true
  autoUpdater.quitAndInstall(false, true);
});

autoUpdater.on("error", (info) => {
  curWindow.showMessage(info);
});

//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});