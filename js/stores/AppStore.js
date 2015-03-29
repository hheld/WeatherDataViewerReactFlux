/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    merge         = require('object-assign'),
    Immutable     = require('immutable');

var DataRecord = Immutable.Record({
    timePoints: [0],
    dataPoints: [0]
});

var _initialFrom = new Date(),
    _initialTo   = new Date(),
    _initialAutoUpdate = true,
    _data = Immutable.Map(),
    _from = {},
    _to = {},
    _autoUpdate = {};

_initialTo.setMilliseconds(0);
_initialFrom.setTime(_initialTo.getTime() - 24*3600*1000);

function setFrom(datum, from) {
    _from[datum] = new Date(from);
}

function setTo(datum, to) {
    _to[datum] = new Date(to);
}

function toggleAutoUpdate(datum) {
    if(!_autoUpdate.hasOwnProperty(datum)) {
        _autoUpdate[datum] = !_initialAutoUpdate;
    } else {
        _autoUpdate[datum] = !_initialAutoUpdate;
    }
}

function setData(datum, data) {
    _data = _data.set(datum, new DataRecord({
        timePoints: data.timePoints,
        dataPoints: data.dataPoints
    }));
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

    getFrom: function(datum) {
        if(_from.hasOwnProperty(datum)) {
            return _from[datum];
        }

        return _initialFrom;
    },

    getTo: function(datum) {
        if(_to.hasOwnProperty(datum)) {
            return _to[datum];
        }

        return _initialTo;
    },

    getAutoUpdateSetting: function(datum) {
        if(_autoUpdate.hasOwnProperty(datum)) {
            return _autoUpdate[datum];
        }

        return _initialAutoUpdate;
    },

    getData: function(datum) {
        if(_data.has(datum)) {
            return _data.get(datum);
        } else {
            return new DataRecord();
        }
    }
});

AppStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.API_CALL:
            setData(action.datum, action.data);
            break;
        case AppConstants.SET_FROM_DATE:
            setFrom(action.datum, action.data);
            break;
        case AppConstants.SET_TO_DATE:
            setTo(action.datum, action.data);
            break;
        case AppConstants.TOGGLE_AUTO_UPDATE:
            toggleAutoUpdate(action.datum);
            break;
        default:
            return true;
    }

    AppStore.emitChange();

    return true;
});

module.exports = AppStore;
