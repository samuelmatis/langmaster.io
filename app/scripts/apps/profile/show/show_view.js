App.module('Profile.Show', function(Show, App, Backbone, Marionette, $, _) {
    'use strict';

	/**
	 * Profile view
	 *
	 * @region Profile
	 * @template #profile-template
	 */
	Show.Profile = Marionette.ItemView.extend({
		template: 'profile/profile',
		className: 'pure-g content-ribbon',

        events: {
            'click .js-save': 'saveAbout',
            'click .js-remove-account': 'removeAccount'
        },

        saveAbout: function(e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('about:submit', data);
        },

        removeAccount: function(e) {
            e.preventDefault();
            var self = this;
            bootbox.dialog({
                message: 'Are you sure you want to delete your account? This cannot be undone.',
                title: 'Warning',
                buttons: {
                    danger: {
                        label: 'Yes.',
                        className: 'btn-danger',
                        callback: function() {
                            self.trigger('remove:account');
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
        }
	});

});
