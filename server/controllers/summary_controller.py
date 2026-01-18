from model.insert_summary import insert_summary
from model.get_feedback import (
    get_daily_feedback,
    get_weekly_feedback,
    get_monthly_feedback
)

from services.summary_result.survey_agent import analyze_survey
from services.summary_result.sentiment_agent import analyze_sentiment
from services.summary_result.citizen_charter_awareness import analyze_citizens_charter
from ai.translator import translate_filipino_to_english



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
    comments = []
    cc_data = []
    
    result_survey = analyze_survey(feedback)
    
    for f in feedback:
       comments.append(translate_filipino_to_english(f["comment"]))
    result_sentiment = analyze_sentiment(comments)
    
    for f in feedback:
        cc_data.append({
            "cc1": f["cc1"],
            "cc2": f["cc2"],
            "cc3": f["cc3"]
        })
    result_awareness = analyze_citizens_charter(cc_data)

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

    # 4. Save to DB
    insert_summary(summary_data)

    return summary_data
