from decimal import Decimal
from datetime import datetime

def format_dashboard_response(row):
    if not row:
        return None

    # Decimal → float helper
    def f(x):
        return float(x) if isinstance(x, Decimal) else x

    # Determine weak / strong dimensions (threshold-based)
    averages = {
        "responsiveness": f(row["responsiveness_avg"]),
        "reliability": f(row["reliability_avg"]),
        "facilities": f(row["facilities_avg"]),
        "communication": f(row["communication_avg"]),
        "outcome": f(row["outcome_avg"]),
        "costs": f(row["cost_avg"]),
        "integrity": f(row["integrity_avg"]),
        "assurance": f(row["assurance_avg"]),
    }

    weak_dimensions = [k for k, v in averages.items() if v < 3]
    strong_dimensions = [k for k, v in averages.items() if v >= 3]

    return {
        "kpi": [
            {
                "id": 1,
                "title": "CC Awareness",
                "value": f"{f(row['overall_awareness'])}%",
                "total": "Overall",
                "trend": row["status"],
                "variant": "blue",
                "icon": "Info",
                "statusLabel": "Reach Level"
            },
            {
                "id": 2,
                "title": "Survey Avg",
                "value": round(f(row["overall_avg"]), 2),
                "total": "/ 5.0",
                "trend": "Weak" if f(row["overall_avg"]) < 3 else "Stable",
                "variant": "red" if f(row["overall_avg"]) < 3 else "green",
                "icon": "ClipboardList",
                "statusLabel": "Service Quality"
            },
            {
                "id": 3,
                "title": "Positive Sentiment",
                "value": f"{f(row['positive_percent'])}%",
                "trend": row["severity"],
                "variant": "red" if row["severity"] == "Critical" else "amber",
                "icon": "Frown",
                "statusLabel": "Approval Rating"
            },
            {
                "id": 4,
                "title": "Total Feedback",
                "value": row["total_comments"],
                "trend": row["period_name"].capitalize(),
                "variant": "purple",
                "icon": "MessageSquare",
                "statusLabel": "Submission Vol"
            }
        ],

        "sentiment": [
            { "name": "Positive", "value": f(row["positive_percent"]) },
            { "name": "Neutral", "value": f(row["neutral_percent"]) },
            { "name": "Negative", "value": f(row["negative_percent"]) }
        ],

        "averages": averages,

        "weak_dimensions": weak_dimensions,
        "strong_dimensions": strong_dimensions,

        "charter_awareness": {
            "overall": f(row["overall_awareness"]),
            "status": f"{row['status']} Awareness",
            "cc1": f(row["cc1_awareness_percent"]),
            "cc2": f(row["cc2_awareness_percent"]),
            "cc3": f(row["cc3_awareness_percent"])
        }
    }
    


def format_time(created_at):
    if not created_at:
        return ""

    if isinstance(created_at, str):
        created_at = datetime.fromisoformat(created_at)

    return created_at.strftime("%I:%M %p")


def format_recent_feedback(rows):
    """
    rows = list of dicts from DB
    """

    formatted = []

    for row in rows:
        formatted.append({
            "id": row["feedback_id"],
            "client": row["client_type"],
            "service": row.get("service_type", "Unknown Service"),
            "text": row.get("comment", ""),
            "time": format_time(row.get("service_date")),
        })

    return {
        "feedback": formatted
    }
    
