var app = require('app')
  , Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('hbs!deck'),
  className: 'deck',

  initialize: function (options) {
    this.side = options.side;
    this.identity = options.identity;
  }
});