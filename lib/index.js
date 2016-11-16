'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _less = require('less');

var _less2 = _interopRequireDefault(_less);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LessToHtml {
  constructor(opts) {
    this.opts = {};
    Object.assign(this.opts, opts);
  }
  visit(o) {
    for (var i in o) {
      typeof o[i] === 'object' ? this.visit(o[i]) : void 0;
    }
    o !== null && o !== "" & "type" in o ? o["class"] = o.type : void 0;
    return o;
  }
  renderTag(dom) {
    var tag = dom.tag;
    return ["<" + tag.name + " class='" + tag.className.join(" ") + "'>", dom.children.length > 0 ? dom.children.map(child => {
      return this.renderTag(child);
    }).join("") : "", "</" + tag.name + ">"].join("");
  }
  getTag(node) {
    return node.selectors ? this.buildTag(node.selectors[0].elements) : {
      "name": "div",
      "className": []
    };
  }
  buildTag(elements) {
    let tag = {};
    tag.name = elements[0].value;
    tag.className = [];
    for (var index = 1; index < elements.length; elements++) {
      tag.className.push(elements[index].value.replace('.', ''));
    }
    return tag;
  }
  getChildren(node) {
    let result = [];
    if (node.rules && node.rules.length > 0) {
      node.rules.map(rule => {
        if (rule.name || rule.class !== "Ruleset" || this.notDomNode(rule.selectors[0].elements[0].value)) {
          return;
        } else {
          let node = {};
          node.children = [];
          node.tag = this.getTag(rule);
          node.children = this.getChildren(rule);
          result.push(node);
        }
      });
    }
    return result;
  }
  notDomNode(str) {
    const escape = ['&'];
    if (escape.join("").indexOf(str) > -1) {
      return true;
    }
    return false;
  }
  iterateNodes(tree) {
    var node = {};
    node.tag = this.getTag(tree);
    node.children = this.getChildren(tree);
    return node;
  }
  parse(data, callback) {
    _less2.default.parse(data, (e, tree) => {
      let html = this.renderTag(this.iterateNodes(this.visit(tree)));
      console.log(html);
      callback(html);
    });
  }
}
exports.default = LessToHtml;