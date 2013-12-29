from app import *
from users import *
from flask import session, redirect, url_for, abort
from flask.sessions import *
from json import *

def login(type, token, name, username, email, picture):
    user = User.objects(email=email)
    if len(user) == 0:
        if not email:
            return Response(json.dumps("no", sort_keys=False, indent=4),
                    mimetype='application/json')
        else:
            new_user = create_user(type, name, username, email, picture)

            session['access_token'] = token
            session['name'] = user
            session['username'] = username
            session['email'] = email

            return Response(json.dumps(new_user, sort_keys=False, indent=4),
                    mimetype='application/json')
    else:
        user_json = user.to_json()
        user_dict = json.loads(user_json)[0]

        session['access_token'] = token
        session['name'] = user_dict['name']
        session['username'] = user_dict['username']
        session['email'] = user_dict['email']

        return Response(json.dumps(user_dict, sort_keys=False, indent=4),
                    mimetype='application/json')


@app.route('/api/login/facebook', methods=['POST'])
def login_fb():
    return login("facebook", request.headers['access_token'], request.json['name'], request.json['username'], request.json['email'], request.json['picture']['data']['url'])

@app.route('/api/login/twitter', methods=['POST'])
def login_tw():
    return login("twitter", request.headers['access_token'], request.json['name'], request.json['screen_name'], request.json.get('email', ''), request.json['profile_image_url'])


@app.route('/api/login/google', methods=['POST'])
def login_plus():
    return login("google", request.headers['access_token'], request.json['name'], request.json['name'].replace(" ", ""), request.json.get('email', ''), request.json['picture'])

@app.route('/api/logout', methods=['GET'])
def logout():
    session.pop('access_token', None)
    session.pop('name', None)
    session.pop('username', None)
    session.pop('email', None)
    return redirect(url_for('index'))
