'use strict';

var _index = require('../lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test Suite', () => {

  var lth = new _index2.default();
  let input = 'div.x{color:#fff}';
  let result = "<div class=''><div class='x'></div></div>";
  let result2 = {
    'selectors': null,
    'rules': [{
      'selectors': [{
        'elements': [{
          'combinator': {
            'value': '',
            'emptyOrWhitespace': true
          },
          'value': 'div',
          'index': 0,
          'currentFileInfo': {
            'filename': 'input',
            'rootpath': '',
            'currentDirectory': '',
            'entryPath': '',
            'rootFilename': 'input'
          }
        }, {
          'combinator': {
            'value': '',
            'emptyOrWhitespace': true
          },
          'value': '.x',
          'index': 3,
          'currentFileInfo': {
            'filename': 'input',
            'rootpath': '',
            'currentDirectory': '',
            'entryPath': '',
            'rootFilename': 'input'
          }
        }],
        'currentFileInfo': {
          'filename': 'input',
          'rootpath': '',
          'currentDirectory': '',
          'entryPath': '',
          'rootFilename': 'input'
        },
        'evaldCondition': true
      }],
      'rules': [{
        'name': [{
          'value': 'color'
        }],
        'value': {
          'value': [{
            'value': [{
              'rgb': [255, 255, 255],
              'alpha': 1,
              'value': '#fff'
            }]
          }]
        },
        'important': '',
        'merge': false,
        'index': 6,
        'currentFileInfo': {
          'filename': 'input',
          'rootpath': '',
          'currentDirectory': '',
          'entryPath': '',
          'rootFilename': 'input'
        },
        'inline': false,
        'allowRoot': true
      }],
      '_lookups': {},
      'allowRoot': true
    }],
    '_lookups': {},
    'allowRoot': true,
    'root': true,
    'firstRoot': true
  };
  beforeEach(function () {
    console.log('start');
  });

  it('should be a instance of LessToHtml', () => {
    expect(lth instanceof _index2.default).toBeTruthy();
  });
  it('should be parse correct', () => {
    lth.parse(input).then(data => {
      expect(data).toEqual(result);
    });
  });

  //describe('when song has been paused', function() {
  //beforeEach(function() {
  //player.play(song);
  //player.pause();
  //});

  //it('should indicate that the song is currently paused', function() {
  //expect(player.isPlaying).toBeFalsy();

  //// demonstrates use of 'not' with a custom matcher
  //expect(player).not.toBePlaying(song);
  //});

  //it('should be possible to resume', function() {
  //player.resume();
  //expect(player.isPlaying).toBeTruthy();
  //expect(player.currentlyPlayingSong).toEqual(song);
  //});
  //});

  //// demonstrates use of spies to intercept and test method calls
  //it('tells the current song if the user has made it a favorite', function() {
  //spyOn(song, 'persistFavoriteStatus');

  //player.play(song);
  //player.makeFavorite();

  //expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  //});

  ////demonstrates use of expected exceptions
  //describe('#resume', function() {
  //it('should throw an exception if song is already playing', function() {
  //player.play(song);

  //expect(function() {
  //player.resume();
  //}).toThrowError('song is already playing');
  //});
  //});
});