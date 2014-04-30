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
    app.loadDeck('corp', function (err, deck) {
      if (err) return app.emit('error', err);
      self.deck = deck;
      self.ui.hq.find('.root').append(deck.identity.render().el);
      self.ui.rd.find('.root').append(deck.render().el);
      self.triggerMethod('deck:loaded');
    });
  }
});