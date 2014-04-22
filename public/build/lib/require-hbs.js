define(function (require, module, exports) {
	var app = require('app')
	  , Handlebars = require('handlebars')
	  , text = require('text')
	  , templates = {};
	
	var hbs = module.exports = {
	  load: function (name, req, onLoad, config) {
	    console.log('name');
	    // Try to return cached template.
	    if (templates[name]) {
	      return onLoad(templates[name]);
	    }
	
	    // After the text of the template is loaded, we compile and cache it.
	    function compile (text) {
	      templates[name] = Handlebars.compile(text);
	      onLoad(templates[name]);
	    }
	
	    // Load the template text via the text! plugin.
	    text.load('templates/' + name + '.hbs', req, compile, config);
	  },
	
	  // Delegates to the text! plugin.
	  // @todo This is used by the optimizer and will probably need to be
	  // revisited when we start using it.
	  write: text.write,
	  writeFile: text.writeFile
	};
});