# retsly-js-auth [![wercker status](https://app.wercker.com/status/42df0af2803ce85acb8680f9bde1b9e4/s "wercker status")](https://app.wercker.com/project/bykey/42df0af2803ce85acb8680f9bde1b9e4)

  A third party authentication and verification component built on Retsly

## Demo

  ![Example](https://raw.github.com/Retsly/retsly-js-auth/master/examples/example.gif)

## Installation

  Install with [component.io](http://github.com/component/component):

    $ component install Retsly/retsly-js-auth

## API

The Retsly Auth Component requires a constructed instance of the Retsly
SDK. You should inject into the module as shown below:

```javascript

  var retsly = new Retsly(YOUR_CLIENT_ID, YOUR_JS_TOKEN);
  var Auth = require('retsly-js-auth')(retsly);

  new Auth({
    selector: '.login', // Target Dom Element
    redirect_uri: 'http://website.com/callback',
    authorized: function(data) {
      console.log('Authorized');
    }
  });

```

The first time a user signs up they must pass activation and verification.

Your app should subscribe to all three events and wait until `data.bundle` indicates
that the user has an active status and has been verified.

### Repo Owner
---
[@switters](https://github.com/switters)

## License

(The MIT License)

Copyright (c) 2013 Retsly Software Inc <support@rets.ly>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
