from db import *
from app import *
from flask import request, session, abort, Response, jsonify, render_template
import json
from datetime import datetime


def create_user(type, name, username, email, picture):
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    try:
        u_id = decoded[0]["user_id"]+1
    except:
        u_id = 1
    user = User(user_id=u_id,
                username=username,
                name=name,
                picture=picture,
                email=email,
                type=type,
                bio="",
                location="",
                native="",
                first_login=datetime.now().strftime('%Y-%m-%d'),
                words=[])

    user.save()
    return str(user)


@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')


@app.route('/api/user', methods=['GET'])
def get_user():
        user = User.objects(username=session['username'])
        l_user = user.to_json()
        decoded = json.loads(l_user)
        return Response(json.dumps(decoded, sort_keys=False, indent=4),mimetype='application/json')


@app.route('/api/user', methods=['PUT'])
def update_user(username):
    user = User.objects(username=session['username'])
    l_user = user.to_json()
    decoded = json.loads(l_user)
    user.update(**{
            "set__bio": request.json['bio'],
            "set__location": request.json['location'],
            "set__native": request.json['native']})

    user = User.objects(username=request.form.get("username",
                        decoded[0]["username"]))
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')


@app.route('/api/user', methods=['DELETE'])
def delete_user(username):
    user = User.objects(username=session['username'])
    l_user = user.to_json()
    decoded = json.loads(l_user)
    if decoded == []:
        abort(404)
    user.delete()
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')
