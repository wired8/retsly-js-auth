/*
 * Retsly Auth Component
 * Requires Retsly SDK (Full hosted SDK including _, $, BB)
 */

var Backbone = require('backbone');
var Retsly = require('retsly-sdk');

Retsly.Auth = module.exports = exports = function(retsly) { // Retsly Dependency Injection

  if(!retsly || typeof retsly === 'undefined')
    throw new Error('Retsly Auth Component requires an instance of the Retsly constructor. require("retsly-auth")(retsly)');

  var Component = Backbone.View.extend({
    tagName: 'button',
    className: 'btn btn-default retsly-login',
    events: {
      'click': 'dialog'
    },
    initialize: function(options) {
      this.options = _.extend({ client_id: false, redirect_uri: false, authorized: false }, options);

      if(!options.redirect_uri)
        throw new Error('Retsly Auth Component must have a redirect_uri. {redirect_uri:"xxxx"}');

      if(!options.authorized)
        throw new Error('Retsly Auth Component must have an authorized() callback. {authorized:[Function]}');

      if(window.opener) return;

      var self = this;
      retsly.io.emit('session', function(data) {
        if(options.authorized && typeof options.authorized === 'function')
          options.authorized(data);
      });

      if(self.options.selector) {
        $(document).on('click', self.options.selector, function(e) {
          e.preventDefault();
          self.$el.trigger('click');
        });
      }

      window.addEventListener('message',function(event) {
        var domain = removePort(retsly.getDomain());
        if(event.origin !== domain || !event.data.token || !event.data.redirectURI) return;
        retsly.setToken(event.data.token);
        retsly.get('/api/v1/user/me',{}, function(res){
          if (!res.success){
            throw new Error(res.bundle);
          }else{
            if(options.authorized && typeof options.authorized === 'function')
              options.authorized(res, event.data.redirectURI);
          }
        });
      },false);

    },
    dialog: function() {

      var url = retsly.getDomain()+'/oauth/authorize';
          url+= '?client_id='+retsly.getClient();
          url+= '&redirect_uri='+this.options.redirect_uri;
          url+= '&response_type=code';
          url+= '&dialog=true';

      this.dialog = window.open(url, '',
        'location=0,status=0,scrollbars=1,menubar=0,toolbar=0,width=650,height=450,left=200,top=200'
      );

    },
    render: function() {
      var self = this;
      if(this.options.target) this.$el.appendTo(this.options.target);
    }
  });

  return Component;

};

// remove the port # from retsly.domain() to test vs event.origin
function removePort(domain){
  var lastColon = domain.lastIndexOf(':');
  if (lastColon !== -1)
    return domain.substring(0, lastColon);
  else
    return domain;
}


