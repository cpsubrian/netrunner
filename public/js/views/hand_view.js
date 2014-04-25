var app = require('app')
  , Marionette = require('marionette');

module.exports = Marionette.CollectionView.extend({
  className: 'hand',

  getItemView: function (model) {
    return app.cards.getView(model.get('code'));
  },

  onItemviewRender: function (itemView) {
    var len = this.collection.length;
    this.children.forEach(function (child, i) {
      var offset = i - ((len-1)/2);
      var factor = 150 /  len;
      child.$el.css({
        transform: 'rotate(' + (offset * factor) + 'deg)',
        left: (offset * 30) + 'px',
        bottom: (-1 * Math.abs(offset) * 10) + 'px'
      });
    });
  }
});