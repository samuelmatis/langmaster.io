/*global Words, Backbone, Marionette, JST*/

// Add regions on page
Words.addRegions({
    wordsList: '#words-list'
});

// On start
Words.on("initialize:after", function() {

    // Define test words
    // Known index - from 1 to 10
    var words = new Words.Collections.Words([
        {
            "id": 1,
            "word": "car",
            "translate": "auto",
            "knowIndex": 4.352
        },{
            "id": 2,
            "word": "house",
            "translate": "dom",
            "knowIndex": 8.4
        }
    ]);

    // Create a view
    var wordsListView = new Words.Views.WordTableView({
        collection: words
    });

    // Connect view with region
    Words.wordsList.show(wordsListView);

});

// Start application
Words.start();
