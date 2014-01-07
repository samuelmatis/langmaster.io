App.module('Profile.Show', function(Show, App, Backbone, Marionette, $, _) {

    Show.Controller = {

        /**
         * Show profile method
         * It shows profile of current user
         */
        showProfile: function() {
            var words = App.request('words:entities');

            $.when(words).done(function(words) {
                this.numWords = words.length;

                var self = this;
                $.ajax({
                    type: 'GET',
                    url: '/api/user',
                    async: false,
                    success: function(res) {
                        console.log(res);
                        self.bio = res[0].bio,
                        self.native = res[0].native,
                        self.location = res[0].location,
                        self.learningSince = res[0].first_login,
                        self.type = res[0].type,
                        self.picture = res[0].picture,
                        self.points = res[0].points
                    },
                    error: function() {
                        App.vent.trigger('app:logout');
                    }
                });

                var profileView = new Show.Profile({
                    numWords: this.numWords,
                    bio: this.bio,
                    native: this.native,
                    location: this.location,
                    learningSince: this.learningSince,
                    type: this.type,
                    picture: this.picture,
                    points: this.points
                });

                profileView.on('about:submit', function(data) {
                    console.log(data);
                    $.ajax({
                        method: 'PUT',
                        url: '/api/user',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function() {
                            $.bootstrapGrowl('Your profile has been saved.', { type: 'success' });
                            App.trigger('profile:show');
                        },
                        error: function() {
                            App.vent.trigger('app:logout');
                        }
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
                                    $.ajax({
                                        url: 'api/user',
                                        type: 'DELETE',
                                        success: function() {
                                            App.vent.trigger('app:logout');
                                        }
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
