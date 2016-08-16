'use babel'

import { Disposable, CompositeDisposable } from 'atom'
import Texdoc from './docs/texdoc'

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
    console.log('hello')
    global.doc = new Texdoc()
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

  search () {
    const textEditor = atom.workspace.getActiveTextEditor()
    var word = textEditor.getSelectedText()
    if (!word) {
      textEditor.selectWordsContainingCursors()
      word = textEditor.getSelectedText()
    }

    return word ? global.doc.search(word) : new Promise((resolve, reject) => resolve([]))
  }


}

export default Main
