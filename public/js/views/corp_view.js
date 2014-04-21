var Marionette = require('marionette')
  , Board = require('mixins/board');

module.exports = Marionette.ItemView.extend({
  template: require('corp.hbs'),
  mixins: [Board]
});