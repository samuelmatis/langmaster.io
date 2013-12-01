#!flask/bin/python
from mongoengine import *


connect(
    'words',
    host='mongodb://admin:iicenajv@ds053948.mongolab.com:53948/words'
)


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
    word_id = IntField()
    word = StringField()
    translation = StringField()
    strength = IntField()
    meta = {'collection': 'users'}

    def to_dict(self):
        return make_dict(self)


class User(Document):
    user_id = IntField(unique=True)
    username = StringField(unique=True)
    email = EmailField(unique=True)
    password = StringField()
    words = ListField(EmbeddedDocumentField(Word))
    meta = {'collection': 'users', 'ordering': ['-user_id']}

    def to_dict(self):
        return make_dict(self)
