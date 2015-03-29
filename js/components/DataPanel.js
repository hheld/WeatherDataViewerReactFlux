/* jshint node: true */

var React      = require('react'),
    AppStore   = require('../stores/AppStore'),
    ApiActions = require('../actions/ApiActions.js'),
    DataPlot   = require('./DataPlot.js'),
    Radium     = require('radium');

var StyleResolverMixin = Radium.StyleResolverMixin,
    BrowserStateMixin = Radium.BrowserStateMixin;

var plotContainerStyle = {
    width: '80%',
    margin: 10,
    float: 'right'
};

var updateButtonStyle = {
    float: 'left',
    borderRadius: 3,
    border: '1px solid #0b0e07',
    display: 'inline-block',
    cursor: 'pointer',
    color: '#ffffff',
    fontFamily: 'arial',
    fontSize: 15,
    padding: '5px 15px',
    textDecoration: 'none',
    textShadow: '0px 1px 0px #263666',
    background: 'linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%)',
    backgroundColor: '#2dabf9',

    states: [{
        hover: {
            background:'linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%)',
            backgroundColor: '#0688fa'
        },
        active: {
            position: 'relative',
            top: 1
        }
    }]
};

var DataPanel = React.createClass({
    mixins: [ StyleResolverMixin, BrowserStateMixin ],

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
                <button {...this.getBrowserStateEvents()} style={this.buildStyles(updateButtonStyle)} onClick={this._onUpdateButtonClicked}>Update</button>
            </div>
        );
    }
});

module.exports = DataPanel;
