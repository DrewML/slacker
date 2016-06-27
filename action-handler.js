const electron = require('electron');
const { SLACKER, OPEN_LOGIN, LOGIN_SUCCESS } = require('./constants');

const { BrowserWindow } = electron;

module.exports = function(mainWindow) {
    function openLogin() {
        const loginWindow = new BrowserWindow({
            width: 800,
            height: 600,
            title: 'Slacker - Team Login'
        });

        loginWindow.loadURL('https://slack.com/signin');
        loginWindow.webContents.on('dom-ready', e => {
            loginWindow.webContents.executeJavaScript(
                'TS.boot_data.team_url;',
                result => {
                    const pattern = /https?:\/\/([\w\d-]+)\.slack\.com\//;
                    const [, teamName] = result.match(pattern);
                    loginWindow.close();
                    mainWindow.send(SLACKER, {
                        action: LOGIN_SUCCESS,
                        payload: { teamName }
                    });
                }
            );
        });
    }

    return {
        [OPEN_LOGIN]: openLogin
    };
};
