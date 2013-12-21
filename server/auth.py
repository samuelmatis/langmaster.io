from app import *
from users import *
from flask import session, redirect, url_for
from flask.sessions import *

@app.route('/api/login/facebook', methods=['POST'])
def login_fb():
    session['access_token'] = request.form['name']
    return redirect(url_for('index'))
   


@app.route('/api/login/twitter', methods=['POST'])
def login_tw():
    pass


@app.route('/api/login/google', methods=['POST'])
def login_plus():
    pass

@app.route('/api/logout', methods=['GET'])
def logout():
    session.pop('access_token', None)
    return redirect(url_for('index'))
