from services.agent.survey_agent import analyze_survey
from services.agent.sentiment_agent import analyze_sentiment
from services.agent.citizen_charter_awareness import analyze_citizens_charter
from model.get_feedback import get_weekly_feedback

def run_services_tests():
    feedback = get_weekly_feedback()
    comments = []
    cc_data = []
    
    #print("Fetched Feedback:", feedback)
    #for f in feedback:
    #    comments.append(f["comment"])
    #result = analyze_sentiment(comments)
    
    # for f in feedback:
    #     cc_data.append({
    #         "cc1": f["cc1"],
    #         "cc2": f["cc2"],
    #         "cc3": f["cc3"]
    #     })
    # result = analyze_citizens_charter(cc_data)
    #print(result)  
    print("Running services tests...")