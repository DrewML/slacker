const React = require('react');
const login = require('../util/login');
const TeamChat = require('./TeamChat');
const TeamsSidebar = require('./TeamsSidebar');
const classNames = require('classnames');

const { Component, PropTypes } = React;
const { arrayOf, string, func } = PropTypes;

module.exports = class App extends Component {
    static propTypes = {
        teamNames: arrayOf(string).isRequired,
        selectedTeam: string,
        setSelectedTeam: func.isRequired
    };

    chatClasses = teamName => {
        return classNames('chat-panel', {
            visible: teamName === this.props.selectedTeam
        });
    };

    onAddTeam = () => {
        login();
    };

    render() {
        const {
            teamNames,
            selectedTeam,
            setSelectedTeam
        } = this.props;

        return (
            <div className='app-root'>
                <TeamsSidebar
                    teamNames={teamNames}
                    onTeamSelection={setSelectedTeam}
                    selectedTeam={selectedTeam}
                    onAddTeam={this.onAddTeam}
                />
                {teamNames.map(teamName =>
                    <TeamChat
                        key={teamName}
                        teamName={teamName}
                        className={this.chatClasses(teamName)}
                    />
                )}
            </div>
        );
    }
};
