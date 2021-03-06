'use strict';

// Import parts of electron to use
const { app, BrowserWindow, ipcMain, dialog, Menu, shell } = require('electron');
const defaultMenu = require('electron-default-menu');
const path = require('path')
const fs = require('fs');
const url = require('url')

const { extractValues } = require('./spreadsheet');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, height: 600, show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  let indexPath;
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const menu = defaultMenu(app, shell);
  menu.splice(4,0, {
    label: 'Print',
    submenu: [
      {
        label: 'Print',
        click: (item, focusedWindow) => {
          mainWindow.webContents.print();
        }
      }
    ]
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('open-spreadsheet', (event, arg) => {

  dialog.showOpenDialog({ properties: ['openFile'] }).then(async (res) => {
    const fileString = res.filePaths[0];
    const excelValues = await extractValues(fileString);
    mainWindow.webContents.send('excel-values', excelValues);
  }).catch(
    () => {
      console.log("back to mainWindow");
    }
  )

});

ipcMain.on('csv-data', (event, arg) => {
  console.log(arg);
  dialog.showSaveDialog(mainWindow, {title: "Export Routing to CSV"}).then(async (res) => {
    if(!res.canceled && res.filePath) {
      fs.writeFileSync(res.filePath, arg);
      dialog.showMessageBox({
        message: "Success!",
        buttons: ["OK"]
      })
    } else {
      dialog.showMessageBox({
        message: "No file selected.",
        buttons: ["OK"]
      })
    }
  })
})
