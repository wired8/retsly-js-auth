<pre>
                          ,------.        ,--.       ,--.
                          |  .--. ',---.,-'  '-.,---.|  ,--. ,--.
                          |  '--'.| .-. '-.  .-(  .-'|  |\  '  /
                          |  |\  \\   --. |  | .-'  `|  | \   '
                          `--' '--'`----' `--' `----'`--.-'  /
                            Make Real Estate Apps in    `---'
                               Minutes Not Months

</pre>

# retsly-js-auth

  A auth component built on Retsly

## Demo
  
  [![ScreenShot](http://content.screencast.com/users/slajax/folders/Jing/media/5ed0bf99-d34b-4728-bfd1-cc578ccee711/00000080.png)](http://screencast.com/t/DUy1Se84qdI)

## Installation

  Install with [component.io](http://github.com/component/component):

    $ component install Retsly/retsly-js-auth

## API

The Retsly Auth Component requires a constructed instance of the Retsly
SDK. You should inject into the module as shown below:

```javascript
  var retsly = new Retsly(YOUR_API_KEY, { debug: true });
  var Auth = require('retsly-js-auth')(retsly);
  new Auth({
    target: '#register', // Target Dom Element
    flow: 'register', // register || login
    role: 'realtor', // realtor || developer || consumer
    authorized: function(data) {
      console.log('Authorized');
    },
    activated: function(data) {
      console.log('Activated');
    },
    verified: function(data) {
      console.log('Verified');
    }
  });

```

The first time a user signs up they must pass activation and verification.

Your app should subscribe to all three events and wait until `data.bundle` indicates
that the user has an active status and has been verified.

## License

(The MIT License)

Copyright (c) 2013 Kyle Campbell <mail@slajax.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
