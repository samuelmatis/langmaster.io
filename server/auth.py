from app import *
from users import *
from flask import session, redirect, url_for
from flask.sessions import *
import requests

@app.route('/api/login/facebook', methods=['POST'])
def login_fb():
    session['access_token'] = request.headers['access_token']
    session['name'] = request.form['name']
    session['username'] = request.form['username']

    return redirect(url_for('index'))

@app.route('/api/users/name', methods=['GET'])
def name():
    return session['username']

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
