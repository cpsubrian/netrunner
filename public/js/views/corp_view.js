var app = require('app')
  , Marionette = require('marionette')
  , Board = require('mixins/board');

module.exports = Marionette.ItemView.extend({
  className: 'board glass',
  template: require('hbs!corp'),
  mixins: [Board],

  ui: {
    centrals: '.centrals',
    archives: '.archives',
    rd: '.rd',
    hq: '.hq'
  },

  onRender: function () {
    var self = this;
    app.getCard('03002', function (card) {
      self.identity = card;
      self.ui.hq.find('.root').append(self.identity.render().el);
    });
    app.getDeck('corp', function (deck) {
      self.deck = deck;
      self.ui.rd.find('.root').append(deck.render().el);
    });
  }
});