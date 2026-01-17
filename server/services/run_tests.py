from services.agent.survey_agent import analyze_survey
from model.get_feedback import get_daily_feedback

def run_services_tests():
    daily_feedback = get_daily_feedback()
    result = analyze_survey(daily_feedback)
    print(result)
    print("Running services tests...")