from ai.bert_model import predict_sentiment

def analyze_sentiment(comments):
    if not comments:
        return {
            "total": 0,
            "counts": {},
            "percentages": {}
        }

    counts = {
        "Positive": 0,
        "Neutral": 0,
        "Negative": 0
    }

    total_confidence = 0
    total = len(comments)

    for text in comments:
        result = predict_sentiment(text)

        label = result["label"]
        confidence = result["confidence"]

        counts[label] += 1
        total_confidence += confidence

    percentages = {
        k: round((v / total) * 100, 2)
        for k, v in counts.items()
    }

    return {
        "total": total,
        "counts": counts,
        "percentages": percentages,
        "average_confidence": round(total_confidence / total, 2)
    }
