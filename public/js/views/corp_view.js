var Marionette = require('marionette')
  , Board = require('mixins/board');

module.exports = Marionette.ItemView.extend({
  el: $('.play .corp'),
  mixins: [Board]
});