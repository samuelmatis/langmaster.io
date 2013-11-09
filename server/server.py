#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response, url_for
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__, static_url_path = "")

tasks = [{
            "id": 1,
            "word": "car",
            "translation": "auto",
            "knowIndex": 4
        },{
            "id": 2,
            "word": "house",
            "translation": "dom",
            "knowIndex": 5
        }, {
            "id": 3,
            "word": "computer",
            "translation": "pocitac",
            "knowIndex": 2
        }, {
            "id": 4,
            "word": "book",
            "translation": "kniha",
            "knowIndex": 3
        }]

@app.route('/', methods = ['GET'])
def get_tasks():
    return jsonify( { 'tasks': tasks } )

@app.route('/<int:task_id>', methods = ['GET'])
def get_task(task_id):
    task = filter(lambda t: t['id'] == task_id, tasks)
    if len(task) == 0:
        abort(404)
    return jsonify( { 'task': task[0] } )

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.route('/', methods = ['POST'])
def create_task():
    if not request.json or not 'title' in request.json:
        abort(400)
    task = {
        'id': tasks[-1]['id'] + 1,
        'word': request.json['word'],
        'translation': request.json.get('translation', ""),
        'knowIndex': 0
    }
    tasks.append(task)
    return jsonify( { 'task': task } ), 201

if __name__ == '__main__':
    app.run(debug = True)
