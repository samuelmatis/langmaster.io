from db import *
from app import *
from flask import request, session, abort, Response, jsonify, render_template
import json
from difflib import SequenceMatcher


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


@app.route('/api/users/<username>', methods=['GET'])
def get_user(username):
    if username == session['username']:
        user = User.objects(username=username)
        l_user = user.to_json()
        decoded = json.loads(l_user)
        return Response(json.dumps(decoded, sort_keys=False, indent=4),mimetype='application/json')
    else:
        abort(404)


@app.route('/api/users/<username>', methods=['PUT'])
def update_user(username):
    if username == session['username']:
        user = User.objects(username=username)
        l_user = user.to_json()
        decoded = json.loads(l_user)
        user.update(**{
                "set__bio": request.json['bio'], #zapomnels na okurku
                "set__location": request.json['location'],
                "set__native": request.json['native']})

        user = User.objects(username=request.form.get("username",
                            decoded[0]["username"]))
        l_user = user.to_json()
        decoded = json.loads(l_user)
        return Response(json.dumps(decoded, sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)


@app.route('/api/users/<username>', methods=['DELETE'])
def delete_user(username):
    if username == session['username']:
        user = User.objects(username=username)
        l_user = user.to_json()
        decoded = json.loads(l_user)
        if decoded == []:
            abort(404)
        user.delete()
        return Response(json.dumps(decoded, sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)


@app.route('/api/users/<username>/words', methods=['GET'])
def get_words(username):
    if username == session['username']:
        user = User.objects(username=username)
        l_user = user.to_json()
        decoded = json.loads(l_user)
        return Response(json.dumps(decoded[0]["words"], sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)


@app.route('/api/users/<username>/words', methods=['POST'])
def create_word(username):
    if username == session['username']:
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
        user.update(**{"set__words": words})
        return Response(json.dumps(words[-1], sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)


@app.route('/api/users/<username>/words/<wordname>', methods=['GET'])
def get_word(username, wordname):
    if username == session['username']:
        user = User.objects(username=username)
        l_word = user.to_json()
        decoded = json.loads(l_word)
        words = decoded[0]["words"]
        word = [word for word in words if word["word"] == wordname]
        if word == []:
            abort(404)
        return Response(json.dumps(word[0], sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)


@app.route('/api/users/<username>/words/<int:word_id>', methods=['GET'])
def get_word_id(username, word_id):
    if username == session['username']:
        user = User.objects(username=username)
        l_word = user.to_json()
        decoded = json.loads(l_word)
        words = decoded[0]["words"]
        word = [word for word in words if word["word_id"] == word_id]
        if word == []:
            abort(404)
        return Response(json.dumps(word[0], sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)


@app.route('/api/users/<username>/words/<int:word_id>', methods=['PUT'])
def change_word(username, word_id):
    if username == session['username']:
        user = User.objects(username=username)
        l_user = user.to_json()
        decoded = json.loads(l_user)
        words = decoded[0]["words"]
        wordid_index = [k for k in range(len(words)) if words[k]["word_id"]
                        == word_id]
        if [word_id for word in words if word["word_id"] == word_id] == []:
            abort(404)
        wordid = [word_id for word in words if word["word_id"] == word_id][0]
        word = Word(word_id=wordid,
                    word=request.json.get("word", words[wordid_index[0]]["word"]),
                    translation=request.json.get("translation",
                                                 words[wordid_index[0]]
                                                 ["translation"]),
                    strength=request.json["strength"])

        new_word = word.to_dict()
        words[wordid_index[0]] = new_word
        user.update(**{"set__words": words})
        return Response(json.dumps(new_word, sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)


@app.route('/api/users/<username>/words/<int:word_id>', methods=['DELETE'])
def delete_word(username, word_id):
    if username == session['username']:
        user = User.objects(username=username)
        l_user = user.to_json()
        decoded = json.loads(l_user)
        words = decoded[0]["words"]
        word = [word for word in words if word["word_id"] == word_id]
        if word == []:
            abort(404)
        words.pop(words.index(word[0]))
        user.update(**{"set__words": words})
        return Response(json.dumps(words, sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)


def rate_words(word_get, word_post):
    current_ratio = SequenceMatcher(None, word_get, word_post).ratio()
    return str(current_ratio)


@app.route('/api/users/<username>/compare', methods=['POST'])
def compare(username):
    if username == session['username']:
        original = request.form["origin"]
        want = request.form["input"]
        user = User.objects(username=username)
        l_word = user.to_json()
        words = json.loads(l_word)[0]["words"]
        translation = [word["translation"] for word in words
                       if word["word"] == original]
        if translation == []:
            abort(404)
        return rate_words(translation[0], want)
    else:
        abort(404)

def rate_alg(l):
    l = list(l)
    if "1, 1, 1" in str(l):
        return 1
    elif l.count(1) > l.count(0):
        return 0
    else:
        return -1


@app.route('/api/users/<username>/test', methods=['POST'])
def test(username):
    if username == session['username']:
        rates = {}
        word = request.form["word"]
        know = request.form["know"]
        rates[word] = rate_alg(map(int,know))
        if rate_alg(map(int,know)) < 0:
            increase = -1
        elif rate_alg(map(int,know)) == 0:
            increase = 0
        else:
            increase = 1
        user = User.objects(username=username)
        l_user = user.to_json()
        decoded = json.loads(l_user)
        words = decoded[0]["words"]
        word = [words[item] for item in range(len(words)) if words[item]["word"] == word]
        try:
            word = word[0]
        except:
            abort(404)
        if (word["strength"])+rates[word["word"]]== -1 or (word["strength"])+rates[word["word"]]== 6:
            pass
        else:
            word["strength"]= (word["strength"])+rates[word["word"]]
            wordid_index = [k for k in range(len(words)) if words[k]["word_id"] == word["word_id"]]
            words[wordid_index[0]] = word
        user.update(**{"set__words": words})
        word["increase"] = increase
        return Response(json.dumps(word, sort_keys=False, indent=4),
                        mimetype='application/json')
    else:
        abort(404)
