/* jshint node: true */
/* global document */

var React      = require('react'),
    DataPanel  = require('./components/DataPanel'),
    ApiActions = require('./actions/ApiActions.js'),
    AppStore   = require('./stores/AppStore');

var from = AppStore.getFrom();
var to = AppStore.getTo();

var dataNames = [
    'inHumidity',
    'inTemp'
];

var panels = dataNames.map(function(datum, i) {
    // initialize with data
    ApiActions.getData(datum, from, to);

    return (
        <DataPanel datum={datum} key={i}></DataPanel>
    );
});

React.render(
    <div>{panels}</div>,
    document.getElementById('mount-point')
);
