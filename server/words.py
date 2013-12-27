from db import *
from app import *
from flask import request, session, abort, Response, jsonify, render_template
import json


@app.route('/api/user/words', methods=['GET'])
def get_words():
    user = User.objects(username=session['username'])
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return Response(json.dumps(decoded[0]["words"], sort_keys=False, indent=4),
                    mimetype='application/json')


@app.route('/api/user/words/<int:word_id>', methods=['GET'])
def get_word_id(word_id):
    user = User.objects(username=session['username'])
    l_word = user.to_json()
    decoded = json.loads(l_word)
    words = decoded[0]["words"]
    word = [word for word in words if word["word_id"] == word_id]
    if word == []:
        abort(404)
    return Response(json.dumps(word[0], sort_keys=False, indent=4),
                    mimetype='application/json')


@app.route('/api/user/words', methods=['POST'])
def create_word():
    user = User.objects(username=session['username'])
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


@app.route('/api/user/words/<int:word_id>', methods=['PUT'])
def change_word(word_id):
    user = User.objects(username=session['username'])
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


@app.route('/api/user/words/<int:word_id>', methods=['DELETE'])
def delete_word(word_id):
    user = User.objects(username=session['username'])
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
