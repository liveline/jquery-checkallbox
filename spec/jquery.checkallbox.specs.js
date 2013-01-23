/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
/*global pavlov:false, describe:false, before:false, after:false*/
/*global it:false, given:false assert:false, async:false, resume:false, wait:false*/

(function($) {

  pavlov.specify.extendAssertions({

    isChecked: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('checked'), true, 'asserting checkbox is checked');
      });
    },

    isNotChecked: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('checked'), false, 'asserting checkbox is not checked');
      });
    },

    isDisabled: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('disabled'), true, 'asserting checkbox is disabled');
      });
    },

    isNotDisabled: function(actual, expected, message) {
      actual.each(function() {
        strictEqual($(this).prop('disabled'), false, 'asserting checkbox is not disabled');
      });
    }

  });

  pavlov.specify("jQuery.$checkallbox", function() {

    describe("method", function() {

      var $elems;

      before(function() {
        $elems = $('#qunit-fixture').children();
      });

      it("should be chainable", function() {
        assert($elems.checkallbox()).equals($elems);
      });

    });

    describe("with an empty form", function() {
      var $form, $checkallbox;

      before(function() {
        $form        = $('#qunit-fixture').find('form#empty');
        $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
      });

      describe("checkallbox", function() {

        it("should not be checked", function() {
          assert($checkallbox).isNotChecked();
        });

        it("should be disabled", function() {
          assert($checkallbox).isDisabled();
        });

      });

    });

    describe("with a form with two checkboxes", function() {
      var $form, $checkallbox, $checkboxes;

      before(function() {
        $form       = $('#qunit-fixture').find('form#two-checkboxes');
        $checkboxes = $form.find(':checkbox');
      });

      // Checked state
      describe("neither of which are checked", function() {

        before(function() {
          $form.find(':checkbox').prop("checked", false);
          $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
        });

        describe("checkallbox", function() {

          it("should not be checked", function() {
            assert($checkallbox).isNotChecked();
          });

          describe("when checked", function() {

            before(function() {
              $checkallbox.click();
            });

            it("should check the checkboxes", function() {
              assert($checkboxes).isChecked();
            });

          });

        });

      });

      describe("one of which is checked", function() {

        before(function() {
          $form.find(':checkbox').first().prop("checked", true);
          $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
        });

        describe("checkallbox", function() {

          it("should not be checked", function() {
            assert($checkallbox).isNotChecked();
          });

          describe("when checked", function() {

            before(function() {
              $checkallbox.click();
            });

            it("should check the checkboxes", function() {
              assert($checkboxes).isChecked();
            });

          });

        });

      });

      describe("both of which are checked", function() {

        before(function() {
          $form.find(':checkbox').prop("checked", true);
          $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
        });

        describe("checkallbox", function() {

          it("should be checked", function() {
            assert($checkallbox).isChecked();
          });

          describe("when unchecked", function() {

            before(function() {
              $checkallbox.click();
            });

            it("should uncheck the checkboxes", function() {
              assert($checkboxes).isNotChecked();
            });

          });

        });

      });

      // Disabled state
      describe("one of which is disabled", function() {

        before(function() {
          $checkboxes.first().prop("disabled", true);
        });

        describe("checkallbox", function() {

          before(function() {
            $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
          });

          it("should not be disabled", function() {
            assert($checkallbox).isNotDisabled();
          });

          describe("when checked", function() {

            before(function() {
              $checkallbox.click();
            });

            it("should not check the disabled checkboxes", function() {
              assert($checkboxes.filter(':disabled')).isNotChecked();
            });

            it("should check the enabled checkboxes", function() {
              assert($checkboxes.filter(':enabled')).isChecked();
            });
          });

        });

        describe("the other of which is checked", function() {

          before(function() {
            $checkboxes.last().prop("checked", true);
          });

          describe("checkallbox", function() {

            before(function() {
              $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
            });

            it("should be checked", function() {
              assert($checkallbox).isChecked();
            });

            describe("when unchecked", function() {

              before(function() {
                $checkallbox.click();
              });

              it("should uncheck the enabled checkboxes", function() {
                assert($checkboxes.filter(':enabled')).isNotChecked();
              });
            });

          });

        });

      });

      describe("both of which are disabled", function() {

        before(function() {
          $form.find(':checkbox').prop("disabled", true);
          $checkallbox = $('<input type="checkbox"/>').prependTo($form).checkallbox();
        });

        describe("checkallbox", function() {

          it("should be disabled", function() {
            assert($checkallbox).isDisabled();
          });

        });

      });

    });


  });
}(jQuery));
