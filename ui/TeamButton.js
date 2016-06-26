const React = require('react');
const classNames = require('classnames');

const { Component, PropTypes } = React;
const { string, func, bool } = PropTypes;

module.exports = class TeamButton extends Component {
    static propTypes = {
        teamName: string.isRequired,
        onClick: func.isRequired,
        isSelected: bool
    };

    onClick = () => {
        const { teamName, onClick } = this.props;
        onClick(teamName);
    };

    btnClasses = () => {
        const { isSelected } = this.props;
        return classNames('team-btn', {
            selected: isSelected
        });
    };

    render() {
        const { teamName, onClick } = this.props;

        return (
            <button
                type='button'
                className={this.btnClasses()}
                onClick={this.onClick}
            >
                {teamName.slice(0, 1).toUpperCase()}
            </button>
        );
    }
};
