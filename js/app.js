/* jshint node: true */
/* global document */

var React      = require('react'),
    DataPanel  = require('./components/DataPanel'),
    ApiActions = require('./actions/ApiActions.js'),
    AppStore   = require('./stores/AppStore');

var from = AppStore.getFrom();
var to = AppStore.getTo();

ApiActions.getData('inHumidity', from, to);
ApiActions.getData('inTemp', from, to);

React.render(
    <div>
        <DataPanel datum="inHumidity"></DataPanel>
        <DataPanel datum="inTemp"></DataPanel>
    </div>,
    document.getElementById('mount-point')
);
