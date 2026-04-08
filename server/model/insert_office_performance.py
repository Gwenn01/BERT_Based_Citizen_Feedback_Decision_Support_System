from database.db_utils import execute_query


def insert_service_performance(office_performance):
    try:
        query = """
            INSERT INTO office_performance (
                office_name,
                citizens_charter_awareness,
                survey_analysis,
                sentiment_analysis,
                total_feedback_count
            )
            VALUES (%s, %s, %s, %s, %s)

            ON CONFLICT (office_name)
            DO UPDATE SET
                citizens_charter_awareness = EXCLUDED.citizens_charter_awareness,
                survey_analysis = EXCLUDED.survey_analysis,
                sentiment_analysis = EXCLUDED.sentiment_analysis,
                total_feedback_count = EXCLUDED.total_feedback_count,
                updated_at = CURRENT_TIMESTAMP;
        """

        values = (
            office_performance["office_name"],
            office_performance["citizens_charter_awareness"],
            office_performance["survey_analysis"],
            office_performance["sentiment_analysis"],
            office_performance["total_feedback_count"]
        )

        execute_query(query, values)

        return True

    except Exception as e:
        print("❌ insert_service_performance error:", e)
        return False