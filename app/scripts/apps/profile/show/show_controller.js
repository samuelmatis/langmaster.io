App.module('Profile.Show', function(Show, App, Backbone, Marionette, $, _) {

    Show.Controller = {

        /**
         * Show profile method
         * It shows profile of current user
         */
        showProfile: function() {

            var loadingView = new App.Common.Views.Loading();
            App.appRegion.show(loadingView);

            var user = App.request('user:entity');

            $.when(user).done(function(user) {
                var profileView = new Show.Profile({
                    model: user
                });

                profileView.on('about:submit', function(data) {
                    console.log(data);
                    user.save(data, {
                        success: function(model, response) {
                            $.bootstrapGrowl('Your profile has been saved.', { type: 'success' });
                            App.trigger('profile:show');
                        },
                        error: function(model, response) {
                            App.vent.trigger('app:logout');
                        },
                        wait: true
                    });
                });

                profileView.on('remove:account', function() {
                    bootbox.dialog({
                        message: 'Are you sure you want to delete your account? This cannot be undone.',
                        title: 'Warning',
                        buttons: {
                            danger: {
                                label: 'Yes.',
                                className: 'btn-danger',
                                callback: function() {
                                    user.destroy({
                                        success: function(model, response) {
                                            App.vent.trigger('app:logout');
                                        },
                                        wait: true
                                    });
                                }
                            },
                            main: {
                                label: 'No.',
                                className: 'btn-primary',
                                callback: function() {
                                    bootbox.hideAll();
                                }
                            }
                        }
                    });
                });

                App.appRegion.show(profileView);
            });
        }

    };

});
