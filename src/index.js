'use strict'
import fs from 'fs'
import less from 'less'

export default class LessToHtml {
  constructor(opts) {
    this.opts = {}
    Object.assign(this.opts, opts)
  }
  visit(o) {
    for (var i in o) {
      (typeof o[i]) === 'object' ? this.visit(o[i]): void(0)
    }
    o !== null && o !== "" & ("type" in o) ? o["class"] = o.type : void(0)
    return o
  }
  /**
   * dom structure
   * {
   *  tag:{
   *    name:'name',
   *    className:['a','b','c']
   *    children:[.......]
   *  }
   * }
   */
  renderTag(dom) {
    var tag = dom.tag
    //var temp= ["<" + tag.name + " class='" + tag.className.join(" ") + "'>", (dom.children&&dom.children.length > 0) ? (dom.children.map(child => { return this.renderTag(child)})).join("") : "", "</" + tag.name + ">" ]
    let re=`<${tag.name?tag.name:"div"} class='${tag.className?tag.className.join(" "):""}'>`
    let body=(dom.children&&dom.children.length > 0) ? (dom.children.map(child => { return this.renderTag(child)})).join("") : "";
    let er=`</${tag.name?tag.name:"div"}>`
    return re+body+er
  }

  getTag(node) {
    return node.selectors ? this.buildTag(node.selectors[0].elements) : {
      "name": "div",
      "className": []
    }
  }
  buildTag(elements) {
    let tag = {}
    tag.name = elements[0].value
    tag.className = []
    for (var index = 1; index < elements.length; elements++) {
      tag.className.push(elements[index].value.replace('.', ''))
    }
    return tag
  }
  getChildren(node) {
    let result = []
    if (node.rules && node.rules.length > 0) {
      node.rules.map(rule => {
        if (rule.name || rule.class !== "Ruleset" || this.notDomNode(rule.selectors[0].elements[0].value)) {
          return
        } else {
          let node = {}
          node.children = []
          node.tag = this.getTag(rule)
          node.children = this.getChildren(rule)
          result.push(node)
        }
      })
    }
    return result
  }
  notDomNode(str) {
    const escape = ['&']
    if (escape.join("").indexOf(str) > -1) {
      return true
    }
    return false
  }
  iterateNodes(tree) {
    var node = {}
    node.tag = this.getTag(tree)
    node.children = this.getChildren(tree)
    return node
  }
  parse(data) {
    return new Promise((resolve, reject) => {
      less.parse(data, (e, tree) => {
        if(e){
          reject();
        }
        let html = this.renderTag(this.iterateNodes(this.visit(tree)));
        resolve(html);
      })
    });
  }
}

