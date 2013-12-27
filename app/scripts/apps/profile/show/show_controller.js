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

                var self = this;
                $.ajax({
                    type: "GET",
                    url: "/api/users/" + App.user.userName,
                    async: false,
                    success: function(res) {
                        console.log(res);
                        self.bio = res[0]["bio"],
                        self.native = res[0]["native"],
                        self.location = res[0]["location"],
                        self.learningSince = res[0]["first_login"],
                        self.type = res[0]["type"],
                        self.picture = res[0]["picture"]
                    }
                });

                var profileView = new Show.Profile({
                    numWords: this.numWords,
                    bio: this.bio,
                    native: this.native,
                    location: this.location,
                    learningSince: this.learningSince,
                    type: this.type,
                    picture: this.picture
                });

                profileView.on("about:submit", function(data) {
                    console.log(data);
                    $.ajax({
                        method: "PUT",
                        url: "/api/users/" + App.user.userName,
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function(res) {
                            $.bootstrapGrowl("Your profile has been saved.", { type: 'success' });
                        }
                    })
                });

                App.appRegion.show(profileView);
            });
        }

    }

});
