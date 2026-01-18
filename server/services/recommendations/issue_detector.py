from config.decision_rules import *

def detect_issues(data):
    issues = []

    survey = data["survey"]
    sentiment = data["sentiment"]
    awareness = data["awareness"]

    # 1. Weak service dimensions
    for dimension, avg in survey["averages"].items():
        if avg < LOW_SCORE_THRESHOLD:
            issues.append({
                "category": "Service Quality",
                "dimension": dimension,
                "score": avg,
                "severity": "High"
            })

    # 2. Negative sentiment issue
    if sentiment["percentages"]["Negative"] > HIGH_NEGATIVE_SENTIMENT:
        issues.append({
            "category": "Public Satisfaction",
            "dimension": "Overall Service Experience",
            "value": sentiment["percentages"]["Negative"],
            "severity": "Critical"
        })

    # 3. Citizen Charter awareness
    if awareness["overall_awareness"] < LOW_AWARENESS_THRESHOLD:
        issues.append({
            "category": "Information Dissemination",
            "dimension": "Citizen Charter Awareness",
            "value": awareness["overall_awareness"],
            "severity": "Medium"
        })

    return issues
