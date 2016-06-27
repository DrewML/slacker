const { ipcRenderer } = require('electron');
const { SLACKER, OPEN_LOGIN } = require('../../constants');

module.exports = function() {
    ipcRenderer.send(SLACKER, {
        action: OPEN_LOGIN
    });
};
