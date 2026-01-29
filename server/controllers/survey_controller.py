
from flask import request, jsonify
from model.insert_feedback import insert_feedback
from middlewares.validate_feedback import validate_feedback
from controllers.mapper.service_id_mapper import get_service_id
from ai.bert_model import predict_sentiment
from controllers.mapper.generate_summary_mapper import generate_period_summary
from controllers.mapper.genarate_service_performance_mapper import get_service_performance
from datetime import date, timedelta
import traceback

def handle_survey_submission():
    try:
        data = request.get_json()

        is_valid, error_message = validate_feedback(data)
        if not is_valid:
            return jsonify({"error": error_message}), 400    
        
        service_id = get_service_id(data)
        
        if not service_id:
            return jsonify({"error": "Invalid office/service name"}), 400
        
        sentiment = predict_sentiment(data["comment"])
        data["sentiment"] = sentiment["label"].lower()
        data["confidence"] = float(sentiment["confidence"])

        feedback_id = insert_feedback(service_id, data)

        today = date.today()
        generate_period_summary(
            period_type="daily",
            start_date=today,
            end_date=today
        )
        # today = date.today()
        # start_date = today - timedelta(days=7)
        # generate_period_summary(
        #     period_type="weekly",
        #     start_date=start_date,
        #     end_date=today
        # )
        # today = date.today()
        # start_date = today - timedelta(days=30)
        # generate_period_summary(
        #     period_type="monthly",
        #     start_date=start_date,
        #     end_date=today
        # )
        # get_service_performance()
        return jsonify({
            "message": "Feedback submitted successfully",
            "feedback_id": feedback_id
        }), 201

    except Exception as e:
        traceback.print_exc()   # <<< THIS SHOWS EXACT LINE
        return jsonify({"error": str(e)}), 500