const App = require('./dist/ui/App');
const React = require('react');
const ReactDOM = require('react-dom');
const { ipcRenderer } = require('electron');
const {
    SLACKER,
    LOGIN_SUCCESS,
    SWITCH_TEAM_SHORTCUT
} = require('./constants');

// TODO: Stop hardcoding and pull from config
// TODO: Implement https://github.com/sindresorhus/electron-config
const teamNames = [];

const actionList = {
    [LOGIN_SUCCESS]: ({ teamName }) => {
        teamNames.push(teamName);
        renderApp({ teamNames });
    },
    [SWITCH_TEAM_SHORTCUT]: ({ index }) => {
        renderApp({
            teamNames,
            selectedTeam: teamNames[index - 1]
        });
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
