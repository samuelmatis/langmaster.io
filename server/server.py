#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response, \
    url_for, render_template, Response
import datetime
import pymongo
from pymongo import Connection
from bson import json_util
import json
from bson.json_util import loads
from flask import Flask, redirect, url_for, session
from flask_oauth import OAuth
from flask.ext.mongoengine import MongoEngine
from mongoengine import *
import datetime
from flask.ext.mongoengine import MongoEngine


app = Flask(__name__, static_folder='../app', static_url_path='',
            template_folder='../app')
app.config["MONGODB_DB"] = 'words'
connect(
    'words',
    username='admin',
    password='iicenajv',
    host='mongodb://admin:iicenajv@ds053948.mongolab.com:53948/words',
    port=53948
)
"""
server = "ds053948.mongolab.com"
port = 53948
db_name = 'words'
username = "admin"
password = "iicenajv"
connect('words', username=username, password=password)
con = Connection(server, port)
app.config["MONGODB_SETTINGS"] = {'DB': "words"}
app.config["SECRET_KEY"] = "KeepThisS3cr3t"
db = MongoEngine(app)#con[db_name]
#db.authenticate(username, password)
#words =  db.words
#users = db.users
"""


@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

class Item(Document):
    userid = IntField()
    username = StringField()
    email = EmailField()
    password = StringField()
    meta = {'collection': 'words'}

    def to_dict(self):
        return mongo_to_dict(self)


@app.route('/api/words/', methods=['GET'])
def get_words():
    """l_words = list(words.find())
    Jsonwords = json.dumps(l_words, sort_keys=True, default=json_util.default)
    decoded = json.loads(Jsonwords)
    return jsonify({"words": decoded})
    """
    items = Item.objects()
    l_items = items.to_json()
    #Jsonwords = json.dumps(l_users, sort_keys=True, default=json_util.default)
    decoded = json.loads(l_items)
    return jsonify({"users": decoded})

@app.route('/api/words/<int:word_id>/', methods=['GET'])
def get_id_word(word_id):
    Jsonwords = json.dumps(words.find_one({"id": word_id}), sort_keys=True,
                           default=json_util.default)
    Jsonpage = Response(response=Jsonwords, mimetype="application/json")
    return Jsonpage

@app.route('/api/words/<word>/', methods=['GET'])
def get_word(word):
    Jsonwords = json.dumps(words.find_one({"word": word}), sort_keys=True,
                           default=json_util.default)
    Jsonpage = Response(response=Jsonwords, mimetype="application/json")
    return Jsonpage



@app.route('/api/words/', methods=['POST'])
def create_word():
    if not request.json or not 'word' in request.json:
        abort(400)
    l_words = list(words.find())
    item = {
        'id': l_words[-1]['id'] + 1,
        'word': request.json["word"],
        'translation': request.json["translation"],
        'knowIndex': 0
    }
    words.insert(item)
    Jsonwords = json.dumps(item, sort_keys=True, default=json_util.default)
    decoded = json.loads(Jsonwords)
    return jsonify({"item": decoded}), 201


@app.route('/api/words/<int:word_id>/', methods=['PUT'])
def update_word(word_id):
    item = words.find_one({"id": word_id})
    if len(item) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'word' in request.json and type(request.json['word']) != unicode:
        abort(400)
    if 'translation' in request.json and \
            type(request.json['translation']) is not unicode:
        abort(400)
    if 'knowIndex' in request.json and type(request.json['done']) is not int:
        abort(400)
    item['word'] = request.json.get('word', item['word'])
    item['translation'] = request.json.get('translation', item['translation'])
    item['knowIndex'] = request.json.get('knowIndex', item['knowIndex'])
    n_item = {}
    for data in item:
        if data != "_id":
            n_item[data] = item[data]
    words.update({'_id': item['_id']}, {"$set": n_item}, upsert=False)
    return jsonify({'user': n_item})

    return jsonify({'item': n_item})

    user = users.find_one({"username": user_name})
    if len(user) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'username' in request.json and \
            type(request.json['username']) != unicode:
        abort(400)
    if 'password' in request.json and \
            type(request.json['password']) != unicode:
        abort(400)
    if 'email' in request.json and type(request.json['email']) != unicode:
        abort(400)

    user['username'] = request.json.get('username', user['username'])
    user['password'] = request.json.get('password', user['password'])
    user['email'] = request.json.get('email', user['email'])
    user['words'] = request.json.get('words', user['words'])


@app.route('/api/words/<int:word_id>/', methods=['DELETE'])
def delete_word(word_id):
    item = words.find_one({"id": word_id})
    if len(item) == 0:
        abort(404)
    words.remove(item)
    return jsonify({'result': True})

def mongo_to_dict(obj):
    return_data = []

    if isinstance(obj, Document):
        return_data.append(("id",str(obj.id)))

    for field_name in obj._fields:

        if field_name in ("id",):
            continue

        data = obj._data[field_name]

        if isinstance(obj._fields[field_name], DateTimeField):
            return_data.append((field_name, str(data.isoformat())))
        elif isinstance(obj._fields[field_name], StringField):
            return_data.append((field_name, str(data)))
        elif isinstance(obj._fields[field_name], FloatField):
            return_data.append((field_name, float(data)))
        elif isinstance(obj._fields[field_name], IntField):
            return_data.append((field_name, int(data)))
        elif isinstance(obj._fields[field_name], ListField):
            return_data.append((field_name, data))
        elif isinstance(obj._fields[field_name], EmbeddedDocumentField):
            return_data.append((field_name, mongo_to_dict(data)))

    return dict(return_data)


class User(Document):
    userid = IntField()
    username = StringField()
    email = EmailField()
    password = StringField()
    meta = {'collection': 'users'}

    def to_dict(self):
        return mongo_to_dict(self)



@app.route('/api/users/', methods=['GET'])
def get_users():
    users = User.objects()
    l_users = users.to_json()
    #Jsonwords = json.dumps(l_users, sort_keys=True, default=json_util.default)
    decoded = json.loads(l_users)
    return jsonify({"users": decoded})


@app.route('/api/users/<user_name>/', methods=['GET'])
def get_user(user_name):
    """
    if str(json.dumps(users.find_one({"name": user_name}),
           sort_keys=True, default=json_util.default)) != "null":
        Jsonwords = json.dumps(users.find_one({"name": user_name}),
                               sort_keys=True, default=json_util.default)
    else:
        Jsonwords = json.dumps(users.find_one({"username": user_name}),
                               sort_keys=True, default=json_util.default)
    Jsonpage = Response(response=Jsonwords, mimetype="application/json")
    return Jsonpage"""
    user = User.objects(username=user_name)[0]
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return jsonify({"user":decoded})



@app.route('/api/users/', methods=['POST'])
def create_user():
    """if not request.json or not 'username' in request.json:
        abort(400)
    l_users = list(users.find())
    user = {
        'id': l_users[-1]['id'] + 1,
        'username': request.json["username"],
        'password': request.json["password"],
        'email': request.json["email"],
        'words': []
    }"""
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    dataset = {"users": decoded}
    user = User(userid=(dataset["users"][-1]["userid"])+1 ,username=request.json["username"],email=request.json["email"],password=request.json["password"])
    #users.insert(user)
    #user.reload()
    user.save()
    #dataset = jsonify(users=user.to_dict())
    return jsonify(users=user.to_dict())
    """Jsonwords = json.dumps(user, sort_keys=True, default=json_util.default)
    decoded = json.loads(Jsonwords)
    return jsonify({'user': decoded}), 201
    """

@app.route('/api/users/<user_name>/', methods=['PUT'])
def update_user(user_name):
    """
    user = users.find_one({"username": user_name})
    if len(user) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'username' in request.json and \
            type(request.json['username']) != unicode:
        abort(400)
    if 'password' in request.json and \
            type(request.json['password']) != unicode:
        abort(400)
    if 'email' in request.json and type(request.json['email']) != unicode:
        abort(400)

    user['username'] = request.json.get('username', user['username'])
    user['password'] = request.json.get('password', user['password'])
    user['email'] = request.json.get('email', user['email'])
    user['words'] = request.json.get('words', user['words'])
    n_user = {}
    for data in user:
        if data != "_id":
            n_user[data] = user[data]
    users.update({'_id': user['_id']}, {"$set": n_user}, upsert=False)
    return jsonify({'user': n_user})
    """
    user = User.objects(username=user_name)[0]
    l_user = user.to_json()
    decoded = json.loads(l_user)
    dataset = {"user": decoded}
    user.update(**{
    "set__username": request.json.get("username",dataset["user"]["username"]),
    "set__password": request.json.get("password",dataset["user"]["password"]),
    "set__email": request.json.get("email",dataset["user"]["email"])
})
    return "ok"
@app.route('/api/users/<user_name>/', methods=['DELETE'])
def delete_user(user_name):
    """user = users.find_one({"username": user_name})
    if len(user) == 0:
        abort(404)
    users.remove(user)
    return jsonify({'result': True})
    """
    user = User.objects(username=user_name)[0]
    user.delete()
    return "deleted"

SECRET_KEY = 'development key'
DEBUG = True
FACEBOOK_APP_ID = '188477911223606'
FACEBOOK_APP_SECRET = '621413ddea2bcc5b2e83d42fc40495de'

app.secret_key = SECRET_KEY
oauth = OAuth()

facebook = oauth.remote_app('facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key=FACEBOOK_APP_ID,
    consumer_secret=FACEBOOK_APP_SECRET,
    request_token_params={'scope': 'email'}
)

@app.route('/loginfb')
def loginfb():
    return facebook.authorize(callback=url_for('facebook_authorized',
        next=request.args.get('next') or request.referrer or None,
        _external=True))
@app.route('/login/authorized')
@facebook.authorized_handler
def facebook_authorized(resp):
    if resp is None:
        return 'Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        )
    session['oauth_token'] = (resp['access_token'], '')
    me = facebook.get('/me')
    return 'Logged in as id=%s name=%s redirect=%s' % \
        (me.data['id'], me.data['name'], request.args.get('next'))


@facebook.tokengetter
def get_facebook_oauth_token():
    return session.get('oauth_token')


GOOGLE_CLIENT_ID = '64446003559-i2qke48amoofnrm7asg6p1ojb1vvjoc5.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = '5C03wigw8xp2bCCXjLO6KVz8'
REDIRECT_URI = '/'  # one of the Redirect URIs from Google APIs console
DEBUG = True

app.secret_key = SECRET_KEY
oauth = OAuth()

google = oauth.remote_app('google',
                          base_url='https://www.google.com/accounts/',
                          authorize_url='https://accounts.google.com/o/oauth2/auth',
                          request_token_url=None,
                          request_token_params={'scope': 'https://www.googleapis.com/auth/userinfo.email',
                                                'response_type': 'code'},
                          access_token_url='https://accounts.google.com/o/oauth2/token',
                          access_token_method='POST',
                          access_token_params={'grant_type': 'authorization_code'},
                          consumer_key=GOOGLE_CLIENT_ID,
                          consumer_secret=GOOGLE_CLIENT_SECRET)




@app.route('/loginplus')
def loginplus():
    callback=url_for('authorized', _external=True)
    return google.authorize(callback=callback)



@app.route(REDIRECT_URI)
@google.authorized_handler
def authorized(resp):
    access_token = resp['access_token']
    session['access_token'] = access_token, ''
    return redirect(url_for('index'))


@google.tokengetter
def get_access_token():
    return session.get('access_token')


if __name__ == '__main__':
    app.run(debug=True)
