from model.get_services import get_services
from model.get_feedback import get_feedback
from model.get_feedback import get_monthly_feedback
from model.get_feedback import get_weekly_feedback
from model.get_feedback import get_daily_feedback
def run_model_tests():
    feedback = get_feedback()
    services = get_services()
    feedback_daily = get_daily_feedback()
    for daily in feedback_daily:
        print(daily["service_date"])
    print("Running model tests...")