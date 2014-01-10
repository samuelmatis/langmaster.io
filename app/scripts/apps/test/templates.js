window.JST['test/header-panel'] = _.template(
    '<div class="container"> \
        <ul class="nav navbar-nav navbar-right"> \
            <li><button type="button" class="js-back-to-words btn btn-default navbar-btn btn-logout">Back to words <i class="glyphicon glyphicon-chevron-right"></i></a></li> \
        </ul> \
    </div>');

window.JST['test/region-layout'] = _.template(
    '<div class="col-md-6 col-md-offset-3" id="test-page-region" style="margin-top: 20px;"> \
        <div id="test-header" style="padding-bottom: 5px; border-bottom: 1px solid #ccc;"></div> \
        <div id="test-main"></div> \
        <div id="test-result"></div> \
    </div>');

window.JST['test/start'] = _.template(
    '<h1>Welcome to test</h1> \
    <div class="row"> \
        <div class="col-md-12" id="weakest-words-table"> \
            <h4>Weak words</h4> \
            <table class="table table-bordered"> \
                <thead> \
                    <tr> \
                        <th>Word</th> \
                        <th>Strength</th> \
                    </tr> \
                </thead> \
                <tbody> \
                </tbody> \
            </table> \
        </div> \
    </div> \
    <div class="row"> \
        <button type="button" class="js-start-test btn btn-success btn-lg btn-block">Start test</button> \
    </div>');

window.JST['test/weakest-words'] = _.template(
    '<td><%= word %></td> \
    <td> \
        <% if(strength == 0) { %> \
            <span class="glyphicon glyphicon-star-empty"></span> \
        <% } else { for(var i=0; i < strength; i++){ %> \
            <span class="glyphicon glyphicon-star"></span> \
        <% } } %> \
    </td>');

window.JST['test/main'] = _.template(
    '<div class="row"> \
        <div class="col-md-12" id="main-page"> \
            <h1>Test page</h1> \
        </div> \
    </div>');

window.JST['test/header'] = _.template(
    '<div class="row"> \
        <div class="col-md-6" id="test-header-giveup"><a class="js-giveup btn btn-default">Give up</a></div> \
        <div class="col-md-6" id="test-header-steps"></div> \
    </div>');

window.JST['test/main-region'] = _.template(
    '<div class="row" id="test-main-row"> \
        <div class="col-md-4 col-md-offset-1"> \
            <p class="lead" class="margin-top: 4px;"><%= word %></p> \
        </div> \
        <div class="col-md-5"> \
            <form class="form" id="test-form" role="form"> \
                <input type="text" name="answer" class="js-test-input form-control col-md-12" autofocus="autofocus"> \
                <button class="js-submit-answer btn btn-success" form="test-form" style="margin-top: 40px;">Check</button> \
            </form> \
        </div> \
    </div>');

window.JST['test/result-region'] = _.template(
    '<div class="alert alert-<%= result %>" style="margin-top: 40px;"><%= result_text %><button class="js-next btn-submit-answer btn btn-<%= result %> pull-right">Next</button> \
    <% if(answer != "") { %><b><%= answer %></b><% } %></div>');

window.JST['test/final'] = _.template(
    '<h1>Test results</h1> \
    <div class="row"> \
        <div class="col-md-12"> \
            <h4>Weak words</h4> \
            <table class="table table-bordered"> \
                <thead> \
                    <tr> \
                        <th>Word</th> \
                        <th>Strength</th> \
                    </tr> \
                </thead> \
                <tbody> \
                </tbody> \
            </table> \
            <button class="js-start-again btn btn-success pull-left">Start again</button> \
            <button class="js-end-test btn btn-primary pull-right">End test</button> \
        </div> \
    </div>');

window.JST['test/final-table'] = _.template(
    '<td><%= word %></td> \
    <td> \
        <% if(strength == 0) { %> \
            <span class="glyphicon glyphicon-star-empty"></span> \
        <% } else { if(increase === 1) { %> \
            <span class="glyphicon glyphicon-circle-arrow-up"></span> \
        <% } else if(increase === -1) { %> \
            <span class="glyphicon glyphicon-circle-arrow-down"></span> \
        <% } for(var i=0; i < strength; i++){ %> \
            <span class="glyphicon glyphicon-star"></span> \
        <% }} %> \
    </td>');

window.JST['test/no-words'] = _.template(
    '<h1>You do not have any words</h1> \
    <h4>Go to words page and add some.</h4>');
