/*! jQuery.checkallbox - v1.1.0 - 2013-01-29
* http://liveline.github.com/jquery-checkallbox/
* Copyright (c) 2013 James Bebbington; Licensed MIT */

(function($) {

  $.fn.checkallbox = function(opts) {
    opts = $.extend({}, $.fn.checkallbox.options, opts);

    return this.each(function() {
      var $checkallbox = $(this);
      var $scope       = $checkallbox.parents(opts.scope);
      var $checkboxes  = $scope.find(':checkbox').not($checkallbox);

      // Attach event handler
      $scope.on('change', ':checkbox', function(event) {
        var $enabled = $checkboxes.filter(':enabled');

        if ($(event.target).is($checkallbox) && !event.initial) {
          // Checkallbox changed
          $enabled.prop('checked', $checkallbox.prop('checked'));
        } else {
          // Initial state or checkbox changed
          $checkallbox.prop('checked',  $enabled.length > 0 && $enabled.not(':checked').length === 0);
          $checkallbox.prop('disabled', $enabled.length === 0);
        }
      });

      // Set initial state of checkallbox
      $scope.trigger(jQuery.Event('change', {target: $checkallbox[0], initial: true}));
    });
  };

  $.fn.checkallbox.options = {
    scope: 'form'
  };

}(jQuery));
