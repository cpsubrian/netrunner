var app = require('cantina');

app.boot(function(err) {
  if (err) throw err;

  // Logging
  //require('cantina-log');
  if (!app.conf.get('test')) {
    //app.log.replaceConsole();
  }

  // Error handler.
  app.on('error', function (err) {
    if (err.stack) {
      app.log.error(err.stack);
    }
    else {
      app.log.error(err);
    }
  });

  // Web stack. (Also loads local plugins and middleware).
  require('cantina-web');

  // External plugins
  require('cantina-redis');
  require('cantina-models');
  require('cantina-validators');

  app.start();
});