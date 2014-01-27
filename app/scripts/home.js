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