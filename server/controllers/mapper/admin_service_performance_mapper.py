def admin_service_performance_mapper(service_data):
    """
    Maps backend service performance dict
    to frontend admin dashboard format
    """

    mapped = []

    for service_name, metrics in service_data.items():
        mapped.append({
            "name": service_name,
            "rating": round(metrics["survey_analysis"], 2),
            "volume": metrics["total_feedback_count"],
            "negative": round(100 - metrics["sentiment_analysis"]),  # estimated %
            "cc_awareness": round(metrics["citizens_charter_awareness"] / 100, 2)
        })

    return mapped
