define("plugins/cards", function (require, exports, module) {
  var app = require('app')
    , Marionette = require('marionette')
    , Backbone = require('backbone')
    , Model = Backbone.Model
    , _ = require('underscore')
    , async = require('async');
  
  // Prep all the card mixins.
  require('mixins/cards/card');
  require('mixins/cards/identity');
  
  // Cards namespace.
  app.cards = {};
  
  /**
   * Prime the require cache for an array of card codes.
   */
  app.cards.load = function (codes, cb) {
    var moduleNames = codes.map(function (code) {
      return 'cards/' + code;
    });
    require(moduleNames, cb);
  };
  
  /**
   * Return a collection of cards, from an array of codes.
   */
  app.cards.getCollection = function (codes, options) {
    var models = [];
    codes.forEach(function (code) {
      models.push(app.cards.getModel(code, options));
    });
    return new Backbone.Collection(models);
  };
  
  /**
   * Construct a card view from a code.
   */
  app.cards.getModel = function (code, options) {
    var card = require('cards/' + code);
    return new Backbone.Model(_.extend({}, card.model, options));
  };
  
  /**
   * Construct a card model from a code.
   */
  app.cards.getView = function (code, options) {
    var card = require('cards/' + code);
    var mixins = card.view.mixins.map(function (mixin) {
      return require('mixins/cards/' + mixin);
    });
    return Marionette.ItemView.extend(_.extend({}, card.view, {mixins: mixins}, options));
  };
  
  /**
   * Return an instance of a card's view, from a code.
   */
  app.cards.getCard = function (code, options) {
    var model = app.cards.getModel(code, options);
    var View = app.cards.getView(code, options);
    return new View({model: model});
  };
  
});