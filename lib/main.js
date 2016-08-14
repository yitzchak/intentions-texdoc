'use babel'

import { Disposable, CompositeDisposable } from 'atom'

const Main = {
  disposables: null,
  languageListView: null,

  activate () {
    this.disposables = new CompositeDisposable()
  },

  deactivate () {
    this.disposables.dispose()
  }

}

export default Main
