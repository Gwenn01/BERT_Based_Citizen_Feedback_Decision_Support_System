def validate_feedback(data):
    required_fields = [
        "client_type", "gender", "age", "place",
        "service_type",
        "cc1", "cc2", "cc3",
        "responsiveness", "reliability", "facilities",
        "communication", "costs", "integrity", "assurance", "outcome",
        "service_date"
    ]

    for field in required_fields:
        if field not in data or data[field] is None:
            return False, f"Missing required field: {field}"

    # Validate score ranges
    score_fields_1_5 = [
        "responsiveness", "reliability", "facilities",
        "communication", "costs", "integrity", "assurance", "outcome"
    ]

    for field in score_fields_1_5:
        if not (1 <= data[field] <= 5):
            return False, f"{field} must be between 1 and 5"

    if not (1 <= data["cc1"] <= 4):
        return False, "cc1 must be between 1 and 4"

    if not (1 <= data["cc2"] <= 5):
        return False, "cc2 must be between 1 and 5"

    if not (1 <= data["cc3"] <= 4):
        return False, "cc3 must be between 1 and 4"

    return True, None