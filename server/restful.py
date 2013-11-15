from flask import Flask, jsonify, abort, request, make_response, url_for, render_template
from flask.views import MethodView
from flask.ext.restful import Api, Resource, reqparse, fields, marshal
from flask.ext.httpauth import HTTPBasicAuth
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
api = Api(app)


auth = HTTPBasicAuth()


tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]

task_fields = {
    'title': fields.String,
    'description': fields.String,
    'done': fields.Boolean,
    'uri': fields.Url('task')
}


@app.route('/', methods = ['GET'])
def home():
    return render_template("index.html")

class TaskListAPI(Resource):

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, required = True, help = 'No task title provided', location = 'json')
        self.reqparse.add_argument('description', type = str, default = "", location = 'json')
        super(TaskListAPI, self).__init__()

    def get(self):
        return { 'tasks': map(lambda t: marshal(t, task_fields), tasks) }

    def post(self):
        args = self.reqparse.parse_args()
        task = {
            'id': tasks[-1]['id'] + 1,
            'title': args['title'],
            'description': args['description'],
            'done': False
        }
        tasks.append(task)
        return { 'task': marshal(task, task_fields) }, 201

api.add_resource(TaskListAPI, '/todo/api/v1.0/tasks', endpoint = 'tasks')


if __name__ == '__main__':
    app.run(debug = True)
