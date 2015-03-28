/* jshint node: true */

var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8080,
    routes      = require('./routes'),
    morgan      = require('morgan'),
    compression = require('compression');

app.use(morgan('short'));

app.use(compression());
app.use('/wd', express.static(__dirname + '/dist'));
app.use('/wd', express.static(__dirname + '/node_modules'));
app.use('/wd/api', routes);

app.listen(port);
console.log('Started server on port ' + port);
