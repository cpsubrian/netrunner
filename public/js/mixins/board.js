var $ = require('jquery')
  , math = require('lib/math')
  , Backbone = require('backbone')
  , HandView = require('views/hand_view');

var board = module.exports = {
  ui: {
    playmat: '.playmat',
    hud: '.hud',
    singles: '.single',
    zones: '.zone',
    hand: '.hand-container'
  },

  events: {
    'click .deck-container': 'onClickDeck'
  },

  initialize: function () {
    this.hand = new HandView({
      collection: new Backbone.Collection()
    });
  },

  onRender: function () {
    var wH = $(window).height()
      , cardHeight = ((wH / 5.5) < 160) ? (wH / 5.5) : 160
      , cardWidth = math.cardSize(null, cardHeight);

    this.ui.singles.css({
      width: (cardWidth) + 'px',
      height: (cardHeight) + 'px'
    });
    this.ui.zones.height(cardHeight);
    this.ui.hand.append(this.hand.render().el);
  },

  onClickDeck: function (e) {
    e.preventDefault();
    this.draw();
  },

  draw: function () {
    var card = this.deck.draw();
    console.log(card.attributes);
    card.set('faceDown', false);
    this.hand.collection.add(card);
  }
};