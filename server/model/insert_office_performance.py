from database.connection import get_db_connection

def insert_service_performance(office_performance):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO office_performance (
            office_name,
            citizens_charter_awareness,
            survey_analysis,
            sentiment_analysis,
            total_feedback_count
        )
        VALUES (%s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            citizens_charter_awareness = VALUES(citizens_charter_awareness),
            survey_analysis = VALUES(survey_analysis),
            sentiment_analysis = VALUES(sentiment_analysis),
            total_feedback_count = VALUES(total_feedback_count)
    """

    cursor.execute(query, (
        office_performance["office_name"],
        office_performance["citizens_charter_awareness"],
        office_performance["survey_analysis"],
        office_performance["sentiment_analysis"],
        office_performance["total_feedback_count"]
    ))

    connection.commit()
    cursor.close()
    connection.close()
