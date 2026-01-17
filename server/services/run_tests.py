from services.agent.survey_agent import analyze_survey
from services.agent.sentiment_agent import analyze_sentiment
from model.get_feedback import get_daily_feedback

def run_services_tests():
    comments = []
    feedback = get_daily_feedback()
    #for f in feedback:
    #    comments.append(f["comment"])
    #    print(f["comment"])
    #result = analyze_sentiment(comments)
    #print(result)
    print("Running services tests...")