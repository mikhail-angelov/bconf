#!/bin/bash
set -e && \
cd ./dist && \
echo stage 1  && \
remote_repo=${GITHUB_URL:-`git config remote.origin.url`} && \
remote_branch="release" && \
echo stage 2 $remote_repo master:$remote_branch  && \
git init && \
echo stage 3  && \
git config user.name "Travis CI" && \
git config user.email "nobody@nobody.org" && \
git add . && \
echo stage 4  && \
git commit -m'build' && \
echo stage 5  && \
git push --force --quiet $remote_repo master:$remote_branch > /dev/null 2>&1 && \
echo stage 6  && \
rm -fr .git && \
echo stage 7  && \
cd ../