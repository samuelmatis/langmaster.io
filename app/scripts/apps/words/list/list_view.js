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
            "click button.js-addnewword": "submitClicked",
            "click button.js-oauth-facebook": "loginFacebook",
            "click button.js-oauth-twitter": "loginTwitter",
            "click button.js-oauth-google": "loginGoogle",
            "click button.js-oauth-linkedin": "loginLinkedin"
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
        },

        loginFacebook: function(e) {
            e.preventDefault();

            OAuth.popup('facebook', function(err, result) {
                if(err) {
                    console.log(err);
                    return;
                }

                console.log(result);
            });
        },

        loginTwitter: function(e) {
            e.preventDefault();

            OAuth.popup('twitter', function(err, result) {
                if(err) {
                    console.log(err);
                    return;
                }

                console.log(result);
            });
        },

        loginGoogle: function(e) {
            e.preventDefault();

            OAuth.popup('google', function(err, result) {
                if(err) {
                    console.log(err);
                    return;
                }

                console.log(result);
            });
        },

        loginLinkedin: function(e) {
            e.preventDefault();

            OAuth.popup('linkedin', function(err, result) {
                if(err) {
                    console.log(err);
                    return;
                }

                console.log(result);
            });
        }
    });

    List.Word = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#word-list-item",

        events: {
            "click td": "highlightWord",
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

        highlightWord: function() {
            // this.$el.css('background-color', '#eeeeee');
            this.$el.toggleClass('pure-table-highlighted');
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

        itemViewContainer: "tbody"
    });

});
