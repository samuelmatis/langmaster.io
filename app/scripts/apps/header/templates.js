window.JST['header/header'] = _.template(
    '<div class="container"> \
        <div class="navbar-header"> \
            <button type="button" class="navbar-toggle" style="border: none" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> \
              <span class="sr-only">Toggle navigation</span> \
              <span class="icon-bar"></span> \
              <span class="icon-bar"></span> \
              <span class="icon-bar"></span> \
            </button> \
            <a class="navbar-brand" href="#">Words <small>beta</small></a> \
          </div> \
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> \
            <ul class="nav navbar-nav nav-main"></ul> \
            <ul class="nav navbar-nav navbar-right"> \
                <p class="navbar-text" style="margin-bottom: 10px;"><%= username %></p> \
                <li><button type="button" class="js-logout btn btn-default navbar-btn btn-logout">Log out</a></li> \
            </ul> \
        </div> \
    </div>');

window.JST['header/link'] = _.template(
	'<a href="#<%= url %>"><%= name %></a>'
);
