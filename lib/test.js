'use strict';

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let l = new _index2.default(); //#!/usr/bin/env node
//var argv = require('yargs')
//.usage('Usage: $0 <command> [options]')
//.command('count', 'Count the lines in a file')
//.example('$0 count -f foo.js', 'count the lines in the given file')
//.alias('f', 'file')
//.global('file')
//.nargs('f', 1)
//.describe('f', 'Load a file')
//.demand(1, ['f'])
//.help('h')
//.alias('h', 'help')
//.epilog('copyright 2015')
//.argv;

//var fs = require('fs');
//console.log(argv)
//var s = fs.createReadStream(argv.file);

//var lines = 0;
//s.on('data', function (buf) {
//lines += buf.toString().match(/\n/g).length;
//});

//s.on('end', function () {
//console.log(lines);
//});

var c = l.parse('div.x{color:#fff}');
console.log(c);