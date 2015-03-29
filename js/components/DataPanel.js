/* jshint node: true */

var React      = require('react'),
    AppStore   = require('../stores/AppStore'),
    ApiActions = require('../actions/ApiActions.js'),
    DataPlot   = require('./DataPlot'),
    Button     = require('./Button');

var plotContainerStyle = {
    width: '80%',
    margin: 10,
    float: 'right'
};

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
            from: AppStore.getFrom(this.props.datum),
            to: AppStore.getTo(this.props.datum),
            data: AppStore.getData(this.props.datum)
        };
    },

    _onChange: function() {
        this.setState(this._getAppState());
    },

    _onUpdateButtonClicked: function() {
        ApiActions.getData(this.props.datum, this.state.from, this.state.to);
    },

    render: function() {
        return(
            <div>
                <div style={plotContainerStyle}>
                    <DataPlot {...this.props} data={this.state.data}></DataPlot>
                </div>
                <Button clickHandler={this._onUpdateButtonClicked}>Update</Button>
            </div>
        );
    }
});

module.exports = DataPanel;
