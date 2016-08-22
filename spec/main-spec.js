'use babel'

import { Point } from 'atom'
import * as _ from 'lodash'
import * as path from 'path'

describe('intentions-texdoc for Atom', () => {
  let main = require('../lib/main')

  if (process.env.APPVEYOR) {
    atom.config.set('intentions-texdoc.provider', 'mthelp')
  }
  main.setDocProvider()

  it('finds matching documentation', () => {
      waitsForPromise(() => {
        return atom.workspace.open(path.join(__dirname, 'files', 'foo.tex')).then(editor => {
          const position = new Point(2, 15)
          editor.setCursorBufferPosition(position)
          return main.provideIntentions().getIntentions({ textEditor: editor, bufferPosition: position }).then(matches => {
            console.log(_.map(matches, 'title'))
            expect(matches.length !== 0).toBe(true, "Search on article finds results")
            return true
          })
        })
      })
    })
})
