const { createAction, handleActions } = require('redux-actions');

const defaultState = {
    teams: [],
    selectedTeam: null
};

module.exports = handleActions({
    ADD_TEAM: (state, { payload }) => {
        const { teams } = state;
        if (teams.includes(payload)) return state;

        return {
            ...state,
            teams: [...teams, payload]
        };
    },

    REMOVE_TEAM: (state, { payload }) => {
        const { teams } = state;

        return {
            ...state,
            teams: teams.filter(name => name !== payload)
        };
    },

    SET_SELECTED_TEAM: (state, { payload }) => {
        return {
            ...state,
            selectedTeam: payload
        };
    }
}, defaultState);

module.exports.actions = {
    addTeam: createAction('ADD_TEAM'),
    removeTeam: createAction('REMOVE_TEAM'),
    setSelectedTeam: createAction('SET_SELECTED_TEAM')
};
