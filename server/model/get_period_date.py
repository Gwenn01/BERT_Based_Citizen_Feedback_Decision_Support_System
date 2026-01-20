from database.connection import get_db_connection

def get_recent_periods():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT sp.*
        FROM survey_period sp
        JOIN (
            SELECT period_name, MAX(created_at) AS latest_created
            FROM survey_period
            WHERE period_name IN ('daily', 'weekly', 'monthly')
            GROUP BY period_name
        ) latest
        ON sp.period_name = latest.period_name
        AND sp.created_at = latest.latest_created
    """

    cursor.execute(query)
    periods = cursor.fetchall()

    cursor.close()
    conn.close()

    return periods

