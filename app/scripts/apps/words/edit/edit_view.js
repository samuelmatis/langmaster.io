App.module("Words.Edit", function(Edit, App, Backbone, Marionette, $, _) {

    Edit.Word = App.Words.Common.Views.Form.extend({
        initialize: function() {
            this.title = "Edit " + this.model.get('word');
        }
    });

});
