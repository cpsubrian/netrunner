var Marionette = require('marionette')
  , Board = require('mixins/board');

module.exports = Marionette.ItemView.extend({
  el: $('.play .runner'),
  mixins: [Board]
});