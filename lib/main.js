'use babel'

import * as _ from 'lodash'
import Texdoc from './docs/texdoc'
import Mthelp from './docs/mthelp'

const Main = {

  activate () {
    this.setDocProvider()
    atom.config.onDidChange('tex-doc.provider', () => {
      this.setDocProvider()
    })
    require('atom-package-deps').install('linter-spell-latex')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
  },

  provideIntentions () {
    return {
      grammarScopes: ['text.tex', 'text.tex.latex', 'text.tex.latex.memoir', 'text.tex.latex.beamer'],
      getIntentions: ({textEditor, bufferPosition}) => {
        const word = textEditor.getWordUnderCursor()

        if (!word) return []

        return global.doc.search(word)
          .then(matches => _.map(matches,
            (match, index) => ({
              priority: match.rank || (match.length - index),
              icon: 'tools',
              title: match.path,
              selected: () => global.doc.view(match)
            })))
      }
    }
  },

  setDocProvider () {
    global.doc = (atom.config.get('tex-doc.provider') === 'mthelp') ? new Mthelp() : new Texdoc()
  }

}

export default Main
