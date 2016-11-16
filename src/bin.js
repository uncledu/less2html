#!/usr/bin/env node

'use strict'
import LessToHtml from './index'
import fs from 'fs'
import yargs from 'yargs'
import concat from 'concat-stream'

let argv = yargs
  .usage('Usage: $0 [ options ]')
  .example('$0 -f for.less -o bar.html', 'generate bar.html base the for.less hierachy')
  .alias('f', 'file')
  .nargs('f', 1)
  .describe('f', 'specify the less file')
  .alias('o', 'output')
  .nargs('o', 1)
  .describe('o', 'specify the output file name')
  .help('h')
  .alias('h', 'help')
  .global('[file,help,output]')
  .argv

try {
  var s = fs.createReadStream(argv.file)
  var out = argv.o || 'output.html'
  let str = ''
  s.on('data', function(buf) {
    str += buf
  })
  s.on('end', function() {
    let l1 = new LessToHtml()
    l1.parse(str, (data) => {
      fs.writeFile(out, data);
      console.log("data is:" + data)
    })
  });
} catch (err) {
  console.error(err)
  process.exit(1)
}

