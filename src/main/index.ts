import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import { PythonShell } from 'python-shell'
import icon from '../../resources/icon.png?asset'

let pythonShell: PythonShell | null = null
let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show()
    }
  })

  mainWindow.on('closed', () => {
    if (pythonShell) {
      pythonShell.kill()
      pythonShell = null
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// Handle the IPC message to run the Python script
ipcMain.on('run-python-script', (event, pair) => {
  if (!pythonShell) {
    const scriptPath = app.isPackaged
      ? join(process.resourcesPath, 'app.asar.unpacked', 'python', 'skript.py')
      : join(app.getAppPath(), 'python', 'skript.py')

    const options = {
      args: [pair]
    }

    pythonShell = new PythonShell(scriptPath, options)

    pythonShell.on('message', (message) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        event.sender.send('python-output', message)
      }
    })

    pythonShell.on('error', (err) => {
      console.error(`Chyba ve skriptu: ${err}`)
      event.sender.send('python-error', err.message)
    })
  } else {
    console.log('Skript již běží.')
  }
})

// Handle the IPC message to stop the Python script
ipcMain.on('stop-python-script', () => {
  if (pythonShell) {
    pythonShell.kill()
    pythonShell = null
    console.log('Skript byl úspěšně zastaven.')
  } else {
    console.log('Skript neběží.')
  }
})
