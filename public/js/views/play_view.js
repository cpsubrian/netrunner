var Marionette = require('marionette')
  , CorpView = require('views/corp_view')
  , RunnerView = require('views/runner_view');

module.exports = Marionette.Layout.extend({
  el: $('.play'),

  regions: {
    corp: '.corp',
    runner: '.runner'
  },

  initialize: function () {
    this.corpView = new CorpView({
      el: this.corp.el
    });
    this.runnerView = new RunnerView({
      el: this.runner.el
    });
  },

  onRender: function () {
    this.corp.show(this.corpView);
    this.runner.show(this.runnerView);
  }
});