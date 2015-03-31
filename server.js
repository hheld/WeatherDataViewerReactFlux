/* jshint node: true */

require('node-jsx').install();

var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8081,
    routes      = require('./routes'),
    morgan      = require('morgan'),
    compression = require('compression'),
    path        = require('path'),
    React       = require('react'),
    App         = React.createFactory(require('./js/app.js'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('short'));
app.use(compression());
app.use('/wdrf', express.static(path.join(__dirname, 'dist')));
app.use('/wdrf', express.static(path.join(__dirname, 'node_modules')));
app.use('/wdrf/api', routes);
app.use('/wdrf', function(req, res) {
    var reactHtml = React.renderToString(App());

    res.render('index.ejs', {reactOutput: reactHtml});
});

app.listen(port);
console.log('Started server on port ' + port);
