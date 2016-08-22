'use babel'

import * as path from 'path'
import * as _ from 'lodash'
import childProcess from 'child_process'

export default class DocProvider {

  constructor () {}

  search (/* term */) {}

  view (match) {
    if (atom.config.get('intentions-texdoc.showResultInAtom')) {
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
      let split = atom.config.get('intentions-texdoc.split')
      if (split !== 'no') options.split = split
      atom.workspace.open(match.path, options)
      return true
    } else {
      return false
    }
  }

  exec (args, callback) {
    const cmd = atom.config.get('intentions-texdoc.providerPath') || atom.config.get('intentions-texdoc.provider')

    const env = _.clone(process.env)
    switch (process.platform) {
      case 'win32':
        env.Path = [
          env.Path,
          '%SystemDrive%\\texlive\\2016\\bin\\win32',
          '%SystemDrive%\\texlive\\2015\\bin\\win32',
          '%SystemDrive%\\texlive\\2014\\bin\\win32',
          '%ProgramFiles%\\MiKTeX 2.9\\miktex\\bin\\x64',
          '%ProgramFiles(x86)%\\MiKTeX 2.9\\miktex\\bin'
        ].join(path.delimiter)
        break
      case 'darwin':
        env.PATH = [
          env.PATH,
          '/Library/TeX/texbin',
          '/usr/texbin'
        ].join(path.delimiter)
        break
    }

    childProcess.exec(`"${cmd}" ${args}`, { env: env }, callback)
  }

}
