/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    merge         = require('object-assign');

var _from = new Date(),
    _to   = new Date(),
    _emptyData = {
        timePoints: [0],
        dataPoints: [0]
    },
    _data = {};

_to.setMilliseconds(0);
_from.setTime(_to.getTime() - 24*3600*1000);

function setFrom(from) {
    _from = from;
}

function setTo(to) {
    _to = to;
}

function setData(datum, data) {
    _data[datum] = data;
}

var AppStore = merge({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    getFrom: function() {
        return _from;
    },

    getTo: function() {
        return _to;
    },

    getData: function(datum) {
        if(_data.hasOwnProperty(datum)) {
            return _data[datum];
        } else {
            return _emptyData;
        }
    }
});

AppStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.API_CALL:
            setData(action.datum, action.data);
            break;
        default:
            return true;
    }

    AppStore.emitChange();

    return true;
});

module.exports = AppStore;
