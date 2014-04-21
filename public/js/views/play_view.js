var Marionette = require('marionette')
  , CorpView = require('views/corp_view')
  , RunnerView = require('views/corp_view');

module.exports = Marionette.ItemView.extend({
  el: $('.play'),
  initialize: function () {
    this.corp = new CorpView();
    this.runner = new RunnerView();
  }
});