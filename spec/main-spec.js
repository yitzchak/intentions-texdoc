'use babel'

import * as _ from 'lodash'
import * as path from 'path'

describe('Tex-Doc for ATom', () => {
  beforeEach(() => {
    waitsForPromise(() => {
      return atom.packages.activatePackage('tex-doc')
    })
  })

})
