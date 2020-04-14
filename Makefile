
start-server:
	cd mserver; node dist/main

build: 
	docker build -t ls-lanes .