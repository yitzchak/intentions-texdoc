'use babel'

import * as path from 'path'

export default class DocProvider {

  constructor () {}

  search (/* term */) {}

  view (match) {
    if (atom.config.get('tex-doc.showResultInAtom')) {
      switch (path.extname(match.path)) {
        case '.pdf':
          if (!atom.packages.isPackageActive('pdf-view')) return false
          break
        case 'html':
        case 'htm':
        case 'dvi':
        case 'ps':
          return false
      }
      let options = {}
      let split = atom.config.get('tex-doc.split')
      if (split !== 'no') options.split = split
      atom.workspace.open(match.path, options)
      return true
    } else {
      return false
    }
  }

}
