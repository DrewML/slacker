const React = require('react');
const TeamButton = require('./TeamButton');

const { Component, PropTypes } = React;
const { string, arrayOf, func } = PropTypes;

module.exports = class TeamsSidebar extends Component {
    static propTypes = {
        teamNames: arrayOf(string),
        onTeamSelection: func.isRequired,
        selectedTeam: string.isRequired
    };

    render() {
        const {
            teamNames,
            onTeamSelection,
            selectedTeam
        } = this.props;

        return (
            <aside className='teams-sidebar'>
                {teamNames.map(teamName =>
                    <TeamButton
                        key={teamName}
                        teamName={teamName}
                        onClick={onTeamSelection}
                        isSelected={teamName === selectedTeam}
                    />
                )}
            </aside>
        );
    }
};
