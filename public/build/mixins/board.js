define(function (require, exports, module) {
	var $ = require('jquery')
	  , math = require('lib/math');
	
	var board = module.exports = {
	  ui: {
	    playmat: '.playmat',
	    hud: '.hud',
	    singles: '.single',
	    zones: '.zone'
	  },
	  onRender: function () {
	    var cardHeight = $(window).height() / 5.5
	      , cardWidth = math.cardSize(null, cardHeight);
	
	    this.ui.singles.css({
	      width: cardWidth + 'px',
	      height: cardHeight + 'px'
	    });
	
	    this.ui.zones.height(cardHeight);
	  }
	};
});