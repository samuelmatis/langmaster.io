from flask import Flask, abort, request, render_template, Response



app = Flask(__name__, static_folder='../app', static_url_path='',
            template_folder='../app')
