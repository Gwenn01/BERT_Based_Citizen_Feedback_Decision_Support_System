from flask import Blueprint, jsonify
from controllers.admin_overview_mapper import format_dashboard_response
from model.get_summary import get_latest_summary

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
