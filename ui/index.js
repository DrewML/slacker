const App = require('./dist/App');
const React = require('react');
const ReactDOM = require('react-dom');

// TODO: Stop hardcoding and pull from config
// once flow is implemented for adding teams
const teamNames = [
    'ausdevs',
    'spredfast'
];

ReactDOM.render(
    <App teamNames={teamNames} />,
    document.querySelector('.app')
);
