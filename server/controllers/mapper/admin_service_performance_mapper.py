def admin_service_performance_mapper(rows):
    """
    Maps SQL rows to admin dashboard format
    """

    mapped = []

    for row in rows:
        (
            office_id,
            office_name,
            cc_awareness,
            survey_analysis,
            sentiment_analysis,
            feedback_count,
            created_at,
            updated_at
        ) = row

        mapped.append({
            "id": office_id,
            "name": office_name,
            "rating": round(float(survey_analysis), 2),
            "volume": feedback_count,
            "negative": sentiment_analysis,
            "cc_awareness": round(float(cc_awareness) / 100, 2)
        })

    return mapped

