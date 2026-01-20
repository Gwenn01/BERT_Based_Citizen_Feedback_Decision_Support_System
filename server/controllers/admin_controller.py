from flask import jsonify
from model.get_summary import get_latest_summary
from model.get_feedback import fetch_recent_feedback
from controllers.mapper.admin_overview_mapper import format_dashboard_response, format_recent_feedback
from server.controllers.mapper.genarate_service_performance_mapper import get_service_performance

def get_admin_overview():
    try:
        dashboard_database = {}

        daily_row = get_latest_summary("daily")
        dashboard_database["1 Daily"] = format_dashboard_response(daily_row)

        weekly_row = get_latest_summary("weekly")
        dashboard_database["7 Weekly"] = format_dashboard_response(weekly_row)

        monthly_row = get_latest_summary("monthly")
        dashboard_database["30 Monthly"] = format_dashboard_response(monthly_row)

        return jsonify(dashboard_database), 200

    except Exception as e:
        return jsonify({"error": f"Error in get_recent_feedback: {str(e)}"}), 500

    
def get_recent_feedback_overview():
    try:
        recent_feedback = fetch_recent_feedback()  # SERVICE / DB FUNCTION
        feedback = format_recent_feedback(recent_feedback)
        return jsonify(feedback), 200
    except Exception as e:
        return jsonify({
            "error": "Error in get_recent_feedback_overview",
            "details": str(e)
        }), 500

