#!flask/bin/python
from flask import Flask, abort, request, render_template, Response

import os
from difflib import SequenceMatcher

from users import *

"""
def rate_words(word_get,word_post):
    current_ratio = SequenceMatcher(None,word_get,word_post).ratio()
    return str(current_ratio)

def rate_alg(l):
    if "1, 1, 1, 1" in str(l):
        return 1
    elif l.count(1) > l.count(0):
        return 0
    else:
        return -1

"""
@app.route('/api/users/<username>/compare/<original>/<winput>', methods=['GET'])
def compare(username,original,winput):
    word = original
    user = User.objects(username=username)
    l_word = user.to_json()
    words = json.loads(l_word)[0]["words"]
    translation= [word["translation"] for word in words if word["word"]==original]

    return rate_words(translation[0],winput)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
