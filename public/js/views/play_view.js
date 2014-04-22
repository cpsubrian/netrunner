var Marionette = require('marionette')
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

  initialize: function () {
    this.corpView = new CorpView();
    this.runnerView = new RunnerView();
  },

  onRender: function () {
    this.corp.show(this.corpView);
    this.runner.show(this.runnerView);
  }
});