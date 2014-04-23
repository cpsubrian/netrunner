var app = require('app')
  , async = require('async')
  , DeckView = require('views/deck_view');

app.getDeck = function (name, cb) {
  require(['text!data/decks/' + name + '.json'], function (data) {
    var codes = JSON.parse(data);
    async.map(
      codes,
      function (code, next) {
        app.getCard(code, function (card) {
          next(null, card);
        });
      },
      function (err, cards) {
        cb(new DeckView({
          cards: cards
        }));
      }
    );
  });
};