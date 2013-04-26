/*
 * jquery.checkallbox
 * https://github.com/liveline/jquery-checkallbox
 *
 * Copyright (c) 2013 James Bebbington
 * Licensed under the MIT license.
 */

(function($) {

  var pluginName = 'checkallbox';

  /**
   * Create a new Plugin instance
   *
   * @constructor
   * @param {String|Object} element A selector that references, or HTML DOM node instance of, a checkbox element that you want to use as a checkallbox
   * @param {Object} options Plugin options
   * @see $.fn.checkallbox.options
   */
  function Plugin(element, options) {
    this._name       = pluginName;
    this.checkallbox = $(element);
    this.options     = $.extend({}, $.fn[pluginName].options, options) ;

    this.init();
  }

  Plugin.prototype = {

    /**
     * Initialize Plugin
     */
    init: function() {

      // Find parent scope element for this checkallbox
      this.scope = this.checkallbox.parents(this.options.scope);

      // Attach single, delegated, namespaced event handler to `scope` element
      this.scope.on('change.checkallbox', ':checkbox', $.proxy(function(event) {
        if ($(event.target).is(this.checkallbox)) {
          this._updateCheckboxes();
        } else {
          this._updateCheckallbox();
        }
      }, this));

      // Set initial state of checkallbox
      this._updateCheckallbox();
    },

    /**
     * Find all enabled checkboxes in the current scope
     *
     * This is called each time we update check(all)boxes' state so that we
     * pick up any DOM changes that may have occurred since instantiation
     *
     * @return {Object} jQuery collection of checkboxes
     */
    _findCheckboxes: function() {
      return this.scope.find(':checkbox').not(this.checkallbox).filter(':enabled');
    },

    /**
     * Update checkallbox properties based on its enabled checkboxes' properties
     */
    _updateCheckallbox: function() {
      var checkboxes = this._findCheckboxes();
      this.checkallbox.prop('checked',  checkboxes.length > 0 && checkboxes.not(':checked').length === 0);
      this.checkallbox.prop('disabled', checkboxes.length === 0);
      this.checkallbox.prop('indeterminate', checkboxes.filter(':checked').length > 0 && checkboxes.not(':checked').length > 0);
    },

    /**
     * Update checkboxes' properties based on their enabled checkallbox's properties
     */
    _updateCheckboxes: function() {
      var checkboxes = this._findCheckboxes();
      checkboxes.prop('checked', this.checkallbox.prop('checked'));
      checkboxes.prop('indeterminate', false);
    }
  };

  /**
   * Expose _updateCheckallbox() in public API as $.fn.checkallbox('update')
   *
   * @example
   * // Manually update checkallbox state;
   * // use this if you've modified the checkboxes in some way and the checkallbox is now out of sync
   * $("<input type='checkbox'").checkallbox('update');
   */
  Plugin.prototype.update =  Plugin.prototype._updateCheckallbox;

  /**
   * Plugin instantiation and method calling boilerplate
   *
   * @example
   * $("<input type='checkbox'").checkallbox({scope: 'fieldset'});
   *
   * @return {Object} jQuery collection
   */
  $.fn[pluginName] = function(options) {
    var args   = arguments;
    var method = (options === undefined || typeof options === 'object') ? 'init' : options;

    if (method === 'init') {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    } else {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (method[0] !== '_' && instance instanceof Plugin && typeof instance[options] === 'function') {
          instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        } else {
          $.error("Method '" +  options + "' does not exist on " + pluginName);
        }
      });
    }
  };

  /**
   * Default plugin options
   *
   * Update $.fn.checkallbox.options to change the default options of each instance of plugin
   *
   * @property {String} scope The parent element that encompasses the domain of this checkallbox
   */
  $.fn.checkallbox.options = {
    scope: 'form'
  };

}(jQuery));
