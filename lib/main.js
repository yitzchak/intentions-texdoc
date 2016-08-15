'use babel'

import { Disposable, CompositeDisposable } from 'atom'
import Texdoc from './docs/texdoc'

const Main = {
  disposables: null,
  languageListView: null,
  doc: null,

  activate () {
    this.disposables = new CompositeDisposable()
    this.disposables.add(
      atom.commands.add('atom-text-editor',
        'tex-doc:context-help',
        () => this.contextHelp()))
    console.log('hello')
    this.doc = new Texdoc()
  },

  deactivate () {
    this.disposables.dispose()
  },

  contextHelp () {
    const textEditor = atom.workspace.getActiveTextEditor()
    var word = textEditor.getSelectedText()
    if (!word) {
      textEditor.selectWordsContainingCursors()
      word = textEditor.getSelectedText()
    }

    if (word) {
      console.log(word)
      this.doc.search(word).then(matches => {
        if (matches.length > 0) {
          this.doc.view(matches[0])
        }
      })
    }
  }

}

export default Main
