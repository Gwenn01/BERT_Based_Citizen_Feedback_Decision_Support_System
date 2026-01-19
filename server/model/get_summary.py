from database.connection import get_db_connection

def get_latest_summary(period_name):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT 
            sp.period_id,
            sp.period_name,
            sp.start_date,
            sp.end_date,

            -- Survey results
            sr.overall_avg,
            sr.responsiveness_avg,
            sr.reliability_avg,
            sr.facilities_avg,
            sr.communication_avg,
            sr.cost_avg,
            sr.integrity_avg,
            sr.assurance_avg,
            sr.outcome_avg,

            -- Sentiment results
            se.total_comments,
            se.positive_count,
            se.neutral_count,
            se.negative_count,
            se.positive_percent,
            se.neutral_percent,
            se.negative_percent,
            se.sentiment_score,
            se.average_confidence,

            -- Citizen charter awareness
            cc.cc1_awareness_percent,
            cc.cc2_awareness_percent,
            cc.cc3_awareness_percent,
            cc.overall_awareness,
            cc.status,

            -- Recommendations
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

        LEFT JOIN survey_results sr 
            ON sr.period_id = sp.period_id

        LEFT JOIN sentiment_results se 
            ON se.period_id = sp.period_id

        LEFT JOIN citizen_charter_awareness cc 
            ON cc.period_id = sp.period_id

        LEFT JOIN recommendations r
            ON r.period_id = sp.period_id

        WHERE sp.period_name = %s
        ORDER BY sp.created_at DESC
        LIMIT 1
    """, (period_name,))

    return cursor.fetchone()
