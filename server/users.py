from flask import Flask, abort, request, render_template, Response
import json
from app import app
from models import *


@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users', methods=['POST'])
def create_user():
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    try:
        u_id = decoded[0]["user_id"]+1
    except:
        u_id = 1
    user = User(user_id=u_id,
                username=request.json["username"],
                email=request.json["email"],
                password=request.json["password"],
                words=[])

    user.save()
    decoded = user.to_dict()
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>', methods=['PUT'])
def update_user(username):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    user.update(**{
                "set__username": request.json.get("username", decoded[0]["username"]),
                "set__password": request.json.get("password", decoded[0]["password"]),
                "set__email": request.json.get("email", decoded[0]["email"]),
                "set__user_id": request.json.get("user_id", decoded[0]["user_id"])})

    user = User.objects(username=request.json.get("username",decoded[0]["username"]))
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>', methods=['DELETE'])
def delete_user(username):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    user.delete()
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>', methods=['GET'])
def get_user(username):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>/words', methods=['GET'])
def get_words(username):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return Response(json.dumps(decoded[0]["words"], sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>/words', methods=['POST'])
def create_word(username):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    try:
        words = decoded[0]["words"]
    except:
        words = []
    try:
        u_id = words[-1]["word_id"] + 1
    except:
        u_id = 1

    word = Word(word_id=u_id,
                word=request.json["word"],
                translation=request.json["translation"],
                strength=0)
    words.append(word.to_dict())
    user.update(**{"set__words":words})
    return Response(json.dumps(words[-1], sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>/words/<wordname>', methods=['GET'])
def get_word(username, wordname):
     user = User.objects(username=username)
     l_word = user.to_json()
     decoded = json.loads(l_word)
     words = decoded[0]["words"]
     word= [word for word in words if word["word"]==wordname]
     return Response(json.dumps(word[0], sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>/words/<int:word_id>', methods=['GET'])
def get_word_id(username, word_id):
     user = User.objects(username=username)
     l_word = user.to_json()
     decoded = json.loads(l_word)
     words = decoded[0]["words"]
     word = [word for word in words if word["word_id"] == word_id]
     return Response(json.dumps(word[0], sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>/words/<int:word_id>', methods=['PUT'])
def change_word(username, word_id):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    words = decoded[0]["words"]
    word = Word(word_id=request.json.get("word_id",words[word_id-1]["word_id"]),
                word=request.json.get("word",words[word_id-1]["word"]),
                translation=request.json.get("translation",words[word_id-1]["translation"]),
                strength=1)
    new_word = word.to_dict()
    words[word_id-1] = new_word
    user.update(**{"set__words":words})
    return Response(json.dumps(new_word, sort_keys=False, indent=4),
                    mimetype='application/json')


@app.route('/api/users/<username>/words/<int:word_id>', methods=['DELETE'])
def delete_word(username, word_id):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    words = decoded[0]["words"]
    word = [word for word in words if word["word_id"] == word_id]
    words.pop(words.index(word[0]))
    user.update(**{"set__words":words})
    return Response(json.dumps(words, sort_keys=False, indent=4),
                    mimetype='application/json')
