
from flask import request, jsonify
from model.insert_feedback import insert_feedback
from middlewares.validate_feedback import validate_feedback
from server.controllers.mapper.handle_feedback_data import get_service_id

def handle_survey_submission():
    try:
        data = request.get_json()

        is_valid, error_message = validate_feedback(data)
        if not is_valid:
            return jsonify({"error": error_message}), 400    
        
        service_id = get_service_id(data)
        
        if not service_id:
            return jsonify({"error": "Invalid office/service name"}), 400
        
        feedback_id = insert_feedback(service_id, data)
        return jsonify({"message": "Feedback submitted successfully", "feedback_id": feedback_id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
