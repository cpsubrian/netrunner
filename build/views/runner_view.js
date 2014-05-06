define("views/runner_view", function (require, exports, module) {
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
      app.loadDeck('runner', function (err, deck) {
        if (err) return app.emit('error', err);
        self.deck = deck;
        self.ui.grip.append(deck.identity.render().el);
        self.ui.stack.append(deck.render().el);
        self.triggerMethod('deck:loaded');
      });
    }
  });
});