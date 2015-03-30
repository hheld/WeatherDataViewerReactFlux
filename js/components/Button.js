/* jshint node: true */

var React      = require('react'),
    Radium     = require('radium');

var StyleResolverMixin = Radium.StyleResolverMixin,
    BrowserStateMixin = Radium.BrowserStateMixin;

var buttonStyle = {
    borderRadius: 3,
    border: '1px solid #0b0e07',
    display: 'inline-block',
    cursor: 'pointer',
    color: '#ffffff',
    fontFamily: 'arial',
    fontSize: 15,
    padding: '5px 15px',
    textDecoration: 'none',
    textShadow: '0px 1px 0px #263666',
    background: 'linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%)',
    backgroundColor: '#2dabf9',

    states: [{
        hover: {
            background:'linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%)',
            backgroundColor: '#0688fa'
        },
        active: {
            position: 'relative',
            top: 1
        }
    }]
};

var Button = React.createClass({
    mixins: [ StyleResolverMixin, BrowserStateMixin ],

    render: function() {
        return(
                <button {...this.getBrowserStateEvents()} style={this.buildStyles(buttonStyle)} onClick={this.props.clickHandler}>Update</button>
        );
    }
});

module.exports = Button;
