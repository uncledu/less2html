'use strict';

var _index = require('../lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test Suite', () => {

  var lth = new _index2.default();
  let input = 'div.x{color:#fff}';
  let result = "<div class=''><div class='x'></div></div>";
  let inputTree = {
    'a': {
      'type': 'a',
      'b': {
        'type': 'b'
      }
    }
  };
  let expectTree = {
    'a': {
      'type': 'a',
      'class': 'a',
      'b': {
        'type': 'b',
        'class': 'b'
      }
    }
  };
  beforeEach(function () {
    //console.log('start')
  });

  it('should be a instance of LessToHtml', () => {
    expect(lth instanceof _index2.default).toBeTruthy();
  });

  it('should be parse correct', () => {
    lth.parse(input).then(data => {
      expect(data).toEqual(result);
    });
  });

  it('should visit tree correct', () => {
    expect(lth.visit(inputTree)).toEqual(expectTree);
  });

  describe('should renderTag correct', () => {
    let inputDom = {
      'tag': {
        'name': 'div',
        'className': ['a', 'b']
      },
      'children': [{
        'tag': {
          'name': 'a',
          'className': ['c', 'd']
        },
        'children': [{
          'tag': {
            'name': 'p',
            'className': ['e', 'f']
          }
        }]
      }, {
        'tag': {
          'name': 'span',
          'className': []
        }
      }]
    };
    let inputDom2 = {
      'tag': {
        'name': 'div',
        'className': ['a', 'b']
      },
      'children': [{
        'tag': {
          'name': 'a',
          'className': ['c', 'd']
        },
        'children': [{
          'tag': {
            'name': 'p',
            'className': ['e', 'f']
          }
        }]
      }, {
        'tag': {
          'name': 'span'
        }
      }]
    };
    let inputDom3 = {
      'tag': {
        'name': 'div',
        'className': ['a', 'b']
      },
      'children': [{
        'tag': {
          'name': 'a',
          'className': ['c', 'd']
        },
        'children': [{
          'tag': {
            'name': 'p',
            'className': ['e', 'f']
          }
        }]
      }, {
        'tag': {}
      }]
    };
    let expectDom = `<div class='a b'><a class='c d'><p class='e f'></p></a><span class=''></span></div>`;
    let expectDom3 = `<div class='a b'><a class='c d'><p class='e f'></p></a><div class=''></div></div>`;

    it('should renderTag correct', () => {
      expect(lth.renderTag(inputDom)).toEqual(expectDom);
    });
    it('should renderTag correct', () => {
      expect(lth.renderTag(inputDom2)).toEqual(expectDom);
    });
    it('should renderTag correct', () => {
      expect(lth.renderTag(inputDom3)).toEqual(expectDom3);
    });
  });
});