/*! jQuery.checkallbox - v1.0.1 - 2013-01-24
* http://liveline.github.com/jquery-checkallbox/
* Copyright (c) 2013 James Bebbington; Licensed MIT */

(function($) {

  $.fn.checkallbox = function() {

    return this.each(function() {
      var $checkallbox = $(this);
      var $scope       = $checkallbox.parents('form');
      var $checkboxes  = $scope.find(':checkbox').not($checkallbox);

      // Attach event handler
      $scope.on('change', ':checkbox', function(event) {
        if ($(event.target).is($checkallbox) && !event.initial) {
          // Checkallbox changed
          $checkboxes.filter(':enabled').prop('checked', $checkallbox.prop('checked'));
        } else {
          // Initial state or checkbox changed
          $checkallbox.prop('checked',  $checkboxes.filter(':enabled').length > 0 && $checkboxes.filter(':enabled').not(':checked').length === 0);
          $checkallbox.prop('disabled', $checkboxes.filter(':enabled').length === 0);
        }
      });

      // Set initial state of checkallbox
      $scope.trigger(jQuery.Event('change', {target: $checkallbox[0], initial: true}));
    });
  };

}(jQuery));
