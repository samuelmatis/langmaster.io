App.module("Words.Edit", function(Edit, App, Backbone, Marionette, $, _) {

    Edit.Word = Marionette.ItemView.extend({
        template: "#word-edit",

        events: {
            "click button.js-submit": "submitClicked",
            "click a.js-back": "goBack"
        },

        goBack: function(e) {
            e.preventDefault();
            App.trigger("words:list");
        },

        submitClicked: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

        onFormDataInvalid: function(errors) {
            var $view = this.$el;

            var clearFormErrors = function() {
                var $form = $view.find("form");
                $form.find(".help-inline.error").each(function() {
                    $(this).remove();
                });
                $form.find(".control-group.error").each(function() {
                    $(this).removeClass("error");
                });
            }

            var self = this;
            var markErrors = function(value, key) {
                var $controlGroup = self.$el.find("#edit-" + key).parent();
                var $errorEl = $('<span>', {class: "help-inline error", text: value});
                $controlGroup.append($errorEl).addClass("error");
            }

            clearFormErrors();
            _.each(errors, markErrors); 
        }
    })

});
