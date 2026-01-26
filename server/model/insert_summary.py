from database.connection import get_db_connection

def period_exists(period_type, start_date, end_date):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT period_id FROM survey_periods
        WHERE period_name=%s AND start_date=%s AND end_date=%s
    """, (period_type, start_date, end_date))

    exists = cursor.fetchone()

    cursor.close()
    conn.close()

    return exists is not None


def insert_summary(data):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # if period_exists(
    # data["period"]["type"],
    #     data["period"]["start_date"],
    #     data["period"]["end_date"]
    # ):
    #     return  # already exists, skip insertion


    try:
        # 1. Insert period
        cursor.execute("""
            INSERT INTO survey_periods (period_name, start_date, end_date)
            VALUES (%s, %s, %s)
        """, (
            data["period"]["type"],
            data["period"]["start_date"],
            data["period"]["end_date"]
        ))

        period_id = cursor.lastrowid

        # 2. Insert survey results
        survey = data["survey"]
        averages = survey["averages"]

        cursor.execute("""
            INSERT INTO survey_results (
                period_id,
                overall_avg,
                responsiveness_avg,
                reliability_avg,
                facilities_avg,
                communication_avg,
                cost_avg,
                integrity_avg,
                assurance_avg,
                outcome_avg
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            period_id,
            survey["overall_avg"],
            averages["responsiveness"],
            averages["reliability"],
            averages["facilities"],
            averages["communication"],
            averages["costs"],
            averages["integrity"],
            averages["assurance"],
            averages["outcome"]
        ))

        # 3. Insert sentiment results
        sentiment = data["sentiment"]

        cursor.execute("""
            INSERT INTO sentiment_results (
                period_id,
                total_comments,
                positive_count,
                neutral_count,
                negative_count,
                positive_percent,
                neutral_percent,
                negative_percent,
                sentiment_score,
                average_confidence
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            period_id,
            sentiment["total"],
            sentiment["counts"]["positive"],
            sentiment["counts"]["neutral"],
            sentiment["counts"]["negative"],
            sentiment["percentages"]["positive"],
            sentiment["percentages"]["neutral"],
            sentiment["percentages"]["negative"],
            sentiment["sentiment_score"],
            sentiment["average_confidence"]
        ))

        # 4. Insert citizen charter awareness
        cc = data["awareness"]

        cursor.execute("""
            INSERT INTO citizen_charter_awareness (
                period_id,
                cc1_awareness_percent,
                cc2_awareness_percent,
                cc3_awareness_percent,
                overall_awareness,
                status
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """, (
            period_id,
            cc["cc1_awareness_percent"],
            cc["cc2_awareness_percent"],
            cc["cc3_awareness_percent"],
            cc["overall_awareness"],
            cc["status"].split()[0]  # Low / Moderate / High
        ))

        conn.commit()
    
        return period_id

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()
