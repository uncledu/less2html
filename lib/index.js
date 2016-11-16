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
  parse(data) {
    _less2.default.parse(data, (e, tree) => {
      let visit = o => {
        for (var i in o) {
          typeof o[i] === 'object' ? visit(o[i]) : void 0;
        }
        o !== null && o !== "" & "type" in o ? o["class"] = o.type : void 0;
        return o;
      };

      const renderTag = dom => {
        var tag = dom.tag;
        return ["<" + tag.name + " class='" + tag.className.join(" ") + "'>", dom.children.length > 0 ? dom.children.map(child => {
          return renderTag(child);
        }).join("") : "", "</" + tag.name + ">"].join("");
      };

      const getTag = node => {
        return node.selectors ? buildTag(node.selectors[0].elements) : {
          "name": "div",
          "className": []
        };
      };

      const buildTag = elements => {
        let tag = {};
        tag.name = elements[0].value;
        tag.className = [];
        for (var index = 1; index < elements.length; elements++) {
          tag.className.push(elements[index].value.replace('.', ''));
        }
        return tag;
      };
      const getChildren = node => {
        let result = [];
        if (node.rules && node.rules.length > 0) {
          node.rules.map(rule => {
            if (rule.name || rule.class !== "Ruleset" || notDomNode(rule.selectors[0].elements[0].value)) {
              return;
            } else {
              let node = {};
              node.children = [];
              node.tag = getTag(rule);
              node.children = getChildren(rule);
              result.push(node);
            }
          });
        }
        return result;
      };
      const notDomNode = str => {
        const escape = ['&'];
        if (escape.join("").indexOf(str) > -1) {
          return true;
        }
        return false;
      };
      const iterateNodes = tree => {
        var node = {};
        node.tag = getTag(tree);
        node.children = getChildren(tree);
        return node;
      };
      let html = renderTag(iterateNodes(visit(tree)));
      console.log(html);
      return html;
    });
  }
}
exports.default = LessToHtml;