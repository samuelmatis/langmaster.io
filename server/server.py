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


class User(Document):
    user_id = IntField()
    username = StringField()
    email = EmailField()
    password = StringField()
    meta = {'collection': 'users'}

    def to_dict(self):
        return mongo_to_dict(self)


class Item(Document):
    item_id = IntField()
    word = StringField()
    translation = StringField()
    strength = IntField()
    meta = {'collection': 'words'}

    def to_dict(self):
        return mongo_to_dict(self)


@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")


@app.route('/api/words/', methods=['GET'])
def get_words():
    items = Item.objects()
    l_items = items.to_json()
    decoded = json.loads(l_items)
    return json.dumps(decoded, sort_keys = False, indent = 4)

@app.route('/api/words/', methods=['POST'])
def create_word():
    items = Item.objects()
    l_items = items.to_json()
    decoded = json.loads(l_items)
    dataset = {"items": decoded}
    item = Item(item_id=(dataset["items"][-1]["item_id"])+1,
                word=request.json["word"],
                translation=request.json["translation"], strength=0)
    item.save()
    return json.dumps(item.to_dict(),sort_keys = False, indent = 4)


@app.route('/api/words/<int:word_id>/', methods=['GET'])
def get_id_word(word_id):
    item = Item.objects(item_id=word_id)[0]
    l_item = item.to_json()
    decoded = json.loads(l_item)
    return json.dumps(decoded, sort_keys = False, indent = 4)


@app.route('/api/words/<word>/', methods=['GET'])
def get_word(word):
    item = Item.objects(word=word)[0]
    l_item = item.to_json()
    decoded = json.loads(l_item)
    return json.dumps(decoded, sort_keys = False, indent = 4)


@app.route('/api/words/<int:word_id>/', methods=['PUT'])
def update_word(word_id):
    item = Item.objects(item_id=word_id)[0]
    l_item = item.to_json()
    decoded = json.loads(l_item)
    dataset = {"item": decoded}
    item.update(**{
                "set__word": request.json.get("word", dataset["item"]["word"]),
                "set__translation": request.json.get("translation",
                                                     dataset["item"]
                                                     ["translation"]),
                "set__strength": request.json.get("strength", dataset["item"]
                                                  ["strength"]),
                "set__item_id": request.json.get("item_id", dataset["item"]
                                                 ["item_id"])
                })
    item = Item.objects(item_id=(request.json.get("item_id", dataset["item"]
                                                  ["item_id"])))
    l_item = item.to_json()
    decoded = json.loads(l_item)
    return  json.dumps(decoded, sort_keys = False, indent = 4)


@app.route('/api/words/<int:word_id>/', methods=['DELETE'])
def delete_word(word_id):
    item = Item.objects(item_id=word_id)[0]
    l_item = item.to_json()
    decoded = json.loads(l_item)
    item.delete()
    return json.dumps(decoded, sort_keys = False, indent = 4)


@app.route('/api/users/', methods=['GET'])
def get_users():
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    return json.dumps(decoded, sort_keys = False, indent = 4)


@app.route('/api/users/', methods=['POST'])
def create_user():
    users = User.objects()
    l_users = users.to_json()
    decoded = json.loads(l_users)
    dataset = {"users": decoded}
    user = User(user_id=(dataset["users"][-1]["user_id"])+1,
                username=request.json["username"], email=request.json["email"],
                password=request.json["password"])
    user.save()
    return json.dumps(user.to_dict(), sort_keys = False, indent = 4)


@app.route('/api/users/<user_name>/', methods=['GET'])
def get_user(user_name):
    user = User.objects(username=user_name)[0]
    l_user = user.to_json()
    decoded = json.loads(l_user)
    return json.dumps(decoded, sort_keys = False, indent = 4)

@app.route('/api/users/<user_name>/', methods=['PUT'])
def update_user(user_name):
    user = User.objects(username=user_name)[0]
    l_user = user.to_json()
    decoded = json.loads(l_user)
    dataset = {"user": decoded}
    user.update(**{
                "set__username": request.json.get("username", dataset["user"]
                                                  ["username"]),
                "set__password": request.json.get("password", dataset["user"]
                                                  ["password"]),
                "set__email": request.json.get("email", dataset["user"]
                                               ["email"]),
                "set__user_id": request.json.get("user_id", dataset["user"]
                                                 ["user_id"])
                })
    return json.dumps(decoded, sort_keys = False, indent = 4)


@app.route('/api/users/<user_name>/', methods=['DELETE'])
def delete_user(user_name):
    user = User.objects(username=user_name)[0]
    l_user = user.to_json()
    decoded = json.loads(l_user)
    user.delete()
    return json.dumps(decoded, sort_keys = False, indent = 4)

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
