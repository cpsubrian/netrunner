define("views/deck_view", function (require, exports, module) {
  var app = require('app')
    , Marionette = require('marionette');
  
  module.exports = Marionette.CollectionView.extend({
    className: 'deck',
  
    getItemView: function (model) {
      return app.cards.getView(model.get('code'));
    },
  
    initialize: function (options) {
      this.side = options.side;
      this.identity = options.identity;
    },
  
    draw: function () {
      return this.collection.shift();
    }
  });
});