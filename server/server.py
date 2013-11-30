#!flask/bin/python
from flask import Flask, abort, request, render_template, Response
import os
from users import *

@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
