define(function (require, exports, module) {
	var Marionette = require('marionette')
	  , Board = require('mixins/board');
	
	module.exports = Marionette.ItemView.extend({
	  className: 'board glass',
	  template: require('hbs!runner'),
	  mixins: [Board],
	
	  ui: {
	    heap: '.heap',
	    stack: '.stack',
	    grip: '.grip'
	  },
	
	  onRender: function () {
	    var self = this;
	    require(['cards/03028'], function (Identity) {
	      self.identity = new Identity();
	      self.ui.grip.append(self.identity.render().el);
	    });
	  }
	});
});