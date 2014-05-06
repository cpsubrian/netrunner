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
    var self = this;
    this.faceDown = (this.model.get('faceDown') || options.faceDown) || false;

    // Preload images.
    setTimeout(function () {
      var small = new Image();
      small.src = 'http://netrunnerdb.com/' + self.model.get('imagesrc');
      var large = new Image();
      large.src = 'http://netrunnerdb.com/' + self.model.get('largeimagesrc');
    }, 1);
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
    app.vent.trigger('card:view:show', this);
  },

  onMouseLeave: function () {
    app.vent.trigger('card:view:hide', this);
  }

};