from services.agent.survey_agent import analyze_survey
from services.agent.sentiment_agent import analyze_sentiment
from model.get_feedback import get_daily_feedback

def run_services_tests():
    feedback = get_daily_feedback()
    result = analyze_sentiment(feedback["comment"])
    print(result)
    print("Running services tests...")