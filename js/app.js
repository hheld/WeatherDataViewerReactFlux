/* jshint node: true */
/* global document */

var React     = require('react'),
    DataPanel = require('./components/DataPanel');

React.render(
    <DataPanel datum="inHumidity"></DataPanel>,
    document.getElementById('mount-point')
);

