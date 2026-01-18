def analyze_survey(feedback_list):
    dimensions = [
        "responsiveness", "reliability", "facilities",
        "communication", "costs", "integrity",
        "assurance", "outcome"
    ]

    averages = {}
    for dim in dimensions:
        averages[dim] = round(
            sum(f[dim] for f in feedback_list) / len(feedback_list), 2
        )

    overall = round(sum(averages.values()) / len(averages), 2)

    weak = [k for k, v in averages.items() if v < 3]
    strong = [k for k, v in averages.items() if v >= 4]

    return {
        "overall_avg": overall,
        "averages": averages,
        "weak_dimensions": weak,
        "strong_dimensions": strong
    }
