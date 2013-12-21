from users import *
from auth import *
from flask import session
import os

# Route for homepage
@app.route('/')
def index():
    if 'access_token' in session:
        return render_template("index.html", token=session['access_token'])
    else:
        return render_template("home.html")

# secret key for sessions
app.secret_key = os.urandom(24)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    # Start app
    app.run(host='0.0.0.0', port=port, debug=True)
