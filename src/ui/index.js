const App = require('./dist/ui/App');
const React = require('react');
const ReactDOM = require('react-dom');
const { ipcRenderer } = require('electron');

// TODO: Stop hardcoding and pull from config
// TODO: Implement https://github.com/sindresorhus/electron-config
const teamNames = [
    'ausdevs',
    'spredfast'
];

const actionList = {
    loginSuccess({ teamName }) {
        renderApp({
            teamNames: [...teamNames, teamName]
        });
    }
};

ipcRenderer.on('slacker', (e, { action, payload }) => {
    actionList[action](payload);
});

function renderApp(props) {
    ReactDOM.render(
        <App {...props} />,
        document.querySelector('.app')
    );
};

renderApp({ teamNames });
