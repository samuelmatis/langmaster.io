$(".js-signin").on("click",function(e){e.preventDefault();$(this).fadeOut(1,function(){$(".jumbotron-links").hide();$(".login-buttons").css("margin-top","56px");$(".login-buttons").css("margin-bottom","55px");$(".login-buttons").show();});});(function(){var h,q,n;function s(c){"/"===c[0]?c=document.location.protocol+"//"+document.location.host+c:c.match(/^.{2,5}:\/\//)||(c=document.location.protocol+"//"+document.location.host+document.location.pathname+"/"+c);return c}function y(c,b,a){c=c.replace(/\{\{(.*?)\}\}/g,function(a,c){return b[c]||""});a&&(c=c.replace(/\{(.*?)\}/g,function(b,c){return a[c]||""}));return c}function w(c){var b,a;try{b=JSON.parse(c.data)}catch(d){}if(b&&b.provider&&(!c.provider||b.provider.toLowerCase()===c.provider.toLowerCase())){if("error"===b.status||"fail"===b.status)return a=Error(b.message),a.body=b.data,c.callback(a);if("success"!==b.status||!b.data)return a=Error(),a.body=b.data,c.callback(a);if(!b.state||-1==u.indexOf(b.state))return c.callback(Error("State is not matching"));c.provider||(b.data.provider=b.provider);a=b.data;var e=a.request;delete a.request;var f;a.access_token?f={token:a.access_token}:a.oauth_token&&a.oauth_token_secret&&(f={oauth_token:a.oauth_token,oauth_token_secret:a.oauth_token_secret});if(e.required)for(var g in e.required)f[e.required[g]]=a[e.required[g]];g=function(a,c){return function(d){var e={};if("string"===typeof d)e={url:d};else if("object"===typeof d)for(var g in d)e[g]=d[g];e.type=e.type||c;e.oauthio={provider:b.provider,tokens:f,request:a};return u.http(e)}};a.get=g(e,"GET");a.post=g(e,"POST");a.put=g(e,"PUT");a.patch=g(e,"PATCH");a.del=g(e,"DELETE");return c.callback(null,a,e)}}function z(c){window.o={i:function(b){h=b},setOAuthdURL:function(b){q=b;n=s(q).match(/^.{2,5}:\/\/[^/]+/)[0]},popup:function(b,a,c){function e(b){if(b.source===f&&b.origin===n)return a.data=b.data,w(a)}var f;if(!h)return c(Error("o object must be initialized"));2==arguments.length&&(c=a,a={});a.state||(a.state=A(),a.state_type="client");u.push(a.state);var g=q+"/auth/"+b+"?k="+h,g=g+("&d="+encodeURIComponent(s("/")));a&&(g+="&opts="+encodeURIComponent(JSON.stringify(a)));var m=Math.floor(0.8*window.outerWidth),l=Math.floor(0.5*window.outerHeight),p,r;350>l&&(l=350);800>m&&(m=800);p=window.screenX+(window.outerWidth-m)/2;r=window.screenY+(window.outerHeight-l)/8;m="width="+m+",height="+l+",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0";m+=",left="+p+",top="+r;a={provider:b,callback:function(b,f){window.removeEventListener?window.removeEventListener("message",e,!1):window.detachEvent?window.detachEvent("onmessage",e):document.detachEvent&&document.detachEvent("onmessage",e);a.callback=function(){};return c(b,f)}};window.attachEvent?window.attachEvent("onmessage",e):document.attachEvent?document.attachEvent("onmessage",e):window.addEventListener&&window.addEventListener("message",e,!1);setTimeout(function(){a.callback(Error("Authorization timed out"))},6E5);(f=window.open(g,"Authorization",m))&&f.focus()},redirect:function(b,a,c){2==arguments.length&&(c=a,a={});a.state||(a.state=A(),a.state_type="client");var e=a.state;B("oauthio_state");var f=new Date;f.setTime(f.getTime()+6E5);f="; expires="+f.toGMTString();document.cookie="oauthio_state="+e+f+"; path=/";e=encodeURIComponent(s(c));c=q+"/auth/"+b+"?k="+h;c+="&redirect_uri="+e;a&&(c+="&opts="+encodeURIComponent(JSON.stringify(a)));document.location.href=c},callback:function(b,a){if(r)return 1===arguments.length?w({data:r,callback:b}):w({data:r,provider:b,callback:a})},http:function(b){var a={},d;for(d in b)a[d]=b[d];if(!a.oauthio.request.cors){a.url=encodeURIComponent(a.url);"/"!=a.url[0]&&(a.url="/"+a.url);a.url=q+"/request/"+a.oauthio.provider+a.url;a.headers=a.headers||{};a.headers.oauthio="k="+h;a.oauthio.tokens.oauth_token&&a.oauthio.tokens.oauth_token_secret&&(a.headers.oauthio+="&oauthv=1");for(var e in a.oauthio.tokens)a.headers.oauthio+="&"+encodeURIComponent(e)+"="+encodeURIComponent(a.oauthio.tokens[e]);delete a.oauthio;return c.ajax(a)}if(a.oauthio.tokens.token){a.url.match(/^[a-z]{2,16}:\/\//)||("/"!==a.url[0]&&(a.url="/"+a.url),a.url=a.oauthio.request.url+a.url);if(a.oauthio.request.query){b=[];for(d in a.oauthio.request.query)b.push(encodeURIComponent(d)+"="+encodeURIComponent(y(a.oauthio.request.query[d],a.oauthio.tokens,a.oauthio.request.parameters)));b=b.join("&");-1!==a.url.indexOf("?")?a.url+="&"+b:a.url+="?"+b}if(a.oauthio.request.headers)for(d in a.headers=a.headers||{},a.oauthio.request.headers)a.headers[d]=y(a.oauthio.request.headers[d],a.oauthio.tokens,a.oauthio.request.parameters);delete a.oauthio;return c.ajax(a)}}}}function A(){for(var c=(new Date).getTime()+":"+Math.floor(9999999*Math.random()),b="",a=-1,d,e;++a<c.length;)d=c.charCodeAt(a),e=a+1<c.length?c.charCodeAt(a+1):0,55296<=d&&56319>=d&&56320<=e&&57343>=e&&(d=65536+((d&1023)<<10)+(e&1023),a++),127>=d?b+=String.fromCharCode(d):2047>=d?b+=String.fromCharCode(192|d>>>6&31,128|d&63):65535>=d?b+=String.fromCharCode(224|d>>>12&15,128|d>>>6&63,128|d&63):2097151>=d&&(b+=String.fromCharCode(240|d>>>18&7,128|d>>>12&63,128|d>>>6&63,128|d&63));c=Array(b.length>>2);for(a=0;a<c.length;a++)c[a]=0;for(a=0;a<8*b.length;a+=8)c[a>>5]|=(b.charCodeAt(a/8)&255)<<24-a%32;b=8*b.length;c[b>>5]|=128<<24-b%32;c[(b+64>>9<<4)+15]=b;b=Array(80);a=1732584193;d=-271733879;e=-1732584194;for(var f=271733878,g=-1009589776,m=0;m<c.length;m+=16){for(var h=a,q=d,n=e,p=f,r=g,k=0;80>k;k++){if(16>k)b[k]=c[m+k];else{var t=b[k-3]^b[k-8]^b[k-14]^b[k-16];b[k]=t<<1|t>>>31}var t=a<<5|a>>>27,s;s=20>k?d&e|~d&f:40>k?d^e^f:60>k?d&e|d&f|e&f:d^e^f;t=l(l(t,s),l(l(g,b[k]),20>k?1518500249:40>k?1859775393:60>k?-1894007588:-899497514));g=f;f=e;e=d<<30|d>>>2;d=a;a=t}a=l(a,h);d=l(d,q);e=l(e,n);f=l(f,p);g=l(g,r)}c=[a,d,e,f,g];b="";for(a=0;a<32*c.length;a+=8)b+=String.fromCharCode(c[a>>5]>>>24-a%32&255);c=b;try{x}catch(u){x=""}b="";a=c.length;for(d=0;d<a;d+=3)for(e=c.charCodeAt(d)<<16|(d+1<a?c.charCodeAt(d+1)<<8:0)|(d+2<a?c.charCodeAt(d+2):0),f=0;4>f;f++)b=8*d+6*f>8*c.length?b+x:b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e>>>6*(3-f)&63);return b.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,"")}function B(c){var b=new Date;b.setTime(b.getTime()-864E5);document.cookie=c+"=; expires="+b.toGMTString()+"; path=/"}function l(c,b){var a=(c&65535)+(b&65535);return(c>>16)+(b>>16)+(a>>16)<<16|a&65535}q="https://oauth.io";n=h=void 0;if(!window.o)if("undefined"==typeof jQuery){var v=[],p=document.createElement("script");p.src="http://code.jquery.com/jquery.min.js";p.type="text/javascript";p.onload=function(){z(jQuery);for(var c in v)window.o[v[c].method].apply(window.o,v[c].args)};document.getElementsByTagName("head")[0].appendChild(p);p="i setOAuthdURL popup redirect callback http".split(" ");window.o={};var D=function(c){window.o[c]=function(){var b=[],a;for(a in arguments)b[a]=arguments[a];v.push({method:c,args:b})}},C;for(C in p)D(p[C])}else z(jQuery);n=s(q).match(/^.{2,5}:\/\/[^/]+/)[0];var u=[],r;(function(){var c=/[\\#&]oauthio=([^&]*)/.exec(document.location.hash);if(c){document.location.hash="";r=decodeURIComponent(c[1].replace(/\+/g," "));a:{for(var c=document.cookie.split(";"),b=0;b<c.length;b++){for(var a=c[b];" "===a.charAt(0);)a=a.substring(1,a.length);if(0===a.indexOf("oauthio_state=")){c=a.substring(14,a.length);break a}}c=null}c&&(u.push(c),B("oauthio_state"))}})();var x=""})();o.i("fF3y7938pxJouuXVgHM-9ALKMEk");
    $(".js-login-facebook").on("click", function (h) {
        h.preventDefault();
        o.popup("facebook", function (h, n) {
            console.log(n.access_token);
            $.get('https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=' + n.access_token, function(data) {
                $.post('api/login/facebook', data, function() {
                    window.location.replace("/app");
                });
            });
        })
    });
    $(".js-login-twitter").on("click", function (h) {
        h.preventDefault();
        o.popup("twitter", function (h, n) {
            $.post("api/login/twitter", {
                "type": "twitter",
                "oauth_token": n.oauth_token,
                "oauth_token_secret": n.oauth_token_secret
            });
        })
    });
    $(".js-login-google").on("click", function (h) {
        h.preventDefault();
        o.popup("google", function (h, n) {
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
