from flask import Blueprint, jsonify
from controllers.admin_overview_mapper import format_dashboard_response, format_recent_feedback
from model.get_summary import get_latest_summary
from model.get_feedback import get_recent_feedback

admin_overview_bp = Blueprint("admin_overview", __name__)

@admin_overview_bp.route("/dashboard", methods=["GET"])
def get_dashboard():

    dashboard_database = {}

    daily_row = get_latest_summary("daily")
    dashboard_database["1 Daily"] = format_dashboard_response(daily_row)

    weekly_row = get_latest_summary("weekly")
    dashboard_database["7 Weekly"] = format_dashboard_response(weekly_row)

    monthly_row = get_latest_summary("monthly")
    dashboard_database["30 Monthly"] = format_dashboard_response(monthly_row)

    return jsonify(dashboard_database), 200


@admin_overview_bp.route("/recent-feedback", methods=["GET"])
def get_recent_feedback_API():
    
    recent_feedback = get_recent_feedback()
    feedback = format_recent_feedback(recent_feedback)
    
    return jsonify(feedback), 200