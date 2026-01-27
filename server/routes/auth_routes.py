from flask import Blueprint
from controllers.auth_controller import login_controller
from flask import request

auth_bp = Blueprint('auth_controller', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    # Implement login logic here
    return login_controller()
