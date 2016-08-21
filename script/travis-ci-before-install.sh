#!/bin/sh

if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
  wget http://mirror.ctan.org/systems/mac/mactex/BasicTeX.pkg -O "/tmp/BasicTeX.pkg";
  sudo installer -pkg "/tmp/BasicTeX.pkg" -target /;
  rm /tmp/BasicTeX.pkg;
  export PATH=/usr/texbin:$PATH;
  sudo tlmgr update --self;
  sudo tlmgr install texdoc;
fi
