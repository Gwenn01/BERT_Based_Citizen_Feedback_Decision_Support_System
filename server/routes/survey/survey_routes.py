from flask import Blueprint, request, jsonify

survey_bp = Blueprint("survey", __name__)

@survey_bp.route("/survey/evaluate", methods=["POST"])
def evaluate_survey():
    try:
        data = request.get_json()

        # Extract 8 service scores
        scores = [
            data.get("responsiveness"),
            data.get("reliability"),
            data.get("facilities"),
            data.get("communication"),
            data.get("costs"),
            data.get("integrity"),
            data.get("assurance"),
            data.get("outcome")
        ]

        # Validate input
        if None in scores:
            return jsonify({"error": "All 8 survey fields are required"}), 400

        for score in scores:
            if score < 1 or score > 5:
                return jsonify({"error": "Scores must be between 1 and 5"}), 400

        # Calculate average
        average_score = round(sum(scores) / len(scores), 2)

        # Interpret average
        if average_score <= 2.4:
            status = "Poor"
            recommendation = (
                "Service performance is poor. Immediate action is required. "
                "Review staff performance, improve facilities, and address major complaints."
            )
        elif average_score <= 3.4:
            status = "Average"
            recommendation = (
                "Service performance is average. Improvements are recommended. "
                "Focus on weak areas and review citizen feedback for specific concerns."
            )
        else:
            status = "Good"
            recommendation = (
                "Service performance is good. Maintain current standards and "
                "continue monitoring feedback for continuous improvement."
            )

        return jsonify({
            "average_score": average_score,
            "status": status,
            "recommendation": recommendation
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
