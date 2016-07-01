const teams = require('./teams');
const { combineReducers } = require('redux');

const rootReducer = combineReducers({
    teams
});

module.exports = rootReducer;
