var app = require('app');

/**
 * Card Mixin
 */
module.exports = {
  className: 'card',
  template: require('hbs!card'),

  templateHelpers: function () {
    return this.data;
  },

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
    small.src = 'http://netrunnerdb.com/' + this.data.imagesrc;
    var large = new Image();
    large.src = 'http://netrunnerdb.com/' + this.data.largeimagesrc;
  },

  onMouseEnter: function () {
    app.vent.trigger('card:view', this);
  },

  onMouseLeave: function () {
    app.vent.trigger('card:hide', this);
  }

};