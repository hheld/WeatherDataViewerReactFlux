/* jshint node: true */
/* global document */

var React      = require('react'),
    DataPanel  = require('./components/DataPanel'),
    ApiActions = require('./actions/ApiActions.js'),
    AppStore   = require('./stores/AppStore');

var from = AppStore.getFrom();
var to = AppStore.getTo();

var dataNames = [
    { datum: 'inHumidity',  stat: 'Avg.' },
    { datum: 'inTemp',      stat: 'Avg.' },
    { datum: 'outTemp',     stat: 'Avg.' },
    { datum: 'outHumidity', stat: 'Avg.' },
    { datum: 'rain',        stat: 'Sum'  },
    { datum: 'barometer',   stat: 'Avg.' },
    { datum: 'windSpeed',   stat: 'Avg.' }
];

var panels = dataNames.map(function(datum, i) {
    // initialize with data
    ApiActions.getData(datum.datum, from, to);

    return (
        <DataPanel datum={datum.datum} statName={datum.stat} key={i}></DataPanel>
    );
});

React.render(
    <div>{panels}</div>,
    document.getElementById('mount-point')
);
