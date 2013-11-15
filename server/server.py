#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response, \
 url_for, render_template, Response
import datetime
import pymongo
from pymongo import Connection
from bson import json_util
import json
import ast
from bson.json_util import loads


app = Flask(__name__, static_folder='../app', static_url_path='', template_folder='../app')


server = "ds053948.mongolab.com"
port = 53948
db_name = 'words'
username = "admin"
password = "iicenajv"


#MONGO_URL = "mongodb://admin:iicenajv@ds053948.mongolab.com:53948/words"
#client = MongoClient(MONGO_URL)
#db = client.mydatabase
con = Connection(server, port)
db = con[db_name]
db.authenticate(username, password)
words = db.words
users = db.users




@app.route('/', methods = ['GET'])
def home():
    return render_template("index.html")


"""success"""
@app.route('/api/words/', methods = ['GET'])
def get_words():
    l_words = list(words.find())
    Jsonwords = json.dumps(l_words, sort_keys=True, default=json_util.default)
    decoded = json.loads(Jsonwords)
    return jsonify({"words":decoded})

""" success """
@app.route('/api/words/<int:word_id>/', methods = ['GET'])
def get_word(word_id):
    Jsonwords = json.dumps(words.find_one({"id" : word_id}), sort_keys=True, default=json_util.default)
    Jsonpage = Response(response=Jsonwords, mimetype="application/json")
    return Jsonpage

"""success"""
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.route('/api/words/', methods = ['POST'])
def create_word():
    if not request.json or not 'word' in request.json:
        abort(400)
    item = {
        'id': words[-1]['id'] + 1,
        'word': request.json["word"],
        'translation': request.json.get('translation', ""),
        'knowIndex': 2
    }
    words.append(item)
    return jsonify( { 'item': item } ), 201

@app.route('/api/words/<int:word_id>/', methods = ['PUT'])
def update_word(word_id):
    item = filter(lambda t: t['id'] == word_id, words)
    if len(item) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'word' in request.json and type(request.json['word']) != unicode:
        abort(400)
    if 'translation' in request.json and type(request.json['translation']) is not unicode:
        abort(400)
    if 'knowIndex' in request.json and type(request.json['done']) is not int:
        abort(400)
    item[0]['word'] = request.json.get('word', item[0]['word'])
    item[0]['translation'] = request.json.get('translation', item[0]['translation'])
    item[0]['knowIndex'] = request.json.get('knowIndex', item[0]['knowIndex'])
    return jsonify( { 'item': item[0] } )

@app.route('/api/words/<int:word_id>/', methods = ['DELETE'])
def delete_word(word_id):
    item = filter(lambda t: t['id'] == word_id, words)
    if len(item) == 0:
        abort(404)
    words.remove(item[0])
    return jsonify( { 'result': True } )


"""success"""
@app.route('/api/users/' , methods = ['GET'])
def get_users():
    l_users = list(users.find())
    Jsonwords = json.dumps(l_users, sort_keys=True, default=json_util.default)
    decoded = json.loads(Jsonwords)
    return jsonify({"words":decoded})


"""success"""
@app.route('/api/users/<user_name>/' , methods = ['GET'])
def get_user(user_name):
    Jsonwords = json.dumps(users.find_one({"name": user_name}), sort_keys=True, default=json_util.default)
    Jsonpage = Response(response=Jsonwords, mimetype="application/json")
    return Jsonpage

@app.route('/api/users/', methods = ['POST'])
def create_user():
    if not request.json or not 'username' in request.json:
        abort(400)
    user = {
        'id': users[-1]['id'] + 1,
        'username': request.json["username"],
        'password': request.json["password"],
        'email': request.json["email"],
        'words': []
    }
    users.append(user)
    return jsonify( { 'user': user } ), 201



@app.route('/api/users/<user_name>/', methods = ['PUT'])
def update_user(user_name):
    user = filter(lambda t: t['username'] == user_name, users)
    if len(user) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'username' in request.json and type(request.json['username']) != unicode:
        abort(400)
    if 'password' in request.json and type(request.json['password']) is not unicode:
        abort(400)
    if 'email' in request.json and type(request.json['email']) is not unicode:
        abort(400)
    user[0]['username'] = request.json.get('username', user[0]['username'])
    user[0]['password'] = request.json.get('password', user[0]['password'])
    user[0]['email'] = request.json.get('email', user[0]['email'])
    user[0]['words'] = request.json.get('words', user[0]['words'])
    return jsonify( { 'user': user[0] } )

@app.route('/api/users/<user_name>/', methods = ['DELETE'])
def delete_user(user_name):
    user = filter(lambda t: t['username'] == user_name, users)
    if len(user) == 0:
        abort(404)
    users.remove(user[0])
    return jsonify( { 'result': True } )


if __name__ == '__main__':
    app.run(debug = True)
