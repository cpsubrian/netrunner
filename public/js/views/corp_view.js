var Marionette = require('marionette')
  , Board = require('mixins/board');

module.exports = Marionette.ItemView.extend({
  className: 'board glass',
  template: require('hbs!corp'),
  mixins: [Board],

  ui: {
    centrals: '.centrals',
    archives: '.archives',
    rd: '.rd',
    hq: '.hq'
  },

  onRender: function () {
    var self = this;
    require(['cards/03002'], function (Identity) {
      self.identity = new Identity();
      self.ui.hq.find('.root').append(self.identity.render().el);
    });
  }
});