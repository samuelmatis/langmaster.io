from db import *
from app import *
from flask import request, session, abort, Response
import json


@app.route('/api/user/words', methods=['GET'])
def get_words():
    user = User.objects(email=session.get('email', ''))
    user_json = json.loads(user.to_json())
    return Response(json.dumps(user_json[0]["words"], sort_keys=True, indent=4), mimetype='application/json')


@app.route('/api/user/words/<int:word_id>', methods=['GET'])
def get_word_id(word_id):
    user = User.objects(email=session.get('email',''))
    user_json = json.loads(user.to_json())
    words = user_json[0]["words"]
    word = [word for word in words if word["word_id"] == word_id]
    if word == []:
        abort(404)
    return Response(json.dumps(word[0], sort_keys=True, indent=4), mimetype='application/json')


@app.route('/api/user/words', methods=['POST'])
def create_word():
    user = User.objects(email=session.get('email',''))
    user_json = json.loads(user.to_json())
    try:
        words = user_json[0]["words"]
    except:
        words = []
    try:
        u_id = words[-1]["word_id"] + 1
    except:
        u_id = 1
    word = Word(word_id=u_id,
                word=request.json["word"],
                translation=request.json["translation"],
                last_test="",
                points=0,
                last_points=0,
                strength=0)
    words.append(word.to_dict())
    user.update(**{
            "set__words": words,
            "set__num_words": user_json[0]["num_words"] + 1})
    return Response(json.dumps(words[-1], sort_keys=True, indent=4), mimetype='application/json')


@app.route('/api/user/words/<int:word_id>', methods=['PUT'])
def change_word(word_id):
    user = User.objects(email=session.get('email',''))
    user_json = json.loads(user.to_json())
    words = user_json[0]["words"]
    wordid_index = [k for k in range(len(words)) if words[k]["word_id"]
                    == word_id]
    if [word_id for word in words if word["word_id"] == word_id] == []:
        abort(404)
    wordid = [word_id for word in words if word["word_id"] == word_id][0]
    word = Word(word_id=wordid,
                word=request.json.get("word", words[wordid_index[0]]["word"]),
                translation=request.json.get("translation", words[wordid_index[0]]["translation"]),
                points = words[wordid]["points"],
                last_points = words[wordid]["last_points"],
                last_test = words[wordid]["last_test"],
                strength=words[wordid]["strength"])

    new_word = word.to_dict()
    words[wordid_index[0]] = new_word
    user.update(**{"set__words": words})
    return Response(json.dumps(new_word, sort_keys=True, indent=4), mimetype='application/json')


@app.route('/api/user/words/<int:word_id>', methods=['DELETE'])
def delete_word(word_id):
    user = User.objects(email=session.get('email',''))
    user_json = json.loads(user.to_json())
    words = user_json[0]["words"]
    word = [word for word in words if word["word_id"] == word_id]
    if word == []:
        abort(404)
    words.pop(words.index(word[0]))
    user.update(**{
            "set__words": words,
            "set__num_words": user_json[0]["num_words"] - 1})
    return Response(json.dumps(words, sort_keys=True, indent=4), mimetype='application/json')
