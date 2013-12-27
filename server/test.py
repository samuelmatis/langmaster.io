from db import *
from app import *
from flask import request, session, abort, Response, jsonify, render_template
import json
from difflib import SequenceMatcher


def rate_words(word_get, word_post):
    current_ratio = SequenceMatcher(None, word_get, word_post).ratio()
    return str(current_ratio)


@app.route('/api/test/compare', methods=['POST'])
def compare():
    original = request.form["origin"]
    want = request.form["input"]
    user = User.objects(username=session['username'])
    l_word = user.to_json()
    words = json.loads(l_word)[0]["words"]
    translation = [word["translation"] for word in words
                   if word["word"] == original]
    if translation == []:
        abort(404)
    return rate_words(translation[0], want)


def rate_alg(l):
    l = list(l)
    if "1, 1, 1" in str(l):
        return 1
    elif l.count(1) > l.count(0):
        return 0
    else:
        return -1


@app.route('/api/test', methods=['POST'])
def test():
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
    user = User.objects(username=session['username'])
    user_json = json.loads(user.to_json())
    words = user_json[0]["words"]
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
    return Response(json.dumps(word, sort_keys=False, indent=4), mimetype='application/json')
