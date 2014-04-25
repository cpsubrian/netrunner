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

  initialize: function (options) {
    this.faceDown = (this.model.get('faceDown') || options.faceDown) || false;

    // Preload images.
    var small = new Image();
    small.src = 'http://netrunnerdb.com/' + this.model.get('imagesrc');
    var large = new Image();
    large.src = 'http://netrunnerdb.com/' + this.model.get('largeimagesrc');
  },

  templateHelpers: function () {
    var data = {};
    if (this.faceDown) {
      data.img = '/images/cards/misc/card-back-' + this.model.get('side_code') + '.jpg';
    }
    else {
      data.img = 'http://netrunnerdb.com/' + this.model.get('imagesrc');
    }
    return data;
  },

  onMouseEnter: function () {
    app.vent.trigger('card:mouse:enter', this);
  },

  onMouseLeave: function () {
    app.vent.trigger('card:mouse:leave', this);
  }

};