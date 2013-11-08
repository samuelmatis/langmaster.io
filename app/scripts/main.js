/*global App, Backbone, Marionette, JST*/

// Interpolate templates
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

// Add regions on page
App.addRegions({
    wordsList: '#words-list'
});

// On start
App.on("initialize:after", function() {

    // Define test words
    // Known index - from 1 to 10
    var words = new App.Collections.Words([
        {
            "id": 1,
            "word": "car",
            "translation": "auto",
            "knowIndex": 4
        },{
            "id": 2,
            "word": "house",
            "translation": "dom",
            "knowIndex": 5
        }, {
            "id": 3,
            "word": "computer",
            "translation": "pocitac",
            "knowIndex": 2
        }, {
            "id": 4,
            "word": "book",
            "translation": "kniha",
            "knowIndex": 3
        }
    ]);

    // Create a view
    var wordsListView = new App.Views.WordTableView({
        collection: words
    });

    // Connect view with region
    App.wordsList.show(wordsListView);

});

// Turn on routing system
var applicationRouter = new App.Routers.AppRouter();
Backbone.history.start();

// Start the application
App.start();
