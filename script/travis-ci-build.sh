#!/bin/sh
texdoc --help
texdoc -l -M article
curl -s https://raw.githubusercontent.com/atom/ci/master/build-package.sh | sh
