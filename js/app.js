/* jshint node: true */
/* global document */

var React     = require('react'),
    DataPanel = require('./components/DataPanel');

React.render(
    <div>
        <DataPanel datum="inHumidity"></DataPanel>
        <DataPanel datum="inTemp"></DataPanel>
    </div>,
    document.getElementById('mount-point')
);

