/*
 * Retsly Auth Component
 * Requires Retsly SDK (Full hosted SDK including _, $, BB)
 */

if(typeof Retsly !== 'undefined') {

  Retsly.Views.Auth = module.exports = exports = (function() {
    return function(retsly) { // Retsly Dependency Injection

      if(typeof retsly === 'undefined')
        throw new Error('Retsly.Views.Auth requires an instance of the Retsly constructor. require("retsly-js-auth")(retsly)');

      var Component = Backbone.View.extend({
        tagName: 'a',
        className: 'btn retsly-js-login',
        events: {
          'click': 'dialog'
        },
        initialize: function(options) {

          if(!options.authorized)
            throw new Error('Retsly.Views.Auth must have atleast an authorized callback. {authorized:[Function]}');

          if(typeof options == "undefined" || !options.target)
            throw new Error('Retsly.Views.Auth is a subview and must have a target: `{target:this}`');

          this.options = _.extend({ flow: 'register', role: 'realtor' }, options);

          if(window.opener) return;

          var self = this;
          retsly.io.emit('authorize', { sid: retsly.getCookie('retsly.sid') }, function(data) {
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

          var url = 'http://'+retsly.host+'/'+this.options.flow;
          if(this.options.role === 'realtor') url += '/realtor';
          url += '?external=true&sid='+retsly.getCookie('retsly.sid')

          this.dialog = window.open(url, '',
            'location=0,status=0,scrollbars=1,menubar=0,toolbar=0,width=650,height=650,left=200,top=200'
          );

        },
        render: function() {
          this.$el.appendTo(this.options.target);
        }
      });

      return Component;

    };

  })();

} else {
  module.exports = exports = function(){
    return; // NOOP.
  };
}
