from users import *
from flask import render_template
import os

@app.route('/app', methods=['GET'])
def home():
    return render_template("index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    # Start app
    app.run(host='0.0.0.0', port=port, debug=True)
