from app import *
from users import *
from flask import session, redirect, url_for
from flask.sessions import *
from json import *

@app.route('/api/session', methods=['GET'])
def session_get():
    out = JSONEncoder().encode({
        "username": session['username'],
        "access_token": session['access_token'],
        "fullname": session['name']
    })
    decoded = json.loads(out)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),mimetype='application/json')

def login(type, token, name, username, email, picture):
    user = User.objects(username=request.json['username'])
    if len(user) == 0:
        new_user = create_user(type, name, username, email, picture)

        session['access_token'] = token
        session['name'] = name
        session['username'] = username

        return Response(json.dumps({}, sort_keys=False, indent=4),
                    mimetype='application/json')
    else:
        session['access_token'] = token
        session['name'] = name
        session['username'] = username

        return Response(json.dumps({}, sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/login/facebook', methods=['POST'])
def login_fb():
    return login("facebook", request.headers['access_token'], request.json['name'], request.json['username'], request.json['email'], request.json['picture']['data']['url'])

@app.route('/api/login/twitter', methods=['POST'])
def login_tw():
    return login("twitter", request.headers['access_token'], request.json['name'], request.json['username'], request.json['email'], request.json['picture']['data']['url'])


@app.route('/api/login/google', methods=['POST'])
def login_plus():
    return login("google", request.headers['access_token'], request.json['name'], request.json['username'], request.json['email'], request.json['picture']['data']['url'])

@app.route('/api/logout', methods=['GET'])
def logout():
    session.pop('access_token', None)
    session.pop('name', None)
    session.pop('username', None)
    return redirect(url_for('index'))
