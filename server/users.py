from db import *
from auth import *
from flask import request, abort, Response, jsonify, render_template
import json
from difflib import SequenceMatcher


# Flask views for user API
@app.route('/')
def index():
    return render_template("home.html")



@app.route('/api/login/facebook', methods=['POST'])
def login_fb():
    name = create_user(request.form['name'],request.form['email'])
    return name

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')


#git test

@app.route('/api/users', methods=['POST'])
def create_user(username, email):
    if username and email:
        uname, emil = username, email
    else:
        uname, emil = request.json["username"], request.json["email"]
    kokti =str({"username": uname, "email":email})
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    try:
        u_id = decoded[0]["user_id"]+1
    except:
        u_id = 1
    user = User(user_id=u_id,
                username=uname,
                email=emil,
                words=[])

    user.save()
    decoded = user.to_dict()
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')



@app.route('/api/users/<username>', methods=['GET'])
def get_user(username):
    user = User.objects(username="samuelicek", token="123")
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                mimetype='application/json')


@app.route('/api/users/<username>', methods=['PUT'])
def update_user(username):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    user.update(**{
            "set__username": request.json.get("username",
                                              decoded[0]["username"]),
            "set__password": request.json.get("password",
                                              decoded[0]["password"]),
            "set__email": request.json.get("email",
                                           decoded[0]["email"]),
            "set__user_id": decoded[0]["user_id"]})

    user = User.objects(username=request.json.get("username",
                        decoded[0]["username"]))
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return Response(json.dumps(decoded, sort_keys=False, indent=4),
                    mimetype='application/json')



@app.route('/api/users/<username>', methods=['DELETE'])
def delete_user(username):
    user = User.objects(username=username)
    l_user = user.to_json()
    decoded = json.loads(l_user)
    if decoded == []:
        abort(404)
    user.delete()
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
    user.update(**{"set__words": words})
    return Response(json.dumps(words[-1], sort_keys=False, indent=4),
                    mimetype='application/json')



@app.route('/api/users/<username>/words/<wordname>', methods=['GET'])
def get_word(username, wordname):
    user = User.objects(username=username)
    l_word = user.to_json()
    decoded = json.loads(l_word)
    words = decoded[0]["words"]
    word = [word for word in words if word["word"] == wordname]
    if word == []:
        abort(404)
    return Response(json.dumps(word[0], sort_keys=False, indent=4),
                    mimetype='application/json')


@app.route('/api/users/<username>/words/<int:word_id>', methods=['GET'])
def get_word_id(username, word_id):
    user = User.objects(username=username)
    l_word = user.to_json()
    decoded = json.loads(l_word)
    words = decoded[0]["words"]
    word = [word for word in words if word["word_id"] == word_id]
    if word == []:
        abort(404)
    return Response(json.dumps(word[0], sort_keys=False, indent=4),
                    mimetype='application/json')



@app.route('/api/users/<username>/words/<int:word_id>', methods=['PUT'])
def change_word(username, word_id):
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
                strength=1)

    new_word = word.to_dict()
    words[wordid_index[0]] = new_word
    user.update(**{"set__words": words})
    return Response(json.dumps(new_word, sort_keys=False, indent=4),
                    mimetype='application/json')

#hello
@app.route('/api/users/<username>/words/<int:word_id>', methods=['DELETE'])
def delete_word(username, word_id):
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


def rate_words(word_get, word_post):
    current_ratio = SequenceMatcher(None, word_get, word_post).ratio()
    return str(current_ratio)


# Flask view for comparing two words
@app.route('/api/users/<username>/compare', methods=['POST'])
def compare(username):
    original = request.json["origin"]
    want = request.json["input"]
    user = User.objects(username=username)
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


@app.route('/api/users/<username>/test', methods=['POST'])
def test(username):
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





@app.route('/api/login/twitter', methods=['POST'])
def login_tw():
    pass


@app.route('/api/login/google', methods=['GET'])
@login_manager.user_loader
def login_plus():
    return User.get(userid)

@app.route("/logincek", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # login and validate the user...
        login_user(user)
        flash("Logged in successfully.")
        return redirect(request.args.get("next") or url_for("index"))
    return render_template("login.html", form=form)


