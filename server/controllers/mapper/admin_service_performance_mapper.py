def admin_service_performance_mapper(rows):
    mapped = []

    def safe_float(val):
        try:
            return float(val)
        except:
            return 0

    for row in rows:
        mapped.append({
            "id": row.get("office_id"),
            "name": row.get("office_name"),
            "rating": round(safe_float(row.get("survey_analysis")), 2),
            "volume": row.get("total_feedback_count", 0),
            "negative": round(safe_float(row.get("sentiment_analysis")), 2),
            "cc_awareness": round(safe_float(row.get("citizens_charter_awareness")) / 100, 2)
        })

    return mapped