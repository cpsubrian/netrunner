define("views/play_view", function (require, exports, module) {
  var app = require('app')
    , Marionette = require('marionette')
    , CorpView = require('views/corp_view')
    , RunnerView = require('views/runner_view')
    , $ = require('jquery');
  
  module.exports = Marionette.Layout.extend({
    className: 'play',
    template: require('hbs!play'),
  
    regions: {
      corp: '.corp-board',
      runner: '.runner-board'
    },
  
    ui: {
      viewCard: '.view-card',
      viewCardImg: '.view-card img'
    },
  
    initialize: function () {
      this.corpView = new CorpView();
      this.runnerView = new RunnerView();
  
      app.vent.on('card:view:show', this.onCardMouseEnter.bind(this));
      app.vent.on('card:view:hide', this.onCardMouseLeave.bind(this));
    },
  
    onRender: function () {
      this.corp.show(this.corpView);
      this.runner.show(this.runnerView);
    },
  
    onCardMouseEnter: function (card) {
      if (!card.faceDown) {
        this.ui.viewCardImg.attr('src', 'http://netrunnerdb.com/' + card.model.get('largeimagesrc'));
        this.ui.viewCard.addClass('show');
      }
    },
  
    onCardMouseLeave: function (card) {
      this.ui.viewCard.removeClass('show');
    }
  });
});