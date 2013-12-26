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
                                    <small><cite title="San Francisco, USA">San Francisco, USA <i class="glyphicon glyphicon-profile glyphicon-map-marker"> \
                                    </i></cite></small> \
                                    <p> \
                                        <i class="glyphicon glyphicon-profile glyphicon-envelope"></i><%= email %> \
                                        <br /> \
                                        <i class="glyphicon glyphicon-profile glyphicon-globe"></i><a href="http://www.jquery2dotnet.com"><%= type %> profile</a> \
                                        <br /> \
                                        <span style="font-weight: 600">Words:</span> <%= numWords %></p> \
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
        <div class="col-md-6"></div> \
    </div>');
