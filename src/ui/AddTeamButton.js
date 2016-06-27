const React = require('react');

const { Component, PropTypes } = React;
const { func } = PropTypes;

module.exports = class AddTeamButton extends Component {
    static propTypes = {
        onClick: func.isRequired
    };

    render() {
        const { onClick } = this.props;

        return (
            <button
                type='button'
                className='add-team-btn'
                onClick={onClick}
            >
                +
            </button>
        );
    }
};
