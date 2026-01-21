from flask import Blueprint
from controllers.admin_controller import get_admin_recommendations

admin_recommendation_bp = Blueprint(
    "admin_recommendation_bp",
    __name__
)

@admin_recommendation_bp.route("/recommendations", methods=["GET"])
def recommendations():
    return get_admin_recommendations()
