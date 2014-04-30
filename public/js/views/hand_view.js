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
      var offset = i - ((len-1)/2)
        , deg = 2 * offset * Math.abs(offset)
        , rotate = Math.abs(deg) < 45 ? deg : (45 * deg / Math.abs(deg))
        , leftConst = 60
        , bottomConst = 50
        , left = (offset * leftConst)
        , bottom = (offset ? (bottomConst + (-1 * Math.abs(offset * offset * offset / (offset / 3)))) : bottomConst);

      if (i === (len -1)) {
        child.$el.css({
          left: 0 + 'px',
          bottom: 0 + 'px'
        });
        setTimeout(function () {
          child.$el.css({
            transform: 'rotate(' + rotate + 'deg)',
            left:  left + 'px',
            bottom: bottom + 'px'
          });
        }, 1);
      }
      else {
        child.$el.css({
          transform: 'rotate(' + rotate + 'deg)',
          left:  left + 'px',
          bottom: bottom + 'px'
        });
      }
    });
  }
});