from database.connection import get_db_connection


def insert_summary(data):
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        period_type = data["period"]["type"]
        start_date = data["period"]["start_date"]
        end_date = data["period"]["end_date"]

        # =========================
        # 1. UPSERT PERIOD (FIXED)
        # =========================
        cursor.execute("""
            INSERT INTO survey_periods (period_name, start_date, end_date)
            VALUES (%s, %s, %s)
            ON CONFLICT (period_name, start_date, end_date)
            DO UPDATE SET period_name = EXCLUDED.period_name
            RETURNING period_id;
        """, (period_type, start_date, end_date))

        period_id = cursor.fetchone()[0]

        if not period_id:
            raise Exception("Failed to get period_id")

        # =========================
        # 2. CLEAN OLD DATA
        # =========================
        cursor.execute("DELETE FROM survey_results WHERE period_id = %s", (period_id,))
        cursor.execute("DELETE FROM sentiment_results WHERE period_id = %s", (period_id,))
        cursor.execute("DELETE FROM citizen_charter_awareness WHERE period_id = %s", (period_id,))

        # =========================
        # 3. SURVEY RESULTS
        # =========================
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

        # =========================
        # 4. SENTIMENT RESULTS
        # =========================
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

        # =========================
        # 5. CITIZEN CHARTER AWARENESS
        # =========================
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
            cc["status"].split()[0]
        ))

        # =========================
        # 6. COMMIT
        # =========================
        conn.commit()

        print(f" Summary saved for {period_type} ({start_date} → {end_date})")

        return period_id

    except Exception as e:
        print("❌ insert_summary error:", e)
        if conn:
            conn.rollback()
        return None

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()