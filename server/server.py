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
from flask import Response


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
server = "ds053948.mongolab.com"
port = 53948
db_name = 'words'
username = "admin"
password = "iicenajv"

con = Connection(server, port)
db = con[db_name]
db.authenticate(username, password)
words = db.words
users = db.users

def mongo_to_dict(obj):
    return_data = []

    if isinstance(obj, Document):
        return_data.append(("id", str(obj.id)))

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

class Word(EmbeddedDocument):
    word_id = IntField(primary_key=True)
    word = StringField()
    translation = StringField()
    strength = IntField()
    meta = {'collection': 'users'}

    def to_dict(self):
        return mongo_to_dict(self)

class User(Document):
    user_id = IntField()
    username = StringField()
    email = EmailField()
    password = StringField()
    words = ListField(EmbeddedDocumentField(Word))
    meta = {'collection': 'users',
    'ordering': ['-user_id']
}

    def to_dict(self):
        return mongo_to_dict(self)




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
                "set__password": request.json.get("password",
                                                     decoded[0]
                                                     ["password"]),
                "set__email": request.json.get("email", decoded[0]
                                                  ["email"]),
                "set__user_id": request.json.get("user_id", decoded[0]["user_id"])
                })
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
                strength=1)
    words.append(word.to_dict())
    user.update(**{"set__words":words})
    return Response(json.dumps(words[-1], sort_keys=False, indent=4),
                    mimetype='application/json')

@app.route('/api/users/<username>/words/<int:word_id>', methods=['GET'])
def get_word(username, word_id):
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





SECRET_KEY = 'development key'
FACEBOOK_APP_ID = '188477911223606'
FACEBOOK_APP_SECRET = '621413ddea2bcc5b2e83d42fc40495de'

app.secret_key = SECRET_KEY
oauth = OAuth()

facebook = oauth.remote_app('facebook',
                            base_url='https://graph.facebook.com/',
                            request_token_url=None,
                            access_token_url='/oauth/access_token',
                            authorize_url=
                            'https://www.facebook.com/dialog/oauth',
                            consumer_key=FACEBOOK_APP_ID,
                            consumer_secret=FACEBOOK_APP_SECRET,
                            request_token_params={'scope': 'email'}
                            )


@app.route('/loginfb')
def loginfb():
    return facebook.authorize(callback=url_for('facebook_authorized',
                              next=request.args.get('next') or request.referrer
                              or None,
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


GOOGLE_CLIENT_ID = """64446003559-i2qke48amoofnrm7a
sg6p1ojb1vvjoc5.apps.googleusercontent.com"""
GOOGLE_CLIENT_SECRET = '5C03wigw8xp2bCCXjLO6KVz8'
REDIRECT_URI = '/'
DEBUG = True

app.secret_key = SECRET_KEY
oauth = OAuth()

google = oauth.remote_app('google',
                          base_url='https://www.google.com/accounts/',
                          authorize_url=
                          'https://accounts.google.com/o/oauth2/auth',
                          request_token_url=None,
                          request_token_params=
                          {'scope':
                              'https://www.googleapis.com/auth/userinfo.email',
                              'response_type': 'code'},
                          access_token_url=
                          'https://accounts.google.com/o/oauth2/token',
                          access_token_method='POST',
                          access_token_params=
                          {'grant_type': 'authorization_code'},
                          consumer_key=GOOGLE_CLIENT_ID,
                          consumer_secret=GOOGLE_CLIENT_SECRET)


@app.route('/loginplus')
def loginplus():
    callback = url_for('authorized', _external=True)
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
