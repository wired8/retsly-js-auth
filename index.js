/*
 * Retsly Auth Component
 * Requires Retsly SDK (Full hosted SDK including _, $, BB)
 */

module.exports = exports = (function() {
  return function(retsly) { // Retsly Dependency Injection

    if(!retsly || typeof retsly === 'undefined')
      throw new Error('Retsly Auth Component requires an instance of the Retsly constructor. require("retsly-js-auth")(retsly)');

    var Component = Backbone.View.extend({
      tagName: 'button',
      className: 'btn btn-default retsly-js-login',
      events: {
        'click': 'dialog'
      },
      initialize: function(options) {

        this.options = _.extend({ client_id: false, redirect_uri: false, authorized: false }, options);

        if(!options.client_id)
          throw new Error('Retsly Auth Component must have a client_id. {client_id:"xxxx"}');

        if(!options.redirect_uri)
          throw new Error('Retsly Auth Component must have a redirect_uri. {redirect_uri:"xxxx"}');

        if(!options.authorized && !options.authResponse)
          throw new Error('Retsly Auth Component must have an authorized() or authResponse() callback. {authorized:[Function], authResponse:[Function]}');

        // A target isn't required
        //if(!options.target)
        //  throw new Error('Retsly Auth Component is a subview and must have a target: `{target:this}`');

        if(window.opener) return;

        var self = this;
        retsly.io.emit('authorize', function(data) {
          // authResponse() callback is called regardless of success/failure outcome; we can rely on it's completion
          if(options.authResponse && typeof options.authResponse === 'function')
            options.authResponse(data.bundle);

          if(data.success && options.authorized && typeof options.authorized === 'function')
            return options.authorized(data);

          self.$el.html('<img src="http://'+retsly.host+'/images/retsly_login.png" />');
          self.render();
        });
        retsly.io.on('authorized', function(data) {
          if(options.authorized && typeof options.authorized === 'function')
            options.authorized(data)
        });
        retsly.io.on('activated', function(data) {
          if(options.activated && typeof options.activated === 'function')
            options.activated(data)
        });
        retsly.io.on('verified', function(data) {
          if(options.verified && typeof options.verified === 'function')
            options.verified(data)
        });

      },
      dialog: function() {

        var url = 'http://'+retsly.host+'/oauth/authorize';
            url+= '?client_id='+this.options.client_id;
            url+= '&redirect_uri='+this.options.redirect_uri;
            url+= '&response_type=code';
            url+= '&dialog=true';

        this.dialog = window.open(url, '',
          'location=0,status=0,scrollbars=1,menubar=0,toolbar=0,width=650,height=650,left=200,top=200'
        );

      },
      render: function() {
        var self = this;
        if(this.options.target) this.$el.appendTo(this.options.target);

        // Pass in a jQuery selector to bind element(s) to the dialogue flow
        if(this.options.selector) {
          $(this.options.selector).on('click', function(e) {
            e.preventDefault();
            self.$el.trigger('click');
          });
        }
      }
    });

    return Component;

  };

})();

