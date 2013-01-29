# jQuery.checkallbox

A jQuery plugin that *quite literally* checks all the boxes.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/liveline/jquery-checkallbox/master/dist/jquery.checkallbox.min.js
[max]: https://raw.github.com/liveline/jquery-checkallbox/master/dist/jquery.checkallbox.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.checkallbox.min.js"></script>

<form>
  <header>Options</header>
  <p>
    <label><input type="checkbox" name="option_1" value="1"></input>Option 1</label>
  </p>
  <p>
    <label><input type="checkbox" name="option_2" value="1"></input>Option 2</label>
  </p>
</form>

<script>
jQuery(function($) {
  var $form        = $('form');
  var $checkallbox = $('<input type="checkbox"/>')
                       .prependTo($form.find('header'))
                       .checkallbox();
  $form.find('header').wrapInner($('<label></label>'));
});
</script>
```

By default each checkallbox is scoped to its parent `form`, but if you need multiple separate groupings of checkboxes each controlled by their own checkallboxes you can pass a custom `scope` selector:

```html
<script>
jQuery(function($) {
  var $form          = $('form');
  var $checkallboxes = $('<input type="checkbox"/>')
                         .prependTo($form.find('fieldset legend'))
                         .checkallbox({scope: 'fieldset'});
  $form.find('fieldset legend').wrapInner($('<label></label>'));
});
</script>
```

## Demo
See `demo.html` or [here](http://liveline.github.com/jquery-checkallbox/) for examples of jQuery.checkallbox in action.

## Release History

### v1.0.1
 * Fixed issue with checkallbox checked state when checkboxes disabled [#1]

### v1.0.0
 * Initial release
