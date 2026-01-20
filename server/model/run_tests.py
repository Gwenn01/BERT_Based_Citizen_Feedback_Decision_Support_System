from model.get_services import get_services
from model.get_services import get_feedback_by_service
from model.get_feedback import get_feedback
from model.get_feedback import get_monthly_feedback
from model.get_feedback import get_weekly_feedback
from model.get_feedback import get_daily_feedback

def run_model_tests():
    feedback = get_daily_feedback()
    services = get_services()
    #print(get_feedback_by_service(1))
    print("Running model tests...")