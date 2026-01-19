from database.connection import get_db_connection

def insert_recommendation(data):
    conn = get_db_connection()
    cursor = conn.cursor()

    sql = """
        INSERT INTO recommendations (
            period_id,
            category,
            dimension,
            severity,
            issue,
            root_cause,
            impact,
            recommendation_action,
            evidence,
            confidence_score
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    cursor.execute(sql, (
        data["period_id"],
        data["category"],
        data["dimension"],
        data["severity"],
        data["issue"],
        data["root_cause"],
        data["impact"],
        data["recommendation_action"],
        data["evidence"],
        data["confidence_score"]
    ))

    conn.commit()
    cursor.close()
    conn.close()
