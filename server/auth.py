from app import *
from users import *
from flask import session, redirect, url_for, abort
from flask.sessions import *
from json import *

@app.route('/api/session', methods=['GET'])
def session_get():
    if "access_token" in session:
        user = User.objects(username=session['username'])
        user_json = user.to_json()
        user_dict = json.loads(user_json)[0]

        out = JSONEncoder().encode({
            "username": user_dict['username'],
            "access_token": session['access_token'],
            "fullname": user_dict['name'],
            "email": user_dict['email']
        })
        decoded = json.loads(out)
        return Response(json.dumps(decoded, sort_keys=False, indent=4),mimetype='application/json')
    else:
        abort(404)

def login(type, token, name, username, email, picture):
    user = User.objects(email=request.json['email'])
    if len(user) == 0:
        new_user = create_user(type, name, username, email, picture)

        session['access_token'] = token
        session['name'] = name
        session['username'] = username
        session['email'] = email

        return Response(json.dumps({}, sort_keys=False, indent=4),
                    mimetype='application/json')
    else:
        session['access_token'] = token
        session['name'] = name
        session['username'] = username
        session['email'] = email

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
