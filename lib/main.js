'use babel'

import * as _ from 'lodash'
import * as fs from 'fs-plus'
import * as path from 'path'
import Texdoc from './docs/texdoc'
import Mthelp from './docs/mthelp'

const grammarScopes = ['text.tex', 'text.tex.latex', 'text.tex.latex.memoir', 'text.tex.latex.beamer']

function iconForPath (filePath) {
  const extension = path.extname(filePath)

  if (fs.isSymbolicLinkSync(filePath)) {
    return 'file-symlink-file'
  } else if (fs.isReadmePath(filePath)) {
    return 'book'
  } else if (fs.isCompressedExtension(extension)) {
    return 'file-zip'
  } else if (fs.isImageExtension(extension)) {
    return 'file-media'
  } else if (fs.isPdfExtension(extension)) {
    return 'file-pdf'
  } else if (fs.isBinaryExtension(extension)) {
    return 'file-binary'
  } else {
    return 'file-text'
  }
}

const Main = {

  activate () {
    this.setDocProvider()
    atom.config.onDidChange('intentions-texdoc.provider', () => {
      this.setDocProvider()
    })
    require('atom-package-deps').install('intentions-texdoc')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
  },

  provideIntentionsList () {
    return {
      grammarScopes: grammarScopes,
      getIntentions: ({textEditor, bufferPosition}) => {
        const word = textEditor.getWordUnderCursor()

        if (!word) return []

        return global.doc.search(word)
          .then(matches => _.map(matches,
            (match, index) => {
              return {
                priority: match.rank || (match.length - index),
                icon: iconForPath(match.path),
                title: `${path.basename(match.path)}${match.description ? ' \u2014 ' + match.description : ''} [${path.basename(path.dirname(match.path))}]`,
                selected: () => global.doc.view(match)
              }
            }))
      }
    }
  },

  provideIntentionsHighlight () {
    return {
      grammarScopes: grammarScopes,
      getIntentions: ({textEditor, visibleRange}) => {
        const matches = []
        if (!atom.config.get('intentions-texdoc.enableSearchHighlighting')) return matches
        textEditor.scanInBufferRange(textEditor.getLastCursor().wordRegExp({ includeNonWordCharacters: false }), visibleRange, ({matchText, range}) => {
          if (matchText) {
            matches.push(global.doc.search(matchText).then(results => {
              if (results.length > 0) {
                return {
                  range: range,
                  created: ({textEditor, element, marker, matchedText}) => {}
                }
              }
            }))
          }
        })
        return Promise.all(matches).then(results => _.filter(results))
      }
    }
  },

  setDocProvider () {
    global.doc = (atom.config.get('intentions-texdoc.provider') === 'mthelp') ? new Mthelp() : new Texdoc()
  }

}

export default Main
