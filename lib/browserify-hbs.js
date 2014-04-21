var tools = require('browserify-transform-tools')
  , path = require('path')
  , fs = require('fs')
  , Handlebars = require('handlebars');


module.exports = tools.makeRequireTransform('browserify-hbs', function(args, opts, cb) {
  if (args[0].match(/\.hbs$/)) {
    var template = fs.readFileSync(path.resolve('./views', args[0]), 'utf8');
    return cb(null, wrap(Handlebars.precompile(template)));
  }
  return cb();
});

function wrap(tpl) {
  return "(function (Handlebars) { \n\treturn " + tpl + "\n})(require('handlebars'))";
}