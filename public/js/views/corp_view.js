var Marionette = require('marionette')
  , Board = require('mixins/board');

module.exports = Marionette.ItemView.extend({
  className: 'board glass',
  template: require('hbs!corp'),
  mixins: [Board]
});