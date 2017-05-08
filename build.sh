#!/bin/bash
gulp dist
docker build -f ./Dockerfile -t bconf:1 .