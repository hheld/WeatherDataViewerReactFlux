/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    NewsConstants = require('../constants/NewsConstants'),
    NewsSource    = require('../utils/NewsSource');

var NewsStoreActions = {
    loadNews: function(data) {
        NewsSource.get(data).then(function(news) {
            AppDispatcher.handleViewAction({
                actionType: NewsConstants.LOAD_NEWS,
                data: news
            });
        }, function(error) {
            AppDispatcher.handleViewAction({
                actionType: NewsConstants.LOAD_ERROR,
                data: 'There was an error getting news: ' + error
            });
        });

        AppDispatcher.handleViewAction({
            actionType: NewsConstants.LOAD_PENDING
        });
    },

    countItemsChanged: function(count) {
        AppDispatcher.handleViewAction({
            actionType: NewsConstants.COUNT_ITEMS_CHANGED,
            data: count
        });
    }
};

module.exports = NewsStoreActions;
