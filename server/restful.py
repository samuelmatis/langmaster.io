from flask import Flask, jsonify, abort, request, make_response, url_for, render_template
from flask.views import MethodView
from flask.ext.restful import Api, Resource, reqparse, fields, marshal
from flask.ext.httpauth import HTTPBasicAuth


app = Flask(__name__, static_folder='../app', static_url_path='', template_folder='../app')
api = Api(app)

class UserAPI(Resource):
    def get(self):
        return render_template("index.html")

    def put(self):
        pass

    def delete(self):
        pass

api.add_resource(UserAPI, '/', endpoint="user")


if __name__ == '__main__':
    app.run(debug = True)
