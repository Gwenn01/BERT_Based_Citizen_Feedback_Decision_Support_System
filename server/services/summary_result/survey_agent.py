def analyze_survey(feedback_list):
    dimensions = [
        "responsiveness", "reliability", "facilities",
        "communication", "costs", "integrity",
        "assurance", "outcome"
    ]

    if not feedback_list:
        return {
            "overall_avg": 0,
            "averages": {dim: 0 for dim in dimensions},
            "weak_dimensions": [],
            "strong_dimensions": []
        }

    def safe_avg(values):
        return round(sum(values) / len(values), 2) if values else 0

    averages = {}
    for dim in dimensions:
        values = [f.get(dim, 0) for f in feedback_list]
        averages[dim] = safe_avg(values)

    overall = safe_avg(list(averages.values()))

    weak = [k for k, v in averages.items() if v < 3]
    strong = [k for k, v in averages.items() if v >= 4]

    return {
        "overall_avg": overall,
        "averages": averages,
        "weak_dimensions": weak,
        "strong_dimensions": strong
    }