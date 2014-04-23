var app = require('app')
  , Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: require('hbs!deck'),
  className: 'deck',

  initialize: function (options) {
    this.side = options.side;
    this.cards = options.cards;
  },

  onRender: function () {
    var self = this;
    this.cards.forEach(function (card) {
      self.$el.append(card.render().el);
    });
  }
});