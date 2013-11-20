App.module("Words.List", function(List, App, Backbone, Marionette, $, _) {

    List.Layout = Marionette.Layout.extend({
        template: "#words-list-layout",
        className: "pure-g content-ribbon",

        regions: {
            listRegion: "#list-words",
            addRegion: "#add-new-word"
        }
    });

    List.NewWord = Marionette.ItemView.extend({
        template: "#words-list-newword",

        events: {
            "click button.js-addnewword": "submitClicked"
        },

        submitClicked: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            console.log(data);
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
                var $controlGroup = self.$el.find("#create-" + key).parent();
                var $errorEl = $('<span>', {class: "help-inline error", text: value});
                $controlGroup.append($errorEl).addClass("error");
            }

            clearFormErrors();
            _.each(errors, markErrors); 
        }
    });

    List.Word = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#word-list-item",

        events: {
            "click td a.js-edit": "editClicked",
            "click button.js-delete": "deleteClicked"
        },

        flash: function(cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                setTimeout(function() {
                    $view.toggleClass(cssClass);
                }, 500);
            });
        },

        deleteClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("word:delete", this.model);
        },

        editClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("word:edit", this.model);
        }
    });

    List.Words = Marionette.CompositeView.extend({

        template: "#word-list",

        itemView: List.Word,

        itemViewContainer: "tbody",

        events: {
            "click button.js-filter": "filterClicked"
        },

        filterClicked: function(e) {
            e.preventDefault();
            var criterion = this.$('.js-filter-criterion').val();
            this.trigger("words:filter", criterion);
        }
    });

});
