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
            console.log(1);
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        }
    })

});
