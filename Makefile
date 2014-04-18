all: watch

watch:
	node_modules/.bin/nodemon ./ --quiet -e js,hbs,css,json,html --ignore public/ --exec "node netrunner.js" | node_modules/.bin/joli -l

build:
	node_modules/.bin/browserify public/js/main.js -o public/build/bundle.js

build-dev:
	node_modules/.bin/watchify --debug public/js/main.js -o public/build/bundle.js

.PHONY: watch
.PHONY: build
.PHONY: build-dev