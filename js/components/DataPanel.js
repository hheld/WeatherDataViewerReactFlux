/* jshint node: true */

var React      = require('react'),
    AppStore   = require('../stores/AppStore'),
    ApiActions = require('../actions/ApiActions.js'),
    DataPlot   = require('./DataPlot.js');

var DataPanel = React.createClass({
    getInitialState: function() {
        return this._getAppState();
    },

    componentDidMount: function() {
        // add change listeners for relevant stores
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        // remove change listeners for relevant stores
        AppStore.removeChangeListener(this._onChange);
    },

    _getAppState: function() {
        return {
            from: AppStore.getFrom(),
            to: AppStore.getTo(),
            data: AppStore.getData(this.props.datum)
        };
    },

    _onChange: function() {
        this.setState(this._getAppState());
    },

    _clickHandler: function() {
        ApiActions.getData(this.props.datum, this.state.from, this.state.to);
    },

    render: function() {
        return(
            <div>
                <DataPlot {...this.props} data={JSON.stringify(this.state.data)}></DataPlot>
                <button onClick={this._clickHandler}>Update</button>
            </div>
        );
    }
});

module.exports = DataPanel;
