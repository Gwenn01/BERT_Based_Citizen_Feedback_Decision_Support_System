from database.db_utils import fetch_all, execute_query

def get_feedback():
    try:
        return fetch_all("SELECT * FROM feedback")
    except Exception as e:
        print("Error in get_feedback:", e)
        return []


def get_monthly_feedback():
    try:
        return fetch_all("""
            SELECT * FROM feedback
            WHERE service_date >= CURRENT_DATE - INTERVAL '1 month'
        """)
    except Exception as e:
        print("Error in get_monthly_feedback:", e)
        return []


def get_weekly_feedback():
    try:
        return fetch_all("""
            SELECT * FROM feedback
            WHERE service_date >= CURRENT_DATE - INTERVAL '1 week'
        """)
    except Exception as e:
        print("Error in get_weekly_feedback:", e)
        return []


def get_daily_feedback():
    try:
        return fetch_all("""
            SELECT * FROM feedback
            WHERE service_date >= CURRENT_DATE - INTERVAL '1 day'
        """)
    except Exception as e:
        print("Error in get_daily_feedback:", e)
        return []


def fetch_recent_feedback():
    try:
        return fetch_all("""
            SELECT *
            FROM feedback
            ORDER BY created_at DESC
            LIMIT 5
        """)
    except Exception as e:
        print("Error in fetch_recent_feedback:", e)
        return []


def fetch_feedback_by_service(service_id):
    try:
        return fetch_all(
            "SELECT * FROM feedback WHERE service_id = %s",
            (service_id,)
        )
    except Exception as e:
        print("Error in fetch_feedback_by_service:", e)
        return []


def fetch_negative_feedback_by_service(service_id):
    try:
        return fetch_all(
            "SELECT comment FROM feedback WHERE service_id = %s AND sentiment = 'negative'",
            (service_id,)
        )
    except Exception as e:
        print("Error in fetch_negative_feedback_by_service:", e)
        return []


def update_feedback_status(feedback_id, sentiment_label, confidence):
    try:
        execute_query(
            "UPDATE feedback SET sentiment = %s, confidence = %s WHERE feedback_id = %s",
            (sentiment_label, confidence, feedback_id)
        )
        return True
    except Exception as e:
        print("Error in update_feedback_status:", e)
        return False