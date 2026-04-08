from database.db_utils import fetch_all


def get_recent_periods():
    try:
        query = """
            SELECT sp.*
            FROM survey_periods sp
            JOIN (
                SELECT period_name, MAX(created_at) AS latest_created
                FROM survey_periods
                WHERE period_name IN ('daily', 'weekly', 'monthly')
                GROUP BY period_name
            ) latest
            ON sp.period_name = latest.period_name
            AND sp.created_at = latest.latest_created
        """

        return fetch_all(query)

    except Exception as e:
        print("❌ GET RECENT PERIODS ERROR:", e)
        return []