window.JST['words/region-layout'] = _.template(
	'<div class="row"> \
        <div class="col-md-6" id="list-words"></div> \
        <div class="col-md-6" id="add-new-word"></div> \
    </div>');

window.JST['words/list'] = _.template(
	'<h4 class="content-subhead">Your words</h4> \
    <form class="form-search" role="search"> \
        <div class="input-group"> \
            <input type="text" class="form-control js-filter-criterion" placeholder="Search"> \
            <div class="input-group-btn"> \
                <button class="btn btn-default js-filter" type="submit"><i class="glyphicon glyphicon-search"></i></button> \
            </div> \
        </div> \
    </form> \
    <p id="words-list"> \
        <table class="table table-striped table-bordered table-hover"> \
            <thead> \
                <tr> \
                    <th>Word</th> \
                    <th>Translation</th> \
                    <th>Strength</th> \
                    <th></th> \
                </tr> \
            </thead> \
            <tbody> \
            </tbody> \
        </table> \
    </p>');

window.JST['words/list-item'] = _.template(
	'<td><%= word %></td> \
    <td><%= translation %></td> \
    <td> \
        <% if(strength == 0) { %> \
            <span class="glyphicon glyphicon-star-empty"></span> \
        <% } else { for(var i=0; i < strength; i++){ %> \
            <span class="glyphicon glyphicon-star"></span> \
        <% } } %> \
    </td> \
    <td> \
        <a href="#words/<%= id %>/edit" class="js-edit btn btn-default btn-xs"> \
            <span class="glyphicon glyphicon-pencil"></span> Edit \
        </a> \
        <button class="js-delete btn btn-danger btn-xs"> \
            <i class="glyphicon glyphicon-remove"></i> Delete \
        </button> \
    </td>');

window.JST['words/missing-word'] = _.template('<h1>This word does not exist</h1>');

window.JST['words/list-none'] = _.template('<td colspan="4">No words to display</td>');

window.JST['words/form'] = _.template(
	'<form class="form" role="form"> \
	    <div class="form-group"> \
	        <label for="edit-word">Word</label> \
	        <input type="text" class="form-control" id="edit-word" name="word" value="<%= word %>"> \
	    </div> \
	    <div class="form-group"> \
	        <label for="edit-translation">Translation</label> \
	        <input type="text" class="form-control" id="edit-translation" name="translation" value="<%= translation %>"> \
	    </div> \
	    <div class="form-group"> \
	        <button type="submit" class="js-submit btn btn-primary">Save</button> \
	    </div> \
	</form>');

window.JST['words/new-word'] = _.template(
	'<h4 class="content-subhead">Add a new word</h4> \
        <form class="form-horizontal" role="form"> \
            <div class="row form-group"> \
                <div class="col-xs-4 newword-left"> \
                    <input type="text" class="form-control" id="create-word" name="word" placeholder="Word"> \
                </div> \
                <div class="col-xs-4 newword-right"> \
                    <input type="text" class="form-control" id="create-translation" name="translation" placeholder="Translation"> \
                </div> \
            </div> \
            <div class="row"> \
                <div class="col-sm-10"> \
                    <button type="submit" class="js-addnewword btn btn-primary">Add Word</button> \
                </div> \
            </div> \
        </form>');
