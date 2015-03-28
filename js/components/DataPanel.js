/* jshint node: true */

var React    = require('react'),
    AppStore = require('../stores/AppStore'),
    DataPlot = require('./DataPlot.js');

function getAppState() {
    return {
        from: '2015-03-20',
        to: '2015-03-21',
        data: {
            timePoints: ["2015-03-20T00:03:01.000Z","2015-03-20T00:08:01.000Z","2015-03-20T00:13:01.000Z","2015-03-20T00:18:01.000Z"],
            dataPoints: [50,50,50,50]
        }
    };
}

var DataPanel = React.createClass({
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
            <DataPlot {...this.props} data={JSON.stringify(this.state.data)}></DataPlot>
        );
    }
});

module.exports = DataPanel;
