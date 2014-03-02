'use strict';

$('.js-signin').on('click',function(e) {
    e.preventDefault();
    $(this).fadeOut(1,function() {
        $('.login-buttons').css({'text-align': 'center'}).show();
    });
});

$('.js-signin-next').on('click', function(e) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.js-signin').trigger('click');
});

function login(type, data) {
    $.ajax({
        type: 'POST',
        url: 'api/login/' + type,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function(res) {
            if (res === 'no') {
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

var urls = {
    facebook: '/me?fields=id,name,username,email,link,picture.type(large)',
    twitter: '/1.1/account/verify_credentials.json',
    google: '/oauth2/v1/userinfo'
};

$('.js-login').on('click', function (e) {
    e.preventDefault();

    var type = $(this).data('type');
    OAuth.popup(type, function (err, result) {
        result.get(urls[type]).done(function(data) {
            login(type, data);
        });
    });
});
