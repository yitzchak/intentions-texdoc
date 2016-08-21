'use babel'

import * as _ from 'lodash'
import * as path from 'path'

describe('intentions-texdoc for ATom', () => {
  beforeEach(() => {
    waitsForPromise(() => {
      return atom.packages.activatePackage('intentions-texdoc')
    })
  })

})
