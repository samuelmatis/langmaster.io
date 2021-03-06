App.module('Words.Common.Views', function(Views, App, Backbone, Marionette, $, _) {
    'use strict';

    /**
     * Form view
     *
     * @region Words.Common
     * @template #words-form
     */
    Views.Form = Marionette.ItemView.extend({
        template: 'words/form',

        events: {
            'click button.js-submit': 'submitClicked'
        },

        submitClicked: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        },

        onFormDataInvalid: function(errors) {
            var $view = this.$el;

            var clearFormErrors = function() {
                var $form = $view.find('form');
                $form.find('.help-inline.error').each(function() {
                    $(this).remove();
                });
                $form.find('.control-group.error').each(function() {
                    $(this).removeClass('error');
                });
            };

            var markErrors = function(value, key) {
                var $controlGroup = $view.find('#edit-' + key).parent();
                var $errorEl = $('<span>', { class: 'help-inline error', text: value });
                $controlGroup.append($errorEl).addClass('has-error');
            };

            clearFormErrors();
            _.each(errors, markErrors);
        }
    });

});
