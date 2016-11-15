'use strict';
const fs = require('fs');
const less = require('less');
var input;
fs.readFile('./s.less', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  }
  less.parse(data, (e, tree) => {
    var visit = function(o) {
      // Attaches the node type to the necessary objects
      for (var p in o) {
        if (typeof o[p] == 'object') visit(o[p]);
      }
      if (o != null && o != "") {
        if ("type" in o) o["class"] = o.type;
      }
    };
    visit(tree)
    generateHTML(tree);
  });
});
const generateHTML = (tree) => {
  let dom = iterateNodes(tree);
  let html = render(dom);
  console.log(html);
  fs.writeFile('output.html', html, err => {
    if (err) throw err;
    console.log('生成完毕');
  });
}
const render = (dom) => {
  var tag = renderTag(dom);
  return tag;
}
const renderTag = (dom) => {
  var tag = dom.tag;
  return ["<" + tag.name + " class='" + tag.className.join(" ") + "'>",
    dom.children.length > 0 ?
    (dom.children.map(child => {
      return renderTag(child);
    })).join("") : "", "</" + tag.name + ">"
  ].join("");
};
const getTag = (node) => {
  return node.selectors ? buildTag(node.selectors[0].elements) : {
    "name": "div",
    "className": []
  };
}
const buildTag = (elements) => {
  let tag = {};
  tag.name = elements[0].value;
  tag.className = [];
  for (var index = 1; index < elements.length; elements++) {
    tag.className.push(elements[index].value.replace('.', ''));
  }
  return tag;
}
const getChildren = (node) => {
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
}
const notDomNode = (str) => {
  const escape = ['&'];
  if (escape.join("").indexOf(str) > -1) {
    return true;
  }
  return false;
}
const iterateNodes = (tree) => {
  var node = {};
  node.tag = getTag(tree);
  node.children = getChildren(tree);
  return node;
}

