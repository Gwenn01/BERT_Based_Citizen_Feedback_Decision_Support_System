from database.connection import get_db_connection

def get_feedback():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM feedback")
    feedback = cursor.fetchall()
    cursor.close()
    conn.close()
    return feedback

def get_monthly_feedback():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM feedback WHERE service_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)")
    feedback = cursor.fetchall()
    cursor.close()
    conn.close()
    return feedback

def get_weekly_feedback():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM feedback WHERE service_date >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)")
    feedback = cursor.fetchall()
    cursor.close()
    conn.close()
    return feedback

def get_daily_feedback():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM feedback WHERE service_date >= DATE_SUB(CURDATE(), INTERVAL 1 DAY)")
    feedback = cursor.fetchall()
    cursor.close()
    conn.close()
    return feedback

def fetch_recent_feedback():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM feedback
        ORDER BY created_at DESC
        LIMIT 3
    """)

    feedback = cursor.fetchall()
    cursor.close()
    conn.close()
    return feedback


def fetch_feedback_by_service(service_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM feedback WHERE service_id = %s", (service_id,))
    feedback = cursor.fetchall()
    cursor.close()
    conn.close()
    return feedback
