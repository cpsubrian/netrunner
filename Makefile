all: watch

watch:
	node_modules/.bin/nodemon ./ --quiet -e js,hbs,css,json,html --ignore public/ --exec "node netrunner.js"

.PHONY: watch