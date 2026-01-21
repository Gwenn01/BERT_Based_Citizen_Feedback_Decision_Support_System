import json
from decimal import Decimal

def recommendation_mapper(rows):
    if not rows:
        return None

    result = {
        "period": rows[0]["period_name"],
        "start_date": rows[0]["start_date"],
        "end_date": rows[0]["end_date"],
        "summary": {},
        "recommendations": {}
    }

    for row in rows:
        category = row["category"]

        if category not in result["recommendations"]:
            result["recommendations"][category] = []

        # parse JSON fields safely
        actions = json.loads(row["recommendation_action"])
        evidence = json.loads(row["evidence"])

        item = {
            "dimension": row["dimension"],
            "severity": row["severity"],
            "issue": row["issue"],
            "root_cause": row["root_cause"],
            "impact": row["impact"],
            "actions": actions,
            "evidence": evidence,
            "confidence": float(row["confidence_score"])
        }

        result["recommendations"][category].append(item)

        # set summary (only once, usually from Public Satisfaction)
        if category == "Public Satisfaction":
            result["summary"] = {
                "overall_severity": row["severity"],
                "confidence_score": float(row["confidence_score"])
            }

    return result
