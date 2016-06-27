const App = require('./dist/ui/App');
const React = require('react');
const ReactDOM = require('react-dom');
const { SLACKER, LOGIN_SUCCESS } = require('./constants');
const { ipcRenderer } = require('electron');

// TODO: Stop hardcoding and pull from config
// TODO: Implement https://github.com/sindresorhus/electron-config
const teamNames = [
    // 'ausdevs',
    // 'spredfast'
];

const actionList = {
    [LOGIN_SUCCESS]: ({ teamName }) => {
        teamNames.push(teamName);
        renderApp({ teamNames });
    }
};

ipcRenderer.on(SLACKER, (e, { action, payload }) => {
    actionList[action](payload);
});

function renderApp(props) {
    ReactDOM.render(
        <App {...props} />,
        document.querySelector('.app')
    );
};

renderApp({ teamNames });
