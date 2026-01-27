from model.insert_summary import insert_summary
from model.get_feedback import (
    get_daily_feedback,
    get_weekly_feedback,
    get_monthly_feedback
)

from services.summary_result.survey_agent import analyze_survey
from services.summary_result.sentiment_agent import analyze_sentiment
from services.summary_result.citizen_charter_awareness import analyze_citizens_charter
#from ai.translator import translate_filipino_to_english
from services.recommendations.recommendation_service import generate_decision_support
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

# genarate summary for a given period
def generate_period_summary(period_type, start_date, end_date):
    # 1. Get feedback
    if period_type == "daily":
        feedback = get_daily_feedback()
    elif period_type == "weekly":
        feedback = get_weekly_feedback()
    elif period_type == "monthly":
        feedback = get_monthly_feedback()
    else:
        raise ValueError("Invalid period type")

    if not feedback:
        return {"message": "No feedback available"}
    
    # 2. Analyze
    cc_data = []
    data = {}
    
    result_survey = analyze_survey(feedback)
    data["survey"] = result_survey
    
    result_sentiment = analyze_sentiment(feedback)
    data["sentiment"] = result_sentiment
    
    for f in feedback:
        cc_data.append({
            "cc1": f["cc1"],
            "cc2": f["cc2"],
            "cc3": f["cc3"]
        })
    result_awareness = analyze_citizens_charter(cc_data)
    data["awareness"] = result_awareness
    # 3. Build summary payload
    summary_data = {
        "period": {
            "type": period_type,
            "start_date": start_date,
            "end_date": end_date
        },
        "survey": result_survey,
        "sentiment": result_sentiment,
        "awareness": result_awareness
    }
    print(summary_data)
    # 4. Save to DB
    period_id = insert_summary(summary_data)
    # insert recommendations 
    recommendation_support = generate_decision_support(data)
    save_recommendations(period_id, recommendation_support["recommendations"])

    return summary_data
