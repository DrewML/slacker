const React = require('react');

const { Component, PropTypes } = React;
const { string } = PropTypes;

module.exports = class TeamChat extends Component {
    static propTypes = {
        teamName: string
    };

    render() {
        const { teamName } = this.props;

        return (
            <webview
                className={`web-view ${this.props.className}`}
                src={`https://${teamName}.slack.com`}
                allowpopups
            >
            </webview>
        );
    }
};
