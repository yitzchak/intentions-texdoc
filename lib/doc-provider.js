'use babel'

export default class DocProvider {

  constructor () {}

  search (/* term */) {}

  view (match) {
    if (atom.config.get('tex-doc.showResultInAtom')) {
      atom.workspace.open(match.path)//, {'split': 'right'})
      return true
    } else {
      return false
    }
  }

}
