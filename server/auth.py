from app import app
from flask.ext.login import *
from db import *
from flask.ext.mongoengine import MongoEngine
from flask.ext.security import Security, UserMixin, RoleMixin ,MongoEngineUserDatastore


app.secret_key = 'O&aT4Yi1lRx89H7#PL8erhuBr&3$hV'

login_manager = LoginManager()
login_manager.init_app(app)

class CustomLoginManager(LoginManager):
    def reload_user(self):
        if request.headers.has_key('Authorization'):
            ctx = _request_ctx_stack.top
            ctx.user = User.get(token=request.headers['Authorization'])
            return
        super(CustomLoginManager,self).reload_user()

 # Setup Flask-Security
user_datastore = MongoEngineUserDatastore(User, Word, Word)
security = Security(app, user_datastore)

# Create a user to test with
@app.before_first_request
def create_user():
    user_datastore.create_user(email='matt@nobien.net', password='password')
# Flask view for index
