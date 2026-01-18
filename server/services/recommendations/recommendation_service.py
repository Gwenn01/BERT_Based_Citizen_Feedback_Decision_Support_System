from services.recommendations.issue_detector import detect_issues
from services.recommendations.recommendation_engine import generate_recommendations

def generate_decision_support(data):
    issues = detect_issues(data)
    recommendations = generate_recommendations(issues)

    return {
        "issues_detected": issues,
        "recommendations": recommendations
    }
