App.module("Words.Edit", function(Edit, App, Backbone, Marionette, $, _) {

    /**
     * Edit word form view
     * 
     * @region Words-Edit
     * @template #words-form
     * @extends App.Words.Common.Views.Form
     */
    Edit.Word = App.Words.Common.Views.Form.extend({
        initialize: function() {
            this.title = "Edit " + this.model.get('word');
        },

        onRender: function() {
            if(this.options.generateTitle) {
                var $title = $('<h1>', {text: this.title});
                this.$el.prepend($title);
            }

            this.$(".js-submit").text("Update word");
        }
    });

});
