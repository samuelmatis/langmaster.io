App.module('Profile.Show', function(Show, App, Backbone, Marionette, $, _) {
    'use strict';

    Show.Controller = {

        /**
         * Show profile method
         * It shows profile of current user
         */
        showProfile: function() {

            // Show loading view
            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            // Fetch current user
            var user = App.request('current:user');

            $.when(user).done(function(user) {
                var profileView = new Show.Profile({
                    model: user
                });

                // On submit profile details
                profileView.on('about:submit', function(data) {
                    user.save(data, {
                        success: function() {
                            $.bootstrapGrowl('Your profile has been saved.', { type: 'success' });
                            App.trigger('profile:show');
                        },
                        error: function() {
                            App.vent.trigger('app:logout');
                        },
                        wait: true
                    });
                });

                // On remove account
                profileView.on('remove:account', function() {
                    user.destroy({
                        success: function() {
                            App.vent.trigger('app:logout');
                        },
                        wait: true
                    });
                });

                App.appRegion.show(profileView);
            });
        }

    };

});
