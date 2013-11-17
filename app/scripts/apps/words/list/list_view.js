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
