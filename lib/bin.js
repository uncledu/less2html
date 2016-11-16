#!/usr/bin/env node


'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _concatStream = require('concat-stream');

var _concatStream2 = _interopRequireDefault(_concatStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let argv = _yargs2.default.usage('Usage: $0 [ options ]').example('$0 -f for.less -o bar.html', 'generate bar.html base the for.less hierachy').alias('f', 'file').nargs('f', 1).describe('f', 'specify the less file').alias('o', 'output').nargs('o', 1).describe('o', 'specify the output file name').help('h').alias('h', 'help').global('[file,help,output]').argv;

try {
  var s = _fs2.default.createReadStream(argv.file);
  var out = argv.o || 'output.html';
  let str = '';
  s.on('data', function (buf) {
    str += buf;
  });
  s.on('end', function () {
    let l1 = new _index2.default();
    l1.parse(str, data => {
      _fs2.default.writeFile(out, data);
      console.log("data is:" + data);
    });
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}