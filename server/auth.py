from app import app
from flask.ext.login import *

app.secret_key = 'mynameispeterparadaandyournameissamuelmatis'

login_manager = LoginManager()
login_manager.init_app(app)

class CustomLoginManager(LoginManager):
    def reload_user(self):
        if request.headers.has_key('Authorization'):
            ctx = _request_ctx_stack.top
            ctx.user = User.get(token=request.headers['Authorization'])
            return
        super(CustomLoginManager,self).reload_user()
