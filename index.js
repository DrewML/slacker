const electron = require('electron');

const { BrowserWindow, app } = electron;

// Prevent GC of window
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadURL(`file://${__dirname}/index.html`);

    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Allow GC of window
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
