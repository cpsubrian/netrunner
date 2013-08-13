var cli = require('inquirer')
  , _ = require('underscore')
  , createStack = require('stact')
  , request = require('request')
  , modeler = require('modeler-leveldb')
  , db = require('levelup')(require('path').resolve(__dirname, '../data/cards'))
  , index = require('lunr')(function () {
    this.field('title', {boost: 10});
    this.field('text');
    this.ref('id');
  })
  , indexed = false;

require('colors');

// Create collections.
var collections = {
  sets: modeler({name: 'sets', db: db}),
  cards: modeler({name: 'cards', db: db}),
  art: modeler({name: 'art', db: db})
};

// Start off the list.
start();

// The start of the listing.
function start (err) {
  if (err) throw err;

  console.log('');

  // Prompt questions.
  var questions = [
    {
      type: 'list',
      name: 'type',
      message: 'What shall we browse?',
      default: 'sets',
      choices: [
        {name: 'Search', value: 'search'},
        {name: 'List Sets', value: 'sets'},
        {name: 'List Cards', value: 'cards'},
        {name: 'Quit', value: 'quit'}
      ]
    }
  ];

  // What do we want to list?
  cli.prompt(questions, function (answers) {
    console.log('');
    switch (answers.type) {
      case 'sets':
        return listSets();
      case 'cards':
        return listCards();
      case 'search':
        return search();
      case 'quit':
        return process.exit();
      default:
        console.log('Not implemented yet');
        return start();
    }
  });
}

// Load all sets.
function loadSets (cb) {
  var stack = createStack();
  collections.sets.list(function (err, results) {
    results.forEach(function (id) {
      stack.add(function (next) {
        collections.sets.load(id, next);
      });
    });
    stack.runSeries(cb);
  });
}

// List the sets.
function listSets () {
  loadSets(function (err, sets) {
    if (err) throw err;
    sets.forEach(function (set) {
      console.log('  - ', set.name, (' (' + set.search + ')').grey);
    });
    start();
  });
}

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

// Convert cards array to hash.
function cardsById (cards) {
  var hash = {};
  cards.forEach(function (card) {
    hash[card.id] = card;
  });
  return hash;
}

// List the cards.
function listCards () {
  loadSets(function (err, sets) {
    if (err) throw err;
    // Prompt questions.
    var questions = [
      {
        type: 'list',
        name: 'set',
        message: 'Which set of cards do you want to list?',
        default: 'Core',
        choices: sets.map(function (set) {
          return set.name;
        })
      }
    ];

    cli.prompt(questions, function (answers) {
      loadCards(function (err, cards) {
        if (err) throw err;
        var setCards = _(cards).filter(function (card) {
          return card.setname === answers.set;
        });
        setCards.sort(function (a, b) {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
        setCards.forEach(function (card) {
          console.log('  - ', card.title);
        });
        start();
      });
    });
  });
}

// Search.
function search () {
  var stack = createStack();
  if (!indexed) {
    stack.add(indexCards);
  }
  stack.add(function (next) {
    var questions = [
      {
        name: 'query',
        message: 'Enter search query:'
      }
    ];
    cli.prompt(questions, function (answers) {
      console.log('');
      var results = index.search(answers.query).slice(0, 10);
      loadCards(function (err, cards) {
        if (err) throw err;
        cards = cardsById(cards);
        results.forEach(function (result) {
          console.log(cards[result.ref].title.green);
          console.log(cards[result.ref].text.grey);
          console.log('');
        });
        start();
      });
    });
  });
  stack.runSeries(start);
}

// Add all cards to the search index.
function indexCards (cb) {
  console.log('Indexing cards ...');
  loadCards(function (err, cards) {
    cards.forEach(function (card) {
      index.add(card);
    });
    indexed = true;
    cb();
  });
}

