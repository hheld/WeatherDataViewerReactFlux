/* jshint node: true */

var React              = require('react'),
    AppStore           = require('../stores/AppStore'),
    StatsStore         = require('../stores/StatsStore'),
    ApiActions         = require('../actions/ApiActions.js'),
    DataPlot           = require('./DataPlot'),
    Button             = require('./Button'),
    DateRangeSelectors = require('./DateRangeSelectors'),
    AppActions         = require('../actions/AppActions'),
    StatsTable = require('./StatsTable');

var panelContainerStyle = {
    border: '5px solid #849fc3',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'white'
};

var plotContainerStyle = {
    width: '80%',
    float: 'right'
};

var controlContainerStyle = {
    width: '20%',
    minWidth: 190
};

var tableContainerStyle = {
    width: '100%',
    marginTop: 20
};

var updateButtonStyle = {
    marginTop: 10,
    width: '100%'
};

var DataPanel = React.createClass({
    _autoUpdate: undefined,

    getInitialState: function() {
        return this._getAppState();
    },

    componentDidMount: function() {
        // add change listeners for relevant stores
        AppStore.addChangeListener(this._onChange);
        StatsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        // remove change listeners for relevant stores
        AppStore.removeChangeListener(this._onChange);
        StatsStore.removeChangeListener(this._onChange);
    },

    _getAppState: function() {
        var appState = {
            from: AppStore.getFrom(this.props.datum),
            to: AppStore.getTo(this.props.datum),
            data: AppStore.getData(this.props.datum),
            doAutoUpdate: AppStore.getAutoUpdateSetting(this.props.datum),
            stats: StatsStore.getStats(this.props.datum)
        };

        if(appState.doAutoUpdate) {
            this._startAutoUpdate();
        } else {
            this._stopAutoUpdate();
        }

        return appState;
    },

    _onChange: function() {
        this.setState(this._getAppState());
    },

    _onUpdateButtonClicked: function() {
        ApiActions.getData(this.props.datum, this.state.from, this.state.to, this.props.conversionFunc);
    },

    _onFromDateChanged: function(fromDate) {
        AppActions.setFromDate(this.props.datum, fromDate);
    },

    _onToDateChanged: function(toDate) {
        AppActions.setToDate(this.props.datum, toDate);
    },

    _onautoUpdateToggled: function() {
        AppActions.toggleAutoUpdate(this.props.datum);
    },

    _startAutoUpdate: function() {
        if(typeof this._autoUpdate!=='undefined') return;

        this._autoUpdate = setInterval(function() {
            var currentTime = new Date();
            currentTime.setMilliseconds(0);

            AppActions.setToDate(this.props.datum, currentTime);
            ApiActions.getData(this.props.datum, this.state.from, currentTime, this.props.conversionFunc);
        }.bind(this), 5 * 60 * 1000);
    },

    _stopAutoUpdate: function() {
        if(typeof this._autoUpdate!=='undefined'){
            clearInterval(this._autoUpdate);
            this._autoUpdate = undefined;
        }
    },

    render: function() {
        var stat;

        if(this.props.statName==='Sum') {
            stat = this.state.stats.sum;
        } else {
            stat = this.state.stats.avg;
        }

        return(
            <div style={panelContainerStyle}>
                <div style={plotContainerStyle}>
                    <DataPlot {...this.props} data={this.state.data}></DataPlot>
                </div>
                <div style={controlContainerStyle}>
                    <DateRangeSelectors from={this.state.from}
                                        to={this.state.to}
                                        doAutoUpdate={this.state.doAutoUpdate}
                                        autoUpdateChangeHandler={this._onautoUpdateToggled}
                                        fromChangeHandler={this._onFromDateChanged}
                                        toChangeHandler={this._onToDateChanged}
                                        style={{width: '100%'}}>
                    </DateRangeSelectors>
                    <Button clickHandler={this._onUpdateButtonClicked} style={updateButtonStyle}>Update</Button>
                    <div style={tableContainerStyle}>
                        <StatsTable min={this.state.stats.min}
                                    max={this.state.stats.max}
                                    stat={stat}
                                    statName={this.props.statName}></StatsTable>
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
});

module.exports = DataPanel;
