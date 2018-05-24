'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    title: 'Readhub',
    autoHideMenuBar: true,
    show: false,
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('Readhub:window:close', function (e) {
    try {
      e.sender.getOwnerBrowserWindow().close()
    } catch (error) {
      console.log(`[WARN] mainWindow couldn't be closed, most likely due to ${error}`)
    }
  })

  ipcMain.on('Readhub:window:maximize', function (e) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on('Readhub:window:minimize', function (e) {
    mainWindow.minimize()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
