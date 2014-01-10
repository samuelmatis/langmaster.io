'use strict';

$('.js-signin').on('click',function(e){
    e.preventDefault();
    $(this).fadeOut(1,function() {
        $('.jumbotron-links').hide();
        $('.login-buttons').css({'margin-top': '56px','margin-bottom': '55px'}).css('margin-bottom','55px').show();
    });
});

function login(type, data) {
    $.ajax({
        type: 'POST',
        url: 'api/login/' + type,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function(res) {
            if (res == 'no') {
                bootbox.prompt('What is your email?', function(result) {
                    if (result !== null) {
                        data.email = result;
                        login(type, data);
                    }
                });
            } else {
                window.location.reload(true);
            }
        }
    });
}

$('.js-login-facebook').on('click', function (e) {
    e.preventDefault();
    OAuth.popup('facebook', function (err, result) {
        result.get('/me?fields=id,name,username,email,link,picture.type(large)').done(function(data) {
            login('facebook', data);
        });
    });
});

$('.js-login-twitter').on('click', function (e) {
    e.preventDefault();
    OAuth.popup('twitter', function (err, result) {
        var cb = new Codebird;
        cb.setConsumerKey('tX2i1uv6ON4ffvgLic48Lg','hiRma7ego2XUGWhid8bafC1XxmIKjozGdJCiZooWUg' );
        cb.setToken(result.oauth_token, result.oauth_token_secret);
        var _user = cb.__call(
            'account_verifyCredentials', {}, function (data) {
                login('twitter', data);
            }
        );
    });
});

$('.js-login-google').on('click', function (e) {
    e.preventDefault();
    OAuth.popup('google', function (err, result) {
        console.log(result);
        $.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + result.access_token, function(data) {
            login('google', data);
        });
    });
});
