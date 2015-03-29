/* jshint node: true */

var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8081,
    routes      = require('./routes'),
    morgan      = require('morgan'),
    compression = require('compression');

app.use(morgan('short'));

app.use(compression());
app.use('/wdrf', express.static(__dirname + '/dist'));
app.use('/wdrf', express.static(__dirname + '/node_modules'));
app.use('/wdrf/api', routes);

app.listen(port);
console.log('Started server on port ' + port);
