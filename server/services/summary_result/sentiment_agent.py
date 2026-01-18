from ai.bert_model import predict_sentiment

def analyze_sentiment(comments):
    if not comments:
        return {
            "total": 0,
            "counts": {},
            "percentages": {},
            "average_confidence": 0
        }

    counts = {
        "Positive": 0,
        "Neutral": 0,
        "Negative": 0
    }

    total_confidence = 0
    valid = 0

    for text in comments:
        result = predict_sentiment(text)

        label = result.get("label", "Neutral")
        confidence = result.get("confidence", 0)

        if label not in counts:
            label = "Neutral"

        counts[label] += 1
        total_confidence += confidence
        valid += 1

    percentages = {
        k: round((v / valid) * 100, 2) if valid else 0
        for k, v in counts.items()
    }
    sentiment_score = (((round(total_confidence / valid, 2) if valid else 0) + 1) / 2) * 100
    return {
        "total": valid,
        "counts": counts,
        "percentages": percentages,
        "sentiment_score": sentiment_score,
        "average_confidence": round(total_confidence / valid, 2) if valid else 0
    }

