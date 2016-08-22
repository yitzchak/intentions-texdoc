#!/bin/sh
if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
  export PATH=/usr/texbin:$PATH
fi
curl -s https://raw.githubusercontent.com/atom/ci/master/build-package.sh | sh
