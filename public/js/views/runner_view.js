var Marionette = require('marionette')
  , Board = require('mixins/board');

module.exports = Marionette.ItemView.extend({
  template: require('runner.hbs'),
  mixins: [Board]
});