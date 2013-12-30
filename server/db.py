from mongoengine import *
from flask.ext.mongoengine import MongoEngine
import os

# Connectionry to MongoDB
connect(
    'words',
    host=os.environ['MONGOLAB_URI']
)

# Make dict from MongoDB collec
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

# Define mongoengine documents
class Word(EmbeddedDocument):
    word_id = IntField()
    word = StringField()
    translation = StringField()
    strength = IntField()
    meta = {'collection': 'users'}

    def to_dict(self):
        return make_dict(self)


class User(Document):
    user_id = IntField(unique=True)
    username = StringField(max_length=20, unique=True)
    name = StringField()
    email = StringField()
    picture = StringField()
    type = StringField()
    bio = StringField(max_length=150)
    first_login = StringField()
    location = StringField()
    native = StringField()
    words = ListField(EmbeddedDocumentField(Word))
    meta = {'collection': 'users', 'ordering': ['-user_id']}

    def to_dict(self):
        return make_dict(self)
