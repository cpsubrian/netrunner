var app = require('app')
  , Marionette = require('marionette')
  , Board = require('mixins/board');

module.exports = Marionette.ItemView.extend({
  className: 'board glass',
  template: require('hbs!runner'),
  mixins: [Board],

  ui: {
    heap: '.heap',
    stack: '.stack',
    grip: '.grip'
  },

  onRender: function () {
    var self = this;
    app.getCard('03028', function (card) {
      self.identity = card;
      self.ui.grip.append(self.identity.render().el);
    });
    app.getDeck('runner', function (deck) {
      self.deck = deck;
      self.ui.stack.append(deck.render().el);
    });
  }
});