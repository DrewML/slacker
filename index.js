const electron = require('electron');
const actionHandler = require('./action-handler');
const { SLACKER, SWITCH_TEAM_SHORTCUT } = require('./constants');

const {
    app,
    ipcMain,
    BrowserWindow,
    globalShortcut
} = electron;

// Prevent GC of window
let win;

ipcMain.on(SLACKER, (e, { action, payload }) => {
    actionHandler(win)[action](payload);
});

function setupTeamSwitcherShortcuts(window) {
    const nums = Array.from({ length: 9 }, (val, i) => i + 1);
    nums.forEach(num => {
        globalShortcut.register(`CommandOrControl+${num}`, () => {
            window.send(SLACKER, {
                action: SWITCH_TEAM_SHORTCUT,
                payload: { index: num }
            });
        });
    });
}

function createMainWindow() {
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

    setupTeamSwitcherShortcuts(win);
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (!win) createMainWindow();
});
