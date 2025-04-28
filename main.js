const { app, BrowserWindow, autoUpdater } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL('data:text/html,<h1>Hello! This is Version 1.0.2 after the update</h1>');
}

app.whenReady().then(() => {
  createWindow();

  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
