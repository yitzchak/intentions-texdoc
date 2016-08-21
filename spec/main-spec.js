'use babel'

import { Point } from 'atom'
import * as _ from 'lodash'
import * as path from 'path'

describe('intentions-texdoc for Atom', () => {
  let main = require('../lib/main')
  main.setDocProvider()

  it('finds matching documentation', () => {
      waitsForPromise(() => {
        return atom.workspace.open(path.join(__dirname, 'files', 'foo.tex')).then(editor => {
          const position = new Point(0, 20)
          editor.setCursorBufferPosition(position)
          return main.provideIntentions().getIntentions({ textEditor: editor, bufferPosition: position }).then(matches => {
            expect(_.some(matches, match => match.title.match(/classes.pdf/))).toBe(true, "Search on article finds classes.pdf")
            return true
          })
        })
      })
    })
})
