from ai.bert_model import predict_sentiment
from ai.translator import translate_filipino_to_english

from services.summary_result.survey_agent import analyze_survey
from services.summary_result.sentiment_agent import analyze_sentiment
from services.summary_result.citizen_charter_awareness import analyze_citizens_charter

from services.recommendations.issue_detector import detect_issues
from services.recommendations.recommendation_engine import generate_recommendations
from services.recommendations.recommendation_service import generate_decision_support
from services.normalize_text import normalize_text

from model.get_feedback import get_feedback, update_feedback_status

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
    # print(f"Test Comment:")
    
    # print(tests[0])
    # print(tests[1])
    # print(tests[2])
    # print(end="")
    # print("Converting tagalog comment into english:")
    # for t in tests:
    #     print(translate_filipino_to_english(t), "=>", predict_sentiment( translate_filipino_to_english(t) ) )
    
    
    # for f in feedback:
    #     cc_data.append({
    #         "cc1": f["cc1"],
    #         "cc2": f["cc2"],
    #         "cc3": f["cc3"]
    #     })
    # result = analyze_citizens_charter(cc_data)
    # print("Fetched Citizen's Charter Awareness:", result)
    
    #detect_issues test
    # data = {}
    # result_survey = analyze_survey(feedback)
    # data["survey"] = result_survey
    
    # for f in feedback:
    #    comments.append(translate_filipino_to_english(f["comment"]))
    # result = analyze_sentiment(comments)
    # data["sentiment"] = result
    
    # for f in feedback:
    #     cc_data.append({
    #         "cc1": f["cc1"],
    #         "cc2": f["cc2"],
    #         "cc3": f["cc3"]
    #     })
    # result = analyze_citizens_charter(cc_data)
    # data["awareness"] = result
    
    # recommendation = generate_decision_support(data)
    # print(recommendation)
    
    #run the bert model and check if there is an error
    # tests = [
    #         "Maayos at mabilis ang proseso sa city hall ngayon, hindi na tulad dati na sobrang haba ng pila.",
    #         "Walang sumasagot sa hotline kahit ilang beses na akong tumawag, sobrang frustrating.",
    #         "Nakapag-submit ako ng request online at nakatanggap ng reference number.",
    #         "Ang bagal ng serbisyo, kulang sa staff at parang walang sistema.",
    #         "Salamat sa staff na tumulong sa akin, malinaw ang instructions at very accommodating sila.",
    #         "Ang opisina ay bukas mula 8AM hanggang 5PM ayon sa schedule na nakapaskil.",
    #         "Magulo ang proseso at paulit-ulit ang requirements, sayang ang oras ng mga tao.",
    #         "Malaking improvement ang online appointment system, mas convenient na ngayon.",
    #         "Natanggap ko ang email confirmation pagkatapos ng aking submission.",
    #         "Hindi maayos ang sagot ng staff at parang walang pakialam sa concern ko."
    #     ]
    # negative_samples = [
    #         "Napakabagal ng proseso at paulit-ulit ang pinapagawa, sobrang nakakapagod.",
    #         "Magulo ang sistema at walang malinaw na instructions.",
    #         "Sayang ang oras namin dahil hindi maayos ang serbisyo.",
    #         "Hindi responsive ang staff at parang walang pakialam.",
    #         "Ang tagal ng pila kahit maaga kaming dumating.",
    #         "May online system pero laging down, hindi rin nagagamit.",
    #         "Nakakainis ang dami ng requirements na hindi naman kailangan."
    #     ]
    # neutral_samples = [
    #         "Okay naman ang proseso pero may mga bahagi na medyo mabagal.",
    #         "Natapos ang transaction pero kailangan pa ng improvement.",
    #         "May tulong na ibinigay pero hindi ganun ka-detalye.",
    #         "Sakto lang ang serbisyo, wala namang problema.",
    #         "Maayos naman pero hindi rin exceptional.",
    #         "Nagawa ang kailangan pero matagal ang paghihintay."
    #     ]
    #positive_samples = [
    #     "Mabilis at maayos ang proseso, very convenient para sa lahat.",
    #     "Napakabait at matulungin ng staff, malaking tulong talaga.",
    #     "Malaking improvement ang bagong sistema, mas madali na ngayon.",
    #     "Satisfied ako sa serbisyo, malinaw at mabilis ang transaction.",
    #     "Maayos ang daloy ng proseso at maaga kaming natapos.",
    #     "Napaka-convenient ng online appointment system.",
    #     "Maganda ang serbisyo at ramdam ang improvement."
    # ]
    # mixed_samples = [
    #     "Mabilis ang proseso pero magulo ang instructions.",
    #     "Okay sana ang serbisyo kung hindi lang sobrang tagal ng pila.",
    #     "Hindi perpekto pero malaking improvement kumpara dati."
    # ]

    # for t in mixed_samples:
    #     print(t)
    #     print(predict_sentiment(t))
    #     print("-" * 50)

    # feedback = get_feedback()
    

    # for f in feedback:
    #     sentiment_result = predict_sentiment(f["comment"])

    #     sentiment_label = sentiment_result["label"]       # "Positive"
    #     confidence = float(sentiment_result["confidence"])

    #     update_feedback_status(
    #         f["feedback_id"],            #
    #         sentiment_label,
    #         confidence 
    #     )

    
    # print(normalize_text("Sobrang bilis at napakabait ng staff. Excellent serbisyo!"))
    # nor = normalize_text("Sobrang bilis at napakabait ng staff. Excellent serbisyo!")
    # print(predict_sentiment(nor))


    print("Running services services...")