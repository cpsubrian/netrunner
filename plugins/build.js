var app = require('cantina')
  , saw = require('saw')
  , path = require('path')
  , fs = require('fs')
  , mkdirp = require('mkdirp')
  , rimraf = require('rimraf')
  , glob = require('glob');

var buildRoot = path.resolve(app.root, 'public/build');
var watch = saw(path.resolve(app.root, 'public/js'));

// Wipe the build directory.
rimraf.sync(buildRoot);

watch.on('ready', function (files) {
  files.forEach(function (file) {
    build(file);
  });
  buildCards();
});

watch.on('all', function (ev, file) {
  switch (ev) {
    case 'add':
    case 'update':
      build(file);
      if (file.path.indexOf('cards') === 0) {
        buildCards();
      }
      break;

    case 'remove':
      remove(file);
      if (file.path.indexOf('cards') === 0) {
        buildCards();
      }
      break;
  }
});

function build (file) {
  if (file.stat.isFile()) {
    var name;
    var content = fs.readFileSync(file.fullPath, {encoding: 'utf8'});

    // Transforms.
    if (file.path === 'config.js') {
      content = content.replace("baseUrl: 'js/'", "baseUrl: 'build/'");
    }
    else {
      if (content.match(/require\(|module\.exports|exports/)) {
        name = file.path.replace('.js', '');
        content = content.split('\n').map(function (line) {
          return '  ' + line;
         }).join('\n');
        content = 'define("' + name + '", function (require, exports, module) {\n' + content + '\n});';
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
    fs.unlinkSync(path.resolve(buildRoot, file.path));
    console.log('Build', 'Removed ' + file.path);
  }
}

function buildCards () {
  var files, content = '';

  // Find card files.
  files = glob.sync(path.resolve(buildRoot, 'cards') + '/*/**/*.js');

  // Build file contents.
  files.forEach(function (file) {
    content += fs.readFileSync(file, {encoding: 'utf8'}) + '\n';
  });

  // Remove set number from module name.
  content = content.replace(/define\(\"cards\/\d\d/g, 'define("cards');

  // Write files.
  fs.writeFileSync(path.resolve(buildRoot, 'cards', 'all.js'), content);
}
