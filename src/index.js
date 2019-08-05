const {
  app,
  BrowserWindow,
} = require('electron');
const path = require('path');
let mainWindow = null;

/**
 * ElectronApp
 * create native browser window
 */
class ElectronApp {
  /**
   * Constructor
   */
  constructor() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', this.render.bind(this));

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') app.quit();
    });

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) this.render();
    });
  }

  /**
   * loads assets and binds events
   * @method render
   */
  render() {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    this.loadAssets();
    this.bindEventHandlers();
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  /**
   * loads assets
   * @method loadAssets
   */
  loadAssets() {
    mainWindow.loadFile('./public/index.html');
  }

  /**
   * binds event handlers
   * @method bindEventHandlers
   */
  bindEventHandlers() {
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
}

new ElectronApp();
