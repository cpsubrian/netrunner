define("mixins/cards/identity", function (require, exports, module) {
  var app = require('app');
  
  /**
   * Card Mixin
   */
  module.exports = {
    className: 'card identity',
    template: require('hbs!identity'),
  
    events: {
      'mouseenter': 'onMouseEnter',
      'mouseleave': 'onMouseLeave',
      'click .view': 'onClickView',
      'mouseleave .view': 'onMouseLeaveView'
    },
  
    ui: {
      img: 'img'
    },
  
    initialize: function (options) {
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
      app.vent.trigger('identity:mouse:enter', this);
    },
  
    onMouseLeave: function () {
      app.vent.trigger('identity:mouse:leave', this);
    },
  
    onClickView: function (e) {
      e.preventDefault();
      app.vent.trigger('card:view:show', this);
    },
  
    onMouseLeaveView: function () {
      app.vent.trigger('card:view:hide', this);
    }
  
  };
  
});