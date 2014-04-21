var app = require('app')
  , PlayView = require('views/play_view');

// Define app regions.
app.addRegions({
  'sidebar': '.sidebar',
  'play': '.play'
});

// Load plugins.
require('plugins/mixins');

// Create and attach the play view.
app.addInitializer(function () {
  app.play.attachView(new PlayView());
});

// Start the app.
$(function () {
  app.start();
});