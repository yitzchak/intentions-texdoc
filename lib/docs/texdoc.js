'use babel'

import * as _ from 'lodash'
import childProcess from 'child_process'
import DocProvider from '../doc-provider'

export default class Texdoc extends DocProvider {

  constructor () {
    super()
    console.log('dfg')
  }

  search (term) {
    return new Promise((resolve, reject) => {
      childProcess.exec(`texdoc -l -M "${term}"`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error)
          } else {
            resolve(_.map(_.filter(stdout.split(/[\r\n]+/)),
              line => {
                const parts = line.split(/\t/)
                return _.pickBy({
                  term: parts[0],
                  rank: parts[1],
                  path: parts[2],
                  description: parts[3]
                })
              }))
          }
        })
    })
  }

}
