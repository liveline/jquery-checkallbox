/*
 * jquery.checkallbox
 * https://github.com/liveline/jquery-checkallbox
 *
 * Copyright (c) 2013 James Bebbington
 * Licensed under the MIT license.
 */

(function($) {

  var pluginName = 'checkallbox';

  function Plugin(element, options) {
      this._name       = pluginName;
      this.checkallbox = $(element);
      this.options     = $.extend({}, $.fn[pluginName].options, options) ;

      this.init();
  }

  Plugin.prototype = {

      init: function() {

        // Grab reference to `this` for use in event handler
        var self = this;

        // Find `scope` element; the parent element that encompasses the domain of this checkallbox
        // Find `checkboxes` to which this checkallbox is related
        self.scope      = self.checkallbox.parents(self.options.scope);
        self.checkboxes = self.scope.find(':checkbox').not(self.checkallbox);

        // Attach single, delegated, namespaced event handler to `scope` element
        self.scope.on('change.checkallbox', ':checkbox', function(event) {

          // Find `enabled` checkboxes; disabled checkboxes are ignored
          self.enabled = self.checkboxes.filter(':enabled');

          if ($(event.target).is(self.checkallbox) && !event.initial) {
            // Checkallbox changed
            self.enabled.prop('checked', self.checkallbox.prop('checked'));
          } else {
            // Initial state or checkbox changed
            self.checkallbox.prop('checked',  self.enabled.length > 0 && self.enabled.not(':checked').length === 0);
            self.checkallbox.prop('disabled', self.enabled.length === 0);
          }
        });

        // Set initial state of checkallbox
        self.scope.trigger(jQuery.Event('change.checkallbox', {target: self.checkallbox[0], initial: true}));
      }

  };

  $.fn[pluginName] = function(options) {
      var args = arguments;
      if (options === undefined || typeof options === 'object') {
          return this.each(function() {
              if (!$.data(this, 'plugin_' + pluginName)) {
                  $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
              }
          });
      } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
          return this.each(function () {
              var instance = $.data(this, 'plugin_' + pluginName);
              if (instance instanceof Plugin && typeof instance[options] === 'function') {
                  instance[options].apply(instance, Array.prototype.slice.call(args, 1));
              }
          });
      }
  };

  $.fn.checkallbox.options = {
    scope: 'form'
  };

}(jQuery));
