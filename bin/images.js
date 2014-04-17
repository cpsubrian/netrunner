var pkg = require('../package.json')
  , hooks = require('stact-hooks')()
  , createStack = require('stact')
  , request = require('request')
  , cheerio = require('cheerio')
  , _ = require('underscore')
  , modeler = require('modeler-leveldb')
  , db = require('levelup')(require('path').resolve(__dirname, '../data/cards'))
  , baseUrl = pkg.conf.base_url;

// Create collections.
var collections = {
  sets: modeler({name: 'sets', db: db}),
  cards: modeler({name: 'cards', db: db}),
  art: modeler({name: 'art', db: db})
};

// Load all the cards.
function loadCards (ids, cb) {
  if (!cb) {
    cb = ids;
    ids = null;
  }

  var stack = createStack();
  collections.cards.list(function (err, results) {
    results.forEach(function (id) {
      stack.add(function (next) {
        collections.cards.load(id, next);
      });
    });
    stack.runSeries(function (err, cards) {
      if (err) return cb(err);
      if (ids) {
        cb(null, _(cards).filter(function (card) {
          return ids.indexOf(card.id) >= 0;
        }));
      }
      else {
        cb(null, cards);
      }
    });
  });
}

// Fetch the cards.
hooks('main').add(function (next) {
  console.log('Fetching cards ...');
  loadCards(next);
});

// Download missing images.
hooks('main').add(function (cards, next) {
  var stack = createStack(function (next) {
    var card = this;
    console.log('  - Fetching image for: ' + card.title);
    request(baseUrl + card.imagesrc, function (err, res, body) {
      if (err) return next(err);
      card.imageData = new Buffer(body).toString('base64');
      next();
    });
  });
  stack.add(cards[0]);
  /*
  cards.forEach(function (card) {
    stack.add(card);
  });
  */
  stack.runSeries(next);
});

// Run the main routine.
console.log('');
hooks('main').runWaterfall(function (err) {
  if (err) console.error(err);
  process.exit();
});


