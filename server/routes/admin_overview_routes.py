from flask import Blueprint, jsonify
from controllers.admin_controller import get_admin_overview, get_recent_feedback_overview, get_all_feedback

admin_overview_bp = Blueprint("admin_overview", __name__)

@admin_overview_bp.route("/dashboard", methods=["GET"])
def get_dashboard():
    return get_admin_overview()


@admin_overview_bp.route("/recent-feedback", methods=["GET"])
def get_recent_feedback_API():
    return get_recent_feedback_overview()

@admin_overview_bp.route("/all-feedback", methods=["GET"])
def get_all_feedback_APi():
    return get_all_feedback()
