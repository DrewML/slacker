const React = require('react');
const TeamChat = require('./TeamChat');
const TeamsSidebar = require('./TeamsSidebar');
const classNames = require('classnames');

const { Component, PropTypes } = React;
const { arrayOf, string } = PropTypes;

module.exports = class App extends Component {
    static propTypes = {
        teamNames: arrayOf(string).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: props.teamNames[0]
        };
    }

    showTeam = teamName => {
        this.setState({
            selectedTeam: teamName
        });
    };

    chatClasses = teamName => {
        return classNames('chat-panel', {
            visible: teamName === this.state.selectedTeam
        });
    };

    onTeamSelection = teamName => {
        this.showTeam(teamName);
    };

    render() {
        const { teamNames } = this.props;
        const { selectedTeam } = this.state;

        return (
            <div className='app-root'>
                <TeamsSidebar
                    teamNames={teamNames}
                    onTeamSelection={this.onTeamSelection}
                    selectedTeam={selectedTeam}
                />
                {teamNames.map(teamName =>
                    <TeamChat
                        teamName={teamName}
                        className={this.chatClasses(teamName)}
                    />
                )}
            </div>
        );
    }
};
