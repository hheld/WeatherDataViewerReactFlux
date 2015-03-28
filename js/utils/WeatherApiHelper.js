/* jshint node: true */

var http = require('http');

function getWeatherData(datum, from, to) {
    return new Promise(function(resolve, reject) {
        http.get('/wd/api/' + datum + '?from=' + from + '&to=' + to, function(res) {
            var data = '';

            res.on('data', function(chunk) {
                data += chunk;
            }).on('end', function() {
                data = JSON.parse(data);
                resolve(data);
            });
        }).on('error', function(e) {
            reject(e.message);
        });
    });
}

module.exports = {
    get: getWeatherData
};
