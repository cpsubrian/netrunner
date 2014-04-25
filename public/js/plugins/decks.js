var app = require('app')
  , async = require('async')
  , DeckView = require('views/deck_view');

app.loadDeck = function (name, cb) {
  require(['text!data/decks/' + name + '.json'], function (data) {
    var deck = JSON.parse(data);
    var codes = deck.cards;
    codes.push(deck.identity);
    app.cards.load(codes, function () {
      deck.identity = app.cards.getCard(deck.identity);
      deck.collection = app.cards.getCollection(deck.cards, {faceDown: true});
      cb(null, new DeckView(deck));
    });
  });
};
