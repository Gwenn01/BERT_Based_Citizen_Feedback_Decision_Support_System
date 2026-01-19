from model.insert_recommendation import insert_recommendation
import json

def calculate_confidence(rec):
    severity_weight = {
        "Low": 0.6,
        "Medium": 0.7,
        "High": 0.85,
        "Critical": 0.95
    }

    return severity_weight.get(rec["severity"], 0.75)


def save_recommendations(period_id, recommendations):
    for rec in recommendations:
        cleaned_data = {
            "period_id": period_id,
            "category": rec["category"],
            "dimension": rec["dimension"],
            "severity": rec["severity"],
            "issue": rec["issue"],
            "root_cause": rec.get("root_cause"),
            "impact": rec.get("impact"),
            "recommendation_action": json.dumps(rec["recommended_actions"]),
            "evidence": json.dumps(rec.get("evidence")),
            "confidence_score": calculate_confidence(rec)
        }

        insert_recommendation(cleaned_data)
