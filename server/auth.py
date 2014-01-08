from app import *
from users import *
from flask import session, redirect, url_for, abort
from flask.sessions import *
from json import *

def login(type, profile_url, name, username, email, picture):
    user = User.objects(email=email)
    if len(user) == 0:
        if not email:
            return Response(json.dumps("no", sort_keys=True, indent=4),
                    mimetype='application/json')
        else:
            new_user = create_user(type, profile_url, name, username, email, picture)
            session['email'] = email

            return Response(json.dumps(new_user, sort_keys=True, indent=4),
                    mimetype='application/json')
    else:
        user_json = user.to_json()
        user_dict = json.loads(user_json)[0]

        if type not in [user_dict["type"][i]["type"] for i in range(len(user_dict['type'])) if user_dict["type"][i]["type"]]:
            new_type = Type(type=type, profile_url=profile_url)
            types = user_dict["type"]
            types.append(new_type)
            user.update(**{"set__type": types})

        session['email'] = user_dict['email']

        return Response(json.dumps(user_dict, sort_keys=True, indent=4),
                    mimetype='application/json')


@app.route('/api/login/facebook', methods=['POST'])
def login_fb():
    return login("Facebook", request.json['link'], request.json['name'], request.json['username'], request.json.get('email', ''), request.json['picture']['data']['url'])

@app.route('/api/login/twitter', methods=['POST'])
def login_tw():
    return login("Twitter", "http://twitter.com/" + request.json['screen_name'], request.json['name'], request.json['screen_name'], request.json.get('email', ''), request.json['profile_image_url'])


@app.route('/api/login/google', methods=['POST'])
def login_plus():
    return login("Google-plus", request.json['link'], request.json['name'], request.json['name'].replace(" ", ""), request.json.get('email', ''), request.json['picture'])

@app.route('/api/logout', methods=['GET'])
def logout():
    session.pop('email', None)
    return redirect(url_for('index'))
