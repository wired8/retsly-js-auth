'use strict';

/**
 * Dependencies
 */

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

describe('retsly-js-auth', function () {

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
  beforeEach(function () {
    retsly = new mockRetsly;
    Auth = require('retsly-js-auth')(retsly);
    $('body').append('<div class="tests"></div>');
  });

  // clean up
  afterEach(function () {
    $('.tests').remove();
  });

  it('cannot be required without injecting retsly', function (done) {
    assert.throws(function () {
      require('retsly-js-auth')();
    });
    done();
  });

  it('will fail without passing a redirect_uri', function (done) {
    var fail = { redirect_uri: null, authorized: function () {
    } };
    assert.throws(function () {
      new Auth(fail);
    });
    done();
  });

  it("will fail without passing an 'authorized' function", function (done) {
    var fail = { redirect_uri: 'www.arbitrary.com/callback', authorized: null }
    assert.throws(function () {
      new Auth(fail);
    });
    done();
  });

  it('include an initialize function', function (done) {
    retsly = new mockRetsly;
    Auth = require('retsly-js-auth')(retsly);
    $('body').append('<div class="tests"></div>');
    var auth = new Auth(options);
    assert('function' == typeof auth.initialize);
    done();
  });

  it('include an dialog function', function (done) {
    var auth = new Auth(options);
    assert('function' == typeof auth.dialog);
    done();
  });

  it('include an render function', function (done) {
    var auth = new Auth(options);
    assert('function' == typeof auth.render);
    done();
  });

  it('- authorized function is called', function (done) {
    options.authorized = function () {
      this.selector = '.authorized-function';
    };
    var auth = new Auth(options);
    window.postMessage({token: 'mockToken', redirectURI: 'message'}, window.location.origin);
    assert(auth.options.selector === '.authorized-function');
    done();
  });

});
