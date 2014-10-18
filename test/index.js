
/**
 * Dependencies
 */
var _ = require('underscore');
var $ = require('jquery');

// Construct a mock retsly-js-sdk isntance
var mockRetsly = function(){};
mockRetsly.prototype.get = function (url, obj, cb) { cb('mocked response'); };
mockRetsly.prototype.getDomain = function() { return window.location.origin + ':'; };
mockRetsly.prototype.getClient = function() { return 'yyy'; };
mockRetsly.prototype.setUserToken = function() {};
mockRetsly.prototype.getUserToken = function() { return true; };
mockRetsly.prototype.io = { on: function(){} };

var Backbone = require('backbone');
Backbone.$ = window.$;
var assert = require('assert');


/**
 * Tests
 */
var Auth, retsly;
var options = {
  el: '.tests',
  redirect_uri: 'www.something.com/callback',
  selector: '.arbitrary',
  authorized: function (obj) { this.selector = '.authorized-function'; }
};

// set up
beforeEach(function(){
  retsly = new mockRetsly;
  Auth = require('retsly-js-auth')(retsly);
  $('body').append('<div class="tests"></div>');
});

// clean up
afterEach(function(){
  $('.tests').remove();
});


suite('Auth component');
test('cannot be required without injecting retsly', function() {
  assert.throws(function() {
    require('retsly-js-auth')();
  });
});


suite('Auth component instantiation');
test('will fail without passing a redirect_uri', function () {
  var fail = { redirect_uri: null, authorized: function(){} }
  assert.throws(function() {
    new Auth(fail);
  });
});

test("will fail without passing an 'authorized' function", function () {
  var fail = { redirect_uri: 'www.arbitrary.com/callback', authorized: null }
  assert.throws(function() {
    new Auth(fail);
  });
});


suite('Auth component internals');
test('include an initialize function', function() {
  var auth = new Auth(options);
  assert('function' == typeof auth.initialize);
});

test('include an dialog function', function() {
  var auth = new Auth(options);
  assert('function' == typeof auth.dialog);
});

test('include an render function', function() {
  var auth = new Auth(options);
  assert('function' == typeof auth.render);
});



suite('Auth component behaviour');
/*
 *test('- opens a dialog window on click', function() {
 *  var auth = new Auth(options);
 *  $('.tests').click();
 *  assert(auth.dialog.opener.location.pathname === window.location.pathname);
 *});
 */

test('- authorized function is called', function() {
  options.authorized = function(){ this.selector = '.authorized-function'; }
  var auth = new Auth(options);
  window.postMessage({token: 'mockToken', redirectURI: 'message'}, window.location.origin);
  assert(auth.options.selector === '.authorized-function');
});
