# intentions-texdoc

[![Greenkeeper badge](https://badges.greenkeeper.io/yitzchak/intentions-texdoc.svg)](https://greenkeeper.io/)

[![Travis&#x2011;CI Build Status](http://img.shields.io/travis/yitzchak/intentions-texdoc/master.svg?label=Linux/OSX%20build)](http://travis-ci.org/yitzchak/intentions-texdoc) [![AppVeyor Build Status](http://img.shields.io/appveyor/ci/yitzchak/intentions-texdoc/master.svg?label=Windows%20build)](http://ci.appveyor.com/project/yitzchak/intentions-texdoc) [![David](http://img.shields.io/david/yitzchak/intentions-texdoc.svg)](http://david-dm.org/yitzchak/intentions-texdoc)

Access TeX documentation from inside [Atom](http://atom.io) using
[intentions](https://atom.io/packages/intentions).

## Installing

Use the Atom package manager and search for "intentions-texdoc", or from a shell
run

```bash
apm install intentions-texdoc
```

## Prerequisites

This package relies on the [intentions](https://atom.io/packages/intentions)
package and a TeX installation. Currently [TeX
Live](https://www.tug.org/texlive/) and [MikTeX](http://miktex.org/) are
supported.

## Usage

A context dependent search for TeX and LaTeX documentation is initiated via the
[intentions](http://atom.io/packages/intentions) package by pressing
<kbd>Ctrl</kbd>+<kbd>Enter</kbd> on OSX or <kbd>Alt</kbd>+<kbd>Enter</kbd> on
Linux and Windows. To see available context dependent searches press
<kbd>Alt</kbd> on OSX or <kbd>Ctrl</kbd> or Linux and Windows. Generally,
`\documentclass`, `\usepackage` or similar commands are available for
searching.

Text based documents can be opened in Atom by selecting the `Show Result in
Atom` option in the settings page. If the
[pdf-view](https://atom.io/packages/pdf-view) is installed then pdf documents
will also be opened in Atom when `Show Result in Atom` is enabled. All other
other documents will be opened using either texdoc or mthelp, depending on which
one is selected in your settings.

## Status

Please note that this package is in a **beta** state.
