#!/bin/bash
set -e && \
cd ./dist && \
remote_repo=${GITHUB_URL:-`git config remote.origin.url`} && \
remote_branch="release" && \
git init && \
git config user.name "Travis CI" && \
git config user.email "nobody@nobody.org" && \
git add . && \
git commit -m'build' && \
git push --force --quiet $remote_repo master:$remote_branch > /dev/null 2>&1 && \
rm -fr .git && \
cd ../