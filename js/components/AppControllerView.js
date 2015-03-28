/* jshint node: true */

var React    = require('react'),
    AppStore = require('../stores/AppStore');

function getAppState() {
    return {
    };
}

var AppControllerView = React.createClass({
    getInitialState: function() {
        return getAppState();
    },

    componentDidMount: function() {
        // add change listeners for relevant stores
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        // remove change listeners for relevant stores
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getAppState());
    },

    render: function() {
        return(
            <p>This is the AppControllerView.</p>
        );
    }
});

module.exports = AppControllerView;
