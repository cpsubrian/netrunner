var app = require('app')
  , Marionette = require('marionette');

module.exports = Marionette.CollectionView.extend({
  className: 'hand',
  template: require('hbs!hand'),
});