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
  var $checkallbox = $('<input type="checkbox"/>').prependTo($form.find('header')).checkallbox();
  $form.find('header').wrapInner($('<label></label>'));
});
</script>
```

## Examples
See `demo.html` for an example of jQuery.checkallbox in action.

## Release History

### v1.0.1
 * Fixed issue with checkallbox checked state when checkboxes disabled [#1]

### v1.0.0
 * Initial release
