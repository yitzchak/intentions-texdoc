'use babel'

import * as _ from 'lodash'
import DocProvider from '../doc-provider'

export default class Texdoc extends DocProvider {

  constructor () {
    super()
  }

  search (terms) {
    return new Promise((resolve, reject) => {
      this.exec(`-l -M ${terms.join(' ')}`,
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
                  description: parts[4]
                })
              }))
          }
        })
    })
  }

  view (match) {
    if (!super.view(match)) {
      this.exec(`--just-view "${match.path}"`,
        (error, stdout, stderr) => {})
    }
  }

}
