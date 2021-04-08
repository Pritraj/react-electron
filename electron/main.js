const { app, BrowserWindow, ipcMain } =  require('electron');
const path = require('path');
const isDev = require('electron-is-dev');   

let win;

async function createWindow() {
    win = new BrowserWindow({
        width: 800, height: 600, webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    console.log(isDev)
    const indexUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    win.loadURL(indexUrl)

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

ipcMain.on('version', async(event, arg) => {
    console.log('ipc-version');
    event.returnValue = "Version 1.0.0";
})




// const { app, BrowserWindow } = require('electron')
// let win;
// function createWindow() {
//     // Create the browser window.     
//     win = new BrowserWindow({ width: 800, height: 600 , webPreferences: { nodeIntegration : true, contextIsolation: false}})
//     // and load the index.html of the app.     
//     const startUrl = process.env.ELECTRON_START_URL || url.format({
//         pathname: path.join(__dirname, '/../build/index.html'),
//         protocol: 'file:',
//         slashes: true
//     });
//     win.loadURL('http://localhost:3000');
//     win.webContents.openDevTools()

// }
// app.on('ready', createWindow)