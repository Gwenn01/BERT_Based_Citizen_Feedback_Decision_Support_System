from services.summary_result.survey_agent import analyze_survey
from services.summary_result.sentiment_agent import analyze_sentiment
from services.summary_result.citizen_charter_awareness import analyze_citizens_charter
from model.get_services import get_services, get_feedback_by_service

def get_service_performance():
    data = {}
    services = get_services()
    
    for s in services:
        feedback_by_service = get_feedback_by_service(s['service_id'])
        cc_data = []
        comments = []
        for f in feedback_by_service:
            cc_data.append({
                "cc1": f["cc1"],
                "cc2": f["cc2"],
                "cc3": f["cc3"]
            })
            comments.append(f["comment"])
        feedback_cc_avg = analyze_citizens_charter(cc_data)
        feedback_survey_avg = analyze_survey(feedback_by_service)
        feedback_sentiment = analyze_sentiment(comments)
        data[s['service_name']] = {
            "citizens_charter_awareness": feedback_cc_avg["overall_awareness"],
            "survey_analysis": feedback_survey_avg["overall_avg"],
            "sentiment_analysis": feedback_sentiment["sentiment_score"],
            "total_feedback_count": len(feedback_by_service)
        }
    print("Service Performance Data:", data)
    return data  
        
        
    