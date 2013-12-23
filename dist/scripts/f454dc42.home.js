$(".js-signin").on("click", function (a) {
    a.preventDefault(), $(this).fadeOut(1, function () {
        $(".jumbotron-links").hide(), $(".login-buttons").css("margin-top", "56px"), $(".login-buttons").css("margin-bottom", "55px"), $(".login-buttons").show()
    })
}),
function () {
    function a(a) {
        return "/" === a[0] ? a = document.location.protocol + "//" + document.location.host + a : a.match(/^.{2,5}:\/\//) || (a = document.location.protocol + "//" + document.location.host + document.location.pathname + "/" + a), a
    }

    function b(a, b, c) {
        return a = a.replace(/\{\{(.*?)\}\}/g, function (a, c) {
            return b[c] || ""
        }), c && (a = a.replace(/\{(.*?)\}/g, function (a, b) {
            return c[b] || ""
        })), a
    }

    function c(a) {
        var b, c;
        try {
            b = JSON.parse(a.data)
        } catch (d) {}
        if (b && b.provider && (!a.provider || b.provider.toLowerCase() === a.provider.toLowerCase())) {
            if ("error" === b.status || "fail" === b.status) return c = Error(b.message), c.body = b.data, a.callback(c);
            if ("success" !== b.status || !b.data) return c = Error(), c.body = b.data, a.callback(c);
            if (!b.state || -1 == p.indexOf(b.state)) return a.callback(Error("State is not matching"));
            a.provider || (b.data.provider = b.provider), c = b.data;
            var e = c.request;
            delete c.request;
            var f;
            if (c.access_token ? f = {
                token: c.access_token
            } : c.oauth_token && c.oauth_token_secret && (f = {
                oauth_token: c.oauth_token,
                oauth_token_secret: c.oauth_token_secret
            }), e.required)
                for (var g in e.required) f[e.required[g]] = c[e.required[g]];
            return g = function (a, c) {
                return function (d) {
                    var e = {};
                    if ("string" == typeof d) e = {
                        url: d
                    };
                    else if ("object" == typeof d)
                        for (var g in d) e[g] = d[g];
                    return e.type = e.type || c, e.oauthio = {
                        provider: b.provider,
                        tokens: f,
                        request: a
                    }, p.http(e)
                }
            }, c.get = g(e, "GET"), c.post = g(e, "POST"), c.put = g(e, "PUT"), c.patch = g(e, "PATCH"), c.del = g(e, "DELETE"), a.callback(null, c, e)
        }
    }

    function d(d) {
        window.o = {
            i: function (a) {
                h = a
            },
            setOAuthdURL: function (b) {
                i = b, j = a(i).match(/^.{2,5}:\/\/[^/]+/)[0]
            },
            popup: function (b, d, f) {
                function g(a) {
                    return a.source === k && a.origin === j ? (d.data = a.data, c(d)) : void 0
                }
                var k;
                if (!h) return f(Error("o object must be initialized"));
                2 == arguments.length && (f = d, d = {}), d.state || (d.state = e(), d.state_type = "client"), p.push(d.state);
                var l = i + "/auth/" + b + "?k=" + h,
                    l = l + ("&d=" + encodeURIComponent(a("/")));
                d && (l += "&opts=" + encodeURIComponent(JSON.stringify(d)));
                var m, n, o = Math.floor(.8 * window.outerWidth),
                    q = Math.floor(.5 * window.outerHeight);
                350 > q && (q = 350), 800 > o && (o = 800), m = window.screenX + (window.outerWidth - o) / 2, n = window.screenY + (window.outerHeight - q) / 8, o = "width=" + o + ",height=" + q + ",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0", o += ",left=" + m + ",top=" + n, d = {
                    provider: b,
                    callback: function (a, b) {
                        return window.removeEventListener ? window.removeEventListener("message", g, !1) : window.detachEvent ? window.detachEvent("onmessage", g) : document.detachEvent && document.detachEvent("onmessage", g), d.callback = function () {}, f(a, b)
                    }
                }, window.attachEvent ? window.attachEvent("onmessage", g) : document.attachEvent ? document.attachEvent("onmessage", g) : window.addEventListener && window.addEventListener("message", g, !1), setTimeout(function () {
                    d.callback(Error("Authorization timed out"))
                }, 6e5), (k = window.open(l, "Authorization", o)) && k.focus()
            },
            redirect: function (b, c, d) {
                2 == arguments.length && (d = c, c = {}), c.state || (c.state = e(), c.state_type = "client");
                var g = c.state;
                f("oauthio_state");
                var j = new Date;
                j.setTime(j.getTime() + 6e5), j = "; expires=" + j.toGMTString(), document.cookie = "oauthio_state=" + g + j + "; path=/", g = encodeURIComponent(a(d)), d = i + "/auth/" + b + "?k=" + h, d += "&redirect_uri=" + g, c && (d += "&opts=" + encodeURIComponent(JSON.stringify(c))), document.location.href = d
            },
            callback: function (a, b) {
                return o ? 1 === arguments.length ? c({
                    data: o,
                    callback: a
                }) : c({
                    data: o,
                    provider: a,
                    callback: b
                }) : void 0
            },
            http: function (a) {
                var c, e = {};
                for (c in a) e[c] = a[c];
                if (!e.oauthio.request.cors) {
                    e.url = encodeURIComponent(e.url), "/" != e.url[0] && (e.url = "/" + e.url), e.url = i + "/request/" + e.oauthio.provider + e.url, e.headers = e.headers || {}, e.headers.oauthio = "k=" + h, e.oauthio.tokens.oauth_token && e.oauthio.tokens.oauth_token_secret && (e.headers.oauthio += "&oauthv=1");
                    for (var f in e.oauthio.tokens) e.headers.oauthio += "&" + encodeURIComponent(f) + "=" + encodeURIComponent(e.oauthio.tokens[f]);
                    return delete e.oauthio, d.ajax(e)
                }
                if (e.oauthio.tokens.token) {
                    if (e.url.match(/^[a-z]{2,16}:\/\//) || ("/" !== e.url[0] && (e.url = "/" + e.url), e.url = e.oauthio.request.url + e.url), e.oauthio.request.query) {
                        a = [];
                        for (c in e.oauthio.request.query) a.push(encodeURIComponent(c) + "=" + encodeURIComponent(b(e.oauthio.request.query[c], e.oauthio.tokens, e.oauthio.request.parameters)));
                        a = a.join("&"), e.url += -1 !== e.url.indexOf("?") ? "&" + a : "?" + a
                    }
                    if (e.oauthio.request.headers)
                        for (c in e.headers = e.headers || {}, e.oauthio.request.headers) e.headers[c] = b(e.oauthio.request.headers[c], e.oauthio.tokens, e.oauthio.request.parameters);
                    return delete e.oauthio, d.ajax(e)
                }
            }
        }
    }

    function e() {
        for (var a, b, c = (new Date).getTime() + ":" + Math.floor(9999999 * Math.random()), d = "", e = -1; ++e < c.length;) a = c.charCodeAt(e), b = e + 1 < c.length ? c.charCodeAt(e + 1) : 0, a >= 55296 && 56319 >= a && b >= 56320 && 57343 >= b && (a = 65536 + ((1023 & a) << 10) + (1023 & b), e++), 127 >= a ? d += String.fromCharCode(a) : 2047 >= a ? d += String.fromCharCode(192 | 31 & a >>> 6, 128 | 63 & a) : 65535 >= a ? d += String.fromCharCode(224 | 15 & a >>> 12, 128 | 63 & a >>> 6, 128 | 63 & a) : 2097151 >= a && (d += String.fromCharCode(240 | 7 & a >>> 18, 128 | 63 & a >>> 12, 128 | 63 & a >>> 6, 128 | 63 & a));
        for (c = Array(d.length >> 2), e = 0; e < c.length; e++) c[e] = 0;
        for (e = 0; e < 8 * d.length; e += 8) c[e >> 5] |= (255 & d.charCodeAt(e / 8)) << 24 - e % 32;
        d = 8 * d.length, c[d >> 5] |= 128 << 24 - d % 32, c[(d + 64 >> 9 << 4) + 15] = d, d = Array(80), e = 1732584193, a = -271733879, b = -1732584194;
        for (var f = 271733878, h = -1009589776, i = 0; i < c.length; i += 16) {
            for (var j = e, k = a, l = b, m = f, n = h, o = 0; 80 > o; o++) {
                if (16 > o) d[o] = c[i + o];
                else {
                    var p = d[o - 3] ^ d[o - 8] ^ d[o - 14] ^ d[o - 16];
                    d[o] = p << 1 | p >>> 31
                }
                var r, p = e << 5 | e >>> 27;
                r = 20 > o ? a & b | ~a & f : 40 > o ? a ^ b ^ f : 60 > o ? a & b | a & f | b & f : a ^ b ^ f, p = g(g(p, r), g(g(h, d[o]), 20 > o ? 1518500249 : 40 > o ? 1859775393 : 60 > o ? -1894007588 : -899497514)), h = f, f = b, b = a << 30 | a >>> 2, a = e, e = p
            }
            e = g(e, j), a = g(a, k), b = g(b, l), f = g(f, m), h = g(h, n)
        }
        for (c = [e, a, b, f, h], d = "", e = 0; e < 32 * c.length; e += 8) d += String.fromCharCode(255 & c[e >> 5] >>> 24 - e % 32);
        c = d;
        try {} catch (s) {
            q = ""
        }
        for (d = "", e = c.length, a = 0; e > a; a += 3)
            for (b = c.charCodeAt(a) << 16 | (e > a + 1 ? c.charCodeAt(a + 1) << 8 : 0) | (e > a + 2 ? c.charCodeAt(a + 2) : 0), f = 0; 4 > f; f++) d = 8 * a + 6 * f > 8 * c.length ? d + q : d + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & b >>> 6 * (3 - f));
        return d.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "")
    }

    function f(a) {
        var b = new Date;
        b.setTime(b.getTime() - 864e5), document.cookie = a + "=; expires=" + b.toGMTString() + "; path=/"
    }

    function g(a, b) {
        var c = (65535 & a) + (65535 & b);
        return (a >> 16) + (b >> 16) + (c >> 16) << 16 | 65535 & c
    }
    var h, i, j;
    if (i = "https://oauth.io", j = h = void 0, !window.o)
        if ("undefined" == typeof jQuery) {
            var k = [],
                l = document.createElement("script");
            l.src = "http://code.jquery.com/jquery.min.js", l.type = "text/javascript", l.onload = function () {
                d(jQuery);
                for (var a in k) window.o[k[a].method].apply(window.o, k[a].args)
            }, document.getElementsByTagName("head")[0].appendChild(l), l = "i setOAuthdURL popup redirect callback http".split(" "), window.o = {};
            var m, n = function (a) {
                    window.o[a] = function () {
                        var b, c = [];
                        for (b in arguments) c[b] = arguments[b];
                        k.push({
                            method: a,
                            args: c
                        })
                    }
                };
            for (m in l) n(l[m])
        } else d(jQuery);
    j = a(i).match(/^.{2,5}:\/\/[^/]+/)[0];
    var o, p = [];
    ! function () {
        var a = /[\\#&]oauthio=([^&]*)/.exec(document.location.hash);
        if (a) {
            document.location.hash = "", o = decodeURIComponent(a[1].replace(/\+/g, " "));
            a: {
                for (var a = document.cookie.split(";"), b = 0; b < a.length; b++) {
                    for (var c = a[b];
                        " " === c.charAt(0);) c = c.substring(1, c.length);
                    if (0 === c.indexOf("oauthio_state=")) {
                        a = c.substring(14, c.length);
                        break a
                    }
                }
                a = null
            }
            a && (p.push(a), f("oauthio_state"))
        }
    }();
    var q = ""
}(), o.i("fF3y7938pxJouuXVgHM-9ALKMEk"), $(".js-login-facebook").on("click", function (a) {
    a.preventDefault(), o.popup("facebook", function (a, b) {
        console.log(b.access_token), $.get("https://graph.facebook.com/me?fields=id,name,username,email,picture.type(large)&access_token=" + b.access_token, function (a) {
            $.ajax({
                type: "POST",
                url: "api/login/facebook",
                data: a,
                beforeSend: function (a) {
                    a.setRequestHeader("access_token", b.access_token)
                },
                success: function () {
                    window.location.reload(!0)
                }
            })
        })
    })
}), $(".js-login-twitter").on("click", function (a) {
    a.preventDefault(), o.popup("twitter", function (a, b) {
        $.post("api/login/twitter", {
            type: "twitter",
            oauth_token: b.oauth_token,
            oauth_token_secret: b.oauth_token_secret
        })
    })
}), $(".js-login-google").on("click", function (a) {
    a.preventDefault(), o.popup("google", function (a, b) {
        $.post("api/login/facebook", {
            type: "google",
            access_token: b.access_token,
            token_type: b.token_type,
            expires_in: b.expires_in,
            id_token: b.id_token
        }, function () {
            window.location.replace("/app")
        })
    })
});
var Holder = Holder || {};
! function (a, b) {
    function c(a, b) {
        var c = "complete",
            d = "readystatechange",
            e = !1,
            f = e,
            g = !0,
            h = a.document,
            i = h.documentElement,
            j = h.addEventListener ? "addEventListener" : "attachEvent",
            k = h.addEventListener ? "removeEventListener" : "detachEvent",
            l = h.addEventListener ? "" : "on",
            m = function (g) {
                (g.type != d || h.readyState == c) && (("load" == g.type ? a : h)[k](l + g.type, m, e), !f && (f = !0) && b.call(a, null))
            }, n = function () {
                try {
                    i.doScroll("left")
                } catch (a) {
                    return setTimeout(n, 50), void 0
                }
                m("poll")
            };
        if (h.readyState == c) b.call(a, "lazy");
        else {
            if (h.createEventObject && i.doScroll) {
                try {
                    g = !a.frameElement
                } catch (o) {}
                g && n()
            }
            h[j](l + "DOMContentLoaded", m, e), h[j](l + d, m, e), a[j](l + "load", m, e)
        }
    }

    function d(a) {
        a = a.match(/^(\W)?(.*)/);
        var b = document["getElement" + (a[1] ? "#" == a[1] ? "ById" : "sByClassName" : "sByTagName")](a[2]),
            c = [];
        return null !== b && (c = b.length ? b : 0 === b.length ? b : [b]), c
    }

    function e(a, b) {
        var c = {};
        for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
        for (var d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
        return c
    }

    function f(a, b, c) {
        b = parseInt(b, 10), a = parseInt(a, 10);
        var d = Math.max(b, a),
            e = Math.min(b, a),
            f = 1 / 12,
            g = Math.min(.75 * e, .75 * d * f);
        return {
            height: Math.round(Math.max(c.size, g))
        }
    }

    function g(a) {
        var b = a.ctx,
            c = a.dimensions,
            d = a.template,
            e = a.ratio,
            g = a.holder,
            h = "literal" == g.textmode,
            i = "exact" == g.textmode,
            j = f(c.width, c.height, d),
            k = j.height,
            l = c.width * e,
            m = c.height * e,
            n = d.font ? d.font : "sans-serif";
        o.width = l, o.height = m, b.textAlign = "center", b.textBaseline = "middle", b.fillStyle = d.background, b.fillRect(0, 0, l, m), b.fillStyle = d.foreground, b.font = "bold " + k + "px " + n;
        var p = d.text ? d.text : Math.floor(c.width) + "x" + Math.floor(c.height);
        if (h) {
            var c = g.dimensions;
            p = c.width + "x" + c.height
        } else if (i && g.exact_dimensions) {
            var c = g.exact_dimensions;
            p = Math.floor(c.width) + "x" + Math.floor(c.height)
        }
        var q = b.measureText(p).width;
        return q / l >= .75 && (k = Math.floor(.75 * k * (l / q))), b.font = "bold " + k * e + "px " + n, b.fillText(p, l / 2, m / 2, l), o.toDataURL("image/png")
    }

    function h(a, b, c, d) {
        var f = c.dimensions,
            h = c.theme,
            i = c.text ? decodeURIComponent(c.text) : c.text,
            j = f.width + "x" + f.height;
        h = i ? e(h, {
            text: i
        }) : h, h = c.font ? e(h, {
            font: c.font
        }) : h, b.setAttribute("data-src", d), c.theme = h, b.holder_data = c, "image" == a ? (b.setAttribute("alt", i ? i : h.text ? h.text + " [" + j + "]" : j), (n || !c.auto) && (b.style.width = f.width + "px", b.style.height = f.height + "px"), n ? b.style.backgroundColor = h.background : (b.setAttribute("src", g({
            ctx: s,
            dimensions: f,
            template: h,
            ratio: t,
            holder: c
        })), c.textmode && "exact" == c.textmode && (r.push(b), k(b)))) : "background" == a ? n || (b.style.backgroundImage = "url(" + g({
            ctx: s,
            dimensions: f,
            template: h,
            ratio: t,
            holder: c
        }) + ")", b.style.backgroundSize = f.width + "px " + f.height + "px") : "fluid" == a && (b.setAttribute("alt", i ? i : h.text ? h.text + " [" + j + "]" : j), b.style.height = "%" == f.height.slice(-1) ? f.height : f.height + "px", b.style.width = "%" == f.width.slice(-1) ? f.width : f.width + "px", ("inline" == b.style.display || "" === b.style.display || "none" == b.style.display) && (b.style.display = "block"), n ? b.style.backgroundColor = h.background : (r.push(b), k(b)))
    }

    function i(a, b) {
        var c = {
            height: a.clientHeight,
            width: a.clientWidth
        };
        if (!c.height && !c.width) {
            if (a.hasAttribute("data-holder-invisible")) throw new Error("Holder: placeholder is not visible");
            return a.setAttribute("data-holder-invisible", !0), setTimeout(function () {
                b.call(this, a)
            }, 1), null
        }
        return a.removeAttribute("data-holder-invisible"), c
    }

    function k(a) {
        var b;
        b = null == a.nodeType ? r : [a];
        for (var c in b)
            if (b.hasOwnProperty(c)) {
                var d = b[c];
                if (d.holder_data) {
                    var e = d.holder_data,
                        f = i(d, k);
                    f && (e.fluid && d.setAttribute("src", g({
                        ctx: s,
                        dimensions: f,
                        template: e.theme,
                        ratio: t,
                        holder: e
                    })), e.textmode && "exact" == e.textmode && (e.exact_dimensions = f, d.setAttribute("src", g({
                        ctx: s,
                        dimensions: e.dimensions,
                        template: e.theme,
                        ratio: t,
                        holder: e
                    }))))
                }
            }
    }

    function l(b, c) {
        var d = {
            theme: e(u.themes.gray, {})
        }, f = !1;
        for (sl = b.length, j = 0; sl > j; j++) {
            var g = b[j];
            a.flags.dimensions.match(g) ? (f = !0, d.dimensions = a.flags.dimensions.output(g)) : a.flags.fluid.match(g) ? (f = !0, d.dimensions = a.flags.fluid.output(g), d.fluid = !0) : a.flags.textmode.match(g) ? d.textmode = a.flags.textmode.output(g) : a.flags.colors.match(g) ? d.theme = a.flags.colors.output(g) : c.themes[g] ? c.themes.hasOwnProperty(g) && (d.theme = e(c.themes[g], {})) : a.flags.font.match(g) ? d.font = a.flags.font.output(g) : a.flags.auto.match(g) ? d.auto = !0 : a.flags.text.match(g) && (d.text = a.flags.text.output(g))
        }
        return f ? d : !1
    }
    var m = !1,
        n = !1,
        o = document.createElement("canvas"),
        p = 1,
        q = 1,
        r = [];
    if (o.getContext)
        if (o.toDataURL("image/png").indexOf("data:image/png") < 0) n = !0;
        else var s = o.getContext("2d");
        else n = !0;
    n || (p = window.devicePixelRatio || 1, q = s.webkitBackingStorePixelRatio || s.mozBackingStorePixelRatio || s.msBackingStorePixelRatio || s.oBackingStorePixelRatio || s.backingStorePixelRatio || 1);
    var t = p / q,
        u = {
            domain: "holder.js",
            images: "img",
            bgnodes: ".holderjs",
            themes: {
                gray: {
                    background: "#eee",
                    foreground: "#aaa",
                    size: 12
                },
                social: {
                    background: "#3a5a97",
                    foreground: "#fff",
                    size: 12
                },
                industrial: {
                    background: "#434A52",
                    foreground: "#C2F200",
                    size: 12
                },
                sky: {
                    background: "#0D8FDB",
                    foreground: "#fff",
                    size: 12
                },
                vine: {
                    background: "#39DBAC",
                    foreground: "#1E292C",
                    size: 12
                },
                lava: {
                    background: "#F8591A",
                    foreground: "#1C2846",
                    size: 12
                }
            },
            stylesheet: ""
        };
    a.flags = {
        dimensions: {
            regex: /^(\d+)x(\d+)$/,
            output: function (a) {
                var b = this.regex.exec(a);
                return {
                    width: +b[1],
                    height: +b[2]
                }
            }
        },
        fluid: {
            regex: /^([0-9%]+)x([0-9%]+)$/,
            output: function (a) {
                var b = this.regex.exec(a);
                return {
                    width: b[1],
                    height: b[2]
                }
            }
        },
        colors: {
            regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
            output: function (a) {
                var b = this.regex.exec(a);
                return {
                    size: u.themes.gray.size,
                    foreground: "#" + b[2],
                    background: "#" + b[1]
                }
            }
        },
        text: {
            regex: /text\:(.*)/,
            output: function (a) {
                return this.regex.exec(a)[1]
            }
        },
        font: {
            regex: /font\:(.*)/,
            output: function (a) {
                return this.regex.exec(a)[1]
            }
        },
        auto: {
            regex: /^auto$/
        },
        textmode: {
            regex: /textmode\:(.*)/,
            output: function (a) {
                return this.regex.exec(a)[1]
            }
        }
    }, document.getElementsByClassName || (document.getElementsByClassName = function (a) {
        var b, c, d, e = document,
            f = [];
        if (e.querySelectorAll) return e.querySelectorAll("." + a);
        if (e.evaluate)
            for (c = ".//*[contains(concat(' ', @class, ' '), ' " + a + " ')]", b = e.evaluate(c, e, null, 0, null); d = b.iterateNext();) f.push(d);
        else
            for (b = e.getElementsByTagName("*"), c = new RegExp("(^|\\s)" + a + "(\\s|$)"), d = 0; d < b.length; d++) c.test(b[d].className) && f.push(b[d]);
        return f
    }), window.getComputedStyle || (window.getComputedStyle = function (a) {
        return this.el = a, this.getPropertyValue = function (b) {
            var c = /(\-([a-z]){1})/g;
            return "float" == b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function () {
                return arguments[2].toUpperCase()
            })), a.currentStyle[b] ? a.currentStyle[b] : null
        }, this
    }), Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function (a) {
        var b = this.__proto__ || this.constructor.prototype;
        return a in this && (!(a in b) || b[a] !== this[a])
    });
    for (var v in a.flags) a.flags.hasOwnProperty(v) && (a.flags[v].match = function (a) {
        return a.match(this.regex)
    });
    a.add_theme = function (b, c) {
        return null != b && null != c && (u.themes[b] = c), a
    }, a.add_image = function (b, c) {
        var e = d(c);
        if (e.length)
            for (var f = 0, g = e.length; g > f; f++) {
                var h = document.createElement("img");
                h.setAttribute("data-src", b), e[f].appendChild(h)
            }
        return a
    }, a.run = function (b) {
        m = !0;
        var c = e(u, b),
            f = [],
            g = [],
            i = [];
        for ("string" == typeof c.images ? g = d(c.images) : window.NodeList && c.images instanceof window.NodeList ? g = c.images : window.Node && c.images instanceof window.Node && (g = [c.images]), "string" == typeof c.bgnodes ? i = d(c.bgnodes) : window.NodeList && c.elements instanceof window.NodeList ? i = c.bgnodes : window.Node && c.bgnodes instanceof window.Node && (i = [c.bgnodes]), o = 0, n = g.length; n > o; o++) f.push(g[o]);
        var j = document.getElementById("holderjs-style");
        j || (j = document.createElement("style"), j.setAttribute("id", "holderjs-style"), j.type = "text/css", document.getElementsByTagName("head")[0].appendChild(j)), c.nocss || (j.styleSheet ? j.styleSheet.cssText += c.stylesheet : j.appendChild(document.createTextNode(c.stylesheet)));
        for (var k = new RegExp(c.domain + '/(.*?)"?\\)'), n = i.length, o = 0; n > o; o++) {
            var p = window.getComputedStyle(i[o], null).getPropertyValue("background-image"),
                q = p.match(k),
                r = i[o].getAttribute("data-background-src");
            if (q) {
                var s = l(q[1].split("/"), c);
                s && h("background", i[o], s, p)
            } else if (null != r) {
                var s = l(r.substr(r.lastIndexOf(c.domain) + c.domain.length + 1).split("/"), c);
                s && h("background", i[o], s, p)
            }
        }
        for (n = f.length, o = 0; n > o; o++) {
            var t, v;
            v = t = p = null;
            try {
                v = f[o].getAttribute("src"), attr_datasrc = f[o].getAttribute("data-src")
            } catch (w) {}
            if (null == attr_datasrc && v && v.indexOf(c.domain) >= 0 ? p = v : attr_datasrc && attr_datasrc.indexOf(c.domain) >= 0 && (p = attr_datasrc), p) {
                var s = l(p.substr(p.lastIndexOf(c.domain) + c.domain.length + 1).split("/"), c);
                s && (s.fluid ? h("fluid", f[o], s, p) : h("image", f[o], s, p))
            }
        }
        return a
    }, c(b, function () {
        window.addEventListener ? (window.addEventListener("resize", k, !1), window.addEventListener("orientationchange", k, !1)) : window.attachEvent("onresize", k), m || a.run()
    }), "function" == typeof define && define.amd && define([], function () {
        return a
    })
}(Holder, window);
