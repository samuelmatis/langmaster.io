from flask import Flask, request

# Create application
app = Flask(__name__, static_folder='../app', static_url_path='', template_folder='../app')
