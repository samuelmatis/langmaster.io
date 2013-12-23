from flask import Flask

# Create application
app = Flask(__name__, static_folder='../dist', static_url_path='',
            template_folder='../dist')
