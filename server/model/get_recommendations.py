from database.connection import get_db_connection

def get_recommendations(period_name):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT 
            sp.period_id,
            sp.period_name,
            sp.start_date,
            sp.end_date,

            r.category,
            r.dimension,
            r.severity,
            r.issue,
            r.root_cause,
            r.impact,
            r.recommendation_action,
            r.evidence,
            r.confidence_score
        FROM survey_periods sp
        LEFT JOIN recommendations r 
            ON sp.period_id = r.period_id
        WHERE sp.period_id = (
            SELECT period_id
            FROM survey_periods
            WHERE period_name = %s
            ORDER BY created_at DESC
            LIMIT 1
        )
        ORDER BY r.severity DESC
    """

    cursor.execute(query, (period_name,))
    recommendations = cursor.fetchall()

    cursor.close()
    conn.close()

    return recommendations
