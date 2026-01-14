from flask import Blueprint, request, jsonify
from model.bert_model import predict_sentiment

ai_bp = Blueprint("ai_bp", __name__)

@ai_bp.route("/ai/analyze-feedback", methods=["POST"])
def analyze_feedback():
    data = request.json
    comment = data.get("comment")

    if not comment:
        return jsonify({"error": "No comment provided"}), 400

    sentiment = predict_sentiment(comment)

    return jsonify({
        "comment": comment,
        "sentiment": sentiment
    })
