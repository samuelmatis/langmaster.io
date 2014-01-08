from db import *
from app import *
from flask import request, session, abort, Response, jsonify, render_template
import json
from datetime import datetime

def create_user(type, profile_url, name, username, email, picture):
    users = json.loads(User.objects().to_json())
    try:
        u_id = users[0]["user_id"]+1
    except:
        u_id = 1

    new_type = Type(type=type, profile_url=profile_url)

    user = User(user_id=u_id,
                username=username,
                name=name,
                picture=picture,
                email=email,
                type=[new_type],
                bio="",
                location="",
                native="",
                points=0,
                num_words=0,
                first_login=datetime.now().strftime('%Y-%m-%d'),
                words=[])

    user.save()
    user_json = json.loads(user.to_json())
    return json.dumps(user_json, sort_keys=True, indent=4)


@app.route('/api/user', methods=['GET'])
def get_user():
    user = User.objects(email=session.get('email',''))
    user_json = json.loads(user.to_json())
    return Response(json.dumps(user_json[0], sort_keys=False, indent=4),mimetype='application/json')


@app.route('/api/user', methods=['PUT'])
def update_user():
    user = User.objects(email=session.get('email',''))
    user.update(**{
            "set__bio": request.json['bio'],
            "set__location": request.json['location'],
            "set__native": request.json['native']})
    user_json = json.loads(user.to_json())
    return Response(json.dumps(user_json, sort_keys=True, indent=4),
                    mimetype='application/json')


@app.route('/api/user', methods=['DELETE'])
def delete_user():
    user = User.objects(email=session.get('email',''))
    user_json = json.loads(user.to_json())
    if user_json == []:
        abort(404)
    else:
        user.delete()
        return Response(json.dumps("ok", sort_keys=True, indent=4),
                    mimetype='application/json')
