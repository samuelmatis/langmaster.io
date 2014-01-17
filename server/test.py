from db import *
from app import *
from flask import request, session, abort, Response
import json
from difflib import SequenceMatcher
from datetime import datetime
import unicodedata


def remove_diacritic(input):
    return unicodedata.normalize('NFKD', input).encode('ASCII', 'ignore')


def compare(words, original, written):
    translation = [word["translation"] for word in words if word["word"] == original]
    if translation == []:
        abort(404)
    return str(SequenceMatcher(None, remove_diacritic(translation[0]).lower(), remove_diacritic(written).lower()).ratio())

@app.route('/api/test', methods=['POST'])
def test():
    user = User.objects(email=session['email'])
    l_word = user.to_json()
    words = json.loads(l_word)[0]["words"]

    compare_result = compare(words, request.form['origin'], request.form['input'])
    strength, points, last_points, word_id = [(word['strength'], word['points'], word['last_points'], word['word_id']) for word in words if word["word"] == request.form['origin']][0]

    compare_r = int(compare_result[0])
    if strength in [0,1]:
        if compare_r == 1.0: points = 10
        elif compare_r < 1.0 and compare_r >= 0.9 : points = 5
        elif compare_r < 0.9: points = -5
    elif strength == 2:
        if compare_r == 1.0: points = 8
        elif compare_r < 1.0 and compare_r >= 0.9 : points = 4
        elif compare_r < 0.9: points = -4
    elif strength == 3:
        if compare_r == 1.0: points = 5
        elif compare_r < 1.0 and compare_r >= 0.9 : points = 3
        elif compare_r < 0.9: points = -3
    elif strength in [4,5]:
        if compare_r == 1.0: points = 3
        elif compare_r < 1.0 and compare_r >= 0.9 : points = 1
        elif compare_r < 0.9: points = -1

    word_index = [k for k in range(len(words)) if words[k]["word_id"] == word_id][0]
    words[word_index]["last_points"] = words[word_index]["last_points"] + points
    user.update(**{"set__words": words})

    return compare_result

def edit_strength(operation, num, last_points, success):
    if operation == "+":
        word["strength"] = word["strength"] + 1
    elif operation == "-":
        word["strength"] = word["strength"] - 1

    if last_points == 0:
        word["last_points"] = 0
    else:
        word["last_points"] = word["last_points"] - last_points

    word["success"] = success
    testa.append(word)

@app.route('/api/test/end', methods=['POST'])
def test_end():
    user = User.objects(email=session.get('email',''))
    user_json = json.loads(user.to_json())
    words = user_json[0]["words"]

    l_points = [word["last_points"] for word in words]

    testa = []
    for i in range(len(words)):
        word = words[i]

        if str(word["word_id"]) in request.json["words"]:
            word["last_test"]  =  datetime.now().strftime('%Y-%m-%d')
            if word["strength"] == 0 and word["last_points"] >= 30:
                edit_strength("+", 1, 30, 1)
            elif word["strength"] == 1 and word["last_points"] >= 40:
                edit_strength("+", 1, 40, 1)
            elif word["strength"] == 1 and word["last_points"] <= -50:
                edit_strength("-", 1, 0, -1)
            elif word["strength"] == 2 and word["last_points"] >= 60:
                edit_strength("+", 1, 60, 1)
            elif word["strength"] == 2 and word["last_points"] <= -40:
                edit_strength("-", 1, 0, -1)
            elif word["strength"] == 3 and word["last_points"] >= 80:
                edit_strength("+", 1, 80, 1)
            elif word["strength"] == 3 and word["last_points"] <= -30:
                edit_strength("-", 1, 0, -1)
            elif word["strength"] == 4 and word["last_points"] >= 100:
                edit_strength("+", 1, 100, 1)
            elif word["strength"] == 4 and word["last_points"] <= -20:
                edit_strength("-", 1, 0, -1)
            elif word["strength"] == 5 and word["last_points"] <= -10:
                edit_strength("-", 1, 0, -1)
            else:
                word["success"] = 0
                testa.append(word)

    user.update(**{"set__points": user_json[0]["points"] + sum(l_points)})
    user.update(**{"set__words": words})

    return Response(json.dumps(testa, sort_keys=True, indent=4), mimetype='application/json')
