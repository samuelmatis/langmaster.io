App.module('Words.Edit', function(Edit, App, Backbone, Marionette, $, _) {

    Edit.Controller = {

        /**
         * Edit word method
         * It shows edit word view
         *
         * @param {number} id
         */
        editWord: function(id) {

            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            // Fetch word
            var word = App.request('word:entity', id);
            $.when(word).done(function(word) {
                var view;
                if(word !== undefined) {
                    view = new Edit.Word({
                        model: word,
                        generateTitle: true
                    });

                    // On submit form
                    view.on('form:submit', function(data) {
                        if(word.save(data)) {
                            App.trigger('words:list');
                        } else {
                            view.triggerMethod('form:data:invalid', word.validationError);
                        }
                    });
                } else {
                    // Show missing word view
                    view = new App.Words.Show.MissingWord();
                }

                App.appRegion.show(view);
            });
        }
    };

});
