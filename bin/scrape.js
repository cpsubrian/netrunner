var hooks = require('stact-hooks')()
  , request = require('request')
  , cheerio = require('cheerio')
  , _ = require('underscore')
  , modeler = require('modeler-leveldb')
  , db = require('levelup')(require('path').resolve(__dirname, '../data/cards'))
  , base = 'http://netrunnercards.info/api/';

// Create collections.
var collections = {
  sets: modeler({name: 'sets', db: db}),
  cards: modeler({name: 'cards', db: db}),
  art: modeler({name: 'art', db: db})
};

// Fetch the sets.
hooks('main').add(function (next) {
  console.log('Fetching sets ...');
  request(base + 'sets', {json: true}, function (err, res, body) {
    next(err, body);
  });
});

// Save the sets.
hooks('main').add(function (result, next) {
  result.forEach(function (item) {
    hooks('sets:save').add(function (next) {
      collections.sets.load(item.name, function (err, set) {
        if (err) return next(err);
        set = set ? _(set).extend(item) : collections.sets.create(item);
        console.log('  - Saving set: ', set.name);
        collections.sets.save(set, next);
      });
    });
  });
  hooks('sets:save').run(next);
});

// Fetch the cards for each set.
hooks('main').add(function (sets, next) {
  console.log('');
  sets.forEach(function (set) {
    hooks('cards:fetch').add(function (next) {
      console.log('Fetching cards for set: ', set.name);
      request(base + 'search/' + set.search, {json: true}, function (err, res, body) {
        setTimeout(function () {
          next(err, body);
        }, 200);
      });
    });
  });
  hooks('cards:fetch').runSeries(next);
});

// Save the cards.
hooks('main').add(function (sets, next) {
  console.log('');
  sets.forEach(function (cards) {
    cards.forEach(function (card) {
      hooks('cards:save').add(function (next) {
        collections.cards.load(card.id, function (err, loaded) {
          if (err) return next(err);
          if (loaded) {
            card = _(loaded).extend(card);
          }
          else {
            card = collections.cards.create(card);
          }
          collections.cards.save(card, next);
        });
      });
    });
  });
  hooks('cards:save').run(next);
});

// Run the main routine.
console.log('');
hooks('main').runWaterfall(process.exit);

