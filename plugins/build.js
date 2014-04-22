var app = require('cantina')
  , saw = require('saw')
  , path = require('path')
  , fs = require('fs')
  , mkdirp = require('mkdirp');

var buildRoot = path.resolve(app.root, 'public/build');
var watch = saw(path.resolve(app.root, 'public/js'));

watch.on('ready', function (files) {
  files.forEach(function (file) {
    build(file);
  });
});

watch.on('all', function (ev, file) {
  switch (ev) {
    case 'add':
    case 'update':
      build(file);
      break;

    case 'remove':
      remove(file);
      break;
  }
});

function build (file) {
  if (file.stat.isFile()) {
    var content = fs.readFileSync(file.fullPath, {encoding: 'utf8'});

    // Transforms.
    if (file.path === 'config.js') {
      content = content.replace("baseUrl: 'js/'", "baseUrl: 'build/'");
    }
    else {
      if (content.match(/require\(|module\.exports|exports/)) {
        content = content.split('\n').map(function (line) { return '\t' + line }).join('\n');
        content = 'define(function (require, exports, module) {\n' + content + '\n});';
      }
    }

    // Write file.
    mkdirp.sync(path.resolve(buildRoot, file.parentDir));
    fs.writeFileSync(path.resolve(buildRoot, file.path), content);
    console.log('Build', 'Built ' + file.path);
  }
}

function remove (file) {
  if (file.stat.isFile()) {
    fs.unlink(path.resolve(buildRoot, file.path));
    console.log('Build', 'Removed ' + file.path);
  }
}