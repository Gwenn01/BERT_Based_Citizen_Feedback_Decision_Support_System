import json
import os


def load_knowledge_base():
    # Get the directory of this file
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Move up to services folder
    services_dir = os.path.dirname(current_dir)

    # Build correct path to knowledge_base
    kb_path = os.path.join(services_dir, "knowledge_base", "recommendations.json")

    with open(kb_path, "r", encoding="utf-8") as f:
        return json.load(f)



def generate_recommendations(issues):
    kb = load_knowledge_base()

    dimensions_kb = kb.get("dimensions", {})
    cross_kb = kb.get("cross_cutting_issues", {})
    
    recommendations = []

    for issue in issues:
        dimension = issue.get("dimension")
        category = issue.get("category")
        severity = issue.get("severity")

        kb_entry = None

        # 1️ Check service quality dimensions
        if dimension in dimensions_kb:
            kb_entry = dimensions_kb[dimension]

        # 2️ Check cross-cutting issues
        elif dimension.lower().replace(" ", "_") in cross_kb:
            kb_entry = cross_kb[dimension.lower().replace(" ", "_")]

        # 3️ If knowledge exists, generate recommendation
        if kb_entry:
            recommendations.append({
                "dimension": dimension,
                "category": category,
                "severity": severity,
                "issue": kb_entry.get("issue"),
                "root_cause": kb_entry.get("root_cause"),
                "impact": kb_entry.get("impact"),
                "recommended_actions": kb_entry.get("solutions"),
                "evidence": issue
            })

    return recommendations
