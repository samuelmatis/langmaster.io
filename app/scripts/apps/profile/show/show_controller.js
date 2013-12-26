App.module("Profile.Show", function(Show, App, Backbone, Marionette, $, _) {

    Show.Controller = {

        /**
         * Show profile method
         * It shows profile of current user
         */
        showProfile: function() {
            var words = App.request("words:entities");

            $.when(words).done(function(words) {
                this.numWords = words.length;

                var profileView = new Show.Profile({
                    numWords: this.numWords
                });

                App.appRegion.show(profileView);
            });
        }

    }

});
