'use babel'

import * as _ from 'lodash'
import * as fs from 'fs-plus'
import * as path from 'path'
import Texdoc from './docs/texdoc'
import Mthelp from './docs/mthelp'

const keywordRegExp = /\\(?:input|documentclass|usepackage|RequirePackage|LoadPackage)\s*(?:\[.*\])?\s*{([^}]+)}/g
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
        let text

        textEditor.scan(keywordRegExp, ({range, match, stop}) => {
          if (range.containsPoint(bufferPosition)) {
            text = match[1]
            stop()
          } else if (range.start.isGreaterThan(bufferPosition)) {
            stop()
          }
        })

        if (!text) return []

        return global.doc.search(text.split(','))
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
        return new Promise(resolve => {
          const matches = []
          textEditor.scanInBufferRange(keywordRegExp, visibleRange, ({range}) => {
            matches.push({
              range: range,
              created: ({textEditor, element, marker, matchedText}) => {}
            })
          })
          resolve(matches)
        })
      }
    }
  },

  setDocProvider () {
    global.doc = (atom.config.get('intentions-texdoc.provider') === 'mthelp') ? new Mthelp() : new Texdoc()
  }

}

export default Main
