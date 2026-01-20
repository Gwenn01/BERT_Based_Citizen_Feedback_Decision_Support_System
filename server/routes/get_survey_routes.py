from flask import Blueprint
from controllers.survey_controller import handle_survey_submission

survey_bp = Blueprint("survey", __name__)

@survey_bp.route("/get-survey-client", methods=["POST"])
def evaluate_survey():
    return handle_survey_submission()
    
