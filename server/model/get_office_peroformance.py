from database.connection import get_db_connection

def get_all_office_performance():
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
       SELECT op.*
        FROM office_performance op
        JOIN (
            SELECT office_id,
                MAX(DATE_FORMAT(created_at, '%Y%m')) AS latest_period
            FROM office_performance
            GROUP BY office_id
        ) latest
        ON op.office_id = latest.office_id
        AND DATE_FORMAT(op.created_at, '%Y%m') = latest.latest_period;
    """
    cursor.execute(query)
    office_performance = cursor.fetchall()
    cursor.close()
    conn.close()
    return office_performance