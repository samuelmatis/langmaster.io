from mongoengine import *
import os
from flask import session, Response
import json
from functools import wraps

# Connect to MongoDB
connect(
    'words',
    host='mongodb://admin:iicenajv@ds053948.mongolab.com:53948/words'
)

def logged_in(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('email') is not None:
            return f(*args, **kwargs)
        else:
            return Response(json.dumps(
                {"error": "Authentication is required"},
                sort_keys=True, indent=4), mimetype='application/json')

    return decorated_function


# Define mongoengine schema
class Word(EmbeddedDocument):
    word_id = IntField(unique=True)
    word = StringField()
    translation = StringField()
    strength = IntField()
    last_test = StringField()
    points = IntField()
    last_points = IntField()
    meta = {'collection': 'users'}

    def to_dict(self):
        return make_dict(self)

class Type(EmbeddedDocument):
    type = StringField()
    profile_url = StringField()
    meta = {'collection': 'users'}

    def to_dict(self):
        return make_dict(self)

class User(Document):
    user_id = IntField(unique=True)
    username = StringField()
    name = StringField()
    email = StringField(unique=True)
    picture = StringField()
    points = IntField()
    type = ListField(EmbeddedDocumentField(Type))
    bio = StringField(max_length=150)
    first_login = StringField()
    location = StringField()
    native = StringField()
    num_words = IntField()
    words = ListField(EmbeddedDocumentField(Word))
    meta = {'collection': 'users', 'ordering': ['-user_id']}

    def to_dict(self):
        return make_dict(self)
