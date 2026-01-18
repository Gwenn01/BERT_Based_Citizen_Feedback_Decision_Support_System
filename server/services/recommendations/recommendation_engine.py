import json

def load_knowledge_base():
    with open("knowledge_base/recommendations.json") as f:
        return json.load(f)

def generate_recommendations(issues):
    kb = load_knowledge_base()
    recommendations = []

    for issue in issues:
        key = issue["dimension"]

        if key in kb:
            recommendations.append({
                "issue": kb[key]["issue"],
                "category": issue["category"],
                "severity": issue["severity"],
                "evidence": issue,
                "recommended_actions": kb[key]["solutions"]
            })

    return recommendations
