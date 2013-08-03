var cli = require('inquirer')
  , _ = require('underscore')
  , createStack = require('stact')
  , modeler = require('modeler-leveldb')
  , db = require('levelup')(require('path').resolve(__dirname, '../data/cards'));

require('colors');

// Create collections.
var sets = modeler({name: 'sets', db: db})
  , cards = modeler({name: 'cards', db: db})
  , art = modeler({name: 'art', db: db});

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
      message: 'What shall we list?',
      default: 'sets',
      choices: [
        {name: 'Sets', value: 'sets'},
        {name: 'Cards', value: 'cards'},
        {name: 'Decks', value: 'decks'}
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
      default:
        console.log('Not implemented yet');
        return start();
    }
  });
}

// List the sets.
function listSets () {
  var stack = createStack();
  sets.list(function (err, results) {
    results.forEach(function (id) {
      stack.add(function (next) {
        sets.load(id, function (err, set) {
          if (err) return next(err);
          console.log('  - ', set.name, (' (' + set.search + ')').grey);
          next();
        });
      });
    });
    stack.runSeries(start);
  });
}

// List the cards.
function listCards () {

}

