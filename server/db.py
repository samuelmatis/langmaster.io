from mongoengine import *
import os
from flask import session, Response
import json
from functools import wraps

# Connect to MongoDB
connect(
    'words',
    host=os.environ['MONGOLAB_URI']
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


# Make dict from MongoDB collection
def make_dict(obj):
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
            return_data.append((field_name, data))
        elif isinstance(obj._fields[field_name], FloatField):
            return_data.append((field_name, float(data)))
        elif isinstance(obj._fields[field_name], IntField):
            return_data.append((field_name, int(data)))
        elif isinstance(obj._fields[field_name], ListField):
            return_data.append((field_name, data))
        elif isinstance(obj._fields[field_name], EmbeddedDocumentField):
            return_data.append((field_name, mongo_to_dict(data)))

    return dict(return_data)


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
