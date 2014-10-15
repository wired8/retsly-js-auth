
/**
 * Dependencies
 */
var _ = require('underscore');
var $ = require('jquery');

// Construct a mock retsly-js-sdk isntance
var f = function(){
  this.token = null;
};
f.getUserToken = function(){ return 'xxx'; };
f.get = function (url, obj, cb) {
  cb('mocked response');
};

f.getDomain = function() { return window.location.origin; };
f.getClient = function() { return 'yyy'; };
f.setUserToken = function(token) { this.token = token; };
f.getUserToken = function() { console.log('getUserToken this.token: '); return true; };

var Auth = require('retsly-js-auth')(f);
var Backbone = require('backbone');
Backbone.$ = window.$;

var assert = require('assert');


/**
 * Tests
 */
var options;

beforeEach(function(){
  options = {
    el: '.tests',
    redirect_uri: 'www.something.com/callback',
    selector: '.arbitrary',
    authorized: function (obj) { console.log('alert!', obj, this); }
  };
});


suite('Auth component');
test('cannot be required without injecting retsly', function() {
  assert.throws(function() {
    require('retsly-js-auth')();
  });
});


suite('Auth component instantiation');
test('will fail without passing a redirect_uri', function () {
  var fail = delete options.redirect_uri;
  assert.throws(function() {
    new Auth(fail);
  });
});

test("will fail without passing an 'authorized' function", function () {
  var fail = delete options.authorized;
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
test('- opens a dialog window on click', function() {
  var auth = new Auth(options);
  $('.tests').click();
  assert(auth.dialog.opener.location.pathname === window.location.pathname);
  auth.dialog.close();
});
