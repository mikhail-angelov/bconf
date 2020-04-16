

.PHONY: run build-docker build-mini

run:
	cd mserver; npm start

build-docker: 
	docker build -t bconf-ms -f ./mserver/deploy/Dockerfile .

build-mini:
	mkdir -p ${PWD}/mini/src/lib
	cp -r ${PWD}/mini/node_modules/lit-html ${PWD}/mini/src/lib/lit-html
	cp -r ${PWD}/mini/node_modules/@fortawesome/fontawesome-free ${PWD}/mini/src/lib/fontawesome
	cd mini && npm run build

build: build-mini build-docker