const App = require('./dist/ui/AppContainer');
const appState = require('./dist/state');
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore } = require('redux');
const { ipcRenderer } = require('electron');
const Config = require('electron-config');
const { actions } = require('./dist/state/teams');
const {
    SLACKER,
    LOGIN_SUCCESS,
    SWITCH_TEAM_SHORTCUT
} = require('./constants');

const config = new Config();
const previousState = config.get('appState');

const store = createStore(appState, previousState);
store.subscribe(() => {
    // TODO: Persist app state on app exit,
    // rather than on any change
    config.set('appState', store.getState());
});

const actionList = {
    [LOGIN_SUCCESS]: ({ teamName }) => {
        store.dispatch(actions.addTeam(teamName));
    },
    [SWITCH_TEAM_SHORTCUT]: ({ index }) => {
        const { teams: { teams }} = store.getState();
        store.dispatch(actions.setSelectedTeam(teams[index - 1]));
    }
};

ipcRenderer.on(SLACKER, (e, { action, payload }) => {
    actionList[action](payload);
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('.app')
);
