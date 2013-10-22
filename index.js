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

        if(!options.authorized)
          throw new Error('Retsly Auth Component must have atleast an authorized callback. {authorized:[Function]}');

        if(!options.target)
          throw new Error('Retsly Auth Component is a subview and must have a target: `{target:this}`');

        if(window.opener) return;

        var self = this;
        retsly.io.emit('authorize', function(data) {
          if(data.success && options.authorized && typeof options.authorized === 'function')
            return options.authorized(data);

          self.$el.html('<img src="http://'+retsly.host+'/images/retsly_dark_sm.png" />');
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
        this.$el.appendTo(this.options.target);
      }
    });

    return Component;

>>>>>>> Stashed changes
  };

})();

