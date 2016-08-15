'use babel'

import * as _ from 'lodash'
import childProcess from 'child_process'
import DocProvider from '../doc-provider'

export default class Mthelp extends DocProvider {

  constructor () {
    super()
  }

  search (term) {
    return new Promise((resolve, reject) => {
      childProcess.exec(`mthelp -l "${term}"`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error)
          } else {
            resolve(_.map(_.filter(stdout.split(/[\r\n]+/), line => line && !line.match(/^Documentation for (.*) could not be found.$/)),
              line => ({ path: line })))
          }
        })
    })
  }

}
