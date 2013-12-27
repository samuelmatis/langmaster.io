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
            this.opt = options;
        },

        serializeData: function() {
            return {
                "name": App.user.fullName,
                "username": App.user.userName,
                "email": App.user.email,
                "picture": App.user.picture,
                "type": App.user.authType.capitalize(),
                "numWords": this.opt.numWords,
                "bio": this.opt.bio,
                "native": this.opt.native,
                "location": this.opt.location,
                "learningSince": App.user.learningSince
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
