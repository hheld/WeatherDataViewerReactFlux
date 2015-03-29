/* jshint node: true */

var React      = require('react');

var DateRangeSelectors = React.createClass({
    statics: {
        getTime: function(dateTimeObj) {
            var timeZoneOffset = dateTimeObj.getTimezoneOffset() * 60 * 1000,
                localDate = new Date(dateTimeObj.getTime() - timeZoneOffset);

            return localDate.toISOString().replace('Z', '');
        }
    },

    _onFromChanged: function(event) {
        this.props.fromChangeHandler(event.target.value);
    },

    _onToChanged: function(event) {
        this.props.toChangeHandler(event.target.value);
    },

    render: function() {
        return(
            <form>
                <input ref="fromInput" type="datetime-local" onChange={this._onFromChanged} defaultValue={DateRangeSelectors.getTime(this.props.from)} />
                <input ref="toInput" type="datetime-local" onChange={this._onToChanged} defaultValue={DateRangeSelectors.getTime(this.props.to)} />
            </form>
        );
    }
});

module.exports = DateRangeSelectors;
