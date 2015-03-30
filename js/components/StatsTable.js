/* jshint node: true */

var React      = require('react');

var StatsTable = React.createClass({
    render: function() {
        var min = this.props.min.toFixed(2),
            max = this.props.max.toFixed(2),
            stat = this.props.stat.toFixed(2);

        return(
            <table>
                <tr>
                    <th>Minimum</th>
                    <th>Maximum</th>
                    <th>{this.props.statName}</th>
                </tr>
                <tr>
                    <td>{min}</td>
                    <td>{max}</td>
                    <td>{stat}</td>
                </tr>
            </table>
        );
    }
});

module.exports = StatsTable;
