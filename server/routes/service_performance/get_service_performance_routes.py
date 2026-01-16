
from flask import Blueprint, jsonify, request
from datetime import date, timedelta
from database.connection import get_db_connection

service_performance_monitoring_bp = Blueprint('service_performance_monitoring', __name__)


def interpret_performance(avg):
    if avg <= 2.4:
        return (
            "Poor",
            "Service performance is poor. Immediate corrective actions are required. "
            "Focus on staff conduct, facilities, and unresolved complaints."
        )
    elif avg <= 3.4:
        return (
            "Average",
            "Service performance is average. Improvements are recommended. "
            "Identify weak indicators and address recurring issues."
        )
    else:
        return (
            "Good",
            "Service performance is good. Maintain standards and continue monitoring feedback."
        )


@service_performance_monitoring_bp.route("/service-performance/generate", methods=["POST"])
def generate_service_performance():
    data = request.get_json()

    service_id = data.get("service_id")
    period_type = data.get("period_type")  # daily | weekly | monthly

    if period_type not in ["daily", "weekly", "monthly"]:
        return jsonify({"error": "Invalid period type"}), 400

    today = date.today()

    if period_type == "daily":
        start_date = today
        end_date = today

    elif period_type == "weekly":
        start_date = today - timedelta(days=6)
        end_date = today

    else:  # monthly
        start_date = today.replace(day=1)
        end_date = today

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT
            AVG((
                responsiveness + reliability + facilities + communication +
                costs + integrity + assurance + outcome
            ) / 8) AS avg_score
        FROM feedback
        WHERE service_id = %s
        AND service_date BETWEEN %s AND %s
    """

    cursor.execute(query, (service_id, start_date, end_date))
    result = cursor.fetchone()

    avg_score = result["avg_score"]

    if avg_score is None:
        return jsonify({"message": "No feedback data available"}), 404

    avg_score = round(avg_score, 2)
    status, recommendation = interpret_performance(avg_score)

    insert_query = """
        INSERT INTO service_performance_summary
        (service_id, period_type, period_start, period_end,
         average_score, status, recommendation)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    cursor.execute(
        insert_query,
        (
            service_id,
            period_type,
            start_date,
            end_date,
            avg_score,
            status,
            recommendation
        )
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "service_id": service_id,
        "period": period_type,
        "average_score": avg_score,
        "status": status,
        "recommendation": recommendation
    }), 200

    