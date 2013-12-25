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
    OAuth.popup("facebook", function (h, n) {
        $.get('https://graph.facebook.com/me?fields=id,name,username,email,picture.type(large)&access_token=' + n.access_token, function(d) {
            $.ajax({
                type: "POST",
                url: "api/login/facebook",
                data: JSON.stringify(d),
                contentType: 'application/json',
                dataType: 'json',
                beforeSend: function (request) { request.setRequestHeader("access_token", n.access_token); },
                success: function(d) { window.location.reload(true); }
            });
        });
    })
});

$(".js-login-twitter").on("click", function (h) {
    h.preventDefault();
    OAuth.popup("twitter", function (h, n) {
        $.post("api/login/twitter", {
            "type": "twitter",
            "oauth_token": n.oauth_token,
            "oauth_token_secret": n.oauth_token_secret
        });
    });
});

$(".js-login-google").on("click", function (h) {
    h.preventDefault();
    OAuth.popup("google", function (h, n) {
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
