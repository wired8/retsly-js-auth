
/**
 * Dependencies
 */
var Retsly = require('retsly-js-sdk');
var Auth = require('retsly-js-auth');
var assert = require('assert');

// requires a retsly instance
// must have a redirectURI
// must have an authorized cb
//
// test the returned component

// && muchmuch
// moar!


/**
 * Tests
 */
suite('Auth')
test('cannot be required without instantiated retsly', function() {
  assert.throws(function() {
    require('retsly-js-auth')()
  });
});
