App.module("Test", function(Test, App, Backbone, Marionette, $, _) {

	Test.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"test": "showTest"
		}
	});

	var API = {
		showTest: function() {
			Test.Main.Controller.showMain();
			App.execute("set:active:header", "test");
		}
	};

	App.on("test:main:show", function() {
		App.navigate("test");
		API.showTest();
	});

	App.addInitializer(function() {
		new Test.Router({
			controller: API
		});
	});

});
