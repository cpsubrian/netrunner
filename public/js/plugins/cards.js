var app = require('app')
  , Marionette = require('marionette')
  , Backbone = require('backbone')
  , Model = Backbone.Model
  , _ = require('underscore');

/**
 * Returns an instance of a card view, from its code.
 */
app.getCard = function (code, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  require(['cards/' + code], function (card) {
    mixins = card.mixins.map(function (mixin) {
      return 'mixins/cards/' + mixin;
    });
    require(mixins, function () {
      if (!card._model) {
        card._model  = new Model(card.model);
        delete card.model;
        card.mixins = Array.prototype.slice.call(arguments);
      }
      var CardView = Marionette.ItemView.extend(card);
      cb(new CardView(_.extend({}, {
        model: card._model
      }, options)));
    });
  });
};