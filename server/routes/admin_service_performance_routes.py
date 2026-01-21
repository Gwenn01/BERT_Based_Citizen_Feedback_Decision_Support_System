from flask import Blueprint
from controllers.admin_controller import get_admin_service_performance

admin_performance_bp = Blueprint('admin_performance', __name__)

@admin_performance_bp.route("/service-performance", methods=['GET'])
def get_performance():
    return get_admin_service_performance()
