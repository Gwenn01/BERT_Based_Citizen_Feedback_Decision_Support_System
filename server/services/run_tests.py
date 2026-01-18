from ai.bert_model import predict_sentiment
from ai.translator import translate_filipino_to_english

from services.summary_result.survey_agent import analyze_survey
from services.summary_result.sentiment_agent import analyze_sentiment
from services.summary_result.citizen_charter_awareness import analyze_citizens_charter

from services.recommendations.issue_detector import detect_issues
from services.recommendations.recommendation_engine import generate_recommendations
from services.recommendations.recommendation_service import generate_decision_support

from model.get_feedback import get_daily_feedback



def run_services_tests():
    feedback = get_daily_feedback()
    comments = []
    cc_data = []
    
    # result = analyze_survey(feedback)
    # print("Fetched Survey:", result)
    
    #for f in feedback:
    #    comments.append(translate_filipino_to_english(f["comment"]))
    # result = analyze_sentiment(comments)
    # print("Fetched Sentiment:", result)
    
    
    # tests = [
    # "Napakasungit at sobrang bagal ng serbisyo. Nakakainis!",
    # "Sobrang bilis at napakabait ng staff. Excellent serbisyo!",
    # "Okay lang ang proseso, walang problema."
    # ]
    # for t in feedback:
    #     print(translate_filipino_to_english(t["comment"]), "=>", predict_sentiment( translate_filipino_to_english(t["comment"]) ) )
    
    
    # for f in feedback:
    #     cc_data.append({
    #         "cc1": f["cc1"],
    #         "cc2": f["cc2"],
    #         "cc3": f["cc3"]
    #     })
    # result = analyze_citizens_charter(cc_data)
    # print("Fetched Citizen's Charter Awareness:", result)
    
    #detect_issues test
    data = {}
    result_survey = analyze_survey(feedback)
    data["survey"] = result_survey
    
    for f in feedback:
       comments.append(translate_filipino_to_english(f["comment"]))
    result = analyze_sentiment(comments)
    data["sentiment"] = result
    
    for f in feedback:
        cc_data.append({
            "cc1": f["cc1"],
            "cc2": f["cc2"],
            "cc3": f["cc3"]
        })
    result = analyze_citizens_charter(cc_data)
    data["awareness"] = result
    
    
    
    issue = detect_issues(data)
    recommendation = generate_recommendations(issue)
    print(recommendation)
    print("Running services tests...")