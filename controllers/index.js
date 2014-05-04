var app = require('cantina')
  , controller = module.exports = app.controller();

controller.get('/', index);

function index (req, res, next) {
  res.vars.title = 'Game';
  res.render('game', res.vars);
}
