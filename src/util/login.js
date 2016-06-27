const { ipcRenderer } = require('electron');

module.exports = function() {
    ipcRenderer.send('slacker', {
        action: 'openLogin'
    });
};
