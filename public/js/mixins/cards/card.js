var app = require('app');

/**
 * Card Mixin
 */
module.exports = {
  className: 'card',
  template: require('hbs!card'),

  events: {
    'mouseenter': 'onMouseEnter',
    'mouseleave': 'onMouseLeave'
  },

  ui: {
    img: 'img'
  },

  initialize: function () {
    // Preload images.
    var small = new Image();
    small.src = 'http://netrunnerdb.com/' + this.model.get('imagesrc');
    var large = new Image();
    large.src = 'http://netrunnerdb.com/' + this.model.get('largeimagesrc');
  },

  onMouseEnter: function () {
    app.vent.trigger('card:mouse:enter', this);
  },

  onMouseLeave: function () {
    app.vent.trigger('card:mouse:leave', this);
  }

};