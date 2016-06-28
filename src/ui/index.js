const App = require('./dist/ui/App');
const React = require('react');
const ReactDOM = require('react-dom');
const { ipcRenderer } = require('electron');
const Config = require('electron-config');
const {
    SLACKER,
    LOGIN_SUCCESS,
    SWITCH_TEAM_SHORTCUT
} = require('./constants');

const config = new Config({
    defaults: {
        teamList: []
    }
});
const teamNames = config.get('teamList');;
const saveTeams = () => config.set('teamList', teamNames);

const actionList = {
    [LOGIN_SUCCESS]: ({ teamName }) => {
        teamNames.push(teamName);
        renderApp({ teamNames });
        saveTeams();
    },
    [SWITCH_TEAM_SHORTCUT]: ({ index }) => {
        renderApp({
            teamNames,
            selectedTeam: teamNames[index - 1]
        });
        saveTeams();
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
