'use babel'

import { SelectListView } from 'atom-space-pen-views'
import * as _ from 'lodash'

export default class MatchListView extends SelectListView {
  initialize () {
    super.initialize()

    this.panel = atom.workspace.addModalPanel({item: this, visible: false})
    this.addClass('tex-doc-match-selector')
    return this.list.addClass('mark-active')
  }

  getFilterKey () {
    return 'value'
  }

  viewForItem (match) {
    let element = document.createElement('li')
    //if (language.id === this.currentLanguage || (!language.id && !this.currentLanguage)) { element.classList.add('active') }
    element.textContent = match.description || match.path
    element.dataset.match = match
    return element
  }

  toggle (matches) {
    if (this.panel.isVisible()) {
      return this.cancel()
    } else {
      this.editor = atom.workspace.getActiveTextEditor()
      if (this.editor) {
        return this.attach(matches)
      }
    }
  }

  destroy () {
    return this.panel.destroy()
  }

  cancelled () {
    return this.panel.hide()
  }

  confirmed (match) {
    this.cancel()
    global.doc.view(match)
  }

  addMatches (matches) {
    this.setItems(matches)
  }

  attach (matches) {
    this.storeFocusedElement()
    this.addMatches(matches)
    this.panel.show()
    this.focusFilterEditor()
  }
};
