App.module("Profile.Show", function(Show, App, Backbone, Marionette, $, _) {

	/**
	 * Profile view
	 *
	 * @region Profile
	 * @template #profile-template
	 */
	Show.Profile = Marionette.ItemView.extend({
		template: "profile/profile",
		className: "pure-g content-ribbon",

        initialize: function(options) {
            this.numWords = options.numWords;
            this.bio = options.bio;
            this.native = options.native;
            this.location = options.location;
        },

        serializeData: function() {
            return {
                "name": App.user.fullName,
                "username": App.user.userName,
                "email": App.user.email,
                "picture": App.user.picture,
                "type": App.user.authType.capitalize(),
                "numWords": this.numWords,
                "bio": this.bio,
                "native": this.native,
                "location": this.location
            }
        },

        events: {
            "click .js-save": "saveAbout"
        },

        saveAbout: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("about:submit", data);
        }
	});

});
