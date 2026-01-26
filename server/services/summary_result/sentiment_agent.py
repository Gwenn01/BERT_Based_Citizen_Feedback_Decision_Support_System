from ai.bert_model import predict_sentiment

def analyze_sentiment(feedback_rows):
    counts = {"positive": 0, "neutral": 0, "negative": 0}

    if not feedback_rows:
        return {
            "total": 0,
            "counts": counts,
            "percentages": counts.copy(),
            "average_confidence": 0,
            "sentiment_score": 0
        }

    total_confidence = 0.0
    total = len(feedback_rows)

    for row in feedback_rows:
        sentiment = (row.get("sentiment") or "neutral").lower()
        if sentiment not in counts:
            sentiment = "neutral"

        counts[sentiment] += 1
        total_confidence += float(row.get("confidence") or 0)

    percentages = {
        k: round((v / total) * 100, 2)
        for k, v in counts.items()
    }

    average_confidence = round(total_confidence / total, 2)

    sentiment_score = round(
        ((counts["positive"] - counts["negative"]) / total + 1) * 50,
        2
    )

    return {
        "total": total,
        "counts": counts,
        "percentages": percentages,
        "average_confidence": average_confidence,
        "sentiment_score": sentiment_score
    }

