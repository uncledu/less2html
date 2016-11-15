'use strict'
let less = require('less')
let fs = require('fs')
let path = require('path')
module.exports = {
  parse: function(src, isStdin) {
    // Parses a Less file and outputs its AST
    let visit = function(o) {
      // Attaches the node type to the necessary objects
      for (let p in o) {
        if (typeof o[p] == 'object') visit(o[p])
      }
      if (o != null && o != "") {
        if ("type" in o) o["class"] = o.type
      }
    }
    let code = src
    let options = {}
    if (!isStdin) {
      code = fs.readFile(src, 'utf8').toString()
      options = {
        filename: path.resolve(src)
      }
    }
    return less.parse(code, options, function(e, tree) {
      if (!e) {
        visit(tree)
        return tree
      } else {
        e.class = "error"
        console.log(JSON.stringify(e))
      }
    })
  }
}

