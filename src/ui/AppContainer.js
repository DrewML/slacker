const App = require('./App');
const { connect } = require('react-redux');
const { actions } = require('../state/teams');

const { setSelectedTeam } = actions;

const mapStateToProps = state => ({
    teamNames: state.teams.teams,
    selectedTeam: state.teams.selectedTeam
});

const mapDispatchToProps = dispatch => ({
    setSelectedTeam: teamName => dispatch(setSelectedTeam(teamName))
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
