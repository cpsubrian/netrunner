var app = require('app')
  , Marionette = require('marionette')
  , Backbone = require('backbone')
  , Model = Backbone.Model;

/**
 * Returns an instance of a card view, from its code.
 */
app.getCard = function (code, cb) {
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
      cb(new CardView({
        model: card._model
      }));
    });
  });
};