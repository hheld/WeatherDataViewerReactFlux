/* jshint node: true */
/* global document */

var React      = require('react'),
    DataPanel  = require('./components/DataPanel'),
    ApiActions = require('./actions/ApiActions.js'),
    AppStore   = require('./stores/AppStore'),
    unitConversionFunctions = require('./utils/UnitConversionFunctions');

var from = AppStore.getFrom();
var to = AppStore.getTo();

var dataNames = [
    { datum: 'inHumidity',  stat: 'Avg.' },
    { datum: 'inTemp',      stat: 'Avg.', conversionFunc: unitConversionFunctions.F2C },
    { datum: 'outTemp',     stat: 'Avg.', conversionFunc: unitConversionFunctions.F2C },
    { datum: 'outHumidity', stat: 'Avg.' },
    { datum: 'rain',        stat: 'Sum',  conversionFunc: unitConversionFunctions.in2mm },
    { datum: 'barometer',   stat: 'Avg.', conversionFunc: unitConversionFunctions.inHg2mbar },
    { datum: 'windSpeed',   stat: 'Avg.', conversionFunc: unitConversionFunctions.milesPerHour2mPerSec }
];

var panels = dataNames.map(function(datum, i) {
    // initialize with data
    ApiActions.getData(datum.datum, from, to, datum.conversionFunc);

    return (
        <DataPanel datum={datum.datum}
                   statName={datum.stat}
                   conversionFunc={datum.conversionFunc}
                   key={i}></DataPanel>
    );
});

React.render(
    <div>{panels}</div>,
    document.getElementById('mount-point')
);
