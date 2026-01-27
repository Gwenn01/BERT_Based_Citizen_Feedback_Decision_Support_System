from services.summary_result.survey_agent import analyze_survey
from services.summary_result.sentiment_agent import analyze_sentiment
from services.summary_result.citizen_charter_awareness import analyze_citizens_charter
from model.get_services import get_services, get_feedback_by_service
from model.get_feedback import fetch_feedback_by_service
from model.insert_office_performance import insert_service_performance

def get_service_performance():
    data = {}
    services = get_services()
    
    for s in services:
        feedback_by_service = fetch_feedback_by_service(s['service_id'])
        cc_data = []
        for f in feedback_by_service:
            cc_data.append({
                "cc1": f["cc1"],
                "cc2": f["cc2"],
                "cc3": f["cc3"]
            })
           
        feedback_cc_avg = analyze_citizens_charter(cc_data)
        feedback_survey_avg = analyze_survey(feedback_by_service)
        feedback_sentiment = analyze_sentiment(feedback_by_service)
        data[s['service_name']] = {
            "citizens_charter_awareness": round(feedback_cc_avg["overall_awareness"],),
            "survey_analysis": round(feedback_survey_avg["overall_avg"], 2),
            "sentiment_analysis": feedback_sentiment["percentages"]["negative"],
            "total_feedback_count": len(feedback_by_service)
        }
        for office_name, metrics in data.items():
            insert_service_performance({
                "office_name": office_name,
                "citizens_charter_awareness": metrics["citizens_charter_awareness"],
                "survey_analysis": metrics["survey_analysis"],
                "sentiment_analysis": metrics["sentiment_analysis"],
                "total_feedback_count": metrics["total_feedback_count"]
            })
    return data
    
        
    