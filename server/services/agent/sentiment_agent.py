from ai.bert_model import predict_sentiment

def compute_sentiment_score(percentages):
    positive = percentages.get("Positive", 0)
    negative = percentages.get("Negative", 0)

    sentiment_score = round((positive - negative) / 100, 2)

    return sentiment_score


def analyze_sentiment(comments):
    if not comments:
        return {
            "status": "no_text_feedback",
            "counts": {},
            "percentages": {},
            "dominant_sentiment": None
        }

    counts = {
        "Positive": 0,
        "Neutral": 0,
        "Negative": 0
    }

    # Count sentiments
    for text in comments:
        sentiment = predict_sentiment(text)
        counts[sentiment] += 1

    total = sum(counts.values())

    # Calculate percentages
    percentages = {
        k: round((v / total) * 100, 2)
        for k, v in counts.items()
    }
    sentiment_score = compute_sentiment_score(percentages)
    dominant = max(counts, key=counts.get)

    return {
        "counts": counts,
        "percentages": percentages,
        "sentiment_score": sentiment_score,
        "dominant_sentiment": dominant
    }
