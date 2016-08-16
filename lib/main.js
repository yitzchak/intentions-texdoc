'use babel'

import { Disposable, CompositeDisposable } from 'atom'
import Texdoc from './docs/texdoc'
import Mthelp from './docs/mthelp'

const Main = {
  disposables: null,
  matchListView: null,

  createMatchListView  () {
    if (!this.matchListView) {
     let MatchListView = require('./match-list-view')
     this.matchListView = new MatchListView()
    }
    this.search().then(matches => {
     if (matches.length > 0) {
       this.matchListView.toggle(matches)
     }
    })
  },

  activate () {
    this.disposables = new CompositeDisposable()
    this.disposables.add(
      atom.commands.add('atom-text-editor',
        'tex-doc:context-help',
        () => this.contextHelp()))
    this.disposables.add(
      atom.commands.add('atom-text-editor',
        'tex-doc:show-matches',
        () => this.createMatchListView()))
    this.setDocProvider()
    atom.config.onDidChange('tex-doc.provider', () => {
      this.setDocProvider()
    })
  },

  deactivate () {
    this.disposables.dispose()
  },

  contextHelp () {
    this.search().then(matches => {
      if (matches.length > 0) {
        global.doc.view(matches[0])
      }
    })
  },

  setDocProvider () {
    global.doc = (atom.config.get('tex-doc.provider') === 'mthelp') ? new Mthelp() : new Texdoc()
  },

  search () {
    const textEditor = atom.workspace.getActiveTextEditor()
    var word = textEditor.getSelectedText()
    if (!word) {
      textEditor.selectWordsContainingCursors()
      word = textEditor.getSelectedText()
    }

    return word
      ? global.doc.search(word).then(matches => {
        if (matches.length === 0) {
          atom.notifications.addInfo('No matching documentation', { detail: `Search for ${word} in TeX documentation returned no matches.`})
        }
        return matches
      })
      : new Promise((resolve, reject) => {
        atom.notifications.addInfo('No search term', { detail: 'No term was selected for search in TeX documentation.'})
        resolve([])
      })
  }


}

export default Main
