
build: components index.js
	@component build --dev

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

test: build
	@mocha-phantomjs test/test.html

clean:
	rm -fr build components
