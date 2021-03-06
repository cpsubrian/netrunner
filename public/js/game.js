var app = require('app')
  , PlayView = require('views/play_view');

// Define app regions.
app.addRegions({
  'sidebar': '.sidebar',
  'play': '.play-container'
});

// Load plugins.
require('plugins/mixins');
require('plugins/cards');
require('plugins/decks');

// Create and attach the play view.
app.addInitializer(function () {
  app.play.show(new PlayView());
});

module.exports = app;