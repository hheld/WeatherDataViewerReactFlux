/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    WeatherData   = require('../utils/WeatherApiHelper');

var AppActions = {
    getData: function(datum) {
        WeatherData.get(datum).then(function(data) {
            AppDispatcher.handleApiAction({
                actionType: AppConstants.API_CALL,
                data: data,
                datum: datum
            });
        }, function(error) {
            console.log('There was an error getting weather data: ' + error);
        });
    }
};

module.exports = AppActions;
