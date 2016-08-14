'use babel'

import { Disposable, CompositeDisposable } from 'atom'
import * as path from 'path'
import childProcess from 'child_process'

const Main = {
  disposables: null,
  languageListView: null,

  activate () {
    this.disposables = new CompositeDisposable()
    this.disposables.add(
      atom.commands.add('atom-text-editor',
        'tex-doc:context-help',
        this.contextHelp))
  },

  deactivate () {
    this.disposables.dispose()
  },

  contextHelp  () {
    const textEditor = atom.workspace.getActiveTextEditor()
    var word = textEditor.getSelectedText()
    if (!word) {
      textEditor.selectWordsContainingCursors()
      word = textEditor.getSelectedText()
    }

    if (word) {
      console.log(word)
      childProcess.exec(`texdoc "${word}"`)
    }
  }

}

export default Main
