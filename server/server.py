#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response, url_for, render_template
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__, static_folder='../app', static_url_path='', template_folder='../app')

words = [{
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
def home():
    return render_template("index.html")

@app.route('/api/', methods = ['GET'])
def get_words():
    return jsonify( { 'words': words } )

@app.route('/api/<int:word_id>', methods = ['GET'])
def get_word(word_id):
    item = filter(lambda t: t['id'] == word_id, words)
    if len(item) == 0:
        abort(404)
    return jsonify( { 'item': item[0] } )

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.route('/api/', methods = ['POST'])
def create_word():
    if not request.json or not 'word' in request.json:
        abort(400)
    item = {
        'id': words[-1]['id'] + 1,
        'word': request.json["word"],
        'translation': request.json.get('translation', ""),
        'knowIndex': 2
    }
    words.append(item)
    return jsonify( { 'item': item } ), 201

if __name__ == '__main__':
    app.run(debug = True)
