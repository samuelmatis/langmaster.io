$(".js-signin").on("click",function(e){
    e.preventDefault();
    $(this).fadeOut(1,function() {
        $(".jumbotron-links").hide();
        $(".login-buttons").css("margin-top","56px");
        $(".login-buttons").css("margin-bottom","55px");
        $(".login-buttons").show();
    });
});

$(".js-login-facebook").on("click", function (h) {
    h.preventDefault();
    OAuth.popup("facebook", function (err, result) {
        result.get("/me?fields=id,name,username,email,picture.type(large)").done(function(data) {
            $.ajax({
                type: "POST",
                url: "api/login/facebook",
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'json',
                beforeSend: function (request) { request.setRequestHeader("access_token", result.access_token); },
                success: function() { window.location.reload(true); }
            });
        });
    })
});

$(".js-login-twitter").on("click", function (h) {
    h.preventDefault();
    OAuth.popup("twitter", function (err, result) {
        // $.post("api/login/twitter", {
        //     "type": "twitter",
        //     "oauth_token": n.oauth_token,
        //     "oauth_token_secret": n.oauth_token_secret
        // });
        result.get("/users/show").done(function(data) {
            console.log(data);
        });
    });
});

$(".js-login-google").on("click", function (h) {
    h.preventDefault();
    OAuth.popup("google", function (err, result) {
        $.post("api/login/facebook", {
            "type": "google",
            "access_token": n.access_token,
            "token_type": n.token_type,
            "expires_in": n.expires_in,
            "id_token": n.id_token
        }, function () {
            window.location.replace("/app");
        });
    })
});
