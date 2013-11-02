from flask import Flask
from flask import render_template

app = Flask(__name__, static_folder='../app', static_url_path='', template_folder='../app')

""" Main URL for website """
@app.route("/")
def index():
    return render_template("index.html")

""" Main API methods """
@app.route("/api")
def api_main():
    return "Unauthorized access"



if __name__ == "__main__":
    app.run(debug=True)
