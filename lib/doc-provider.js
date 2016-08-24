'use babel'

import * as path from 'path'
import * as fs from 'fs-plus'
import * as _ from 'lodash'
import childProcess from 'child_process'

export default class DocProvider {

  constructor () {}

  search (/* terms */) {}

  view (match) {
    if (atom.config.get('intentions-texdoc.showResultInAtom')) {
      const extension = path.extname(match.path).toLowerCase()
      if ((fs.isPdfExtension(extension) && atom.packages.isPackageActive('pdf-view')) ||
          fs.isReadmePath(match.path) || extension === '.txt' || extension === '') {
        let options = {}
        let split = atom.config.get('intentions-texdoc.split')
        if (split !== 'no') options.split = split
        atom.workspace.open(match.path, options)
        return true
      }
    }
    return false
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
