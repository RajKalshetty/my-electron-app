const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const {autoUpdater} = require('electron-updater')
const log= require('electron-log');

log.transports.file.resolvePath = () => path.join('C:/Users/raj.kalshetty/Desktop/testupdate/my-electron-app','/logs/main.log');
log.info('hello, admin');
log.warn('some problem appears')
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify()
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on("update-available",()=>{
  log.info("update-available")
})

autoUpdater.on("checking-for-update",()=>{
  log.info("checking-for-update")
})

autoUpdater.on("download-progress",()=>{
  log.info("download-progress")
})

autoUpdater.on("update-downloaded",()=>{
  log.info("update-downloaded")
})