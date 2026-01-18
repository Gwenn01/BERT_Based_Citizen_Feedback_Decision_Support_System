from services.agent.survey_agent import analyze_survey
from services.agent.sentiment_agent import analyze_sentiment
from model.get_feedback import get_weekly_feedback

def run_services_tests():
    feedback = get_weekly_feedback()
    comments = []
    #print("Fetched Feedback:", feedback)
    #for f in feedback:
    #    comments.append(f["comment"])
    #result = analyze_sentiment(comments)
    #print(result)
    print("Running services tests...")