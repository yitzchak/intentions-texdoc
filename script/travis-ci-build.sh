#!/bin/sh

if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
  export PATH=/Library/TeX/texbin:$PATH
  texdoc -l -M graphicx
  texdoc -l -M article
fi

curl -s https://raw.githubusercontent.com/atom/ci/master/build-package.sh | sh
