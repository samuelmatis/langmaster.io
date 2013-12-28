$(".js-signin").on("click",function(e){
    e.preventDefault();
    $(this).fadeOut(1,function() {
        $(".jumbotron-links").hide();
        $(".login-buttons").css("margin-top","56px");
        $(".login-buttons").css("margin-bottom","55px");
        $(".login-buttons").show();
    });
});

function login(type, access_token, data) {
    $.ajax({
        type: "POST",
        url: "api/login/" + type,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function (request) { request.setRequestHeader("access_token", access_token); },
        success: function() { window.location.reload(true); }
    });
}

$(".js-login-facebook").on("click", function (h) {
    h.preventDefault();
    OAuth.popup("facebook", function (err, result) {
        result.get("/me?fields=id,name,username,email,picture.type(large)").done(function(data) {
            login("facebook", result.access_token, data);
        });
    })
});

$(".js-login-twitter").on("click", function (h) {
    h.preventDefault();
    OAuth.popup("twitter", function (err, result) {
        cb = new Codebird;
        cb.setConsumerKey("tX2i1uv6ON4ffvgLic48Lg","hiRma7ego2XUGWhid8bafC1XxmIKjozGdJCiZooWUg" );
        cb.setToken(result.oauth_token, result.oauth_token_secret);
        _user = cb.__call(
            "account_verifyCredentials", {}, function (data) {
                bootbox.prompt("What is your email?", function(result) {
                    if (result === null) {
                        return ;
                    } else {
                        data.email = result;
                        login("twitter", result.access_token, data);
                    }
                });
            }
        );
    });
});

$(".js-login-google").on("click", function (h) {
    h.preventDefault();
    OAuth.popup("google", function (err, result) {
        $.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + result.access_token, function(data) {
            bootbox.prompt("What is your email?", function(result) {
                if (result === null) {
                    return ;
                } else {
                    data.email = result;
                    login("google", result.access_token, data);
                }
            });
        });
    })
});
