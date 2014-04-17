all: watch

watch:
	nodemon ./ -e js,hbs,css,json,html --exec "node netrunner.js | joli -l"

.PHONY: watch