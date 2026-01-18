def normalize_cc_score(value, max_value):
    """
    Converts CC score into percentage awareness
    """
    return round(((max_value - value) / (max_value - 1)) * 100, 2)

def interpret_awareness(score):
    if score < 50:
        return "Low Awareness"
    elif score < 75:
        return "Moderate Awareness"
    else:
        return "High Awareness"
    

def analyze_citizens_charter(cc_data):
    """
    cc_data = list of dicts with cc1, cc2, cc3
    """

    if not cc_data:
        return {"status": "no_cc_data"}

    total_cc1 = total_cc2 = total_cc3 = 0
    count = len(cc_data)

    for row in cc_data:
        total_cc1 += normalize_cc_score(row["cc1"], 4)
        total_cc2 += normalize_cc_score(row["cc2"], 5)
        total_cc3 += normalize_cc_score(row["cc3"], 4)

    avg_cc1 = round(total_cc1 / count, 2)
    avg_cc2 = round(total_cc2 / count, 2)
    avg_cc3 = round(total_cc3 / count, 2)

    overall_awareness = round((avg_cc1 + avg_cc2 + avg_cc3) / 3, 2)

    return {
        "cc1_awareness_percent": avg_cc1,
        "cc2_awareness_percent": avg_cc2,
        "cc3_awareness_percent": avg_cc3,
        "overall_awareness": overall_awareness,
        "status": interpret_awareness(overall_awareness)
    }

