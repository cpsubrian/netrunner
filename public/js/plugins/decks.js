var app = require('app')
  , async = require('async')
  , DeckView = require('views/deck_view');

app.getDeck = function (name, cb) {
  require(['text!data/decks/' + name + '.json'], function (data) {
    var deck = JSON.parse(data);
    async.map(
      deck.cards,
      function (code, next) {
        app.getCard(code, {faceDown: true}, function (card) {
          next(null, card);
        });
      },
      function (err, cards) {
        cb(new DeckView({
          side: deck.side,
          cards: cards
        }));
      }
    );
  });
};