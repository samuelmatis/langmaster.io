window.JST['profile/profile'] = _.template(
    '<div class="row"> \
        <div class="col-md-6"> \
            <div class="container"> \
                <div class="row"> \
                    <div class="col-xs-12 col-sm-6 col-md-6"> \
                        <div class="well well-sm"> \
                            <div class="row"> \
                                <div class="col-sm-6 col-md-4"> \
                                    <img src="<%= picture %>" alt="" class="img-rounded img-responsive" /> \
                                </div> \
                                <div class="col-sm-6 col-md-8"> \
                                    <h4><%= name %></h4> \
                                    <small><cite title="San Francisco, USA"><%= location %> <i class="glyphicon glyphicon-profile glyphicon-map-marker"> \
                                    </i></cite></small> \
                                    <p> \
                                        <i class="glyphicon glyphicon-profile glyphicon-envelope"></i><%= email %> \
                                        <br /> \
                                        <i class="glyphicon glyphicon-profile glyphicon-globe"></i><a href="<% if(type == "google") { %>https://www.plus.google.com/<%= username %>"><% } else { %>https://www.<%= type %>.com/<%= username %><% } %>"><%= type %> profile</a> \
                                        <br /> \
                                        <span style="font-weight: 600">Words:</span> <%= numWords %></p> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
        <div class="col-md-6"> \
            <form id="contact" method="post" class="form" role="form"> \
                <div class="row"> \
                    <div class="col-xs-6 col-md-6 form-group"> \
                        <label for="name">Location</label> \
                        <input class="form-control" id="name" name="location" type="text" value="<%= location %>" /> \
                    </div> \
                        <div class="col-xs-6 col-md-6 form-group"> \
                        <label for="lang">Native language</label> \
                            <input class="form-control" id="lang" name="native" type="text" value="<%= native %>" /> \
                        </div> \
                    </div> \
                    <label for="bio">Bio</label> \
                    <textarea class="form-control" id="bio" name="bio" rows="5"><%= bio %></textarea> \
                    <br /> \
                <div class="row"> \
                <div class="col-xs-12 col-md-12 form-group"> \
                <button class="js-save btn btn-primary pull-right" type="submit">Save</button> \
            </form> \
        </div> \
    </div>');
